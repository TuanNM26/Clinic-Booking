import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Permission } from '../../permissions/entities/permission.entity';
import { PermissionsService } from 'src/modules/permissions/services/permissions.service';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly permissionService: PermissionsService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return await this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: string): Promise<Role | null> {
    return await this.roleRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Role | null> {
    return await this.roleRepository.findOneBy({ name });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role | null> {
    await this.roleRepository.update(id, updateRoleDto);
    return await this.roleRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> { 
    await this.roleRepository.softDelete(id);
  }

  async addPermissionToRole(roleId: string, permissionId: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permission = await this.permissionService.findOne(permissionId)

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    
    const alreadyExists = role.permissions.some(p => p.id === permissionId);
    if (!alreadyExists) {
      role.permissions.push(permission); 
      await this.roleRepository.save(role); 
    }
    return role;  
  }

  async removePermissionFromRole(roleId: string, permissionId: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const permissionIndex = role.permissions.findIndex(p => p.id === permissionId);

    if (permissionIndex === -1) {
      throw new NotFoundException('Permission not found in the role');
    }
    role.permissions.splice(permissionIndex, 1);

    await this.roleRepository.save(role);

    return role;
  }
}
