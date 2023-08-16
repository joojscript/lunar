import { TestingModule } from '@nestjs/testing';

export interface TestSupport {
  defineModule: () => Promise<TestingModule>;
}
