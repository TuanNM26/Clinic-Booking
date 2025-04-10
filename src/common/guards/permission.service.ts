import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermission } from '../../modules/role-permissions/entities/role-permission.entity';
import { Permission } from '../../modules/permissions/entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
    
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>, // 👈 thêm dòng này
  ) {}
  
  async getPermissionIdByName(permissionName: string): Promise<string | null> {
    const permission = await this.permissionRepository.findOne({
      where: { name: permissionName },
    });
  
    return permission?.id || null;
  }

  async getRoleIdsByPermissionId(permissionId: string): Promise<string[]> {
    const rolePermissions = await this.rolePermissionRepository.find({
      where: { permission: { id: permissionId } },
      relations: ['role', 'permission'],
    });
  
    return rolePermissions.map(rp => rp.role.id);
  }
  
  
  
  
  
}
