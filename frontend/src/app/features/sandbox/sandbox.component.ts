import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RequestBuilderComponent } from './request-builder.component';
import { ResponseViewerComponent } from './response-viewer.component';
import { SandboxService } from '../../core/services/sandbox.service';
import { CatalogService } from '../../core/services/catalog.service';
import { ApiCatalogItem } from '../../core/models/api-catalog.model';
import { SandboxRequest, SandboxResponse, SandboxHistoryEntry } from '../../core/models/sandbox.model';

@Component({
  selector: 'app-sandbox',
  standalone: true,
  imports: [CommonModule, RequestBuilderComponent, ResponseViewerComponent],
  template: `
    <div class="sandbox-container">
      <header class="sandbox-header">
        <h2><i class="fa fa-flask"></i> Sandbox Interactivo</h2>
        <p>Ejecuta peticiones simuladas contra las APIs del catálogo</p>
      </header>

      <div class="sandbox-layout">
        <div class="sandbox-main">
          <div class="sb-ui-card request-panel">
            <h3>Request</h3>
            <app-request-builder
              [apis]="apis"
              [loading]="loading"
              [preselectedApiId]="preselectedApiId"
              (executeRequest)="onExecute($event)">
            </app-request-builder>
          </div>

          <div class="sb-ui-card response-panel">
            <h3>Response</h3>
            <app-response-viewer [response]="currentResponse"></app-response-viewer>
          </div>
        </div>

        <aside class="sandbox-sidebar">
          <div class="sb-ui-card history-panel">
            <h3><i class="fa fa-history"></i> Historial</h3>
            @if (history.length === 0) {
              <p class="history-empty">Sin peticiones aún</p>
            } @else {
              <ul class="history-list">
                @for (entry of history; track $index) {
                  <li class="history-item" (click)="selectHistory(entry)"
                      [class.active]="selectedHistoryIndex === $index">
                    <div class="history-item-header">
                      <span class="sb-ui-badge sb-ui-badge--sm"
                            [ngClass]="getHistoryBadgeClass(entry.response.statusCode)">
                        {{ entry.response.statusCode }}
                      </span>
                      <span class="history-method">{{ entry.request.method }}</span>
                    </div>
                    <span class="history-endpoint">{{ entry.request.endpoint }}</span>
                    <span class="history-time">{{ entry.timestamp | date:'HH:mm:ss' }}</span>
                  </li>
                }
              </ul>
            }
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .sandbox-container {
      padding: var(--sb-ui-spacing-lg, 24px);
      max-width: 1400px;
      margin: 0 auto;
    }
    .sandbox-header {
      margin-bottom: var(--sb-ui-spacing-lg, 24px);
    }
    .sandbox-header h2 {
      margin: 0;
      color: var(--sb-ui-text-primary, #1a1a2e);
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-sm, 8px);
    }
    .sandbox-header p {
      margin: var(--sb-ui-spacing-xs, 4px) 0 0;
      color: var(--sb-ui-text-secondary, #6c757d);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
    }
    .sandbox-layout {
      display: flex;
      gap: var(--sb-ui-spacing-lg, 24px);
    }
    .sandbox-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-lg, 24px);
      min-width: 0;
    }
    .sandbox-sidebar {
      flex: 0 0 280px;
    }
    .request-panel h3,
    .response-panel h3,
    .history-panel h3 {
      margin: 0 0 var(--sb-ui-spacing-md, 16px) 0;
      font-size: var(--sb-ui-font-size-lg, 1.25rem);
      color: var(--sb-ui-text-primary, #1a1a2e);
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-sm, 8px);
    }
    .history-panel {
      position: sticky;
      top: var(--sb-ui-spacing-lg, 24px);
    }
    .history-empty {
      color: var(--sb-ui-text-muted, #adb5bd);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      text-align: center;
      padding: var(--sb-ui-spacing-md, 16px) 0;
    }
    .history-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-sm, 8px);
    }
    .history-item {
      padding: var(--sb-ui-spacing-sm, 8px);
      border-radius: var(--sb-ui-border-radius-sm, 4px);
      border: 1px solid var(--sb-ui-border-color, #dee2e6);
      cursor: pointer;
      transition: background-color 0.2s;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .history-item:hover,
    .history-item.active {
      background: var(--sb-ui-bg-primary, #f4faf6);
    }
    .history-item-header {
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-xs, 4px);
    }
    .history-method {
      font-weight: 600;
      font-size: var(--sb-ui-font-size-xs, 0.75rem);
      color: var(--sb-ui-color-primary, #007A3D);
    }
    .history-endpoint {
      font-size: var(--sb-ui-font-size-xs, 0.75rem);
      color: var(--sb-ui-text-primary, #1a1a2e);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .history-time {
      font-size: var(--sb-ui-font-size-xs, 0.75rem);
      color: var(--sb-ui-text-muted, #adb5bd);
    }
    @media (max-width: 900px) {
      .sandbox-layout {
        flex-direction: column;
      }
      .sandbox-sidebar {
        flex: none;
      }
    }
  `]
})
export class SandboxComponent implements OnInit {
  apis: ApiCatalogItem[] = [];
  currentResponse: SandboxResponse | null = null;
  history: SandboxHistoryEntry[] = [];
  loading = false;
  selectedHistoryIndex = -1;
  preselectedApiId = '';

  constructor(
    private sandboxService: SandboxService,
    private catalogService: CatalogService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Read preselected API from navigation state
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { apiId?: string } | undefined;
    if (state?.apiId) {
      this.preselectedApiId = state.apiId;
    } else {
      const historyState = history.state as { apiId?: string } | undefined;
      if (historyState?.apiId) {
        this.preselectedApiId = historyState.apiId;
      }
    }

    this.catalogService.getPublicApis().subscribe({
      next: (apis) => this.apis = apis,
      error: () => this.apis = [],
    });

    this.sandboxService.getHistory().subscribe({
      next: (h) => this.history = h,
      error: () => { /* ignore */ },
    });
  }

  onExecute(request: SandboxRequest): void {
    this.loading = true;
    this.selectedHistoryIndex = -1;

    this.sandboxService.execute(request).subscribe({
      next: (response) => {
        this.currentResponse = response;
        const entry: SandboxHistoryEntry = {
          request,
          response,
          timestamp: new Date().toISOString(),
        };
        this.history.unshift(entry);
        if (this.history.length > 10) {
          this.history = this.history.slice(0, 10);
        }
        this.loading = false;
      },
      error: () => {
        this.currentResponse = {
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: { error: 'Error de conexión con el servidor' },
          responseTimeMs: 0,
          correlationId: 'N/A',
        };
        this.loading = false;
      },
    });
  }

  selectHistory(entry: SandboxHistoryEntry): void {
    this.currentResponse = entry.response;
    this.selectedHistoryIndex = this.history.indexOf(entry);
  }

  getHistoryBadgeClass(statusCode: number): string {
    if (statusCode >= 200 && statusCode < 300) return 'sb-ui-badge--success';
    if (statusCode >= 400 && statusCode < 500) return 'sb-ui-badge--warning';
    return 'sb-ui-badge--danger';
  }
}
