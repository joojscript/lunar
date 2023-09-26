import { MESSAGES } from '@/globals/constants/messages';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginAttemptDto {
  @IsEmail({}, { message: MESSAGES.INVALID_EMAIL })
  email!: string;
}

export class VerifyOtpCodeDto extends LoginAttemptDto {
  @IsString({ message: MESSAGES.INVALID_OTP_CODE })
  @Length(6, 6, { message: MESSAGES.INVALID_OTP_CODE })
  otpCode!: string;
}
