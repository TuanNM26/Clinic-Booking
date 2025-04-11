import { Module } from '@nestjs/common';
import { DoctorShiftsService } from './services/doctor-shifts.service';
import { DoctorShiftsController } from './doctor-shifts.controller';
import { DoctorShiftRepository } from './repositories/doctor-shift.repository';
import { DoctorShift } from './entities/doctor-shift.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/common/auth/auth.module';
import { PermissionModule } from 'src/common/guards/permission.module';

@Module({
  imports:  [TypeOrmModule.forFeature([DoctorShift]),
             AuthModule,
             PermissionModule],
  controllers: [DoctorShiftsController],
  providers: [DoctorShiftsService, DoctorShiftRepository],
  exports:[DoctorShiftsService]
})
export class DoctorShiftsModule {}
