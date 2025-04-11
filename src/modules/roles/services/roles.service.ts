import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleRepository } from '../repostitories/role.repository';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.roleRepository.findByName(createRoleDto.name);
    if (existingRole) {
      throw new Error(`Role with name "${createRoleDto.name}" already exists`);
    }
    return this.roleRepository.create(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.findAll();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
    await this.roleRepository.update(id, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<{ message: string }> {
    const role = await this.roleRepository.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }
    await this.roleRepository.remove(id);
    return { message: `Role with ID "${id}" has been successfully deleted` };
  }
}