import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../../modules/permissions/entities/permission.entity';
import { Role } from '../../modules/roles/entities/role.entity';

@Injectable()
export class PermissionGuardService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,

    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async getPermissionIdByName(permissionName: string): Promise<string | null> {
    const permission = await this.permissionRepository.findOne({
      where: { name: permissionName },
    });
    return permission?.id || null;
  }

  async getRoleIdsByPermissionName(permissionName: string): Promise<string[]> {
    const permission = await this.permissionRepository.findOne({
      where: { name: permissionName },
      relations: ['roles'],
    });

    if (permission) {
      return permission.roles.map((role) => role.id);
    }

    return [];
  }

  async getPermissionNamesByRoleId(roleId: string): Promise<string[]> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (role) {
      return role.permissions.map((permission) => permission.name);
    }

    return [];
  }
}
