import { LifecycleService } from './lifecycle.service';
import { JsonStoreService } from './json-store.service';
import { ApiCatalogItem, AuditEntry } from '../types';

jest.mock('./json-store.service');
jest.mock('uuid', () => ({ v4: () => 'test-uuid-1234' }));

const makeApi = (overrides: Partial<ApiCatalogItem> = {}): ApiCatalogItem => ({
  id: 'api-001',
  name: 'API de Emisión',
  category: 'Emisión',
  description: 'Emisión de pólizas',
  descriptionSummary: 'Emisión',
  useCases: ['Emitir póliza'],
  status: 'Publicada',
  version: 'v1',
  contactTeam: { teamName: 'Core', email: 'core@test.com', area: 'Tech' },
  icon: 'fa-file',
  specFile: 'emision.json',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  ...overrides,
});

describe('LifecycleService', () => {
  let service: LifecycleService;
  let store: jest.Mocked<JsonStoreService>;

  beforeEach(() => {
    store = new JsonStoreService() as jest.Mocked<JsonStoreService>;
    store.read = jest.fn();
    store.write = jest.fn().mockResolvedValue(undefined);
    service = new LifecycleService(store);
  });

  describe('getAllApis', () => {
    it('should return all APIs including Borrador and Retirada', async () => {
      const allApis = [
        makeApi({ id: 'api-001', status: 'Publicada' }),
        makeApi({ id: 'api-002', status: 'Borrador' }),
        makeApi({ id: 'api-003', status: 'Deprecada' }),
        makeApi({ id: 'api-004', status: 'Retirada' }),
      ];
      store.read.mockResolvedValue(allApis);

      const result = await service.getAllApis();

      expect(result).toHaveLength(4);
      expect(result.map((a) => a.status)).toEqual([
        'Publicada',
        'Borrador',
        'Deprecada',
        'Retirada',
      ]);
    });
  });

  describe('createApi', () => {
    it('should create API with Borrador status', async () => {
      store.read.mockResolvedValue([]);

      const payload = {
        name: 'Nueva API',
        category: 'Pagos',
        description: 'API de pagos',
        descriptionSummary: 'Pagos',
        useCases: ['Procesar pago'],
        contactTeam: { teamName: 'Pagos', email: 'pagos@test.com', area: 'Tech' },
        icon: 'fa-credit-card',
      };

      const result = await service.createApi(payload, 'user-001');

      expect(result.status).toBe('Borrador');
      expect(result.name).toBe('Nueva API');
      expect(result.version).toBe('v1');
      expect(result.specFile).toBe('');
    });

    it('should generate a unique id for the new API', async () => {
      store.read.mockResolvedValue([]);

      const payload = {
        name: 'Test API',
        category: 'Test',
        description: 'Test',
        descriptionSummary: 'Test',
        useCases: [],
        contactTeam: { teamName: 'T', email: 't@t.com', area: 'T' },
        icon: 'fa-cog',
      };

      const result = await service.createApi(payload, 'user-001');

      expect(result.id).toBe('test-uuid-1234');
    });

    it('should persist the new API to apis.json', async () => {
      const existing = [makeApi({ id: 'api-001' })];
      store.read.mockResolvedValue(existing);

      const payload = {
        name: 'API Nueva',
        category: 'Cat',
        description: 'Desc',
        descriptionSummary: 'Sum',
        useCases: ['UC1'],
        contactTeam: { teamName: 'T', email: 't@t.com', area: 'A' },
        icon: 'fa-star',
      };

      await service.createApi(payload, 'user-001');

      expect(store.write).toHaveBeenCalledWith(
        'apis.json',
        expect.arrayContaining([
          expect.objectContaining({ id: 'api-001' }),
          expect.objectContaining({ id: 'test-uuid-1234', name: 'API Nueva' }),
        ])
      );
    });
  });

  describe('changeStatus', () => {
    it('should allow Borrador → Publicada', async () => {
      const apis = [makeApi({ id: 'api-010', status: 'Borrador' })];
      store.read
        .mockResolvedValueOnce(apis) // read apis.json
        .mockResolvedValueOnce([]); // read audit-log.json

      const result = await service.changeStatus('api-010', 'Publicada', 'user-001');

      expect(result.status).toBe('Publicada');
    });

    it('should allow Publicada → Deprecada', async () => {
      const apis = [makeApi({ id: 'api-010', status: 'Publicada' })];
      store.read
        .mockResolvedValueOnce(apis)
        .mockResolvedValueOnce([]);

      const result = await service.changeStatus('api-010', 'Deprecada', 'user-001');

      expect(result.status).toBe('Deprecada');
    });

    it('should allow Deprecada → Retirada', async () => {
      const apis = [makeApi({ id: 'api-010', status: 'Deprecada' })];
      store.read
        .mockResolvedValueOnce(apis)
        .mockResolvedValueOnce([]);

      const result = await service.changeStatus('api-010', 'Retirada', 'user-001');

      expect(result.status).toBe('Retirada');
    });

    it('should allow Deprecada → Publicada', async () => {
      const apis = [makeApi({ id: 'api-010', status: 'Deprecada' })];
      store.read
        .mockResolvedValueOnce(apis)
        .mockResolvedValueOnce([]);

      const result = await service.changeStatus('api-010', 'Publicada', 'user-001');

      expect(result.status).toBe('Publicada');
    });

    it('should reject Borrador → Deprecada with 400', async () => {
      const apis = [makeApi({ id: 'api-010', status: 'Borrador' })];
      store.read.mockResolvedValueOnce(apis);

      await expect(
        service.changeStatus('api-010', 'Deprecada', 'user-001')
      ).rejects.toMatchObject({
        message: 'Transición no permitida de Borrador a Deprecada',
        statusCode: 400,
      });
    });

    it('should reject Publicada → Borrador with 400', async () => {
      const apis = [makeApi({ id: 'api-010', status: 'Publicada' })];
      store.read.mockResolvedValueOnce(apis);

      await expect(
        service.changeStatus('api-010', 'Borrador', 'user-001')
      ).rejects.toMatchObject({
        message: 'Transición no permitida de Publicada a Borrador',
        statusCode: 400,
      });
    });

    it('should reject Retirada → Publicada with 400', async () => {
      const apis = [makeApi({ id: 'api-010', status: 'Retirada' })];
      store.read.mockResolvedValueOnce(apis);

      await expect(
        service.changeStatus('api-010', 'Publicada', 'user-001')
      ).rejects.toMatchObject({
        message: 'Transición no permitida de Retirada a Publicada',
        statusCode: 400,
      });
    });

    it('should write audit entry on successful transition', async () => {
      const apis = [makeApi({ id: 'api-010', status: 'Borrador' })];
      store.read
        .mockResolvedValueOnce(apis)
        .mockResolvedValueOnce([]); // empty audit log

      await service.changeStatus('api-010', 'Publicada', 'user-admin');

      expect(store.write).toHaveBeenCalledWith(
        'audit-log.json',
        expect.arrayContaining([
          expect.objectContaining({
            id: 'test-uuid-1234',
            apiId: 'api-010',
            userId: 'user-admin',
            previousStatus: 'Borrador',
            newStatus: 'Publicada',
          }),
        ])
      );
    });

    it('should throw 404 for non-existent API', async () => {
      store.read.mockResolvedValueOnce([]);

      await expect(
        service.changeStatus('api-999', 'Publicada', 'user-001')
      ).rejects.toMatchObject({
        message: 'API no encontrada',
        statusCode: 404,
      });
    });

    it('should update apis.json with new status', async () => {
      const apis = [makeApi({ id: 'api-010', status: 'Borrador' })];
      store.read
        .mockResolvedValueOnce(apis)
        .mockResolvedValueOnce([]);

      await service.changeStatus('api-010', 'Publicada', 'user-001');

      expect(store.write).toHaveBeenCalledWith(
        'apis.json',
        expect.arrayContaining([
          expect.objectContaining({ id: 'api-010', status: 'Publicada' }),
        ])
      );
    });
  });

  describe('getAuditLog', () => {
    it('should filter audit entries by apiId', async () => {
      const auditLog: AuditEntry[] = [
        {
          id: 'audit-1',
          apiId: 'api-001',
          userId: 'user-001',
          action: 'Cambio de estado',
          previousStatus: 'Borrador',
          newStatus: 'Publicada',
          timestamp: '2024-01-01T00:00:00Z',
        },
        {
          id: 'audit-2',
          apiId: 'api-002',
          userId: 'user-001',
          action: 'Cambio de estado',
          previousStatus: 'Publicada',
          newStatus: 'Deprecada',
          timestamp: '2024-01-02T00:00:00Z',
        },
        {
          id: 'audit-3',
          apiId: 'api-001',
          userId: 'user-001',
          action: 'Cambio de estado',
          previousStatus: 'Publicada',
          newStatus: 'Deprecada',
          timestamp: '2024-01-03T00:00:00Z',
        },
      ];
      store.read.mockResolvedValue(auditLog);

      const result = await service.getAuditLog('api-001');

      expect(result).toHaveLength(2);
      expect(result.every((e) => e.apiId === 'api-001')).toBe(true);
    });

    it('should return empty array when no entries match', async () => {
      store.read.mockResolvedValue([]);

      const result = await service.getAuditLog('api-999');

      expect(result).toEqual([]);
    });
  });
});
