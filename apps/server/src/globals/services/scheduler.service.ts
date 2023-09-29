import { HostsService } from '@/modules/hosts/hosts.service';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';
import { QUEUE_NAMES } from '../constants/queues';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectQueue(QUEUE_NAMES.SCANS) private scansQueue: Queue,
    private readonly hostsService: HostsService,
  ) {}

  // Every 5 minutes
  @Cron('* */5 * * * *')
  async handleCron() {
    this.logger.debug('Executing Cron Host Scan Round');

    const allVerifiedHosts = await this.hostsService.findMany({
      where: {
        NOT: {
          verifiedAt: null,
        },
      },
    });

    this.logger.debug(`Found ${allVerifiedHosts.length} hosts to scan`);

    for (const { hostname } of allVerifiedHosts) {
      await this.scansQueue.add({ hostname });
      this.logger.debug(`Added ${hostname} to scan queue`);
    }
  }
}
