import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LifecycleService, AuditEntry } from '../../core/services/lifecycle.service';
import { AuthService } from '../../core/services/auth.service';
import { ApiCatalogItem, ApiStatus } from '../../core/models/api-catalog.model';

interface StatusTransition {
  label: string;
  newStatus: ApiStatus;
  cssClass: string;
}

const STATUS_TRANSITIONS: Record<string, StatusTransition[]> = {
  Borrador: [{ label: 'Publicar', newStatus: 'Publicada', cssClass: 'sb-ui-button--secondary' }],
  Publicada: [{ label: 'Deprecar', newStatus: 'Deprecada', cssClass: 'sb-ui-button--outline' }],
  Deprecada: [
    { label: 'Retirar', newStatus: 'Retirada', cssClass: 'sb-ui-button--danger' },
    { label: 'Reactivar', newStatus: 'Publicada', cssClass: 'sb-ui-button--secondary' },
  ],
  Retirada: [],
};

const BADGE_CLASS: Record<string, string> = {
  Borrador: 'sb-ui-badge sb-ui-badge--muted',
  Publicada: 'sb-ui-badge sb-ui-badge--success',
  Deprecada: 'sb-ui-badge sb-ui-badge--warning',
  Retirada: 'sb-ui-badge sb-ui-badge--danger',
};

