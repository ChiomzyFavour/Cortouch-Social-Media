import { Controller, Get, Query, Inject } from '@nestjs/common';
import { AnalyticsService } from './analytics.service.js'; // 👈 Added .js

@Controller('analytics')
export class AnalyticsController {
  constructor(@Inject(AnalyticsService) private readonly analyticsService: AnalyticsService) {}

  @Get()
  getAnalytics(@Query('clientId') clientId?: string) {
    const data = this.analyticsService.getAnalytics(clientId);
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('overview')
  getOverview() {
    const overview = this.analyticsService.getOverview();
    return {
      success: true,
      data: overview,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':clientId/summary')
  getClientSummary() {
    const overview = this.analyticsService.getOverview();
    return {
      success: true,
      data: overview,
      timestamp: new Date().toISOString(),
    };
  }
}