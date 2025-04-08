import { Module } from '@nestjs/common';
import { DoctorServicesService } from './doctorServices.service';
import { DoctorServicesController } from './doctorServices.controller';

@Module({
  controllers: [DoctorServicesController],
  providers: [DoctorServicesService],
})
export class DoctorServicesModule {}