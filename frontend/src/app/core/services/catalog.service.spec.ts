import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CatalogService } from './catalog.service';
import { ApiCatalogItem } from '../models/api-catalog.model';

describe('CatalogService', () => {
  let service: CatalogService;
  let httpMock: HttpTestingController;

  const mockApi: ApiCatalogItem = {
    id: 'api-001',
    name: 'API de Emisión',
    category: 'Emisión',
    description: 'Emisión de pólizas',
    descriptionSummary: 'Resumen',
    useCases: ['Emitir póliza'],
    status: 'Publicada',
    version: 'v1',
    contactTeam: { teamName: 'Core', email: 'core@test.com', area: 'Tech' },
    icon: 'fa-file',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CatalogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPublicApis() should GET /v1/api/catalog', () => {
    service.getPublicApis().subscribe(apis => {
      expect(apis).toEqual([mockApi]);
    });
    const req = httpMock.expectOne('/v1/api/catalog');
    expect(req.request.method).toBe('GET');
    req.flush([mockApi]);
  });

  it('searchApis(query) should GET /v1/api/catalog/search with q param', () => {
    service.searchApis('emisión').subscribe(apis => {
      expect(apis).toEqual([mockApi]);
    });
    const req = httpMock.expectOne(r =>
      r.url === '/v1/api/catalog/search' && r.params.get('q') === 'emisión'
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockApi]);
  });

  it('getApiDetail(id) should GET /v1/api/catalog/{id}', () => {
    service.getApiDetail('api-001').subscribe(api => {
      expect(api).toEqual(mockApi);
    });
    const req = httpMock.expectOne('/v1/api/catalog/api-001');
    expect(req.request.method).toBe('GET');
    req.flush(mockApi);
  });

  it('getApiSpec(id) should GET /v1/api/catalog/{id}/spec', () => {
    const mockSpec = { openapi: '3.0.3', info: { title: 'Test' } };
    service.getApiSpec('api-001').subscribe(spec => {
      expect(spec).toEqual(mockSpec);
    });
    const req = httpMock.expectOne('/v1/api/catalog/api-001/spec');
    expect(req.request.method).toBe('GET');
    req.flush(mockSpec);
  });
});
