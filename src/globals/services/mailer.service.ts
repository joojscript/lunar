import emailjs, { EmailJSResponseStatus } from '@emailjs/nodejs';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type SendEmailPayload = {
  to: string;
} & Record<string, any>;

export enum EMAIL_TEMPLATES {
  SEND_OTP_CODE,
}

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  private publicKey = this.configService.get<string>('MAILER_PUBLIC_KEY');
  private privateKey = this.configService.get<string>('MAILER_PRIVATE_KEY');
  private serviceId = this.configService.get<string>('MAILER_SERVICE_ID');

  private EMAIL_TEMPLATES = {
    OTP_CODE_SEND: this.configService.get<string>(
      'MAIL_TEMPLATE_OTP_CODE_SEND',
    ),
  };

  constructor(private readonly configService: ConfigService) {
    emailjs.init({
      publicKey: this.publicKey,
      privateKey: this.privateKey,
    });
  }

  send(
    mail: EMAIL_TEMPLATES,
    payload: SendEmailPayload,
  ): Promise<EmailJSResponseStatus> {
    console.log(mail);
    this.logger.log(`Sending email to ${payload.to} with template ${mail}`);
    return emailjs.send(
      this.serviceId,
      this.findEmailTemplateId(mail),
      payload,
    );
  }

  private findEmailTemplateId(mail: EMAIL_TEMPLATES) {
    switch (mail) {
      case EMAIL_TEMPLATES.SEND_OTP_CODE:
        return this.EMAIL_TEMPLATES.OTP_CODE_SEND;
    }
  }
}
