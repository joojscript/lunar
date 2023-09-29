import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScansService {
  constructor(private readonly prismaService: PrismaService) {}

  getLatestScans(userId: string) {
    if (!userId) {
      throw new ForbiddenException('User not found');
    }

    return this.prismaService.scan.findMany({
      where: {
        host: {
          ownerId: userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }
}
