import jwt from 'jsonwebtoken';
import { AuthService, UserProfile } from './auth.service';
import { JsonStoreService } from './json-store.service';
import { JWT_SECRET } from '../config/app.config';

// Mock JsonStoreService
jest.mock('./json-store.service');

describe('AuthService', () => {
  let service: AuthService;
  let mockStore: jest.Mocked<JsonStoreService>;

  const adminUser = {
    id: 'user-001',
    email: 'admin@segurosbolivar.com',
    displayName: 'Administrador SIOP',
    role: 'Admin' as const,
    createdAt: '2024-01-01T00:00:00Z',
  };

  const demoUser = {
    id: 'user-002',
    email: 'demo@segurosbolivar.com',
    displayName: 'Usuario Demo',
    role: 'Externo' as const,
    createdAt: '2024-01-01T00:00:00Z',
  };

  const seedUsers = [adminUser, demoUser];

  beforeEach(() => {
    mockStore = new JsonStoreService() as jest.Mocked<JsonStoreService>;
    mockStore.read = jest.fn();
    mockStore.write = jest.fn().mockResolvedValue(undefined);
    service = new AuthService(mockStore);
  });

  describe('requestOtp', () => {
    it('should always return success message', async () => {
      const result = await service.requestOtp('test@example.com');
      expect(result).toEqual({ message: 'OTP enviado' });
    });

    it('should return success for any email', async () => {
      const result = await service.requestOtp('anyone@anywhere.com');
      expect(result).toEqual({ message: 'OTP enviado' });
    });
  });

  describe('verifyOtp', () => {
    it('should return JWT and user for existing user with correct OTP', async () => {
      mockStore.read.mockResolvedValue([...seedUsers]);

      const result = await service.verifyOtp('demo@segurosbolivar.com', '123456');

      expect(result.accessToken).toBeDefined();
      expect(result.user).toEqual<UserProfile>({
        id: 'user-002',
        email: 'demo@segurosbolivar.com',
        role: 'Externo',
        displayName: 'Usuario Demo',
      });
    });

    it('should create new user with role Externo for unknown email', async () => {
      mockStore.read.mockResolvedValue([...seedUsers]);

      const result = await service.verifyOtp('nuevo@test.com', '123456');

      expect(result.user.email).toBe('nuevo@test.com');
      expect(result.user.role).toBe('Externo');
      expect(result.user.displayName).toBe('nuevo');
      expect(result.user.id).toBeDefined();
      expect(result.accessToken).toBeDefined();

      // Verify user was persisted
      expect(mockStore.write).toHaveBeenCalledWith(
        'users.json',
        expect.arrayContaining([
          expect.objectContaining({ email: 'nuevo@test.com', role: 'Externo' }),
        ])
      );
    });

    it('should return Admin role for admin@segurosbolivar.com', async () => {
      mockStore.read.mockResolvedValue([...seedUsers]);

      const result = await service.verifyOtp('admin@segurosbolivar.com', '123456');

      expect(result.user.role).toBe('Admin');
      expect(result.user.email).toBe('admin@segurosbolivar.com');
      expect(result.user.displayName).toBe('Administrador SIOP');
    });

    it('should throw 401 error for wrong OTP', async () => {
      try {
        await service.verifyOtp('test@example.com', '999999');
        fail('Should have thrown an error');
      } catch (err: unknown) {
        const error = err as Error & { statusCode?: number };
        expect(error.message).toBe('Código inválido, intente nuevamente');
        expect(error.statusCode).toBe(401);
      }
    });

    it('should not read users.json when OTP is wrong', async () => {
      try {
        await service.verifyOtp('test@example.com', '000000');
      } catch {
        // expected
      }
      expect(mockStore.read).not.toHaveBeenCalled();
    });

    it('should generate JWT with correct payload (userId, email, role)', async () => {
      mockStore.read.mockResolvedValue([...seedUsers]);

      const result = await service.verifyOtp('demo@segurosbolivar.com', '123456');
      const decoded = jwt.verify(result.accessToken, JWT_SECRET) as Record<string, unknown>;

      expect(decoded.userId).toBe('user-002');
      expect(decoded.email).toBe('demo@segurosbolivar.com');
      expect(decoded.role).toBe('Externo');
      expect(decoded.exp).toBeDefined();
    });

    it('should generate JWT with Admin role for admin user', async () => {
      mockStore.read.mockResolvedValue([...seedUsers]);

      const result = await service.verifyOtp('admin@segurosbolivar.com', '123456');
      const decoded = jwt.verify(result.accessToken, JWT_SECRET) as Record<string, unknown>;

      expect(decoded.userId).toBe('user-001');
      expect(decoded.email).toBe('admin@segurosbolivar.com');
      expect(decoded.role).toBe('Admin');
    });
  });
});
