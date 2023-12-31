import { Controller, Get, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ScansService } from './scans.service';

@Controller('scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Get('latest')
  async getLatestScan(@Request() request: ExpressRequest) {
    return await this.scansService.getLatestScans(request['userId']);
  }
}
