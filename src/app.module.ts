import { HostsModule, PrismaModule, UsersModule } from '@modules';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalServicesModule } from './globals/services/global-services.module';
import { AuthModule } from './modules/auth/auth.module';

const GLOBAL_MODULES = [
  ConfigModule.forRoot({ isGlobal: true }),
  GlobalServicesModule,
  PrismaModule,
  ScheduleModule.forRoot(),
];
const DOMAIN_MODULES = [UsersModule, HostsModule, AuthModule];

@Module({
  imports: [...GLOBAL_MODULES, ...DOMAIN_MODULES],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
