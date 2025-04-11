import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsRepository } from './appointments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { PermissionModule } from 'src/common/guards/permission.module';
import { AuthModule } from 'src/common/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), 
            PermissionModule, 
            AuthModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService,AppointmentsRepository],
  exports: [AppointmentsService]
})
export class AppointmentsModule {}
