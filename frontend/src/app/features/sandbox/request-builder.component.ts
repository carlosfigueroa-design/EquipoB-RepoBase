import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiCatalogItem } from '../../core/models/api-catalog.model';
import { HttpMethod, SandboxRequest } from '../../core/models/sandbox.model';

@Component({
  selector: 'app-request-builder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="request-builder">
      <div class="form-group">
        <label for="api-select">API</label>
        <select id="api-select" class="sb-ui-select" [(ngModel)]="selectedApiId" (ngModelChange)="onApiChange()">
          <option value="">-- Seleccionar API --</option>
          @for (api of apis; track api.id) {
            <option [value]="api.id">{{ api.name }}</option>
          }
        </select>
      </div>

      <div class="form-row">
        <div class="form-group method-group">
          <label for="method-select">Método</label>
          <select id="method-select" class="sb-ui-select" [(ngModel)]="method">
            @for (m of methods; track m) {
              <option [value]="m">{{ m }}</option>
            }
          </select>
        </div>
        <div class="form-group endpoint-group">
          <label for="endpoint-input">Endpoint</label>
          <input id="endpoint-input" class="sb-ui-input" type="text"
                 [(ngModel)]="endpoint" placeholder="/v1/polizas/emitir" />
        </div>
      </div>

      <div class="form-group">
        <label for="scenario-select">Escenario</label>
        <select id="scenario-select" class="sb-ui-select" [(ngModel)]="scenario">
          @for (s of scenarios; track s.value) {
            <option [value]="s.value">{{ s.label }}</option>
          }
        </select>
      </div>

      <div class="form-group">
        <label for="body-editor">Body (JSON)</label>
        <textarea id="body-editor" class="sb-ui-textarea body-editor"
                  [(ngModel)]="bodyText" rows="8"
                  placeholder='{ "key": "value" }'></textarea>
      </div>

      <button class="sb-ui-button execute-btn"
              [disabled]="!selectedApiId || !endpoint || loading"
              (click)="onExecute()">
        @if (loading) {
          <span class="sb-ui-spinner spinner-sm"></span>
        } @else {
          <i class="fa fa-play"></i>
        }
        Ejecutar
      </button>
    </div>
  `,
  styles: [`
    .request-builder {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-md, 16px);
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-xs, 4px);
    }
    .form-group label {
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      font-weight: 600;
      color: var(--sb-ui-text-primary, #1a1a2e);
    }
    .form-row {
      display: flex;
      gap: var(--sb-ui-spacing-sm, 8px);
    }
    .method-group {
      flex: 0 0 130px;
    }
    .endpoint-group {
      flex: 1;
    }
    .body-editor {
      font-family: 'Courier New', Courier, monospace;
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      min-height: 140px;
      resize: vertical;
    }
    .execute-btn {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .spinner-sm {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }
  `]
})
export class RequestBuilderComponent implements OnInit {
  @Input() apis: ApiCatalogItem[] = [];
  @Input() loading = false;
  @Output() executeRequest = new EventEmitter<SandboxRequest>();

  selectedApiId = '';
  method: HttpMethod = 'POST';
  endpoint = '';
  scenario = '200';
  bodyText = '';

  methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'DELETE'];
  scenarios = [
    { value: '200', label: '200 — Éxito' },
    { value: '400', label: '400 — Bad Request' },
    { value: '404', label: '404 — Not Found' },
    { value: '500', label: '500 — Server Error' },
  ];

  private exampleBodies: Record<string, string> = {
    'api-001': JSON.stringify({
      asegurado: { nombre: 'Juan Pérez', documento: '1234567890', tipoDocumento: 'CC' },
      plan: { nombre: 'Vida Plus', cobertura: 'Muerte + Incapacidad' }
    }, null, 2),
    'api-002': JSON.stringify({
      polizaId: 'POL-2024-001234',
      periodoRenovacion: { inicio: '2025-07-01', fin: '2026-07-01' }
    }, null, 2),
    'api-003': JSON.stringify({
      polizaId: 'POL-2024-001234',
      tipoConsulta: 'detalle'
    }, null, 2),
  };

  private exampleEndpoints: Record<string, string> = {
    'api-001': '/v1/polizas/emitir',
    'api-002': '/v1/polizas/renovar',
    'api-003': '/v1/siniestros/consultar',
    'api-004': '/v1/siniestros/registrar',
    'api-005': '/v1/cotizaciones/calcular',
    'api-006': '/v1/polizas/consultar',
    'api-007': '/v1/polizas/cancelar',
    'api-008': '/v1/pagos/consultar',
  };

  ngOnInit(): void {
    // defaults
  }

  onApiChange(): void {
    this.endpoint = this.exampleEndpoints[this.selectedApiId] ?? '/v1/endpoint';
    this.bodyText = this.exampleBodies[this.selectedApiId] ?? JSON.stringify({ ejemplo: 'datos' }, null, 2);
  }

  onExecute(): void {
    let parsedBody: unknown = undefined;
    if (this.bodyText.trim()) {
      try {
        parsedBody = JSON.parse(this.bodyText);
      } catch {
        parsedBody = this.bodyText;
      }
    }

    const request: SandboxRequest = {
      apiId: this.selectedApiId,
      endpoint: this.endpoint,
      method: this.method,
      body: parsedBody,
      scenario: this.scenario,
    };

    this.executeRequest.emit(request);
  }
}
