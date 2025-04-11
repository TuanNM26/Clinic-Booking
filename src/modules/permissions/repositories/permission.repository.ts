import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepository.create(createPermissionDto);
    return await this.permissionRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async findOne(id: string): Promise<Permission | null> {
    return await this.permissionRepository.findOneBy({ id });
  }

  async findByName(name: string): Promise<Permission | null> {
    return await this.permissionRepository.findOneBy({ name });
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission | null> {
    await this.permissionRepository.update(id, updatePermissionDto);
    return await this.permissionRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.permissionRepository.softDelete(id);
  }
}