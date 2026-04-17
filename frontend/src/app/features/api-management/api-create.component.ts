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

      <form class="create-form sb-ui-card" (ngSubmit)="onSubmit()" #apiForm="ngForm">
        <!-- Nombre -->
        <div class="form-group">
          <label for="name">Nombre de la API *</label>
          <input
            id="name"
            class="sb-ui-input"
            type="text"
            [(ngModel)]="form.name"
            name="name"
            required
            placeholder="Ej: API de Emisión de Pólizas"
            aria-label="Nombre de la API"
          />
        </div>

        <!-- Categoría -->
        <div class="form-group">
          <label for="category">Categoría *</label>
          <select
            id="category"
            class="sb-ui-select"
            [(ngModel)]="form.category"
            name="category"
            required
            aria-label="Categoría de la API"
          >
            <option value="" disabled>Selecciona una categoría</option>
            @for (cat of categories; track cat) {
              <option [value]="cat">{{ cat }}</option>
            }
          </select>
        </div>

        <!-- Descripción resumida -->
        <div class="form-group">
          <label for="descriptionSummary">Descripción resumida *</label>
          <input
            id="descriptionSummary"
            class="sb-ui-input"
            type="text"
            [(ngModel)]="form.descriptionSummary"
            name="descriptionSummary"
            required
            placeholder="Breve resumen de la API"
            aria-label="Descripción resumida"
          />
        </div>

        <!-- Descripción completa -->
        <div class="form-group">
          <label for="description">Descripción completa *</label>
          <textarea
            id="description"
            class="sb-ui-textarea"
            [(ngModel)]="form.description"
            name="description"
            required
            rows="4"
            placeholder="Descripción detallada de la API y sus funcionalidades"
            aria-label="Descripción completa"
          ></textarea>
        </div>

        <!-- Casos de uso -->
        <div class="form-group">
          <label for="useCases">Casos de uso (separados por coma) *</label>
          <input
            id="useCases"
            class="sb-ui-input"
            type="text"
            [(ngModel)]="useCasesText"
            name="useCases"
            required
            placeholder="Ej: Emitir póliza, Generar certificado, Validar datos"
            aria-label="Casos de uso"
          />
        </div>

        <!-- Ícono -->
        <div class="form-group">
          <label for="icon">Ícono *</label>
          <select
            id="icon"
            class="sb-ui-select"
            [(ngModel)]="form.icon"
            name="icon"
            required
            aria-label="Ícono de la API"
          >
            <option value="" disabled>Selecciona un ícono</option>
            @for (ic of icons; track ic.value) {
              <option [value]="ic.value">{{ ic.label }}</option>
            }
          </select>
        </div>

        <!-- Equipo de contacto -->
        <fieldset class="form-fieldset">
          <legend>Equipo de contacto</legend>
          <div class="form-row">
            <div class="form-group">
              <label for="teamName">Nombre del equipo *</label>
              <input
                id="teamName"
                class="sb-ui-input"
                type="text"
                [(ngModel)]="form.contactTeam.teamName"
                name="teamName"
                required
                placeholder="Ej: Equipo Core Seguros"
                aria-label="Nombre del equipo"
              />
            </div>
            <div class="form-group">
              <label for="teamEmail">Email *</label>
              <input
                id="teamEmail"
                class="sb-ui-input"
                type="email"
                [(ngModel)]="form.contactTeam.email"
                name="teamEmail"
                required
                placeholder="equipo@segurosbolivar.com"
                aria-label="Email del equipo"
              />
            </div>
            <div class="form-group">
              <label for="teamArea">Área *</label>
              <input
                id="teamArea"
                class="sb-ui-input"
                type="text"
                [(ngModel)]="form.contactTeam.area"
                name="teamArea"
                required
                placeholder="Ej: Tecnología"
                aria-label="Área del equipo"
              />
            </div>
          </div>
        </fieldset>

        @if (errorMessage) {
          <div class="error-message">{{ errorMessage }}</div>
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
  `,
  styles: [`
    :host { display: block }
    .create-container { max-width: 800px; margin: 0 auto; padding: var(--sb-ui-spacing-lg, 24px) }
    .create-header { display: flex; align-items: center; gap: 16px; margin-bottom: 24px }
    .create-header h2 { margin: 0; color: var(--sb-ui-text-primary, #1a1a2e) }
    .create-form { display: flex; flex-direction: column; gap: 20px }
    .form-group { display: flex; flex-direction: column; gap: 6px }
    .form-group label { font-weight: 600; font-size: var(--sb-ui-font-size-sm, .875rem); color: var(--sb-ui-text-primary, #1a1a2e) }
    .form-fieldset { border: 1px solid var(--sb-ui-border-color, #dee2e6); border-radius: var(--sb-ui-border-radius, 8px); padding: 16px; margin: 0 }
    .form-fieldset legend { font-weight: 600; font-size: var(--sb-ui-font-size-sm, .875rem); color: var(--sb-ui-text-primary, #1a1a2e); padding: 0 8px }
    .form-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px }
    .form-actions { display: flex; justify-content: flex-end; gap: 12px; padding-top: 8px }
    .error-message { padding: 10px 14px; border-radius: var(--sb-ui-border-radius-sm, 4px); background: rgba(220, 53, 69, .1); color: var(--sb-ui-color-danger, #dc3545); font-size: var(--sb-ui-font-size-sm, .875rem) }
  `]
})
export class ApiCreateComponent {
  categories = ['Emisión', 'Renovación', 'Siniestros', 'Consultas', 'Cotización', 'Pagos', 'Cancelación', 'Autenticación', 'Notificaciones'];

  icons = [
    { value: 'fa-file-contract', label: '📄 Contratos (fa-file-contract)' },
    { value: 'fa-sync-alt', label: '🔄 Renovación (fa-sync-alt)' },
    { value: 'fa-car-crash', label: '🚗 Siniestros (fa-car-crash)' },
    { value: 'fa-search', label: '🔍 Consultas (fa-search)' },
    { value: 'fa-calculator', label: '🧮 Cotización (fa-calculator)' },
    { value: 'fa-credit-card', label: '💳 Pagos (fa-credit-card)' },
    { value: 'fa-ban', label: '🚫 Cancelación (fa-ban)' },
    { value: 'fa-shield-alt', label: '🛡️ Seguridad (fa-shield-alt)' },
    { value: 'fa-bell', label: '🔔 Notificaciones (fa-bell)' },
    { value: 'fa-cogs', label: '⚙️ General (fa-cogs)' },
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

  constructor(
    private lifecycleService: LifecycleService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (this.submitting) return;
    this.submitting = true;
    this.errorMessage = '';

    const payload: CreateApiPayload = {
      ...this.form,
      useCases: this.useCasesText.split(',').map((s) => s.trim()).filter(Boolean),
    };

    this.lifecycleService.createApi(payload).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
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
