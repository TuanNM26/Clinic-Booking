  
import { RolesService } from './services/roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Permission } from 'src/common/enum/permission.enum';
import { Auth } from 'src/common/decorator/auth.decorator';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Auth([`${Permission.MANAGE_ROLES}`]) 
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Auth([`${Permission.MANAGE_ROLES}`]) 
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Auth([`${Permission.MANAGE_ROLES}`]) 
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @Auth([`${Permission.MANAGE_ROLES}`]) 
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Auth([`${Permission.MANAGE_ROLES}`]) 
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

@Patch(':roleId/permissions/:permissionId')
@Auth([`${Permission.MANAGE_ROLES}`]) 
async addPermissionToRole(
  @Param('roleId') roleId: string,
  @Param('permissionId') permissionId: string,
) {
  return await this.rolesService.addPermission(roleId, permissionId);
}

@Delete(':roleId/permissions/:permissionId')
@Auth([`${Permission.MANAGE_ROLES}`]) 
async removePermissionFromRole(
  @Param('roleId') roleId: string,
  @Param('permissionId') permissionId: string,
) {
  return this.rolesService.removePermissionFromRole(roleId, permissionId);
}
}
