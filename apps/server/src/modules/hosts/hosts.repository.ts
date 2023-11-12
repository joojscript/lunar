import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Host, Prisma } from '@prisma/client';

@Injectable()
export class HostsRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(
    hostWhereUniqueInput: Prisma.HostWhereUniqueInput,
  ): Promise<Host | null> {
    return this.prisma.host.findUnique({
      where: hostWhereUniqueInput,
    });
  }

  async findMany(params: Prisma.HostFindManyArgs): Promise<Host[]> {
    return this.prisma.host.findMany(params);
  }

  async create(data: Prisma.HostCreateInput): Promise<Host> {
    return this.prisma.host.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.HostWhereUniqueInput;
    data: Prisma.HostUpdateInput;
  }): Promise<Host> {
    const { where, data } = params;
    return this.prisma.host.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.HostWhereUniqueInput): Promise<Host> {
    return this.prisma.host.delete({
      where,
    });
  }
}
