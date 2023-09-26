import { HostsModule, PrismaModule, UsersModule } from '@modules';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const GLOBAL_MODULES = [PrismaModule, ScheduleModule.forRoot()];
const DOMAIN_MODULES = [UsersModule, HostsModule];

@Module({
  imports: [...GLOBAL_MODULES, ...DOMAIN_MODULES],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
