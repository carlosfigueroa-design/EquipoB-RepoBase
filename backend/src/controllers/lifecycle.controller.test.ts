import request from 'supertest';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/app.config';

const mockApis = [
  {
    id: 'api-001',
    name: 'API de Emisión de Pólizas',
    category: 'Emisión',
    description: 'Emisión de pólizas',
    descriptionSummary: 'Emisión',
    useCases: ['Emitir póliza'],
    status: 'Publicada',
    version: 'v1',
    contactTeam: { teamName: 'Core', email: 'core@test.com', area: 'Tech' },
    icon: 'fa-file',
    specFile: 'emision-polizas.json',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-01T14:30:00Z',
  },
];

const mockAuditLog = [
  {
    id: 'audit-001',
    apiId: 'api-001',
    userId: 'user-001',
    action: 'Cambio de estado: Borrador → Publicada',
    previousStatus: 'Borrador',
    newStatus: 'Publicada',
    timestamp: '2024-06-01T14:30:00Z',
  },
];

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

import { app } from '../app';

const adminPayload = { userId: 'user-001', email: 'admin@segurosbolivar.com', role: 'Admin' };
const externoPayload = { userId: 'user-002', email: 'demo@segurosbolivar.com', role: 'Externo' };

function generateToken(payload = adminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

describe('Lifecycle Controller (integration)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /v1/api/apis', () => {
    it('should return 200 with all APIs for Admin JWT', async () => {
      mockRead.mockResolvedValueOnce([...mockApis]);

      const token = generateToken(adminPayload);
      const res = await request(app)
        .get('/v1/api/apis')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].id).toBe('api-001');
    });

    it('should return 403 with non-Admin JWT', async () => {
      const token = generateToken(externoPayload);
      const res = await request(app)
        .get('/v1/api/apis')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(403);
      expect(res.body.message).toBe('Se requiere rol de Administrador');
    });
  });

  describe('POST /v1/api/apis', () => {
    it('should create API with 201 for Admin JWT', async () => {
      mockRead.mockResolvedValueOnce([...mockApis]);
      mockWrite.mockResolvedValueOnce(undefined);

      const token = generateToken(adminPayload);
      const newApiData = {
        name: 'API de Pagos',
        category: 'Pagos',
        description: 'API para gestión de pagos',
        descriptionSummary: 'Gestión de pagos',
        useCases: ['Procesar pago'],
        contactTeam: { teamName: 'Pagos', email: 'pagos@test.com', area: 'Finanzas' },
        icon: 'fa-credit-card',
      };

      const res = await request(app)
        .post('/v1/api/apis')
        .set('Authorization', `Bearer ${token}`)
        .send(newApiData);

      expect(res.status).toBe(201);
      expect(res.body.name).toBe('API de Pagos');
      expect(res.body.status).toBe('Borrador');
      expect(res.body.id).toBeDefined();
    });
  });

  describe('PATCH /v1/api/apis/:id/status', () => {
    it('should change status with 200 for Admin JWT', async () => {
      // changeStatus reads apis.json, writes apis.json, reads audit-log.json, writes audit-log.json
      mockRead
        .mockResolvedValueOnce([
          { ...mockApis[0], status: 'Publicada' },
        ])
        .mockResolvedValueOnce([]);
      mockWrite.mockResolvedValue(undefined);

      const token = generateToken(adminPayload);
      const res = await request(app)
        .patch('/v1/api/apis/api-001/status')
        .set('Authorization', `Bearer ${token}`)
        .send({ newStatus: 'Deprecada' });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('Deprecada');
    });
  });

  describe('GET /v1/api/apis/:id/audit', () => {
    it('should return audit log with 200 for Admin JWT', async () => {
      mockRead.mockResolvedValueOnce([...mockAuditLog]);

      const token = generateToken(adminPayload);
      const res = await request(app)
        .get('/v1/api/apis/api-001/audit')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].apiId).toBe('api-001');
    });
  });
});
