import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../mails/mail.service'; // Đảm bảo đường dẫn này đúng với vị trí file mail.service.ts của bạn
import { AppointmentsService } from '../appointments/services/appointments.service';
import { Between, In } from 'typeorm';
@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(private readonly mailService: MailService,
              private readonly appointmentService: AppointmentsService,
  ) {}

  @Cron(CronExpression.EVERY_10_HOURS) 
  async sendPatientAppointmentReminders() {
    this.logger.debug('Checking and sending appointment reminders to patients...');

    const now = new Date();
    const reminderThreshold = 30 * 60 * 1000; // 30 phút trong milliseconds
    const reminderTimeThreshold = new Date(now.getTime() + reminderThreshold);

    const upcomingAppointments = await this.appointmentService.find({
      where: {
        status: In(['pending', 'confirmed']),
      },
      relations: ['shift','doctor'],
    });

    for (const appointment of upcomingAppointments) {
      this.logger.log(`Checking appointment: ID=${appointment.id}, Patient=${appointment.full_name}, Date=${appointment.appointment_date}, Start Time=${appointment.shift?.start_time}, Doctor=${appointment.doctor?.full_name}, Status=${appointment.status}`);

      if (appointment.shift && appointment.email && appointment.doctor) {
        const appointmentDate = new Date(appointment.appointment_date);
        const [hours, minutes, seconds] = appointment.shift.start_time.split(':').map(Number);

        const appointmentDateTime = new Date(
          appointmentDate.getFullYear(),
          appointmentDate.getMonth(),
          appointmentDate.getDate(),
          hours,
          minutes,
          seconds,
        );

        const timeDifference = appointmentDateTime.getTime() - now.getTime();
        console.log("Day nhe tiem ady nhe " + timeDifference);
        if (timeDifference > 0 && timeDifference <= reminderThreshold) {
          const context = {
            patientName: appointment.full_name,
            appointmentTime: appointment.shift.start_time,
            appointmentDate: appointment.appointment_date,
            appointmentAddress: appointment.address,
            appointmentNote: appointment.notes,
            doctorName: appointment.doctor.full_name

          };
          const subject = 'Lời nhắc lịch hẹn khám bệnh';
          const template = 'appointmentNotification';

          try {
            await this.mailService.sendAppointmentNotification(
              appointment.email,
              subject,
              context,
              template,
            );
            this.logger.log(`Reminder email sent to ${appointment.email} for appointment at ${appointment.shift.start_time} on ${appointment.appointment_date}`);

          } catch (error) {
            this.logger.error(`Failed to send reminder email to ${appointment.email}`, error);
          }
        }
      } else {
        this.logger.warn(`Patient or Shift information not found for appointment ID: ${appointment.id}`);
      }
    }

    this.logger.debug('Finished checking and sending appointment reminders.');
  }
}