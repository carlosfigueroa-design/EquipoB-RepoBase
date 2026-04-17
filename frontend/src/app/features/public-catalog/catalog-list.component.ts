import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogService } from '../../core/services/catalog.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner.component';
import { ApiCatalogItem } from '../../core/models/api-catalog.model';

@Component({
  selector: 'app-catalog-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent],
  template: `
    <div class="catalog-container">
      <header class="catalog-header">
        <h1 class="catalog-title">
          <i class="fa fa-book"></i> Catálogo de APIs
        </h1>
        <p class="catalog-subtitle">
          Explora las APIs disponibles del ecosistema Vínculo Bolívar
        </p>
      </header>

      <div class="search-bar">
        <i class="fa fa-search search-icon"></i>
        <input
          type="text"
          class="sb-ui-input search-input"
          placeholder="Buscar por nombre, categoría o descripción..."
          [(ngModel)]="searchText"
          (ngModel)="filterApis()"
          (input)="filterApis()"
        />
      </div>

      <app-loading-spinner *ngIf="loading"></app-loading-spinner>

      <div *ngIf="!loading && filteredApis.length === 0" class="empty-state">
        <i class="fa fa-search empty-icon"></i>
        <p>No se encontraron APIs</p>
      </div>

      <div *ngIf="!loading && filteredApis.length > 0" class="catalog-grid">
        <div
          *ngFor="let api of filteredApis"
          class="sb-ui-card catalog-card"
          (click)="goToDetail(api.id)"
          role="button"
          tabindex="0"
          (keydown.enter)="goToDetail(api.id)"
          [attr.aria-label]="'Ver detalle de ' + api.name"
        >
          <div class="card-icon">
            <i class="fa {{ api.icon }}"></i>
          </div>
          <div class="card-body">
            <div class="card-top-row">
              <span class="card-category">{{ api.category }}</span>
              <span
                class="sb-ui-badge"
                [ngClass]="{
                  'sb-ui-badge--success': api.status === 'Publicada',
                  'sb-ui-badge--warning': api.status === 'Deprecada'
                }"
              >
                {{ api.status }}
              </span>
            </div>
            <h3 class="card-name">{{ api.name }}</h3>
            <p class="card-description">{{ api.descriptionSummary }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .catalog-container {
      padding: var(--sb-ui-spacing-lg, 24px);
      max-width: 1200px;
      margin: 0 auto;
    }

    .catalog-header {
      text-align: center;
      margin-bottom: var(--sb-ui-spacing-lg, 24px);
    }

    .catalog-title {
      font-family: var(--sb-ui-font-family, 'Segoe UI', sans-serif);
      font-size: var(--sb-ui-font-size-xxl, 2rem);
      color: var(--sb-ui-color-primary, #007A3D);
      margin: 0 0 var(--sb-ui-spacing-sm, 8px) 0;
    }

    .catalog-title i {
      margin-right: var(--sb-ui-spacing-sm, 8px);
    }

    .catalog-subtitle {
      font-size: var(--sb-ui-font-size-md, 1rem);
      color: var(--sb-ui-text-secondary, #6c757d);
      margin: 0;
    }

    .search-bar {
      position: relative;
      max-width: 600px;
      margin: 0 auto var(--sb-ui-spacing-lg, 24px) auto;
    }

    .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--sb-ui-text-muted, #adb5bd);
      pointer-events: none;
    }

    .search-input {
      padding-left: 40px !important;
    }

    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--sb-ui-spacing-lg, 24px);
    }

    @media (max-width: 1024px) {
      .catalog-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 576px) {
      .catalog-grid {
        grid-template-columns: 1fr;
      }
    }

    .catalog-card {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-md, 16px);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .catalog-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 122, 61, 0.12);
    }

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: var(--sb-ui-border-radius, 8px);
      background-color: var(--sb-ui-bg-primary, #f4faf6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--sb-ui-font-size-xl, 1.5rem);
      color: var(--sb-ui-color-primary, #007A3D);
    }

    .card-body {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-sm, 8px);
    }

    .card-top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-category {
      font-size: var(--sb-ui-font-size-xs, 0.75rem);
      color: var(--sb-ui-text-secondary, #6c757d);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .card-name {
      font-size: var(--sb-ui-font-size-lg, 1.25rem);
      color: var(--sb-ui-text-primary, #1a1a2e);
      margin: 0;
      font-weight: 600;
    }

    .card-description {
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-text-secondary, #6c757d);
      margin: 0;
      line-height: 1.5;
    }

    .empty-state {
      text-align: center;
      padding: var(--sb-ui-spacing-xl, 32px);
      color: var(--sb-ui-text-secondary, #6c757d);
    }

    .empty-icon {
      font-size: 3rem;
      margin-bottom: var(--sb-ui-spacing-md, 16px);
      opacity: 0.4;
    }

    .empty-state p {
      font-size: var(--sb-ui-font-size-lg, 1.25rem);
      margin: 0;
    }
  `],
})
export class CatalogListComponent implements OnInit {
  allApis: ApiCatalogItem[] = [];
  filteredApis: ApiCatalogItem[] = [];
  searchText = '';
  loading = true;

  constructor(
    private catalogService: CatalogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.catalogService.getPublicApis().subscribe({
      next: (apis) => {
        this.allApis = apis.filter(
          (api) => api.status === 'Publicada' || api.status === 'Deprecada'
        );
        this.filteredApis = [...this.allApis];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  filterApis(): void {
    const query = this.searchText.trim().toLowerCase();
    if (!query) {
      this.filteredApis = [...this.allApis];
      return;
    }
    this.filteredApis = this.allApis.filter(
      (api) =>
        api.name.toLowerCase().includes(query) ||
        api.category.toLowerCase().includes(query) ||
        api.descriptionSummary.toLowerCase().includes(query)
    );
  }

  goToDetail(id: string): void {
    this.router.navigate(['/catalog', id]);
  }
}
