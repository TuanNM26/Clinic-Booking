  
import { RolesService } from './services/roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

@Patch(':roleId/permissions/:permissionId')
async addPermissionToRole(
  @Param('roleId') roleId: string,
  @Param('permissionId') permissionId: string,
) {
  return await this.rolesService.addPermission(roleId, permissionId);
}

@Delete(':roleId/permissions/:permissionId')
async removePermissionFromRole(
  @Param('roleId') roleId: string,
  @Param('permissionId') permissionId: string,
) {
  return this.rolesService.removePermissionFromRole(roleId, permissionId);
}
}
