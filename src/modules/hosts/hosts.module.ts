import { Module } from '@nestjs/common';
import { HostsController } from './hosts.controller';
import { HostsRepository } from './hosts.repository';
import { HostsService } from './hosts.service';

@Module({
  controllers: [HostsController],
  providers: [HostsService, HostsRepository],
})
export class HostsModule {}
