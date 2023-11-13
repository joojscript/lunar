import { MESSAGES } from '@/globals/constants/messages';
import { IsOptional, IsString, IsUUID, Matches } from 'class-validator';

export const HOST_HOSTNAME_REGEX =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/gm;

export class CreateHostInput {
  @IsOptional()
  @IsString({ message: MESSAGES.INVALID_LABEL })
  label?: string;

  @IsString({ message: MESSAGES.INVALID_HOSTNAME })
  @Matches(HOST_HOSTNAME_REGEX, {
    message: MESSAGES.INVALID_HOSTNAME,
  })
  hostname!: string;

  @IsOptional()
  @IsUUID('4', { message: MESSAGES.INVALID_OWNER })
  owner!: string;
}

export class UpdateHostInput {
  @IsUUID('4', { message: MESSAGES.INVALID_ID })
  id!: string;

  @IsOptional()
  @IsString({ message: MESSAGES.INVALID_LABEL })
  label?: string;

  @IsOptional()
  @IsString({ message: MESSAGES.INVALID_HOSTNAME })
  @Matches(HOST_HOSTNAME_REGEX, {
    message: MESSAGES.INVALID_HOSTNAME,
  })
  hostname?: string;

  @IsOptional()
  @IsUUID('4', { message: MESSAGES.INVALID_OWNER })
  owner?: string;
}

export class VerifyHostRequestInput {
  @IsUUID('4', { message: MESSAGES.INVALID_ID })
  hostId!: string;
}

export class VerifyHostInput {
  @IsString({ message: MESSAGES.INVALID_HOSTNAME })
  @Matches(HOST_HOSTNAME_REGEX, {
    message: MESSAGES.INVALID_HOSTNAME,
  })
  hostname!: string;

  @IsString({ message: MESSAGES.INVALID_UUID })
  @IsUUID('4', { message: MESSAGES.INVALID_UUID })
  uuid!: string;
}
