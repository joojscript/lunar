import { MESSAGES } from '@/globals/constants/messages';
import { IN_MEMORY_STORES } from '@/globals/constants/stores';
import {
  EMAIL_TEMPLATES,
  MailerService,
} from '@/globals/services/mailer.service';
import { MemoryStoreService } from '@/globals/services/memory-store.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginAttemptDto, VerifyOtpCodeDto } from './auth.dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly memoryStoreService: MemoryStoreService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async sendOtpCode(loginAttemptDto: LoginAttemptDto) {
    const foundUser = await this.usersService.findOne(loginAttemptDto);

    if (!foundUser) {
      throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    }

    const generatedOtpCode = this.generateAndAttachOtpCodeToUser(
      foundUser.email,
    );

    this.mailerService.send(EMAIL_TEMPLATES.SEND_OTP_CODE, {
      to: loginAttemptDto.email,
      otp_code: generatedOtpCode,
      user_idenfitication: foundUser.firstName || foundUser.email,
    });
  }

  async verifyOtpCode(verifyOtpCodeDto: VerifyOtpCodeDto) {
    const userOtpCodes = this.memoryStoreService.get(
      IN_MEMORY_STORES.USER_OTP_CODES,
    );

    const isValid =
      userOtpCodes &&
      userOtpCodes[verifyOtpCodeDto.email] == verifyOtpCodeDto.otp_code;

    if (!isValid) {
      throw new BadRequestException(MESSAGES.INVALID_OTP_CODE);
    }

    this.memoryStoreService.deleteKeyFromObject(
      IN_MEMORY_STORES.USER_OTP_CODES,
      verifyOtpCodeDto.email,
    );

    return this.generateAndSendToken(verifyOtpCodeDto.email);
  }

  private generateAndAttachOtpCodeToUser(userEmail: string) {
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    this.memoryStoreService.append(IN_MEMORY_STORES.USER_OTP_CODES, {
      [userEmail]: otpCode,
    });

    return otpCode;
  }

  private generateAndSendToken(userEmail: string) {
    const token = this.jwtService.sign({ email: userEmail });

    return { access_token: token };
  }
}
