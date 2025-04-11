import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import  AuthService  from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { PermissionGuardService } from './permissionGuard.service';

@Injectable()
export class AuthGuard implements CanActivate {
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

        // 1. Xác thực (AuthGuard logic)
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

            // 2. Ủy quyền (PermissionGuard logic)
            if (!requiredPermissions || requiredPermissions.length === 0) {
                return true; // Cho phép truy cập nếu không có quyền cụ thể nào được yêu cầu
            }

            const roleId = request.user?.role;

            if (!roleId) {
                return false; // Không có role, không có quyền
            }

            const allowedRoleIds = new Set<string>();

            for (const permissionName of requiredPermissions) {
                const roleIds = await this.permissionService.getRoleIdsByPermissionName(permissionName);
                roleIds.forEach(id => allowedRoleIds.add(id));
            }

            const hasPermission = allowedRoleIds.has(roleId);
            return hasPermission;

        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}
