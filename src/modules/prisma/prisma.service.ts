import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params: any, next) => {
      if (params.action == 'create' && params.model == 'User') {
        const user = params.args.data;
        const hashedPassword = await hash(user.password, 10);
        user.password = hashedPassword;
        params.args.data = user;
      }
      return await next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
