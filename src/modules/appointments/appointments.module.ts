import { Module } from '@nestjs/common';
import { AppointmentsService } from './services/appointments.service';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsRepository } from './repositories/appointments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { PermissionModule } from 'src/common/guards/permission.module';
import { AuthModule } from 'src/common/auth/auth.module';
import { MailModule } from '../mails/mail.module';
import { UsersRepository } from '../users/repositories/user.repository';
import { ShiftRepository } from '../shifts/repositories/shifts.repository';
import { UsersModule } from '../users/users.module';
import { ShiftsModule } from '../shifts/shifts.module';
import { DoctorShiftsService } from '../doctor-shifts/services/doctor-shifts.service';
import { DoctorShiftsModule } from '../doctor-shifts/doctor-shifts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), 
            PermissionModule, 
            AuthModule,
            MailModule,
            UsersModule,
            ShiftsModule,
            DoctorShiftsModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService,AppointmentsRepository],
  exports: [AppointmentsService]
})
export class AppointmentsModule {}
