import { CatalogService } from './catalog.service';
import { JsonStoreService } from './json-store.service';
import { ApiCatalogItem } from '../types';

jest.mock('./json-store.service');

const mockApis: ApiCatalogItem[] = [
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
    description: 'Consulta el estado y detalle de siniestros reportados',
    descriptionSummary: 'Consulta de siniestros',
    useCases: ['Consultar siniestro'],
    status: 'Deprecada',
    version: 'v1',
    contactTeam: { teamName: 'Siniestros', email: 'siniestros@test.com', area: 'Tech' },
    icon: 'fa-car-crash',
    specFile: 'consulta-siniestros.json',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-01T14:30:00Z',
  },
  {
    id: 'api-003',
    name: 'API Interna Borrador',
    category: 'Interna',
    description: 'API en desarrollo que no debe ser visible',
    descriptionSummary: 'API interna',
    useCases: ['Uso interno'],
    status: 'Borrador',
    version: 'v1',
    contactTeam: { teamName: 'Internal', email: 'internal@test.com', area: 'Tech' },
    icon: 'fa-cog',
    specFile: 'interna.json',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-01T14:30:00Z',
  },
  {
    id: 'api-004',
    name: 'API Retirada Legacy',
    category: 'Legacy',
    description: 'API retirada del catálogo público',
    descriptionSummary: 'API legacy retirada',
    useCases: ['Legacy'],
    status: 'Retirada',
    version: 'v1',
    contactTeam: { teamName: 'Legacy', email: 'legacy@test.com', area: 'Tech' },
    icon: 'fa-archive',
    specFile: 'legacy.json',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-06-01T14:30:00Z',
  },
];

describe('CatalogService', () => {
  let service: CatalogService;
  let store: jest.Mocked<JsonStoreService>;

  beforeEach(() => {
    store = new JsonStoreService() as jest.Mocked<JsonStoreService>;
    store.read = jest.fn().mockResolvedValue(mockApis);
    store.readSpec = jest.fn();
    service = new CatalogService(store);
  });

  describe('getPublicApis', () => {
    it('should return only Publicada and Deprecada APIs', async () => {
      const result = await service.getPublicApis();

      expect(result).toHaveLength(2);
      expect(result.map((a) => a.id)).toEqual(['api-001', 'api-002']);
    });

    it('should exclude Borrador and Retirada APIs', async () => {
      const result = await service.getPublicApis();
      const statuses = result.map((a) => a.status);

      expect(statuses).not.toContain('Borrador');
      expect(statuses).not.toContain('Retirada');
    });
  });

  describe('search', () => {
    it('should find APIs by name (case-insensitive)', async () => {
      const result = await service.search('emisión');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('api-001');
    });

    it('should find APIs by category', async () => {
      const result = await service.search('Siniestros');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('api-002');
    });

    it('should find APIs by description', async () => {
      const result = await service.search('pólizas de seguros');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('api-001');
    });

    it('should return empty array for no matches', async () => {
      const result = await service.search('xyz-no-existe');

      expect(result).toEqual([]);
    });

    it('should not return Borrador or Retirada APIs even if they match', async () => {
      const result = await service.search('interna');

      expect(result).toEqual([]);
    });
  });

  describe('getPublicDetail', () => {
    it('should return API for valid public id', async () => {
      const result = await service.getPublicDetail('api-001');

      expect(result).not.toBeNull();
      expect(result!.id).toBe('api-001');
      expect(result!.name).toBe('API de Emisión de Pólizas');
    });

    it('should return null for Borrador API', async () => {
      const result = await service.getPublicDetail('api-003');

      expect(result).toBeNull();
    });

    it('should return null for Retirada API', async () => {
      const result = await service.getPublicDetail('api-004');

      expect(result).toBeNull();
    });

    it('should return null for non-existent id', async () => {
      const result = await service.getPublicDetail('api-999');

      expect(result).toBeNull();
    });

    it('should return Deprecada API as public', async () => {
      const result = await service.getPublicDetail('api-002');

      expect(result).not.toBeNull();
      expect(result!.status).toBe('Deprecada');
    });
  });

  describe('getSpec', () => {
    it('should read the correct spec file for a valid API', async () => {
      const mockSpec = { openapi: '3.0.3', info: { title: 'Emisión' } };
      store.readSpec.mockResolvedValue(mockSpec);

      const result = await service.getSpec('api-001');

      expect(store.readSpec).toHaveBeenCalledWith('emision-polizas.json');
      expect(result).toEqual(mockSpec);
    });

    it('should return null for non-existent API', async () => {
      const result = await service.getSpec('api-999');

      expect(result).toBeNull();
      expect(store.readSpec).not.toHaveBeenCalled();
    });
  });
});
