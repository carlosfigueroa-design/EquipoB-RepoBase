import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { AuthService } from '../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';
import { ApiCatalogItem } from '../../core/models/api-catalog.model';

@Component({
  selector: 'app-catalog-detail',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  template: `
    <div class="detail-container">
      <a class="back-link" (click)="goBack()" role="button" tabindex="0" (keydown.enter)="goBack()">
        <i class="fa fa-arrow-left"></i> Volver al catálogo
      </a>

      <app-loading-spinner *ngIf="loading"></app-loading-spinner>

      <div *ngIf="!loading && !api" class="not-found">
        <i class="fa fa-exclamation-triangle not-found-icon"></i>
        <h2>API no encontrada</h2>
        <p>La API solicitada no existe o no está disponible.</p>
        <button class="sb-ui-button sb-ui-button--outline" (click)="goBack()">
          Volver al catálogo
        </button>
      </div>

      <div *ngIf="!loading && api" class="detail-content">
        <div class="sb-ui-card detail-card">
          <div class="detail-header">
            <div class="header-left">
              <div class="api-icon">
                <i class="fa {{ api.icon }}"></i>
              </div>
              <div class="header-info">
                <div class="header-meta">
                  <span class="api-category">{{ api.category }}</span>
                  <span
                    class="sb-ui-badge"
                    [ngClass]="{
                      'sb-ui-badge--success': api.status === 'Publicada',
                      'sb-ui-badge--warning': api.status === 'Deprecada',
                      'sb-ui-badge--muted': api.status === 'Borrador',
                      'sb-ui-badge--danger': api.status === 'Retirada'
                    }"
                  >
                    {{ api.status }}
                  </span>
                  <span class="api-version">{{ api.version }}</span>
                </div>
                <h1 class="api-name">{{ api.name }}</h1>
              </div>
            </div>
          </div>

          <div class="detail-body">
            <section class="detail-section">
              <h3 class="section-title">
                <i class="fa fa-info-circle"></i> Descripción
              </h3>
              <p class="section-text">{{ api.description }}</p>
            </section>

            <section *ngIf="api.useCases && api.useCases.length > 0" class="detail-section">
              <h3 class="section-title">
                <i class="fa fa-list-check"></i> Casos de Uso
              </h3>
              <ul class="use-cases-list">
                <li *ngFor="let useCase of api.useCases">{{ useCase }}</li>
              </ul>
            </section>

            <section class="detail-section">
              <h3 class="section-title">
                <i class="fa fa-users"></i> Equipo de Contacto
              </h3>
              <div class="contact-info">
                <div class="contact-item">
                  <span class="contact-label">Equipo:</span>
                  <span class="contact-value">{{ api.contactTeam.teamName }}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">Email:</span>
                  <a class="contact-email" [href]="'mailto:' + api.contactTeam.email">
                    {{ api.contactTeam.email }}
                  </a>
                </div>
                <div class="contact-item">
                  <span class="contact-label">Área:</span>
                  <span class="contact-value">{{ api.contactTeam.area }}</span>
                </div>
              </div>
            </section>
          </div>

          <div class="detail-actions">
            <button class="sb-ui-button" (click)="viewDocumentation()">
              <i class="fa fa-file-lines"></i> Ver Documentación
            </button>
            <button class="sb-ui-button sb-ui-button--secondary" (click)="trySandbox()">
              <i class="fa fa-flask"></i> Probar en Sandbox
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      padding: var(--sb-ui-spacing-lg, 24px);
      max-width: 900px;
      margin: 0 auto;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: var(--sb-ui-spacing-sm, 8px);
      color: var(--sb-ui-color-primary, #007A3D);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      font-weight: 600;
      cursor: pointer;
      margin-bottom: var(--sb-ui-spacing-lg, 24px);
      text-decoration: none;
    }

    .back-link:hover {
      text-decoration: underline;
    }

    .not-found {
      text-align: center;
      padding: var(--sb-ui-spacing-xl, 32px);
      color: var(--sb-ui-text-secondary, #6c757d);
    }

    .not-found-icon {
      font-size: 3rem;
      margin-bottom: var(--sb-ui-spacing-md, 16px);
      color: var(--sb-ui-color-warning, #ffc107);
    }

    .not-found h2 {
      color: var(--sb-ui-text-primary, #1a1a2e);
      margin: 0 0 var(--sb-ui-spacing-sm, 8px) 0;
    }

    .not-found p {
      margin: 0 0 var(--sb-ui-spacing-lg, 24px) 0;
    }

    .detail-card {
      padding: var(--sb-ui-spacing-xl, 32px);
    }

    .detail-card:hover {
      transform: none;
    }

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--sb-ui-spacing-lg, 24px);
      padding-bottom: var(--sb-ui-spacing-lg, 24px);
      border-bottom: 1px solid var(--sb-ui-border-color, #dee2e6);
    }

    .header-left {
      display: flex;
      gap: var(--sb-ui-spacing-md, 16px);
      align-items: flex-start;
    }

    .api-icon {
      width: 56px;
      height: 56px;
      border-radius: var(--sb-ui-border-radius, 8px);
      background-color: var(--sb-ui-bg-primary, #f4faf6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--sb-ui-font-size-xl, 1.5rem);
      color: var(--sb-ui-color-primary, #007A3D);
      flex-shrink: 0;
    }

    .header-info {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-sm, 8px);
    }

    .header-meta {
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-sm, 8px);
      flex-wrap: wrap;
    }

    .api-category {
      font-size: var(--sb-ui-font-size-xs, 0.75rem);
      color: var(--sb-ui-text-secondary, #6c757d);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .api-version {
      font-size: var(--sb-ui-font-size-xs, 0.75rem);
      color: var(--sb-ui-text-muted, #adb5bd);
      font-weight: 600;
    }

    .api-name {
      font-size: var(--sb-ui-font-size-xl, 1.5rem);
      color: var(--sb-ui-text-primary, #1a1a2e);
      margin: 0;
      font-weight: 700;
    }

    .detail-body {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-lg, 24px);
    }

    .detail-section {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-sm, 8px);
    }

    .section-title {
      font-size: var(--sb-ui-font-size-md, 1rem);
      color: var(--sb-ui-color-primary, #007A3D);
      margin: 0;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-sm, 8px);
    }

    .section-text {
      font-size: var(--sb-ui-font-size-md, 1rem);
      color: var(--sb-ui-text-primary, #1a1a2e);
      line-height: 1.6;
      margin: 0;
    }

    .use-cases-list {
      margin: 0;
      padding-left: var(--sb-ui-spacing-lg, 24px);
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-xs, 4px);
    }

    .use-cases-list li {
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-text-primary, #1a1a2e);
      line-height: 1.5;
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-sm, 8px);
      background-color: var(--sb-ui-bg-primary, #f4faf6);
      padding: var(--sb-ui-spacing-md, 16px);
      border-radius: var(--sb-ui-border-radius-sm, 4px);
    }

    .contact-item {
      display: flex;
      gap: var(--sb-ui-spacing-sm, 8px);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
    }

    .contact-label {
      font-weight: 600;
      color: var(--sb-ui-text-secondary, #6c757d);
      min-width: 60px;
    }

    .contact-value {
      color: var(--sb-ui-text-primary, #1a1a2e);
    }

    .contact-email {
      color: var(--sb-ui-color-primary, #007A3D);
      text-decoration: none;
    }

    .contact-email:hover {
      text-decoration: underline;
    }

    .detail-actions {
      display: flex;
      gap: var(--sb-ui-spacing-md, 16px);
      margin-top: var(--sb-ui-spacing-lg, 24px);
      padding-top: var(--sb-ui-spacing-lg, 24px);
      border-top: 1px solid var(--sb-ui-border-color, #dee2e6);
      flex-wrap: wrap;
    }

    @media (max-width: 576px) {
      .detail-actions {
        flex-direction: column;
      }

      .detail-actions button {
        width: 100%;
      }

      .header-left {
        flex-direction: column;
      }
    }
  `],
})
export class CatalogDetailComponent implements OnInit {
  api: ApiCatalogItem | null = null;
  loading = true;
  private apiId = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catalogService: CatalogService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.apiId = this.route.snapshot.paramMap.get('id') ?? '';
    if (!this.apiId) {
      this.loading = false;
      return;
    }
    this.catalogService.getApiDetail(this.apiId).subscribe({
      next: (api) => {
        this.api = api;
        this.loading = false;
      },
      error: () => {
        this.api = null;
        this.loading = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/catalog']);
  }

  viewDocumentation(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/swagger', this.apiId]);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  trySandbox(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/sandbox'], { state: { apiId: this.apiId } });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
