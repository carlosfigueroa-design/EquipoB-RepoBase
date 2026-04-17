import { JsonStoreService } from './json-store.service';

export interface VisitEntry {
  date: string;
  count: number;
  uniqueUsers: number;
}

export interface DeviceEntry {
  type: string;
  percentage: number;
  count: number;
}

export interface EngagementMetrics {
  avgTimeOnSite: number;
  pagesPerSession: number;
  bounceRate: number;
  returningUsers: number;
}

export interface TopApiEntry {
  apiId: string;
  name: string;
  calls: number;
  percentage: number;
}

export interface BusinessMetrics {
  apiCallsTotal: number;
  apiCallsTrend: { date: string; count: number }[];
  topApis: TopApiEntry[];
  sandboxAdoption: {
    totalExecutions: number;
    uniqueDevelopers: number;
    avgExecutionsPerDev: number;
  };
}

export interface AnalyticsEvent {
  id: string;
  type: string;
  page: string;
  userId?: string;
  device: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsData {
  visits: VisitEntry[];
  devices: DeviceEntry[];
  engagement: EngagementMetrics;
  business: BusinessMetrics;
  events: AnalyticsEvent[];
}

export interface AnalyticsDashboard {
  usage: {
    totalVisits: number;
    totalUniqueUsers: number;
    visitsTrend: VisitEntry[];
    devices: DeviceEntry[];
  };
  engagement: EngagementMetrics;
  business: BusinessMetrics;
}

export class AnalyticsService {
  constructor(private store: JsonStoreService) {}

  async getDashboard(): Promise<AnalyticsDashboard> {
    const data = await this.store.read<AnalyticsData>('analytics.json');

    const totalVisits = data.visits.reduce((sum, v) => sum + v.count, 0);
    const totalUniqueUsers = data.visits.reduce((sum, v) => sum + v.uniqueUsers, 0);

    return {
      usage: {
        totalVisits,
        totalUniqueUsers,
        visitsTrend: data.visits,
        devices: data.devices,
      },
      engagement: data.engagement,
      business: data.business,
    };
  }

  async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<AnalyticsEvent> {
    const data = await this.store.read<AnalyticsData>('analytics.json');

    const newEvent: AnalyticsEvent = {
      ...event,
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
    };

    data.events.push(newEvent);
    await this.store.write('analytics.json', data);

    return newEvent;
  }
}
