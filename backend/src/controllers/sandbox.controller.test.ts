import request from 'supertest';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/app.config';

const mockSandboxResponse = {
  statusCode: 200,
  headers: { 'Content-Type': 'application/json', 'X-Request-Id': 'mock-req-001' },
  body: { success: true, data: { polizaId: 'POL-2024-001234' } },
};

const mockRead = jest.fn();
const mockWrite = jest.fn().mockResolvedValue(undefined);
const mockReadSpec = jest.fn();
const mockReadSandboxResponse = jest.fn();

jest.mock('../services/json-store.service', () => ({
  JsonStoreService: jest.fn().mockImplementation(() => ({
    read: mockRead,
    write: mockWrite,
    readSpec: mockReadSpec,
    readSandboxResponse: mockReadSandboxResponse,
  })),
}));

// Import app AFTER mock is set up
import { app } from '../app';

const validPayload = { userId: 'user-002', email: 'demo@segurosbolivar.com', role: 'Externo' };

function generateToken(): string {
  return jwt.sign(validPayload, JWT_SECRET, { expiresIn: '1h' });
}

describe('Sandbox Controller (integration)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockReadSandboxResponse.mockResolvedValue({ ...mockSandboxResponse });
  });

  describe('POST /v1/api/sandbox/execute', () => {
    it('should return 200 with mock response for valid JWT', async () => {
      const token = generateToken();

      const res = await request(app)
        .post('/v1/api/sandbox/execute')
        .set('Authorization', `Bearer ${token}`)
        .send({
          apiId: 'emision-polizas',
          endpoint: '/polizas/emitir',
          method: 'POST',
          scenario: '200',
        });

      expect(res.status).toBe(200);
      expect(res.body.statusCode).toBe(200);
      expect(res.body.body).toEqual(mockSandboxResponse.body);
      expect(res.body.responseTimeMs).toBeGreaterThanOrEqual(50);
      expect(res.body.responseTimeMs).toBeLessThanOrEqual(500);
      expect(res.body.correlationId).toBeDefined();
    });

    it('should return 401 without JWT', async () => {
      const res = await request(app)
        .post('/v1/api/sandbox/execute')
        .send({
          apiId: 'emision-polizas',
          endpoint: '/polizas/emitir',
          method: 'POST',
        });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Token de autenticación requerido');
    });
  });

  describe('GET /v1/api/sandbox/history', () => {
    it('should return 200 with empty array for user with no executions', async () => {
      const freshUserToken = jwt.sign(
        { userId: 'user-fresh', email: 'fresh@test.com', role: 'Externo' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const res = await request(app)
        .get('/v1/api/sandbox/history')
        .set('Authorization', `Bearer ${freshUserToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    });

    it('should return 401 without JWT', async () => {
      const res = await request(app).get('/v1/api/sandbox/history');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Token de autenticación requerido');
    });
  });
});
