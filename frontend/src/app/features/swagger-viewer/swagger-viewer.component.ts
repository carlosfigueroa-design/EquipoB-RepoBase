import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CatalogService } from '../../core/services/catalog.service';

declare const SwaggerUIBundle: any;

@Component({
  selector: 'app-swagger-viewer',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="swagger-container">
      <div class="swagger-header">
        <a class="back-link" (click)="goBack()">
          <i class="fa fa-arrow-left"></i> Volver al catálogo
        </a>
        <h2 *ngIf="apiName" class="api-title">{{ apiName }}</h2>
      </div>

      <div *ngIf="loading" class="loading-state">
        <div class="sb-ui-spinner"></div>
        <p>Cargando documentación de la API...</p>
      </div>

      <div *ngIf="error" class="error-state">
        <i class="fa fa-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button class="sb-ui-button sb-ui-button--outline" (click)="loadSpec()">
          Reintentar
        </button>
      </div>

      <div id="swagger-ui"></div>
    </div>
  `,
  styles: [
    `
      .swagger-container {
        padding: var(--sb-ui-spacing-lg, 24px);
        background: var(--sb-ui-color-grayscale-L400, #fafafa);
        min-height: 100vh;
        font-family: var(--sb-ui-typography-fontFamily, 'Segoe UI', Tahoma, sans-serif);
      }

      .swagger-header {
        display: flex;
        align-items: center;
        gap: var(--sb-ui-spacing-md, 16px);
        margin-bottom: var(--sb-ui-spacing-lg, 24px);
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: var(--sb-ui-spacing-sm, 8px);
        color: var(--sb-ui-color-primary, #003b7a);
        cursor: pointer;
        font-weight: 600;
        font-size: var(--sb-ui-font-size-sm, 0.875rem);
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .back-link:hover {
        color: var(--sb-ui-color-primary-light, #1a5fa8);
      }

      .api-title {
        margin: 0;
        font-size: var(--sb-ui-font-size-xl, 1.5rem);
        color: var(--sb-ui-color-grayscale-D400, #1a1a2e);
      }

      .loading-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--sb-ui-spacing-xl, 32px);
        gap: var(--sb-ui-spacing-md, 16px);
        color: var(--sb-ui-color-grayscale-D200, #6c757d);
      }

      .error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--sb-ui-spacing-xl, 32px);
        gap: var(--sb-ui-spacing-md, 16px);
        color: var(--sb-ui-color-danger, #dc3545);
      }

      .error-state i {
        font-size: 2rem;
      }

      .error-state p {
        color: var(--sb-ui-color-grayscale-D200, #6c757d);
      }

      #swagger-ui {
        background: var(--sb-ui-color-grayscale-white, #ffffff);
        border-radius: var(--sb-ui-border-radius, 8px);
        box-shadow: var(--sb-ui-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.08));
        border: 1px solid var(--sb-ui-color-grayscale-L200, #dee2e6);
        overflow: hidden;
      }
    `,
  ],
})
export class SwaggerViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  loading = true;
  error = '';
  apiName = '';

  private apiId = '';
  private spec: unknown = null;
  private viewInitialized = false;
  private specLoaded = false;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    this.apiId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.apiId) {
      this.error = 'No se proporcionó un ID de API válido.';
      this.loading = false;
      return;
    }
    this.loadSpec();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.tryRenderSwagger();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSpec(): void {
    this.loading = true;
    this.error = '';
    this.specLoaded = false;

    this.catalogService
      .getApiDetail(this.apiId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (api) => (this.apiName = api.name),
        error: () => {},
      });

    this.catalogService
      .getApiSpec(this.apiId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (spec) => {
          this.spec = spec;
          this.specLoaded = true;
          this.loading = false;
          this.tryRenderSwagger();
        },
        error: () => {
          this.loading = false;
          this.error =
            'No se pudo cargar la especificación de la API. Verifique que la API existe e intente nuevamente.';
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/catalog']);
  }

  private tryRenderSwagger(): void {
    if (!this.viewInitialized || !this.specLoaded || !this.spec) {
      return;
    }

    SwaggerUIBundle({
      spec: this.spec,
      dom_id: '#swagger-ui',
      presets: [SwaggerUIBundle.presets.apis],
      layout: 'BaseLayout',
      deepLinking: true,
      docExpansion: 'list',
    });
  }
}
