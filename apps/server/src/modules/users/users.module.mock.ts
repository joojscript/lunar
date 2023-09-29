import { TestSupport } from '@interfaces';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { Test } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

class _UsersModuleTestSupport implements TestSupport {
  defineModule() {
    return Test.createTestingModule({
      imports: [PrismaModule],
      exports: [UsersService],
      providers: [UsersService, UsersRepository],
    }).compile();
  }
}

export const UsersModuleTestSupport = new _UsersModuleTestSupport();
