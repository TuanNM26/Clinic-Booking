import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionGuardService } from './permissionGuard.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionGuardService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const roleId = request.user?.role;

    if (!roleId) {
      return false;
    }

    const allowedRoleIds = new Set<string>();

    for (const permissionName of requiredPermissions) {
      const roleIds = await this.permissionService.getRoleIdsByPermissionName(permissionName);
      roleIds.forEach(id => allowedRoleIds.add(id));
    }
    const hasPermission = allowedRoleIds.has(roleId);
    return hasPermission;
  }
}