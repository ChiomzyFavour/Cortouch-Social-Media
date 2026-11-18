import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { DataStoreService } from '../../common/data-store.service.js'; // 👈 Added .js
import { AnalyticsData } from '../../types/index.js'; // 👈 Added .js (or ../../types.js)

@Injectable()
export class AnalyticsService {
  constructor(@Inject(DataStoreService) private readonly dataStore: DataStoreService) {}

  getAnalytics(clientId?: string): AnalyticsData | Record<string, AnalyticsData> {
    const data = this.dataStore.getAnalytics(clientId);
    if (!data) {
      throw new NotFoundException(`Analytics data for client "${clientId}" was not found`);
    }
    return data;
  }

  getOverview() {
    const defaultData = this.dataStore.getAnalytics('client-1') as AnalyticsData;
    return {
      totalAudience: defaultData.totalFollowers,
      audienceGrowth: defaultData.followersGrowth,
      totalReach: defaultData.totalReach,
      reachGrowth: defaultData.reachGrowth,
      averageEngagement: defaultData.avgEngagementRate,
      engagementGrowth: defaultData.engagementGrowth,
      totalImpressions: defaultData.totalImpressions,
      impressionsGrowth: defaultData.impressionsGrowth,
      topInsights: defaultData.strategicInsights,
    };
  }
}