import { HostsModule } from '@/modules';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { QUEUE_NAMES } from '../constants/queues';
import { MailerService } from './mailer.service';
import { MemoryStoreService } from './memory-store.service';
import { SchedulerService } from './scheduler.service';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('REDIS_HOST'),
          port: configService.get<number>('REDIS_PORT'),
        },
      }),
    }),
    BullModule.registerQueue({
      name: QUEUE_NAMES.SCANS,
      processors: [join(__dirname, '../../processors/scans')],
    }),
    BullBoardModule.forFeature({
      name: QUEUE_NAMES.SCANS,
      adapter: BullMQAdapter,
    }),
    HostsModule,
  ],
  exports: [SchedulerService, MailerService, MemoryStoreService],
  providers: [SchedulerService, MailerService, MemoryStoreService],
})
export class GlobalServicesModule {}
