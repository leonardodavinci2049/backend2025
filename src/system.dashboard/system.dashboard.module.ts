import { Module } from '@nestjs/common';
import { SystemDashboardService } from './system.dashboard.service';
import { SystemDashboardController } from './system.dashboard.controller';

@Module({
  controllers: [SystemDashboardController],
  providers: [SystemDashboardService],
  exports: [SystemDashboardService],
})
export class SystemDashboardModule {}
