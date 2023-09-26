import emailjs, { EmailJSResponseStatus } from '@emailjs/nodejs';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type SendEmailPayload = {
  to: string;
  from: string;
  subject: string;
  data: Record<string, any>;
};

@Injectable()
export class MailerService {
  private readonly logger = new Logger(MailerService.name);

  publicKey = this.configService.get<string>('MAILER_PUBLIC_KEY');
  privateKey = this.configService.get<string>('MAILER_PRIVATE_KEY');
  serviceId = this.configService.get<string>('MAILER_SERVICE_ID');

  EMAIL_TEMPLATES = {
    OTP_CODE_SEND: this.configService.get<string>('MAILER_OTP_CODE_SEND'),
  };

  constructor(private readonly configService: ConfigService) {
    emailjs.init({
      publicKey: this.publicKey,
      privateKey: this.privateKey,
    });
  }

  send(
    mail: keyof typeof MailerService.prototype.EMAIL_TEMPLATES,
    payload: SendEmailPayload,
  ): Promise<EmailJSResponseStatus> {
    this.logger.log(`Sending email to ${payload.to} with template ${mail}`);
    return emailjs.send(this.serviceId, this.EMAIL_TEMPLATES[mail], payload);
  }
}
