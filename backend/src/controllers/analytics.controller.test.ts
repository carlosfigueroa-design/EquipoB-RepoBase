import request from 'supertest';
import express from 'express';
import analyticsRoutes from '../routes/v1/analytics.routes';

const app = express();
app.use(express.json());
app.use('/v1/api/analytics', analyticsRoutes);

// Mock the json-store to avoid file system access
jest.mock('../services/json-store.service', () => {
  const mockData = {
    visits: [{ date: '2026-04-17', count: 198, uniqueUsers: 127 }],
    devices: [{ type: 'Desktop', percentage: 62.3, count: 856 }],
    engagement: { avgTimeOnSite: 245, pagesPerSession: 4.2, bounceRate: 32.5, returningUsers: 41.8 },
    business: {
      apiCallsTotal: 12847,
      apiCallsTrend: [{ date: '2026-04-17', count: 1974 }],
      topApis: [{ apiId: 'api-001', name: 'Cotización', calls: 3421, percentage: 26.6 }],
      sandboxAdoption: { totalExecutions: 4523, uniqueDevelopers: 67, avgExecutionsPerDev: 67.5 },
    },
    events: [],
  };

  return {
    JsonStoreService: jest.fn().mockImplementation(() => ({
      read: jest.fn().mockResolvedValue(JSON.parse(JSON.stringify(mockData))),
      write: jest.fn().mockResolvedValue(undefined),
    })),
  };
});

describe('Analytics Controller', () => {
  describe('GET /v1/api/analytics/dashboard', () => {
    it('should return 200 with dashboard data', async () => {
      const res = await request(app).get('/v1/api/analytics/dashboard');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('usage');
      expect(res.body).toHaveProperty('engagement');
      expect(res.body).toHaveProperty('business');
      expect(res.body.usage).toHaveProperty('totalVisits');
      expect(res.body.usage).toHaveProperty('devices');
    });
  });

  describe('POST /v1/api/analytics/events', () => {
    it('should return 201 when tracking a valid event', async () => {
      const res = await request(app)
        .post('/v1/api/analytics/events')
        .send({ type: 'page_view', page: '/catalog', device: 'Desktop' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('timestamp');
    });

    it('should return 400 when missing required fields', async () => {
      const res = await request(app)
        .post('/v1/api/analytics/events')
        .send({ type: 'page_view' });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
