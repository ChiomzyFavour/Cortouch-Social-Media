import { db } from '../data/store';
import { AnalyticsData, SocialPlatform, PlatformStats } from '../types';

export class AnalyticsService {
  getAnalyticsForClient(clientId: string): AnalyticsData {
    const data = db.getAnalytics(clientId);
    return data as AnalyticsData;
  }

  getAllAnalytics(): Record<string, AnalyticsData> {
    return db.getAnalytics() as Record<string, AnalyticsData>;
  }

  getPlatformBreakdown(clientId: string): Partial<Record<SocialPlatform, PlatformStats>> {
    const data = this.getAnalyticsForClient(clientId);
    return data?.platforms || {};
  }

  getStrategicInsights(clientId: string) {
    const data = this.getAnalyticsForClient(clientId);
    return data?.strategicInsights || [];
  }

  getExecutiveSummary(clientId: string) {
    const data = this.getAnalyticsForClient(clientId);
    if (!data) return null;

    return {
      clientId: data.clientId,
      period: data.period,
      totalFollowers: data.totalFollowers,
      followersGrowthPct: data.followersGrowth,
      totalReach: data.totalReach,
      reachGrowthPct: data.reachGrowth,
      avgEngagementRate: data.avgEngagementRate,
      engagementGrowthPct: data.engagementGrowth,
      totalImpressions: data.totalImpressions,
      impressionsGrowthPct: data.impressionsGrowth,
      topInsightsCount: data.strategicInsights?.length || 0,
      platformsMonitored: Object.keys(data.platforms || {}),
    };
  }
}

export const analyticsService = new AnalyticsService();
