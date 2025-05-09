import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './permissions.controller';
import { PermissionRepository } from './repositories/permission.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionRepository],
  exports: [PermissionsService],
})
export class PermissionsModule {}
