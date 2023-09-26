import { Body, Controller, Post } from '@nestjs/common';
import { LoginAttemptDto, VerifyOtpCodeDto } from './auth.dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login_attempt')
  handleLoginAttempt(@Body() loginAttemptDto: LoginAttemptDto) {
    return this.authService.sendOtpCode(loginAttemptDto);
  }

  @Post('verify_otp_code')
  handleVerifyOtpCode(@Body() verifyOtpCodeDto: VerifyOtpCodeDto) {
    return this.authService.verifyOtpCode(verifyOtpCodeDto);
  }
}
