import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CatalogListComponent } from './catalog-list.component';
import { CatalogService } from '../../core/services/catalog.service';
import { ApiCatalogItem } from '../../core/models/api-catalog.model';
import { Router } from '@angular/router';

const MOCK_APIS: ApiCatalogItem[] = [
  {
    id: 'api-001',
    name: 'API de Emisión de Pólizas',
    category: 'Emisión',
    description: 'Emisión completa',
    descriptionSummary: 'Emisión y generación de pólizas de seguros',
    useCases: ['Emitir póliza nueva'],
    status: 'Publicada',
    version: 'v1',
    contactTeam: { teamName: 'Core', email: 'core@test.com', area: 'Tech' },
    icon: 'fa-file-contract',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'api-002',
    name: 'API de Consulta de Siniestros',
    category: 'Siniestros',
    description: 'Consulta siniestros',
    descriptionSummary: 'Consulta y seguimiento de siniestros',
    useCases: ['Consultar siniestro'],
    status: 'Deprecada',
    version: 'v1',
    contactTeam: { teamName: 'Claims', email: 'claims@test.com', area: 'Tech' },
    icon: 'fa-search',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'api-003',
    name: 'API Borrador',
    category: 'Test',
    description: 'Borrador',
    descriptionSummary: 'API en borrador',
    useCases: [],
    status: 'Borrador',
    version: 'v1',
    contactTeam: { teamName: 'Dev', email: 'dev@test.com', area: 'Tech' },
    icon: 'fa-cog',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'api-004',
    name: 'API Retirada',
    category: 'Legacy',
    description: 'Retirada',
    descriptionSummary: 'API retirada del catálogo',
    useCases: [],
    status: 'Retirada',
    version: 'v1',
    contactTeam: { teamName: 'Dev', email: 'dev@test.com', area: 'Tech' },
    icon: 'fa-ban',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

describe('CatalogListComponent', () => {
  let component: CatalogListComponent;
  let fixture: ComponentFixture<CatalogListComponent>;
  let catalogServiceSpy: jasmine.SpyObj<CatalogService>;
  let router: Router;

  beforeEach(async () => {
    catalogServiceSpy = jasmine.createSpyObj('CatalogService', ['getPublicApis']);
    catalogServiceSpy.getPublicApis.and.returnValue(of(MOCK_APIS));

    await TestBed.configureTestingModule({
      imports: [CatalogListComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: CatalogService, useValue: catalogServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load APIs on init and filter out Borrador and Retirada', () => {
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    expect(component.allApis.length).toBe(2);
    expect(component.allApis.every(a => a.status === 'Publicada' || a.status === 'Deprecada')).toBeTrue();
  });

  it('should show all visible APIs when search is empty', () => {
    fixture.detectChanges();
    expect(component.filteredApis.length).toBe(2);
  });

  it('should filter APIs by name (case-insensitive)', () => {
    fixture.detectChanges();
    component.searchText = 'emisión';
    component.filterApis();
    expect(component.filteredApis.length).toBe(1);
    expect(component.filteredApis[0].id).toBe('api-001');
  });

  it('should filter APIs by category', () => {
    fixture.detectChanges();
    component.searchText = 'siniestros';
    component.filterApis();
    expect(component.filteredApis.length).toBe(1);
    expect(component.filteredApis[0].id).toBe('api-002');
  });

  it('should filter APIs by descriptionSummary', () => {
    fixture.detectChanges();
    component.searchText = 'seguimiento';
    component.filterApis();
    expect(component.filteredApis.length).toBe(1);
    expect(component.filteredApis[0].id).toBe('api-002');
  });

  it('should return empty when search matches nothing', () => {
    fixture.detectChanges();
    component.searchText = 'xyz-no-existe';
    component.filterApis();
    expect(component.filteredApis.length).toBe(0);
  });

  it('should reset filter when search text is cleared', () => {
    fixture.detectChanges();
    component.searchText = 'emisión';
    component.filterApis();
    expect(component.filteredApis.length).toBe(1);

    component.searchText = '';
    component.filterApis();
    expect(component.filteredApis.length).toBe(2);
  });

  it('should navigate to detail on goToDetail', () => {
    const spy = spyOn(router, 'navigate');
    component.goToDetail('api-001');
    expect(spy).toHaveBeenCalledWith(['/catalog', 'api-001']);
  });

  it('should handle API load error gracefully', () => {
    catalogServiceSpy.getPublicApis.and.returnValue(throwError(() => new Error('Network error')));
    fixture = TestBed.createComponent(CatalogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.loading).toBeFalse();
    expect(component.allApis.length).toBe(0);
  });

  it('should show loading spinner initially', () => {
    expect(component.loading).toBeTrue();
  });
});
