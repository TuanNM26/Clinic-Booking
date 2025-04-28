import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionGuardService } from './permissionGuard.service';
import AuthService from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionGuardService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request?.headers?.authorization;
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!bearerToken) {
      throw new UnauthorizedException('Missing authorization token');
    }

    const token = bearerToken.split(' ')[1];

    try {
      const decoded: any = await this.authService.verify(
        token,
        this.configService.get<string>('ACCESS_KEY'),
      );
      request.user = decoded;

      if (!requiredPermissions || requiredPermissions.length === 0) {
        return true;
      }

      const roleId = request.user?.role;

      if (!roleId) {
        return false;
      }

      const allowedRoleIds = new Set<string>();

      for (const permissionName of requiredPermissions) {
        const roleIds = await this.permissionService.getRoleIdsByPermissionName(
          permissionName,
        );
        roleIds.forEach((id) => allowedRoleIds.add(id));
      }

      const hasPermission = allowedRoleIds.has(roleId);
      return hasPermission;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
