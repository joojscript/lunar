import { faker } from '@faker-js/faker';
import { TestingModule } from '@nestjs/testing';
import { HostsController } from './hosts.controller';
import { HostsModuleTestSupport } from './hosts.module.mock';
import { HostsRepository } from './hosts.repository';

const hostname = faker.internet.domainName();
const owner = faker.string.uuid();
const label = faker.lorem.words(3);
const hostCreatePayload = {
  hostname,
  owner,
  label,
};

const createMock = jest.fn().mockReturnValue({
  ...hostCreatePayload,
  id: faker.string.uuid(),
  ownerId: owner,
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
      const host = await controller.create(hostCreatePayload);

      expect(host).toBeDefined();
      expect(host.id).toBeDefined();
      expect(host.hostname).toEqual(hostname);
      expect(host.label).toEqual(label);
      expect(host.ownerId).toEqual(owner);
    });

    it('should fail on incorrect input', async () => {
      const host = await controller.create({
        ...hostCreatePayload,
        hostname: 'invalid',
      });

      expect(host.id).not.toBeDefined();
    });
  });
});
