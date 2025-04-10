import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from '../shifts/entities/shift.entity';
import { ShiftsController } from '../shifts/shifts.controller';
import { ShiftsService } from '../shifts/shifts.service';
import { ShiftRepository } from '../shifts/shifts.repository';
import { Role } from './entities/role.entity';
import { RoleRepository } from './role.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RolesController],
    providers: [RolesService,RoleRepository],
    exports: [RolesService,RoleRepository]
})
export class RolesModule {}
