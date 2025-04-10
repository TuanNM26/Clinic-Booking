import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
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
}