import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { MailModule } from '../mails/mail.module';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [MailModule, AppointmentsModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
