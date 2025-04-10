import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../guards/permission.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    console.log('🔐 Required permissions:', requiredPermissions);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      console.log('✅ No specific permissions required.');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const roleId = request.user?.role;

    if (!roleId) {
      console.log('⛔ No roleId found in user payload.');
      return false;
    }

    const allowedRoleIds = new Set<string>();

    for (const permission of requiredPermissions) {
      const permissionId = await this.permissionService.getPermissionIdByName(permission);
      if (!permissionId) {
        console.log(`⚠️ Permission "${permission}" not found.`);
        continue;
      }

      const roleIds = await this.permissionService.getRoleIdsByPermissionId(permissionId);
      console.log(`🔑 Permission "${permission}" (ID: ${permissionId}) is allowed for roles:`, roleIds);
      roleIds.forEach(id => allowedRoleIds.add(id));
    }

    console.log('👤 User roleId:', roleId);
    console.log('✅ Allowed Role IDs:', Array.from(allowedRoleIds));

    const hasPermission = allowedRoleIds.has(roleId);

    if (!hasPermission) {
      console.log('❌ Access denied. User role does not have required permission.');
    } else {
      console.log('✅ Access granted.');
    }

    return hasPermission;
  }
}
