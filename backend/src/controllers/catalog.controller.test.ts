import request from 'supertest';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/app.config';

const seedApis = [
  {
    id: 'api-001',
    name: 'API de Emisión de Pólizas',
    category: 'Emisión',
    description: 'API para la emisión y generación de nuevas pólizas de seguros',
    descriptionSummary: 'Emisión y generación de pólizas',
    useCases: ['Emitir póliza nueva'],
    status: 'Publicada',
    version: 'v1',
    contactTeam: { teamName: 'Core Seguros', email: 'core@test.com', area: 'Tech' },
    icon: 'fa-file-contract',
    specFile: 'emision-polizas.json',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-01T14:30:00Z',
  },
  {
    id: 'api-002',
    name: 'API de Consulta de Siniestros',
    category: 'Siniestros',
    description: 'API para consultar el estado de siniestros reportados',
    descriptionSummary: 'Consulta de siniestros',
    useCases: ['Consultar siniestro'],
    status: 'Deprecada',
    version: 'v1',
    contactTeam: { teamName: 'Siniestros', email: 'siniestros@test.com', area: 'Tech' },
    icon: 'fa-search',
    specFile: 'consulta-siniestros.json',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-05-01T10:00:00Z',
  },
  {
    id: 'api-003',
    name: 'API Interna Borrador',
    category: 'Interno',
    description: 'API en estado borrador no visible',
    descriptionSummary: 'Borrador interno',
    useCases: [],
    status: 'Borrador',
    version: 'v1',
    contactTeam: { teamName: 'Dev', email: 'dev@test.com', area: 'Tech' },
    icon: 'fa-cog',
    specFile: 'borrador.json',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
  },
];

const mockSpec = {
  openapi: '3.0.3',
  info: { title: 'API de Emisión de Pólizas', version: '1.0.0' },
};

const mockRead = jest.fn();
const mockWrite = jest.fn().mockResolvedValue(undefined);
const mockReadSpec = jest.fn();

jest.mock('../services/json-store.service', () => ({
  JsonStoreService: jest.fn().mockImplementation(() => ({
    read: mockRead,
    write: mockWrite,
    readSpec: mockReadSpec,
  })),
}));

// Import app AFTER mock is set up
import { app } from '../app';

describe('Catalog Controller (integration)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRead.mockResolvedValue([...seedApis.map((a) => ({ ...a }))]);
    mockReadSpec.mockResolvedValue({ ...mockSpec });
  });

  describe('GET /v1/api/catalog', () => {
    it('should return 200 with array of public APIs (Publicada + Deprecada)', async () => {
      const res = await request(app).get('/v1/api/catalog');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);
      const statuses = res.body.map((a: { status: string }) => a.status);
      expect(statuses).toContain('Publicada');
      expect(statuses).toContain('Deprecada');
      expect(statuses).not.toContain('Borrador');
    });
  });

  describe('GET /v1/api/catalog/search?q=', () => {
    it('should return matching APIs for search query "emisión"', async () => {
      const res = await request(app).get('/v1/api/catalog/search?q=emisión');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      expect(res.body[0].name).toContain('Emisión');
    });

    it('should return empty array for non-matching query', async () => {
      const res = await request(app).get('/v1/api/catalog/search?q=xyz-no-match');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });

  describe('GET /v1/api/catalog/:id', () => {
    it('should return 200 for a valid public API', async () => {
      const res = await request(app).get('/v1/api/catalog/api-001');

      expect(res.status).toBe(200);
      expect(res.body.id).toBe('api-001');
      expect(res.body.name).toBe('API de Emisión de Pólizas');
    });

    it('should return 404 for non-existent API', async () => {
      const res = await request(app).get('/v1/api/catalog/api-999');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('API no encontrada');
    });

    it('should return 404 for API in Borrador status', async () => {
      const res = await request(app).get('/v1/api/catalog/api-003');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('API no encontrada');
    });
  });

  describe('GET /v1/api/catalog/:id/spec', () => {
    it('should return 401 without JWT', async () => {
      const res = await request(app).get('/v1/api/catalog/api-001/spec');

      expect(res.status).toBe(401);
    });

    it('should return 200 with spec for valid JWT', async () => {
      const token = jwt.sign(
        { userId: 'user-002', email: 'demo@segurosbolivar.com', role: 'Externo' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const res = await request(app)
        .get('/v1/api/catalog/api-001/spec')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.openapi).toBe('3.0.3');
    });

    it('should return 404 for non-existent API spec with valid JWT', async () => {
      mockRead.mockResolvedValue([...seedApis.map((a) => ({ ...a }))]);
      const token = jwt.sign(
        { userId: 'user-002', email: 'demo@segurosbolivar.com', role: 'Externo' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const res = await request(app)
        .get('/v1/api/catalog/api-999/spec')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Spec no encontrada');
    });
  });
});