@Component({
  selector: 'app-api-lifecycle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lifecycle-container">
      <header class="lifecycle-header">
        <div class="header-left">
          <h2><i class="fa fa-cogs"></i> Gestión del Ciclo de Vida</h2>
          <p>Administra el estado de las APIs del portal</p>
        </div>
        <button class="sb-ui-button" (click)="navigateToCreate()">
          <i class="fa fa-plus"></i> Crear nueva API
        </button>
      </header>

      @if (!isAdmin) {
        <div class="access-denied sb-ui-card">
          <i class="fa fa-lock"></i>
          <h3>Acceso restringido</h3>
          <p>Solo los usuarios con rol Admin pueden acceder a esta sección.</p>
        </div>
      } @else if (loading) {
        <div class="loading-state">
          <div class="sb-ui-spinner"></div>
          <p>Cargando APIs...</p>
        </div>
      } @else {
        <div class="table-wrapper sb-ui-card">
          <table class="sb-ui-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Versión</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (api of apis; track api.id) {
                <tr
                  [class.row-selected]="selectedApiId === api.id"
                  (click)="selectApi(api)"
                  style="cursor:pointer"
                >
                  <td>
                    <div class="api-name">
                      <i class="fa {{ api.icon }}"></i>
                      {{ api.name }}
                    </div>
                  </td>
                  <td>{{ api.category }}</td>
                  <td><span [class]="getBadgeClass(api.status)">{{ api.status }}</span></td>
                  <td>{{ api.version }}</td>
                  <td class="actions-cell" (click)="$event.stopPropagation()">
                    @for (action of getTransitions(api.status); track action.newStatus) {
                      <button
                        class="sb-ui-button sb-ui-button--sm {{ action.cssClass }}"
                        (click)="changeStatus(api, action.newStatus)"
                        [disabled]="changingId === api.id"
                      >
                        {{ action.label }}
                      </button>
                    }
                    @if (getTransitions(api.status).length === 0) {
                      <span class="no-actions">Sin acciones</span>
                    }
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="empty-state">No hay APIs registradas</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Audit Log Panel -->
        @if (selectedApiId) {
          <div class="audit-panel sb-ui-card">
            <div class="audit-header">
              <h3><i class="fa fa-history"></i> Log de auditoría — {{ selectedApiName }}</h3>
              <button class="sb-ui-button sb-ui-button--outline sb-ui-button--sm" (click)="closeAudit()">
                <i class="fa fa-times"></i> Cerrar
              </button>
            </div>

            @if (auditLoading) {
              <div class="loading-state">
                <div class="sb-ui-spinner"></div>
              </div>
            } @else if (auditLog.length === 0) {
              <p class="audit-empty">No hay registros de auditoría para esta API.</p>
            } @else {
              <table class="sb-ui-table audit-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Acción</th>
                    <th>Estado anterior</th>
                    <th>Nuevo estado</th>
                  </tr>
                </thead>
                <tbody>
                  @for (entry of auditLog; track entry.id) {
                    <tr>
                      <td>{{ formatDate(entry.timestamp) }}</td>
                      <td>{{ entry.action }}</td>
                      <td><span [class]="getBadgeClass(entry.previousStatus)">{{ entry.previousStatus }}</span></td>
                      <td><span [class]="getBadgeClass(entry.newStatus)">{{ entry.newStatus }}</span></td>
                    </tr>
                  }
                </tbody>
              </table>
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    :host { display: block }
    .lifecycle-container { max-width: 1200px; margin: 0 auto; padding: var(--sb-ui-spacing-lg, 24px) }
    .lifecycle-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px }
    .header-left h2 { margin: 0; color: var(--sb-ui-text-primary, #1a1a2e); display: flex; align-items: center; gap: 8px }
    .header-left p { margin: 4px 0 0; color: var(--sb-ui-text-secondary, #6c757d); font-size: var(--sb-ui-font-size-sm, .875rem) }
    .table-wrapper { padding: 0; overflow-x: auto }
    .api-name { display: flex; align-items: center; gap: 8px; font-weight: 600 }
    .api-name i { color: var(--sb-ui-color-primary, #007A3D); width: 20px; text-align: center }
    .actions-cell { display: flex; gap: 8px; flex-wrap: wrap }
    .no-actions { color: var(--sb-ui-text-muted, #adb5bd); font-size: var(--sb-ui-font-size-sm, .875rem); font-style: italic }
    .row-selected { background: rgba(0, 122, 61, .06) !important }
    .empty-state { text-align: center; color: var(--sb-ui-text-secondary, #6c757d); padding: 32px !important }
    .loading-state { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 48px; color: var(--sb-ui-text-secondary, #6c757d) }
    .access-denied { text-align: center; padding: 48px; color: var(--sb-ui-text-secondary, #6c757d) }
    .access-denied i { font-size: 3rem; color: var(--sb-ui-color-danger, #dc3545); margin-bottom: 16px }
    .access-denied h3 { margin: 0 0 8px; color: var(--sb-ui-text-primary, #1a1a2e) }
    .audit-panel { margin-top: 24px }
    .audit-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid var(--sb-ui-border-color, #dee2e6) }
    .audit-header h3 { margin: 0; font-size: var(--sb-ui-font-size-md, 1rem); display: flex; align-items: center; gap: 8px; color: var(--sb-ui-text-primary, #1a1a2e) }
    .audit-empty { padding: 24px; text-align: center; color: var(--sb-ui-text-secondary, #6c757d); margin: 0 }
    .audit-table { font-size: var(--sb-ui-font-size-sm, .875rem) }
  `]
})
export class ApiLifecycleComponent implements OnInit {
  apis: ApiCatalogItem[] = [];
  loading = true;
  isAdmin = false;
  changingId: string | null = null;

  selectedApiId: string | null = null;
  selectedApiName = '';
  auditLog: AuditEntry[] = [];
  auditLoading = false;

  constructor(
    private lifecycleService: LifecycleService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const profile = this.authService.getProfile();
    this.isAdmin = profile?.role === 'Admin';
    if (this.isAdmin) {
      this.loadApis();
    } else {
      this.loading = false;
    }
  }

  loadApis(): void {
    this.loading = true;
    this.lifecycleService.getAllApis().subscribe({
      next: (data) => {
        this.apis = data;
        this.loading = false;
      },
      error: () => {
        this.apis = [];
        this.loading = false;
      },
    });
  }

  getBadgeClass(status: string): string {
    return BADGE_CLASS[status] || 'sb-ui-badge sb-ui-badge--muted';
  }

  getTransitions(status: string): StatusTransition[] {
    return STATUS_TRANSITIONS[status] || [];
  }

  changeStatus(api: ApiCatalogItem, newStatus: ApiStatus): void {
    this.changingId = api.id;
    this.lifecycleService.changeStatus(api.id, newStatus).subscribe({
      next: (updated) => {
        const idx = this.apis.findIndex((a) => a.id === updated.id);
        if (idx !== -1) {
          this.apis[idx] = updated;
        }
        this.changingId = null;
        // Refresh audit if this API is selected
        if (this.selectedApiId === api.id) {
          this.loadAuditLog(api.id, api.name);
        }
      },
      error: () => {
        this.changingId = null;
      },
    });
  }

  selectApi(api: ApiCatalogItem): void {
    if (this.selectedApiId === api.id) {
      this.closeAudit();
      return;
    }
    this.selectedApiId = api.id;
    this.selectedApiName = api.name;
    this.loadAuditLog(api.id, api.name);
  }

  closeAudit(): void {
    this.selectedApiId = null;
    this.selectedApiName = '';
    this.auditLog = [];
  }

  navigateToCreate(): void {
    this.router.navigate(['/admin/create']);
  }

  formatDate(timestamp: string): string {
    try {
      return new Date(timestamp).toLocaleString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return timestamp;
    }
  }

  private loadAuditLog(apiId: string, apiName: string): void {
    this.auditLoading = true;
    this.lifecycleService.getAuditLog(apiId).subscribe({
      next: (log) => {
        this.auditLog = log;
        this.auditLoading = false;
      },
      error: () => {
        this.auditLog = [];
        this.auditLoading = false;
      },
    });
  }
}
