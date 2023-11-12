import { SYSTEM_EVENTS } from '@/globals/constants/events';
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
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { LoginAttemptDto, VerifyOtpCodeDto } from './auth.dtos';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly memoryStoreService: MemoryStoreService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @OnEvent(SYSTEM_EVENTS.USERS.USER_CREATED)
  async handleUserCreated(payload: User) {
    this.logger.log(
      "User was created, an OTP code is being sent to the user's email",
    );
    await this.sendOtpCode({ email: payload.email });
  }

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

    return await this.generateAndSendToken(verifyOtpCodeDto.email);
  }

  private generateAndAttachOtpCodeToUser(userEmail: string) {
    const otpCode = Math.floor(1000 + Math.random() * 9000);

    this.memoryStoreService.append(IN_MEMORY_STORES.USER_OTP_CODES, {
      [userEmail]: otpCode,
    });

    return otpCode;
  }

  private async generateAndSendToken(userEmail: string) {
    const foundUser = await this.usersService.findOne({ email: userEmail });
    if (!foundUser) {
      throw new InternalServerErrorException(MESSAGES.USER_NOT_FOUND);
    }
    const token = this.jwtService.sign({ user_id: foundUser.id });

    return { access_token: token };
  }
}
