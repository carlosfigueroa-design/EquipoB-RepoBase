import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
export class RequestBuilderComponent implements OnInit, OnChanges {
  @Input() apis: ApiCatalogItem[] = [];
  @Input() loading = false;
  @Input() preselectedApiId = '';
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
    'api-011': JSON.stringify({
      recepcionId: 'REC-2025-001234',
      ordenCompraId: 'OC-2025-005678',
      motivo: 'Recepción duplicada',
      usuario: 'jperez@segurosbolivar.com'
    }, null, 2),
    'api-012': JSON.stringify({
      proveedor: { nit: '900123456-1', razonSocial: 'Proveedor ABC S.A.S' },
      lineas: [{ descripcion: 'Servicio de consultoría TI', cantidad: 1, valorUnitario: 15000000, centroCosto: 'CC-TEC-001' }],
      moneda: 'COP',
      fechaEntrega: '2025-05-15'
    }, null, 2),
    'api-013': JSON.stringify({
      ordenCompraId: 'OC-2025-005678',
      respuesta: 'ACEPTADA',
      observaciones: 'Orden aceptada. Entrega programada para el 15 de mayo.',
      fechaCompromisoEntrega: '2025-05-15'
    }, null, 2),
    'api-014': JSON.stringify({
      presupuestoId: 'PPTO-2025-003456',
      respuesta: 'APROBADO',
      montoAprobado: 25000000,
      centroCosto: 'CC-TEC-001',
      observaciones: 'Presupuesto aprobado para Q2 2025'
    }, null, 2),
    'api-015': JSON.stringify({
      recepcionId: 'REC-2025-001234',
      ordenCompraId: 'OC-2025-005678',
      tipoRecepcion: 'TOTAL',
      cantidadRecibida: 1,
      observaciones: 'Servicio recibido a satisfacción'
    }, null, 2),
    'api-016': JSON.stringify({
      tipoServicio: 'CONSULTORIA',
      proveedor: { nit: '900123456-1', razonSocial: 'Proveedor ABC S.A.S' },
      descripcion: 'Consultoría en transformación digital',
      valorTotal: 45000000,
      centroCosto: 'CC-TEC-001',
      fechaInicio: '2025-05-01',
      fechaFin: '2025-08-31'
    }, null, 2),
    'api-017': JSON.stringify({
      centroCosto: 'CC-TEC-001',
      anio: 2025,
      estado: 'APROBADO'
    }, null, 2),
    'api-018': JSON.stringify({
      polizaId: 'POL-2024-001234',
      beneficiarios: [
        { nombre: 'María López', documento: '52345678', parentesco: 'Cónyuge', porcentaje: 60 },
        { nombre: 'Carlos Pérez', documento: '1098765432', parentesco: 'Hijo', porcentaje: 40 }
      ]
    }, null, 2),
    'api-019': JSON.stringify({
      vehiculo: { placa: 'ABC123', marca: 'Mazda', modelo: 'CX-5', anio: 2023 },
      tipoInspeccion: 'PRESENCIAL',
      ciudad: 'Bogotá'
    }, null, 2),
    'api-022': JSON.stringify({
      polizaId: 'POL-2025-009876',
      participaciones: [
        { compania: 'Seguros Bolívar', porcentaje: 60 },
        { compania: 'Seguros Alfa', porcentaje: 25 },
        { compania: 'Seguros Beta', porcentaje: 15 }
      ],
      primaTotal: 30000000
    }, null, 2),
    'api-023': JSON.stringify({
      tipo: 'Proporcional',
      reasegurador: 'Swiss Re',
      porcentajeCesion: 40,
      vigencia: { inicio: '2025-01-01', fin: '2025-12-31' }
    }, null, 2),
    'api-025': JSON.stringify({
      tipo: 'MEDICA',
      polizaId: 'POL-2024-001234',
      ubicacion: { lat: 4.6097, lng: -74.0817, direccion: 'Cra 7 #72-13, Bogotá' },
      descripcion: 'Dolor abdominal agudo'
    }, null, 2),
    'api-026': JSON.stringify({
      polizaId: 'POL-2024-001234',
      monto: 2450000,
      canal: 'PSE',
      bancoOrigen: 'Bancolombia'
    }, null, 2),
    'api-027': JSON.stringify({
      polizaId: 'POL-2024-001234',
      tipoDocumento: 'certificado'
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
    'api-011': '/api/v1/coupa/anularRecepcion',
    'api-012': '/api/v1/coupa/ordenesCompras',
    'api-013': '/procurementprocesocompra/v1/respuestaOrdenCompra',
    'api-014': '/procurementprocesofinanciero/v1/respuestaPresupuesto',
    'api-015': '/procurementprocesocompra/v1/respuestaRecepciones',
    'api-016': '/procurementprocesocompra/v1/servicioOrdenCompra',
    'api-017': '/procurementprocesofinanciero/v1/consultarPresupuesto',
    'api-018': '/v1/beneficiarios/gestionar',
    'api-019': '/v1/inspecciones/vehicular',
    'api-022': '/v1/coaseguro/registrar',
    'api-023': '/v1/reaseguro/contratos',
    'api-025': '/v1/asistencias/solicitar',
    'api-026': '/v1/recaudo/registrar',
    'api-027': '/v1/documentos/consultar',
  };

  ngOnInit(): void {
    // If a preselected API was passed, auto-fill after APIs load
    if (this.preselectedApiId) {
      this.selectedApiId = this.preselectedApiId;
      this.onApiChange();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['preselectedApiId'] && this.preselectedApiId && !this.selectedApiId) {
      this.selectedApiId = this.preselectedApiId;
      this.onApiChange();
    }
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
