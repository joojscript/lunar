import { TestingModule } from '@nestjs/testing';
import { HostsController } from './hosts.controller';
import { HostsModuleTestSupport } from './hosts.module.mock';
import { HostsRepository } from './hosts.repository';

const createMock = jest.fn().mockReturnValue({
  id: '1',
  hostname: 'test',
  label: '',
  owner: { id: '1' },
});

jest.spyOn(HostsRepository.prototype, 'create').mockImplementation(createMock);

describe('HostsController', () => {
  let controller: HostsController;

  beforeEach(async () => {
    const module: TestingModule = await HostsModuleTestSupport.defineModule();

    controller = module.get<HostsController>(HostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it('should return a host on correct input', async () => {
      const host = await controller.create({
        hostname: 'test',
        owner: { connect: { id: '1' } },
        label: '',
      });

      expect(host).toBeDefined();
      expect(host.id).toBeDefined();
      expect(host.label).toEqual('');
    });
  });
});
