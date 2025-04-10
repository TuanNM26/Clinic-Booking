import { Module } from '@nestjs/common';
import { DoctorShiftsService } from './doctor-shifts.service';
import { DoctorShiftsController } from './doctor-shifts.controller';

@Module({
  controllers: [DoctorShiftsController],
  providers: [DoctorShiftsService]
})
export class DoctorShiftsModule {}
