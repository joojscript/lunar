import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { getClientIp } from 'request-ip';
import {
  CreateHostInput,
  UpdateHostInput,
  VerifyHostInput,
  VerifyHostRequestInput,
} from './hosts.dtos';
import { HostsService } from './hosts.service';

@Controller('hosts')
export class HostsController {
  constructor(private readonly hostsService: HostsService) {}

  @Post('verify_host_request')
  async handleVerifyHostRequest(
    @Body() verifyHostRequestInput: VerifyHostRequestInput,
  ) {
    return this.hostsService.verifyHostRequest(verifyHostRequestInput);
  }

  @Post('verify_host/:uuid')
  async handleVerifyHost(
    @Param('uuid') uuid: string,
    @Request() request: ExpressRequest,
  ) {
    const verifyHostInput: VerifyHostInput = {
      hostname: getClientIp(request),
      uuid,
    };

    return this.hostsService.verifyHost(verifyHostInput);
  }

  @Post()
  create(
    @Body() createHostDto: CreateHostInput,
    @Request() request: ExpressRequest,
  ) {
    console.log('oi');
    const formattedPayload: Prisma.HostCreateInput = {
      ...createHostDto,
      verifiedAt: new Date(), // TODO: remove this
      owner: {
        connect: {
          id: createHostDto.owner ?? request['userId'],
        },
      },
    };

    return this.hostsService.createHost(formattedPayload);
  }

  @Get()
  findAll(@Request() request: ExpressRequest) {
    return this.hostsService.findMany({
      where: {
        owner: {
          id: request['userId'],
        },
      },
      include: {
        scans: true,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostsService.findOne({ id });
  }

  @Get('top/:amount')
  findTopX(
    @Param('amount') amount: number,
    @Request() request: ExpressRequest,
  ) {
    return this.hostsService.findMany({
      take: Number(amount),
      where: {
        owner: {
          id: request['userId'],
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        scans: true,
      },
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHostDto: UpdateHostInput,
    @Request() request: ExpressRequest,
  ) {
    return this.hostsService.updateHost({
      where: { id, owner: { id: request['userId'] } },
      data: updateHostDto as any,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostsService.deleteHost({ id });
  }
}
