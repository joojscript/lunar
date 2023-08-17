import { TestingModule } from '@nestjs/testing';
import { HostsModuleTestSupport } from './hosts.module.mock';
import { HostsService } from './hosts.service';

describe('HostsService', () => {
  let service: HostsService;

  beforeEach(async () => {
    const module: TestingModule = await HostsModuleTestSupport.defineModule();

    service = module.get<HostsService>(HostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
