import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailService } from '../mails/mail.service';
import { AppointmentsService } from '../appointments/services/appointments.service';
import { Between, In } from 'typeorm';
@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private readonly mailService: MailService,
    private readonly appointmentService: AppointmentsService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async sendPatientAppointmentReminders() {
    this.logger.debug(
      'Checking and sending appointment reminders to patients...',
    );

    const now = new Date();
    const reminderThreshold = 30 * 60 * 1000;
    const reminderTimeThreshold = new Date(now.getTime() + reminderThreshold);

    const upcomingAppointments = await this.appointmentService.find({
      where: {
        status: In(['pending', 'confirmed']),
      },
      relations: ['shift', 'doctor'],
    });

    for (const appointment of upcomingAppointments) {
      this.logger.log(
        `Checking appointment: ID=${appointment.id}, Patient=${appointment.full_name}, Date=${appointment.appointment_date}, Start Time=${appointment.start_time}, Doctor=${appointment.doctor?.full_name}, Status=${appointment.status}`,
      );

      if (appointment.shift && appointment.email && appointment.doctor) {
        const appointmentDate = new Date(appointment.appointment_date);
        const [hours, minutes, seconds = 0] = appointment.start_time
          .split(':')
          .map(Number);

        const appointmentDateTime = new Date(
          appointmentDate.getFullYear(),
          appointmentDate.getMonth(),
          appointmentDate.getDate(),
          hours,
          minutes,
          seconds,
        );

        const timeDifference = appointmentDateTime.getTime() - now.getTime();
        if (timeDifference > 0 && timeDifference <= reminderThreshold) {
          const dateObj = appointmentDate;
          const day = dateObj.getDate().toString().padStart(2, '0');
          const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
          const year = dateObj.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          const context = {
            patientName: appointment.full_name,
            appointmentTime: appointment.start_time,
            appointmentDate: formattedDate,
            appointmentAddress: appointment.address,
            appointmentNote: appointment.notes,
            doctorName: appointment.doctor.full_name,
          };
          const subject = 'Appointment Reminder';
          const template = 'appointmentNotification';

          try {
            await this.mailService.sendAppointmentNotification(
              appointment.doctor.email,
              subject,
              context,
              template,
            );

            await this.mailService.sendAppointmentNotification(
              appointment.email,
              subject,
              context,
              template,
            );
            this.logger.log(
              `Reminder email sent to ${appointment.email} for appointment at ${appointment.shift.start_time} on ${appointment.appointment_date}`,
            );
          } catch (error) {
            this.logger.error(
              `Failed to send reminder email to ${appointment.email}`,
              error,
            );
          }
        }
      } else {
        this.logger.warn(
          `Patient or Shift information not found for appointment ID: ${appointment.id}`,
        );
      }
    }

    this.logger.debug('Finished checking and sending appointment reminders.');
  }
}
