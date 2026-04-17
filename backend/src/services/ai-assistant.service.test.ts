import { AIAssistantService } from './ai-assistant.service';
import { JsonStoreService } from './json-store.service';
import { AIResponseEntry, ApiCatalogItem } from '../types';

jest.mock('./json-store.service');

const mockAiResponses: AIResponseEntry[] = [
  {
    id: 'ai-001',
    keywords: ['emitir', 'póliza', 'nueva', 'emisión', 'generar'],
    question: '¿Cómo emitir una póliza?',
    answer: 'Para emitir una nueva póliza, utiliza la **API de Emisión de Pólizas**.',
    relatedApiId: 'api-001',
    curlExample: "curl -X POST https://sandbox.segurosbolivar.com/v1/polizas/emitir -H 'Authorization: Bearer {token}'",
  },
  {
    id: 'ai-002',
    keywords: ['renovar', 'renovación', 'vencer', 'vencimiento'],
    question: '¿Cómo renovar una póliza?',
    answer: 'Para renovar una póliza vigente, utiliza la **API de Renovación de Pólizas**.',
    relatedApiId: 'api-002',
    curlExample: "curl -X POST https://sandbox.segurosbolivar.com/v1/polizas/renovar -H 'Authorization: Bearer {token}'",
  },
  {
    id: 'ai-003',
    keywords: ['sandbox', 'probar', 'prueba', 'test'],
    question: '¿Cómo probar las APIs en el sandbox?',
    answer: 'El **Sandbox Interactivo** te permite ejecutar llamadas de prueba.',
    relatedApiId: '',
    curlExample: '',
  },
  {
    id: 'ai-004',
    keywords: ['cotizar', 'cotización', 'precio', 'prima', 'cuánto cuesta', 'calcular'],
    question: '¿Cómo cotizar un seguro?',
    answer: 'Para cotizar un seguro, utiliza la **API de Cotización de Seguros**.',
    relatedApiId: 'api-005',
    curlExample: "curl -X POST https://sandbox.segurosbolivar.com/v1/cotizaciones -H 'Authorization: Bearer {token}'",
  },
];

const mockApis: ApiCatalogItem[] = [
  {
    id: 'api-001',
    name: 'API de Emisión de Pólizas',
    category: 'Emisión',
    description: 'API para la emisión de pólizas',
    descriptionSummary: 'Emisión de pólizas',
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
    name: 'API de Renovación de Pólizas',
    category: 'Renovación',
    description: 'API para renovación de pólizas',
    descriptionSummary: 'Renovación de pólizas',
    useCases: ['Renovar póliza'],
    status: 'Publicada',
    version: 'v1',
    contactTeam: { teamName: 'Core Seguros', email: 'core@test.com', area: 'Tech' },
    icon: 'fa-sync',
    specFile: '',
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-06-10T11:00:00Z',
  },
  {
    id: 'api-005',
    name: 'API de Cotización de Seguros',
    category: 'Cotización',
    description: 'API para cotización de seguros',
    descriptionSummary: 'Cotización de seguros',
    useCases: ['Cotizar seguro'],
    status: 'Publicada',
    version: 'v1',
    contactTeam: { teamName: 'Productos', email: 'productos@test.com', area: 'Comercial' },
    icon: 'fa-calculator',
    specFile: 'cotizacion-seguros.json',
    createdAt: '2024-03-01T11:00:00Z',
    updatedAt: '2024-06-20T10:00:00Z',
  },
];

describe('AIAssistantService', () => {
  let service: AIAssistantService;
  let store: jest.Mocked<JsonStoreService>;

  beforeEach(() => {
    store = new JsonStoreService() as jest.Mocked<JsonStoreService>;
    store.read = jest.fn().mockImplementation((fileName: string) => {
      if (fileName === 'ai-responses.json') return Promise.resolve(mockAiResponses);
      if (fileName === 'apis.json') return Promise.resolve(mockApis);
      return Promise.resolve([]);
    });
    service = new AIAssistantService(store);
  });

  it('should return matching response for query with keywords', async () => {
    const result = await service.query('¿Cómo emitir una póliza nueva?');

    expect(result.answer).toContain('API de Emisión de Pólizas');
    expect(result.relatedApiId).toBe('api-001');
    expect(result.curlExample).toBeDefined();
  });

  it('should return response with highest match count when multiple match', async () => {
    // "emitir póliza nueva" matches 3 keywords in ai-001 (emitir, póliza, nueva)
    // "renovar" would match only 1 keyword in ai-002
    const result = await service.query('quiero emitir una póliza nueva');

    expect(result.relatedApiId).toBe('api-001');
  });

  it('should return generic message when no keywords match', async () => {
    const result = await service.query('xyz algo completamente irrelevante');

    expect(result.answer).toBe(
      'No encontré información específica sobre tu consulta. Te sugiero explorar el catálogo de APIs o contactar al equipo de soporte.'
    );
    expect(result.relatedApiId).toBeUndefined();
    expect(result.relatedApiName).toBeUndefined();
    expect(result.swaggerLink).toBeUndefined();
    expect(result.curlExample).toBeUndefined();
  });

  it('should include relatedApiName and swaggerLink when API found', async () => {
    const result = await service.query('quiero cotizar un seguro');

    expect(result.relatedApiId).toBe('api-005');
    expect(result.relatedApiName).toBe('API de Cotización de Seguros');
    expect(result.swaggerLink).toBe('/#/swagger/api-005');
    expect(result.curlExample).toContain('cotizaciones');
  });

  it('should handle case-insensitive matching', async () => {
    const result = await service.query('EMITIR PÓLIZA');

    expect(result.answer).toContain('API de Emisión de Pólizas');
    expect(result.relatedApiId).toBe('api-001');
  });

  it('should handle punctuation in user message', async () => {
    const result = await service.query('¿Cómo emitir? ¡Una póliza!');

    expect(result.answer).toContain('API de Emisión de Pólizas');
    expect(result.relatedApiId).toBe('api-001');
  });

  it('should not include swaggerLink or curlExample when entry has no relatedApiId', async () => {
    const result = await service.query('quiero probar en el sandbox');

    expect(result.answer).toContain('Sandbox Interactivo');
    expect(result.relatedApiId).toBeUndefined();
    expect(result.relatedApiName).toBeUndefined();
    expect(result.swaggerLink).toBeUndefined();
    expect(result.curlExample).toBeUndefined();
  });

  it('should not include curlExample when entry has empty curlExample', async () => {
    const result = await service.query('quiero probar en el sandbox');

    expect(result.curlExample).toBeUndefined();
  });
});
