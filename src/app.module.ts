import { HostsModule, PrismaModule, UsersModule } from '@modules';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, UsersModule, HostsModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
