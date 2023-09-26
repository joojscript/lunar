import { Global, Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MemoryStoreService } from './memory-store.service';
import { SchedulerService } from './scheduler.service';

@Global()
@Module({
  exports: [SchedulerService, MailerService, MemoryStoreService],
  providers: [SchedulerService, MailerService, MemoryStoreService],
})
export class GlobalServicesModule {}
