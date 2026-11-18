import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller.js';
import { AnalyticsService } from './analytics.service.js';
import { CommonModule } from '../../common/common.module.js'; // 👈 Added import

@Module({
  imports: [CommonModule], // 👈 Added to imports array
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}