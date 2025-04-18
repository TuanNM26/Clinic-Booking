import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('emailQueue')
export class MailProcessor {
  constructor(private mailerService: MailerService) {}

  @Process('sendEmail')
  async handleSendEmail(job: Job) {
    const { to, subject, context, template } = job.data;
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template,
        context,
      });
      console.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
    }
  }
}
