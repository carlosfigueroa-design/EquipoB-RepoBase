import request from 'supertest';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/app.config';

const mockAiResponses = [
  {
    id: 'ai-001',
    keywords: ['emitir', 'póliza', 'nueva', 'emisión'],
    question: '¿Cómo emitir una póliza?',
    answer: 'Para emitir una nueva póliza, utiliza la API de Emisión.',
    relatedApiId: 'api-001',
    curlExample: "curl -X POST https://api.example.com/v1/polizas/emitir",
  },
];

const mockApis = [
  {
    id: 'api-001',
    name: 'API de Emisión de Pólizas',
    category: 'Emisión',
    status: 'Publicada',
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

const validPayload = { userId: 'user-002', email: 'demo@segurosbolivar.com', role: 'Externo' };

function generateToken(payload = validPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
}

describe('AI Controller (integration)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /v1/api/ai/assistant', () => {
    it('should return 200 with matching response for valid JWT', async () => {
      mockRead
        .mockResolvedValueOnce(mockAiResponses)
        .mockResolvedValueOnce(mockApis);

      const token = generateToken();
      const res = await request(app)
        .post('/v1/api/ai/assistant')
        .set('Authorization', `Bearer ${token}`)
        .send({ message: 'Quiero emitir una póliza nueva' });

      expect(res.status).toBe(200);
      expect(res.body.answer).toContain('Emisión');
      expect(res.body.relatedApiId).toBe('api-001');
      expect(res.body.relatedApiName).toBe('API de Emisión de Pólizas');
      expect(res.body.curlExample).toBeDefined();
    });

    it('should return 401 without JWT', async () => {
      const res = await request(app)
        .post('/v1/api/ai/assistant')
        .send({ message: 'Quiero emitir una póliza' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Token de autenticación requerido');
    });
  });
});
