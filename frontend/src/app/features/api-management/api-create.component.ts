import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LifecycleService, CreateApiPayload } from '../../core/services/lifecycle.service';

@Component({
  selector: 'app-api-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-container">
      <header class="create-header">
        <button class="sb-ui-button sb-ui-button--outline sb-ui-button--sm" (click)="cancel()">
          <i class="fa fa-arrow-left"></i> Volver
        </button>
        <h2>Crear nueva API</h2>
      </header>

      <div class="create-form sb-ui-card">
        <!-- JSON Upload Section -->
        <div class="upload-section">
          <h3><i class="fa fa-file-code"></i> Cargar especificación OpenAPI (JSON)</h3>
          <p class="upload-hint">Sube un archivo JSON con la especificación OpenAPI 3.0 y los datos se completarán automáticamente.</p>

          <div class="upload-area"
               (dragover)="onDragOver($event)"
               (dragleave)="onDragLeave($event)"
               (drop)="onDrop($event)"
               [class.drag-over]="isDragOver">
            <i class="fa fa-cloud-arrow-up upload-icon"></i>
            <p>Arrastra tu archivo JSON aquí o</p>
            <label class="sb-ui-button sb-ui-button--outline sb-ui-button--sm upload-btn">
              <i class="fa fa-folder-open"></i> Seleccionar archivo
              <input type="file" accept=".json" (change)="onFileSelected($event)" hidden />
            </label>
            @if (fileName) {
              <div class="file-info">
                <i class="fa fa-check-circle"></i> {{ fileName }}
              </div>
            }
          </div>

          @if (parseError) {
            <div class="error-message"><i class="fa fa-exclamation-triangle"></i> {{ parseError }}</div>
          }
        </div>

        <div class="divider">
          <span>Datos de la API</span>
        </div>

        <!-- Form fields (auto-filled from JSON) -->
        <form (ngSubmit)="onSubmit()" #apiForm="ngForm">
          <div class="form-grid">
            <div class="form-group">
              <label for="name">Nombre de la API *</label>
              <input id="name" class="sb-ui-input" type="text" [(ngModel)]="form.name" name="name" required placeholder="Ej: API de Emisión de Pólizas" />
            </div>
            <div class="form-group">
              <label for="category">Categoría *</label>
              <select id="category" class="sb-ui-select" [(ngModel)]="form.category" name="category" required>
                <option value="" disabled>Selecciona una categoría</option>
                @for (cat of categories; track cat) {
                  <option [value]="cat">{{ cat }}</option>
                }
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="descriptionSummary">Descripción resumida *</label>
            <input id="descriptionSummary" class="sb-ui-input" type="text" [(ngModel)]="form.descriptionSummary" name="descriptionSummary" required placeholder="Breve resumen" />
          </div>

          <div class="form-group">
            <label for="description">Descripción completa *</label>
            <textarea id="description" class="sb-ui-textarea" [(ngModel)]="form.description" name="description" required rows="3" placeholder="Descripción detallada"></textarea>
          </div>

          <div class="form-group">
            <label for="useCases">Casos de uso (separados por coma) *</label>
            <input id="useCases" class="sb-ui-input" type="text" [(ngModel)]="useCasesText" name="useCases" required placeholder="Ej: Emitir póliza, Generar certificado" />
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="icon">Ícono *</label>
              <select id="icon" class="sb-ui-select" [(ngModel)]="form.icon" name="icon" required>
                <option value="" disabled>Selecciona un ícono</option>
                @for (ic of icons; track ic.value) {
                  <option [value]="ic.value">{{ ic.label }}</option>
                }
              </select>
            </div>
            <div class="form-group">
              <label for="teamName">Equipo *</label>
              <input id="teamName" class="sb-ui-input" type="text" [(ngModel)]="form.contactTeam.teamName" name="teamName" required placeholder="Equipo responsable" />
            </div>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="teamEmail">Email del equipo *</label>
              <input id="teamEmail" class="sb-ui-input" type="email" [(ngModel)]="form.contactTeam.email" name="teamEmail" required placeholder="equipo@segurosbolivar.com" />
            </div>
            <div class="form-group">
              <label for="teamArea">Área *</label>
              <input id="teamArea" class="sb-ui-input" type="text" [(ngModel)]="form.contactTeam.area" name="teamArea" required placeholder="Ej: Tecnología" />
            </div>
          </div>

          @if (specPreview) {
            <div class="spec-preview">
              <h4><i class="fa fa-eye"></i> Vista previa del spec</h4>
              <div class="spec-stats">
                <span class="stat"><i class="fa fa-route"></i> {{ specEndpoints }} endpoints</span>
                <span class="stat"><i class="fa fa-tag"></i> {{ specVersion }}</span>
              </div>
              <pre class="spec-json">{{ specPreview }}</pre>
            </div>
          }

          @if (errorMessage) {
            <div class="error-message">{{ errorMessage }}</div>
          }
          @if (successMessage) {
            <div class="success-message"><i class="fa fa-check-circle"></i> {{ successMessage }}</div>
          }

          <div class="form-actions">
            <button type="button" class="sb-ui-button sb-ui-button--outline" (click)="cancel()">Cancelar</button>
            <button type="submit" class="sb-ui-button" [disabled]="!apiForm.valid || submitting">
              @if (submitting) {
                <span class="sb-ui-spinner" style="width:18px;height:18px;border-width:2px"></span>
              } @else {
                <i class="fa fa-plus"></i> Crear API
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block }
    .create-container { max-width: 800px; margin: 0 auto; padding: var(--sb-ui-spacing-lg, 24px) }
    .create-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px }
    .create-header h2 { margin: 0; color: var(--sb-ui-text-primary, #1a1a2e) }
    .create-form { display: flex; flex-direction: column; gap: 20px }
    .upload-section h3 { margin: 0 0 4px; font-size: 1rem; color: var(--sb-ui-text-primary, #1a1a2e); display: flex; align-items: center; gap: 8px }
    .upload-hint { margin: 0 0 12px; font-size: var(--sb-ui-font-size-sm, .875rem); color: var(--sb-ui-text-secondary, #6c757d) }
    .upload-area { border: 2px dashed var(--sb-ui-border-color, #dee2e6); border-radius: 8px; padding: 32px; text-align: center; transition: all 0.2s; cursor: pointer }
    .upload-area.drag-over { border-color: var(--sb-ui-color-primary, #007A3D); background: var(--sb-ui-bg-primary, #f4faf6) }
    .upload-icon { font-size: 2rem; color: var(--sb-ui-text-muted, #adb5bd); margin-bottom: 8px }
    .upload-area p { color: var(--sb-ui-text-secondary, #6c757d); margin: 0 0 12px; font-size: var(--sb-ui-font-size-sm, .875rem) }
    .upload-btn { cursor: pointer }
    .file-info { margin-top: 12px; color: var(--sb-ui-color-primary, #007A3D); font-weight: 600; font-size: var(--sb-ui-font-size-sm, .875rem); display: flex; align-items: center; justify-content: center; gap: 6px }
    .divider { text-align: center; position: relative; margin: 8px 0 }
    .divider span { background: var(--sb-ui-color-grayscale-white, #fff); padding: 0 12px; font-size: var(--sb-ui-font-size-sm, .875rem); color: var(--sb-ui-text-secondary, #6c757d); position: relative; z-index: 1 }
    .divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--sb-ui-border-color, #dee2e6) }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px }
    .form-group { display: flex; flex-direction: column; gap: 6px }
    .form-group label { font-weight: 600; font-size: var(--sb-ui-font-size-sm, .875rem); color: var(--sb-ui-text-primary, #1a1a2e) }
    .form-actions { display: flex; justify-content: flex-end; gap: 12px; padding-top: 8px }
    .error-message { padding: 10px 14px; border-radius: 4px; background: rgba(220, 53, 69, .1); color: var(--sb-ui-color-danger, #dc3545); font-size: var(--sb-ui-font-size-sm, .875rem); display: flex; align-items: center; gap: 6px }
    .success-message { padding: 10px 14px; border-radius: 4px; background: rgba(0, 122, 61, .1); color: var(--sb-ui-color-primary, #007A3D); font-size: var(--sb-ui-font-size-sm, .875rem); display: flex; align-items: center; gap: 6px }
    .spec-preview { background: var(--sb-ui-bg-primary, #f4faf6); border-radius: 8px; padding: 16px; border: 1px solid var(--sb-ui-border-color, #dee2e6) }
    .spec-preview h4 { margin: 0 0 8px; font-size: var(--sb-ui-font-size-sm, .875rem); color: var(--sb-ui-text-primary, #1a1a2e); display: flex; align-items: center; gap: 6px }
    .spec-stats { display: flex; gap: 16px; margin-bottom: 8px }
    .stat { font-size: var(--sb-ui-font-size-xs, .75rem); color: var(--sb-ui-color-primary, #007A3D); font-weight: 600; display: flex; align-items: center; gap: 4px }
    .spec-json { background: var(--sb-ui-bg-dark, #1a1a2e); color: var(--sb-ui-color-secondary-light, #FFC233); padding: 12px; border-radius: 4px; font-size: .75rem; max-height: 200px; overflow: auto; margin: 0; white-space: pre-wrap; word-break: break-word }
    @media (max-width: 576px) { .form-grid { grid-template-columns: 1fr } }
  `]
})
export class ApiCreateComponent {
  categories = ['Emisión', 'Renovación', 'Siniestros', 'Consultas', 'Cotización', 'Pagos', 'Cancelación', 'Autenticación', 'Notificaciones', 'CAI - Procurement', 'CAI - Financiero', 'Beneficiarios', 'Inspección', 'Coaseguro', 'Reaseguro', 'Asistencias', 'Documentos', 'Salud', 'Firma Digital', 'Suscripción'];

  icons = [
    { value: 'fa-file-contract', label: '📄 Contratos' },
    { value: 'fa-sync-alt', label: '🔄 Renovación' },
    { value: 'fa-car-crash', label: '🚗 Siniestros' },
    { value: 'fa-search', label: '🔍 Consultas' },
    { value: 'fa-calculator', label: '🧮 Cotización' },
    { value: 'fa-credit-card', label: '💳 Pagos' },
    { value: 'fa-ban', label: '🚫 Cancelación' },
    { value: 'fa-shield-alt', label: '🛡️ Seguridad' },
    { value: 'fa-bell', label: '🔔 Notificaciones' },
    { value: 'fa-cogs', label: '⚙️ General' },
    { value: 'fa-cart-shopping', label: '🛒 Compras' },
    { value: 'fa-handshake', label: '🤝 Servicios' },
    { value: 'fa-users', label: '👥 Usuarios' },
    { value: 'fa-car', label: '🚙 Vehículos' },
    { value: 'fa-stethoscope', label: '🩺 Salud' },
  ];

  form = {
    name: '',
    category: '',
    description: '',
    descriptionSummary: '',
    icon: '',
    contactTeam: { teamName: '', email: '', area: '' },
  };

  useCasesText = '';
  submitting = false;
  errorMessage = '';
  successMessage = '';
  parseError = '';
  fileName = '';
  isDragOver = false;
  specPreview = '';
  specEndpoints = 0;
  specVersion = '';
  private uploadedSpec: unknown = null;

  constructor(
    private lifecycleService: LifecycleService,
    private router: Router,
  ) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.processFile(file);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) this.processFile(file);
  }

  private processFile(file: File): void {
    this.parseError = '';
    this.fileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const spec = JSON.parse(reader.result as string) as Record<string, unknown>;
        this.uploadedSpec = spec;
        this.extractFromSpec(spec);
      } catch {
        this.parseError = 'El archivo no es un JSON válido. Verifica el formato.';
        this.uploadedSpec = null;
      }
    };
    reader.readAsText(file);
  }

  private extractFromSpec(spec: Record<string, unknown>): void {
    const info = spec['info'] as Record<string, unknown> | undefined;
    if (info) {
      if (info['title'] && !this.form.name) this.form.name = info['title'] as string;
      if (info['description']) {
        const desc = info['description'] as string;
        if (!this.form.description) this.form.description = desc;
        if (!this.form.descriptionSummary) this.form.descriptionSummary = desc.substring(0, 100);
      }
      if (info['version']) this.specVersion = info['version'] as string;
      const contact = info['contact'] as Record<string, unknown> | undefined;
      if (contact) {
        if (contact['name'] && !this.form.contactTeam.teamName) this.form.contactTeam.teamName = contact['name'] as string;
        if (contact['email'] && !this.form.contactTeam.email) this.form.contactTeam.email = contact['email'] as string;
      }
    }

    const paths = spec['paths'] as Record<string, unknown> | undefined;
    if (paths) {
      this.specEndpoints = Object.keys(paths).length;
      const pathNames = Object.keys(paths).slice(0, 3).join(', ');
      if (!this.useCasesText) this.useCasesText = pathNames;
    }

    this.specPreview = JSON.stringify(spec, null, 2).substring(0, 800) + (JSON.stringify(spec).length > 800 ? '\n...' : '');
  }

  onSubmit(): void {
    if (this.submitting) return;
    this.submitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload: CreateApiPayload = {
      ...this.form,
      useCases: this.useCasesText.split(',').map((s) => s.trim()).filter(Boolean),
    };

    this.lifecycleService.createApi(payload).subscribe({
      next: () => {
        this.successMessage = 'API creada exitosamente';
        setTimeout(() => this.router.navigate(['/admin']), 1500);
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'Error al crear la API. Verifica los datos e intenta nuevamente.';
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
