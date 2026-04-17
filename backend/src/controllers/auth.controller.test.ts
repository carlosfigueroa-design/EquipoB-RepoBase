import request from 'supertest';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/app.config';

const seedUsers = [
  {
    id: 'user-001',
    email: 'admin@segurosbolivar.com',
    displayName: 'Administrador SIOP',
    role: 'Admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-002',
    email: 'demo@segurosbolivar.com',
    displayName: 'Usuario Demo',
    role: 'Externo',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

const mockRead = jest.fn();
const mockWrite = jest.fn().mockResolvedValue(undefined);

jest.mock('../services/json-store.service', () => ({
  JsonStoreService: jest.fn().mockImplementation(() => ({
    read: mockRead,
    write: mockWrite,
  })),
}));

// Import app AFTER mock is set up
import { app } from '../app';

describe('Auth Controller (integration)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRead.mockResolvedValue([...seedUsers.map((u) => ({ ...u }))]);
    mockWrite.mockResolvedValue(undefined);
  });

  describe('POST /v1/api/auth/otp/request', () => {
    it('should return 200 with success message', async () => {
      const res = await request(app)
        .post('/v1/api/auth/otp/request')
        .send({ email: 'test@example.com' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'OTP enviado' });
    });
  });

  describe('POST /v1/api/auth/otp/verify', () => {
    it('should return 200 with accessToken and user for correct OTP', async () => {
      const res = await request(app)
        .post('/v1/api/auth/otp/verify')
        .send({ email: 'demo@segurosbolivar.com', otp: '123456' });

      expect(res.status).toBe(200);
      expect(res.body.accessToken).toBeDefined();
      expect(res.body.user).toEqual(
        expect.objectContaining({
          email: 'demo@segurosbolivar.com',
          role: 'Externo',
        })
      );
    });

    it('should return 401 for wrong OTP', async () => {
      const res = await request(app)
        .post('/v1/api/auth/otp/verify')
        .send({ email: 'demo@segurosbolivar.com', otp: '999999' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Código inválido, intente nuevamente');
    });
  });

  describe('GET /v1/api/auth/me', () => {
    it('should return 200 with user profile for valid JWT', async () => {
      const payload = { userId: 'user-002', email: 'demo@segurosbolivar.com', role: 'Externo' };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

      const res = await request(app)
        .get('/v1/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(payload);
    });

    it('should return 401 without JWT', async () => {
      const res = await request(app).get('/v1/api/auth/me');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Token de autenticación requerido');
    });
  });
});
