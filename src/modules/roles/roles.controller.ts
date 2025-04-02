import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { CreateRoleDto } from './role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  getRoles() {
    return this.rolesService.findAll();
  }

  @Post()
  createRole(@Body() roleData: CreateRoleDto) {
    return this.rolesService.create(roleData);
  }

  @Put(':id')
  updateRole(@Param('id') id: string, @Body() roleData: CreateRoleDto) {
    return this.rolesService.update(id, roleData);
  }

  @Delete(':id')
  deleteRole(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  @Get(':id')
  getRoleById(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }
}