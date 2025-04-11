import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shift } from '../shifts/entities/shift.entity';
import { ShiftsController } from '../shifts/shifts.controller';
import { ShiftsService } from '../shifts/services/shifts.service';
import { ShiftRepository } from '../shifts/repositories/shifts.repository';
import { Role } from './entities/role.entity';
import { RoleRepository } from './repostitories/role.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RolesController],
    providers: [RolesService,RoleRepository],
    exports: [RolesService]
})
export class RolesModule {}
