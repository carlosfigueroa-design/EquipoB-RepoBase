import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxResponse } from '../../core/models/sandbox.model';

@Component({
  selector: 'app-response-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="response-viewer">
      @if (!response) {
        <div class="empty-state">
          <i class="fa fa-paper-plane"></i>
          <p>Ejecuta una petición para ver la respuesta aquí</p>
        </div>
      } @else {
        <div class="response-header">
          <span class="sb-ui-badge" [ngClass]="statusBadgeClass">
            {{ response.statusCode }} {{ statusText }}
          </span>
          <span class="meta-item">
            <i class="fa fa-clock"></i> {{ response.responseTimeMs }}ms
          </span>
        </div>

        <div class="response-section">
          <h4>Correlation-ID</h4>
          <code class="correlation-id">{{ response.correlationId }}</code>
        </div>

        <div class="response-section">
          <h4>Headers</h4>
          <div class="headers-list">
            @for (key of headerKeys; track key) {
              <div class="header-row">
                <span class="header-key">{{ key }}:</span>
                <span class="header-value">{{ response.headers[key] }}</span>
              </div>
            }
          </div>
        </div>

        <div class="response-section">
          <h4>Body</h4>
          <pre class="json-body">{{ formattedBody }}</pre>
        </div>
      }
    </div>
  `,
  styles: [`
    .response-viewer {
      height: 100%;
    }
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--sb-ui-spacing-xl, 32px);
      color: var(--sb-ui-text-secondary, #6c757d);
      text-align: center;
      min-height: 200px;
    }
    .empty-state i {
      font-size: 2.5rem;
      margin-bottom: var(--sb-ui-spacing-md, 16px);
      opacity: 0.4;
    }
    .response-header {
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-md, 16px);
      margin-bottom: var(--sb-ui-spacing-md, 16px);
      flex-wrap: wrap;
    }
    .meta-item {
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-text-secondary, #6c757d);
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .response-section {
      margin-bottom: var(--sb-ui-spacing-md, 16px);
    }
    .response-section h4 {
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      font-weight: 600;
      color: var(--sb-ui-text-secondary, #6c757d);
      margin: 0 0 var(--sb-ui-spacing-xs, 4px) 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .correlation-id {
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      background: var(--sb-ui-bg-primary, #f4faf6);
      padding: 4px 8px;
      border-radius: var(--sb-ui-border-radius-sm, 4px);
      word-break: break-all;
    }
    .headers-list {
      background: var(--sb-ui-bg-primary, #f4faf6);
      border-radius: var(--sb-ui-border-radius-sm, 4px);
      padding: var(--sb-ui-spacing-sm, 8px);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
    }
    .header-row {
      padding: 2px 0;
    }
    .header-key {
      font-weight: 600;
      color: var(--sb-ui-color-primary, #007A3D);
    }
    .header-value {
      margin-left: 4px;
      color: var(--sb-ui-text-primary, #1a1a2e);
    }
    .json-body {
      background: var(--sb-ui-bg-dark, #1a1a2e);
      color: var(--sb-ui-color-secondary-light, #FFC233);
      padding: var(--sb-ui-spacing-md, 16px);
      border-radius: var(--sb-ui-border-radius, 8px);
      overflow-x: auto;
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      max-height: 350px;
      overflow-y: auto;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
    }
  `]
})
export class ResponseViewerComponent {
  @Input() response: SandboxResponse | null = null;

  get statusBadgeClass(): string {
    if (!this.response) return '';
    const code = this.response.statusCode;
    if (code >= 200 && code < 300) return 'sb-ui-badge--success';
    if (code >= 400 && code < 500) return 'sb-ui-badge--warning';
    return 'sb-ui-badge--danger';
  }

  get statusText(): string {
    if (!this.response) return '';
    const map: Record<number, string> = {
      200: 'OK', 201: 'Created', 400: 'Bad Request',
      404: 'Not Found', 500: 'Internal Server Error'
    };
    return map[this.response.statusCode] ?? '';
  }

  get headerKeys(): string[] {
    return this.response ? Object.keys(this.response.headers) : [];
  }

  get formattedBody(): string {
    if (!this.response?.body) return '';
    try {
      return JSON.stringify(this.response.body, null, 2);
    } catch {
      return String(this.response.body);
    }
  }
}
