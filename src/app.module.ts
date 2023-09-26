import { HostsModule, PrismaModule, UsersModule } from '@modules';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerService, SchedulerService } from './globals/services';

const GLOBAL_MODULES = [
  ConfigModule.forRoot({ isGlobal: true }),
  PrismaModule,
  ScheduleModule.forRoot(),
];
const DOMAIN_MODULES = [UsersModule, HostsModule];

const GLOBAL_SERVICES = [SchedulerService, MailerService];

@Module({
  imports: [...GLOBAL_MODULES, ...DOMAIN_MODULES],
  controllers: [AppController],
  providers: [...GLOBAL_SERVICES, AppService, UsersService],
})
export class AppModule {}
