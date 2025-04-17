import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../../modules/roles/entities/role.entity'; 
import { User } from '../../../modules/users/entities/user.entity';
import { SeederService } from './seed.service';
import { RoleSeeder,UserSeeder } from './index';
import { ShiftSeeder } from './shift.seed';
import { Shift } from 'src/modules/shifts/entities/shift.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Role, User,Shift])],
  providers: [SeederService, RoleSeeder, UserSeeder,ShiftSeeder],
})
export class SeederModule {}