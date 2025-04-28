import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionRepository } from '../repositories/permission.repository';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const existingPermission = await this.permissionRepository.findByName(
      createPermissionDto.name,
    );
    if (existingPermission) {
      throw new Error(
        `Permission with name "${createPermissionDto.name}" already exists`,
      );
    }
    return this.permissionRepository.create(createPermissionDto);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.findAll();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne(id);
    if (!permission) {
      throw new NotFoundException(`Permission with ID "${id}" not found`);
    }
    return permission;
  }

  async findByName(name: string): Promise<Permission> {
    const permission = await this.permissionRepository.findByName(name);
    if (!permission) {
      throw new NotFoundException(`Permission with name "${name}" not found`);
    }
    return permission;
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const permission = await this.permissionRepository.findOne(id);
    if (!permission) {
      throw new NotFoundException(`Permission with ID "${id}" not found`);
    }
    await this.permissionRepository.update(id, updatePermissionDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const permission = await this.permissionRepository.findOne(id);
    if (!permission) {
      throw new NotFoundException(`Permission with ID "${id}" not found`);
    }
    await this.permissionRepository.remove(id);
    return {
      message: `Permission with ID "${id}" has been successfully deleted`,
    };
  }
}
