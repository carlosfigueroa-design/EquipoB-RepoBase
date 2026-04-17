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
