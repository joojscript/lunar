import { MESSAGES } from '@/globals/constants/messages';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserInput {
  @IsOptional()
  @IsString({ message: MESSAGES.INVALID_FIRST_NAME })
  firstName?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.INVALID_LAST_NAME })
  lastName?: string;

  @IsString({ message: MESSAGES.INVALID_EMAIL })
  @IsEmail({}, { message: MESSAGES.INVALID_EMAIL })
  email!: string;
}

export class UpdateUserInput {
  @IsOptional()
  @IsString({ message: MESSAGES.INVALID_FIRST_NAME })
  firstName?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.INVALID_LAST_NAME })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: MESSAGES.INVALID_EMAIL })
  email?: string;
}

export class UpdateHostInput {}
