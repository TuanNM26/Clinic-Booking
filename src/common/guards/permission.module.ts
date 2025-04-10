import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './permission.service';
import { RolePermission } from 'src/modules/role-permissions/entities/role-permission.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission, Permission])],
  providers: [PermissionService],
  exports: [PermissionService], 
})
export class PermissionModule {}
