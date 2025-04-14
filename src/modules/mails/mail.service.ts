import { Injectable } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"
import { Expose } from "class-transformer"
import { subscribe } from "diagnostics_channel"
import { Subject } from "rxjs"

@Injectable()
export class MailService{
    constructor(private readonly mailService : MailerService){}

    async sendAppointmentNotification(
        to: string,
        subject: string,
        context: any,
        template: string,){
            try{
                await this.mailService.sendMail({
                    to: to,
                    subject: subject,
                    context: context,
                    template: template,
                });
                console.log(`Mail sent to ${to} with subject ${subject}`);
            }
            catch(error){
                console.log(`failed to send mail because: ${error}`);
            }

        }
}