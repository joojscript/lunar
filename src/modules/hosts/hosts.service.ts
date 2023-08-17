import { Injectable } from '@nestjs/common';
import { Host, Prisma } from '@prisma/client';
import { HostsRepository } from './hosts.repository';

@Injectable()
export class HostsService {
  constructor(private readonly repository: HostsRepository) {}

  async findOne(
    hostWhereUniqueInput: Prisma.HostWhereUniqueInput,
  ): Promise<Host | null> {
    return this.repository.findOne(hostWhereUniqueInput);
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.HostWhereUniqueInput;
    where?: Prisma.HostWhereInput;
    orderBy?: Prisma.HostOrderByWithRelationInput;
  }): Promise<Host[]> {
    return this.repository.findMany(params);
  }

  async createHost(data: Prisma.HostCreateInput): Promise<Host> {
    return this.repository.create(data);
  }

  async updateHost(params: {
    where: Prisma.HostWhereUniqueInput;
    data: Prisma.HostUpdateInput;
  }): Promise<Host> {
    return this.repository.update(params);
  }

  async deleteHost(where: Prisma.HostWhereUniqueInput): Promise<Host> {
    return this.repository.delete(where);
  }
}
