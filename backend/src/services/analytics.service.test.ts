import { AnalyticsService } from './analytics.service';
import { JsonStoreService } from './json-store.service';

jest.mock('./json-store.service');

const mockData = {
  visits: [
    { date: '2026-04-16', count: 221, uniqueUsers: 145 },
    { date: '2026-04-17', count: 198, uniqueUsers: 127 },
  ],
  devices: [
    { type: 'Desktop', percentage: 62.3, count: 856 },
    { type: 'Mobile', percentage: 28.1, count: 386 },
  ],
  engagement: {
    avgTimeOnSite: 245,
    pagesPerSession: 4.2,
    bounceRate: 32.5,
    returningUsers: 41.8,
  },
  business: {
    apiCallsTotal: 12847,
    apiCallsTrend: [{ date: '2026-04-17', count: 1974 }],
    topApis: [{ apiId: 'api-001', name: 'Cotización', calls: 3421, percentage: 26.6 }],
    sandboxAdoption: { totalExecutions: 4523, uniqueDevelopers: 67, avgExecutionsPerDev: 67.5 },
  },
  events: [],
};

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let store: jest.Mocked<JsonStoreService>;

  beforeEach(() => {
    store = new JsonStoreService() as jest.Mocked<JsonStoreService>;
    store.read = jest.fn().mockResolvedValue(JSON.parse(JSON.stringify(mockData)));
    store.write = jest.fn().mockResolvedValue(undefined);
    service = new AnalyticsService(store);
  });

  describe('getDashboard', () => {
    it('should return aggregated dashboard data', async () => {
      const result = await service.getDashboard();

      expect(result.usage.totalVisits).toBe(419);
      expect(result.usage.totalUniqueUsers).toBe(272);
      expect(result.usage.visitsTrend).toHaveLength(2);
      expect(result.usage.devices).toHaveLength(2);
      expect(result.engagement.avgTimeOnSite).toBe(245);
      expect(result.business.apiCallsTotal).toBe(12847);
    });

    it('should read from analytics.json', async () => {
      await service.getDashboard();
      expect(store.read).toHaveBeenCalledWith('analytics.json');
    });
  });

  describe('trackEvent', () => {
    it('should create event with id and timestamp', async () => {
      const event = await service.trackEvent({
        type: 'page_view',
        page: '/catalog',
        device: 'Desktop',
      });

      expect(event.id).toMatch(/^evt-/);
      expect(event.timestamp).toBeDefined();
      expect(event.type).toBe('page_view');
      expect(event.page).toBe('/catalog');
    });

    it('should persist event to analytics.json', async () => {
      await service.trackEvent({
        type: 'page_view',
        page: '/catalog',
        device: 'Desktop',
      });

      expect(store.write).toHaveBeenCalledWith(
        'analytics.json',
        expect.objectContaining({
          events: expect.arrayContaining([
            expect.objectContaining({ type: 'page_view' }),
          ]),
        })
      );
    });
  });
});
