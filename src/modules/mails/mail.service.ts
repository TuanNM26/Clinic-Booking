import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('emailQueue') private emailQueue: Queue) {}

  async sendAppointmentNotification(
    to: string,
    subject: string,
    context: any,
    template: string,
  ) {
    await this.emailQueue.add('sendEmail', {
      to,
      subject,
      context,
      template,
    });
  }
}
