import { MESSAGES } from '@/globals/constants/messages';
import { IsEmail, IsNumberString, Length } from 'class-validator';

export class LoginAttemptDto {
  @IsEmail({}, { message: MESSAGES.INVALID_EMAIL })
  email!: string;
}

export class VerifyOtpCodeDto extends LoginAttemptDto {
  @IsNumberString({}, { message: MESSAGES.INVALID_OTP_CODE })
  @Length(4, 4, { message: MESSAGES.INVALID_OTP_CODE })
  otp_code!: string;
}
