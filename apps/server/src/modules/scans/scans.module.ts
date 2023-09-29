import { Module } from '@nestjs/common';
import { ScansController } from './scans.controller';
import { ScansService } from './scans.service';

@Module({
  exports: [ScansService],
  providers: [ScansService],
  controllers: [ScansController],
})
export class ScansModule {}
