import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
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

  @Post('verify-host-request')
  async handleVerifyHostRequest(
    verifyHostRequestInput: VerifyHostRequestInput,
  ) {
    return this.hostsService.verifyHostRequest(verifyHostRequestInput);
  }

  @Post('verify-host/:uuid')
  async handleVerifyHost(
    @Headers('host') hostname: string,
    @Param('uuid') uuid: string,
  ) {
    const verifyHostInput: VerifyHostInput = {
      hostname,
      uuid,
    };

    return this.hostsService.verifyHost(verifyHostInput);
  }

  @Post()
  create(@Body() createHostDto: CreateHostInput) {
    const formattedPayload: Prisma.HostCreateInput = {
      ...createHostDto,
      owner: {
        connect: {
          id: createHostDto.owner,
        },
      },
    };

    return this.hostsService.createHost(formattedPayload);
  }

  @Get()
  findAll() {
    return this.hostsService.findMany({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHostDto: UpdateHostInput) {
    const formattedPayload: Prisma.HostUpdateInput = {
      ...updateHostDto,
      owner: {
        connect: {
          id: updateHostDto.owner,
        },
      },
    };

    return this.hostsService.updateHost({
      where: { id },
      data: formattedPayload,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostsService.deleteHost({ id });
  }
}
