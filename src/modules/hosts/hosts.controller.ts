import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HostsService } from './hosts.service';
import { CreateHostInput } from './hots.dtos';

@Controller('hosts')
export class HostsController {
  constructor(private readonly hostsService: HostsService) {}

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
  update(
    @Param('id') id: string,
    @Body() updateHostDto: Prisma.HostUpdateInput,
  ) {
    return this.hostsService.updateHost({ where: { id }, data: updateHostDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostsService.deleteHost({ id });
  }
}
