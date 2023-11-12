import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';
import { HostsModule, PrismaModule, UsersModule } from '@modules';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalServicesModule } from './globals/services/global-services.module';
import { AuthModule } from './modules/auth/auth.module';
import { ScansModule } from './modules/scans/scans.module';

const GLOBAL_MODULES = [
  ConfigModule.forRoot({ isGlobal: true }),
  EventEmitterModule.forRoot(),
  BullBoardModule.forRoot({
    route: '/queues',
    adapter: ExpressAdapter,
  }),
  GlobalServicesModule,
  PrismaModule,
];
const DOMAIN_MODULES = [UsersModule, HostsModule, AuthModule, ScansModule];

@Module({
  imports: [...GLOBAL_MODULES, ...DOMAIN_MODULES],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
