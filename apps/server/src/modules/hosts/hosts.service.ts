import { IN_MEMORY_STORES } from '@/globals/constants/stores';
import { MemoryStoreService } from '@/globals/services/memory-store.service';
import { isValidIp } from '@/helpers/scanner';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Host, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { VerifyHostInput, VerifyHostRequestInput } from './hosts.dtos';
import { HostsRepository } from './hosts.repository';

const VERIFY_HOST_REQUEST_EXPIRATION_TIME = 1000 * 60 * 5; // 5 minutes

@Injectable()
export class HostsService {
  private readonly logger = new Logger(HostsService.name);

  constructor(
    private readonly repository: HostsRepository,
    private readonly memoryStoreService: MemoryStoreService,
  ) {}

  async findOne(
    hostWhereUniqueInput: Prisma.HostWhereUniqueInput,
  ): Promise<Host | null> {
    return this.repository.findOne(hostWhereUniqueInput);
  }

  async findMany(params: Prisma.HostFindManyArgs): Promise<Host[]> {
    return this.repository.findMany(params);
  }

  async createHost(data: Prisma.HostCreateInput): Promise<Host> {
    return this.repository.create(data);
  }

  async updateHost(params: {
    where: Prisma.HostWhereUniqueInput;
    data: Prisma.HostUpdateInput;
  }): Promise<Host> {
    return this.repository.update(params);
  }

  async deleteHost(where: Prisma.HostWhereUniqueInput): Promise<Host> {
    return this.repository.delete(where);
  }

  async verifyHostRequest(verifyHostRequestInput: VerifyHostRequestInput) {
    const host = await this.repository.findOne({
      id: verifyHostRequestInput.hostId,
    });

    if (!host) {
      throw new NotFoundException('Host not found');
    }

    if (host.verifiedAt != null) {
      throw new BadRequestException('Host already verified');
    }

    const randomAssignedUuid = randomUUID();

    this.memoryStoreService.append(
      IN_MEMORY_STORES.VERIFY_HOST_TEMPORARY_UUID,
      {
        [host.hostname]: randomAssignedUuid,
      },
    );

    setTimeout(() => {
      this.memoryStoreService.deleteKeyFromObject(
        IN_MEMORY_STORES.VERIFY_HOST_TEMPORARY_UUID,
        host.hostname,
      );
    }, VERIFY_HOST_REQUEST_EXPIRATION_TIME);

    return {
      uuid: randomAssignedUuid,
    };
  }

  async verifyHost(verifyHostInput: VerifyHostInput) {
    if (!isValidIp(verifyHostInput.hostname)) {
      this.logger.error(
        `Trying to verify host with unrecognized hostname: ${verifyHostInput.hostname}`,
      );
      throw new BadRequestException('Invalid hostname');
    }

    const tmpHostStore = this.memoryStoreService.get(
      IN_MEMORY_STORES.VERIFY_HOST_TEMPORARY_UUID,
    );

    const hostUuid = tmpHostStore[verifyHostInput.hostname];

    if (!hostUuid) {
      throw new NotFoundException('Host not found');
    }

    if (hostUuid !== verifyHostInput.uuid) {
      throw new NotFoundException('Host not found');
    }

    this.memoryStoreService.deleteKeyFromObject(
      IN_MEMORY_STORES.VERIFY_HOST_TEMPORARY_UUID,
      verifyHostInput.hostname,
    );

    const host = await this.repository.findOne({
      hostname: verifyHostInput.hostname,
    });

    return await this.updateHost({
      data: { ...host, verifiedAt: new Date() },
      where: { id: host.id },
    });
  }
}
