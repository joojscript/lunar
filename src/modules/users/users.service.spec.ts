import { TestingModule } from '@nestjs/testing';
import { UsersModuleTestSupport } from './users.module.mock';
import { UsersService } from './users.service';

const findOneMock = jest.fn();

jest.mock('./users.service', () => ({
  UsersService: jest.fn().mockImplementation(() => ({
    findOne: findOneMock,
  })),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await UsersModuleTestSupport.defineModule();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('works with correct input', async () => {
      await service.findOne({ id: '' });

      expect(findOneMock).toHaveBeenCalledTimes(1);
    });

    it('throws an error with incorrect input', async () => {
      findOneMock.mockRejectedValueOnce(new Error());

      await expect(service.findOne({ id: '' })).rejects.toThrowError();
    });
  });
});
