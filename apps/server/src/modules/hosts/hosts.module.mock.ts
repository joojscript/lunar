import { TestSupport } from '@interfaces';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '../prisma/prisma.module';
import { HostsController } from './hosts.controller';
import { HostsRepository } from './hosts.repository';
import { HostsService } from './hosts.service';

class _HostsModuleTestSupport implements TestSupport {
  defineModule() {
    return Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [HostsController],
      providers: [HostsService, HostsRepository],
    }).compile();
  }
}

export const HostsModuleTestSupport = new _HostsModuleTestSupport();
