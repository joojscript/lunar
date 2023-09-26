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

@Controller('hosts')
export class HostsController {
  constructor(private readonly hostsService: HostsService) {}

  @Post()
  create(@Body() createHostDto: Prisma.HostCreateInput) {
    return this.hostsService.createHost(createHostDto);
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