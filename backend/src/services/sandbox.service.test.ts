import { SandboxService } from './sandbox.service';
import { JsonStoreService } from './json-store.service';
import { SandboxRequest } from '../types';

jest.mock('./json-store.service');

describe('SandboxService', () => {
  let service: SandboxService;
  let mockStore: jest.Mocked<JsonStoreService>;

  const mockSandboxResponse = {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'X-Request-Id': 'mock-req-001' },
    body: { success: true, data: { polizaId: 'POL-2024-001234' } },
  };

  const mockErrorResponse = {
    statusCode: 400,
    headers: { 'Content-Type': 'application/json' },
    body: { error: 'Bad Request', message: 'Datos inválidos' },
  };

  const baseRequest: SandboxRequest = {
    apiId: 'emision-polizas',
    endpoint: '/polizas/emitir',
    method: 'POST',
    scenario: '200',
  };

  beforeEach(() => {
    mockStore = new JsonStoreService() as jest.Mocked<JsonStoreService>;
    mockStore.readSandboxResponse = jest.fn();
    service = new SandboxService(mockStore);
  });

  describe('execute', () => {
    it('should return response with correct statusCode from mock', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockSandboxResponse);

      const result = await service.execute(baseRequest, 'user-001');

      expect(result.statusCode).toBe(200);
      expect(result.body).toEqual(mockSandboxResponse.body);
      expect(result.headers).toEqual(mockSandboxResponse.headers);
    });

    it('should add responseTimeMs between 50 and 500', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockSandboxResponse);

      const result = await service.execute(baseRequest, 'user-001');

      expect(result.responseTimeMs).toBeGreaterThanOrEqual(50);
      expect(result.responseTimeMs).toBeLessThanOrEqual(500);
      expect(Number.isInteger(result.responseTimeMs)).toBe(true);
    });

    it('should add a UUID correlationId', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockSandboxResponse);

      const result = await service.execute(baseRequest, 'user-001');

      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(result.correlationId).toMatch(uuidRegex);
    });

    it('should add entry to history', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockSandboxResponse);

      await service.execute(baseRequest, 'user-001');

      const history = service.getHistory('user-001');
      expect(history).toHaveLength(1);
      expect(history[0].request).toEqual(baseRequest);
      expect(history[0].response.statusCode).toBe(200);
      expect(history[0].timestamp).toBeDefined();
    });

    it('should default scenario to "200" when not provided', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockSandboxResponse);
      const requestNoScenario: SandboxRequest = {
        apiId: 'emision-polizas',
        endpoint: '/polizas/emitir',
        method: 'POST',
      };

      await service.execute(requestNoScenario, 'user-001');

      expect(mockStore.readSandboxResponse).toHaveBeenCalledWith('emision-polizas', '200');
    });

    it('should use the provided scenario', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockErrorResponse);
      const errorRequest: SandboxRequest = { ...baseRequest, scenario: '400' };

      const result = await service.execute(errorRequest, 'user-001');

      expect(mockStore.readSandboxResponse).toHaveBeenCalledWith('emision-polizas', '400');
      expect(result.statusCode).toBe(400);
    });

    it('should handle missing scenario file gracefully with 404 error', async () => {
      mockStore.readSandboxResponse.mockRejectedValue(new Error('Archivo no encontrado'));

      await expect(service.execute(baseRequest, 'user-001')).rejects.toMatchObject({
        message: expect.stringContaining('Respuesta sandbox no encontrada'),
        statusCode: 404,
      });
    });

    it('should generate unique correlationIds for each execution', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockSandboxResponse);

      const result1 = await service.execute(baseRequest, 'user-001');
      const result2 = await service.execute(baseRequest, 'user-001');

      expect(result1.correlationId).not.toBe(result2.correlationId);
    });
  });

  describe('getHistory', () => {
    it('should return empty array for unknown user', () => {
      const history = service.getHistory('unknown-user');
      expect(history).toEqual([]);
    });

    it('should return entries for known user', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockSandboxResponse);

      await service.execute(baseRequest, 'user-001');
      await service.execute({ ...baseRequest, scenario: '400' }, 'user-001');

      const history = service.getHistory('user-001');
      expect(history).toHaveLength(2);
    });

    it('should keep history separate per user', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockSandboxResponse);

      await service.execute(baseRequest, 'user-001');
      await service.execute(baseRequest, 'user-002');
      await service.execute(baseRequest, 'user-002');

      expect(service.getHistory('user-001')).toHaveLength(1);
      expect(service.getHistory('user-002')).toHaveLength(2);
    });
  });

  describe('history limit', () => {
    it('should limit history to 10 entries, discarding oldest', async () => {
      mockStore.readSandboxResponse.mockResolvedValue(mockSandboxResponse);

      // Execute 12 requests
      for (let i = 0; i < 12; i++) {
        await service.execute(
          { ...baseRequest, endpoint: `/endpoint-${i}` },
          'user-001'
        );
      }

      const history = service.getHistory('user-001');
      expect(history).toHaveLength(10);
      // Oldest entries (0, 1) should be discarded; first remaining is endpoint-2
      expect(history[0].request.endpoint).toBe('/endpoint-2');
      expect(history[9].request.endpoint).toBe('/endpoint-11');
    });
  });
});
