import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsService } from '../../core/services/analytics.service';
import { AnalyticsDashboard } from '../../core/models/analytics.model';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['../../shared/styles/admin-layout.scss'],
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <div class="header-content">
          <div class="header-left">
            <h1><i class="fa-solid fa-chart-line"></i> Analítica del Portal</h1>
            <p>Métricas en tiempo real del portal Vínculo Bolívar</p>
          </div>
          <div class="header-stats" *ngIf="data">
            <div class="stat-pill">
              <i class="fa-solid fa-eye"></i>
              {{ data.usage.totalVisits | number }} visitas
            </div>
            <div class="stat-pill">
              <i class="fa-solid fa-users"></i>
              {{ data.usage.totalUniqueUsers | number }} usuarios únicos
            </div>
          </div>
        </div>
      </header>

      <main class="admin-content">
        <div *ngIf="loading" class="loading-state">
          <span class="sb-ui-spinner" style="width:32px;height:32px"></span>
          <p>Cargando métricas...</p>
        </div>

        <div *ngIf="error" class="error-state">
          <i class="fa-solid fa-exclamation-triangle"></i>
          <p>{{ error }}</p>
          <button class="sb-ui-button" (click)="loadDashboard()">Reintentar</button>
        </div>

        <div *ngIf="data && !loading" class="dashboard-grid">

          <!-- SECCIÓN 1: Métricas de Uso -->
          <section class="dashboard-section">
            <h2 class="section-title">
              <i class="fa-solid fa-chart-bar"></i> Métricas de Uso
            </h2>

            <div class="cards-row">
              <div class="metric-card">
                <div class="metric-icon visits"><i class="fa-solid fa-eye"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ data.usage.totalVisits | number }}</span>
                  <span class="metric-label">Visitas totales (7 días)</span>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon users"><i class="fa-solid fa-user-group"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ data.usage.totalUniqueUsers | number }}</span>
                  <span class="metric-label">Usuarios únicos</span>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon avg"><i class="fa-solid fa-calculator"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ avgDailyVisits | number:'1.0-0' }}</span>
                  <span class="metric-label">Promedio diario</span>
                </div>
              </div>
            </div>

            <div class="charts-row">
              <div class="chart-card">
                <h3>Visitas por día</h3>
                <div class="bar-chart">
                  <div class="bar-item" *ngFor="let v of data.usage.visitsTrend">
                    <div class="bar-fill" [style.height.%]="getBarHeight(v.count, maxVisits)">
                      <span class="bar-value">{{ v.count }}</span>
                    </div>
                    <span class="bar-label">{{ formatDate(v.date) }}</span>
                  </div>
                </div>
              </div>

              <div class="chart-card">
                <h3>Dispositivos</h3>
                <div class="device-list">
                  <div class="device-item" *ngFor="let d of data.usage.devices">
                    <div class="device-header">
                      <i [class]="getDeviceIcon(d.type)"></i>
                      <span class="device-name">{{ d.type }}</span>
                      <span class="device-pct">{{ d.percentage }}%</span>
                    </div>
                    <div class="progress-bar">
                      <div class="progress-fill" [style.width.%]="d.percentage"
                           [class]="'fill-' + d.type.toLowerCase()"></div>
                    </div>
                    <span class="device-count">{{ d.count | number }} sesiones</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- SECCIÓN 2: Engagement -->
          <section class="dashboard-section">
            <h2 class="section-title">
              <i class="fa-solid fa-heart-pulse"></i> Engagement
            </h2>

            <div class="cards-row">
              <div class="metric-card">
                <div class="metric-icon time"><i class="fa-solid fa-clock"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ formatTime(data.engagement.avgTimeOnSite) }}</span>
                  <span class="metric-label">Tiempo promedio en sitio</span>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon pages"><i class="fa-solid fa-file-lines"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ data.engagement.pagesPerSession }}</span>
                  <span class="metric-label">Páginas por sesión</span>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon bounce"><i class="fa-solid fa-arrow-right-from-bracket"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ data.engagement.bounceRate }}%</span>
                  <span class="metric-label">Tasa de rebote</span>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon returning"><i class="fa-solid fa-rotate"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ data.engagement.returningUsers }}%</span>
                  <span class="metric-label">Usuarios recurrentes</span>
                </div>
              </div>
            </div>
          </section>

          <!-- SECCIÓN 3: Métricas de Negocio -->
          <section class="dashboard-section">
            <h2 class="section-title">
              <i class="fa-solid fa-briefcase"></i> Métricas de Negocio
            </h2>

            <div class="cards-row">
              <div class="metric-card">
                <div class="metric-icon api-calls"><i class="fa-solid fa-plug"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ data.business.apiCallsTotal | number }}</span>
                  <span class="metric-label">Llamadas a APIs (7 días)</span>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon sandbox"><i class="fa-solid fa-flask"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ data.business.sandboxAdoption.totalExecutions | number }}</span>
                  <span class="metric-label">Ejecuciones en Sandbox</span>
                </div>
              </div>
              <div class="metric-card">
                <div class="metric-icon devs"><i class="fa-solid fa-code"></i></div>
                <div class="metric-info">
                  <span class="metric-value">{{ data.business.sandboxAdoption.uniqueDevelopers }}</span>
                  <span class="metric-label">Desarrolladores activos</span>
                </div>
              </div>
            </div>

            <div class="charts-row">
              <div class="chart-card">
                <h3>Llamadas a APIs por día</h3>
                <div class="bar-chart">
                  <div class="bar-item" *ngFor="let t of data.business.apiCallsTrend">
                    <div class="bar-fill business-bar" [style.height.%]="getBarHeight(t.count, maxApiCalls)">
                      <span class="bar-value">{{ t.count | number }}</span>
                    </div>
                    <span class="bar-label">{{ formatDate(t.date) }}</span>
                  </div>
                </div>
              </div>

              <div class="chart-card">
                <h3>Top APIs más consumidas</h3>
                <div class="top-apis-list">
                  <div class="top-api-item" *ngFor="let api of data.business.topApis; let i = index">
                    <span class="api-rank">#{{ i + 1 }}</span>
                    <div class="api-info">
                      <span class="api-name">{{ api.name }}</span>
                      <div class="progress-bar">
                        <div class="progress-fill fill-api" [style.width.%]="api.percentage"></div>
                      </div>
                    </div>
                    <span class="api-calls">{{ api.calls | number }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-grid {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .dashboard-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .section-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--sb-ui-color-grayscale-D400, #282828);
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--sb-ui-color-primary-L300, #E5F4EE);
    }

    .section-title i {
      color: var(--sb-ui-color-primary-base, #009056);
    }

    .cards-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }

    .metric-card {
      background: var(--sb-ui-color-grayscale-white, #FFFFFF);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: var(--sb-ui-shadow-m, 0 2px 8px rgba(0,0,0,0.06));
      border: 1px solid var(--sb-ui-color-grayscale-L200, #E1E1E1);
      transition: all 0.2s ease;
    }

    .metric-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }

    .metric-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .metric-icon.visits { background: #E8F5E9; color: #2E7D32; }
    .metric-icon.users { background: #E3F2FD; color: #1565C0; }
    .metric-icon.avg { background: #FFF3E0; color: #E65100; }
    .metric-icon.time { background: #F3E5F5; color: #7B1FA2; }
    .metric-icon.pages { background: #E0F7FA; color: #00838F; }
    .metric-icon.bounce { background: #FCE4EC; color: #C62828; }
    .metric-icon.returning { background: #E8EAF6; color: #283593; }
    .metric-icon.api-calls { background: #E8F5E9; color: #2E7D32; }
    .metric-icon.sandbox { background: #FFF8E1; color: #F57F17; }
    .metric-icon.devs { background: #E3F2FD; color: #1565C0; }

    .metric-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .metric-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--sb-ui-color-grayscale-D400, #282828);
      line-height: 1.2;
    }

    .metric-label {
      font-size: 0.8rem;
      color: var(--sb-ui-color-grayscale-D200, #5B5B5B);
    }

    .charts-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .chart-card {
      background: var(--sb-ui-color-grayscale-white, #FFFFFF);
      border-radius: 12px;
      padding: 20px;
      box-shadow: var(--sb-ui-shadow-m, 0 2px 8px rgba(0,0,0,0.06));
      border: 1px solid var(--sb-ui-color-grayscale-L200, #E1E1E1);
    }

    .chart-card h3 {
      margin: 0 0 16px;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--sb-ui-color-grayscale-D400, #282828);
    }

    .bar-chart {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      height: 180px;
      padding-top: 20px;
    }

    .bar-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      justify-content: flex-end;
    }

    .bar-fill {
      width: 100%;
      max-width: 48px;
      background: linear-gradient(180deg, var(--sb-ui-color-primary-base, #009056) 0%, var(--sb-ui-color-primary-D200, #05794A) 100%);
      border-radius: 6px 6px 0 0;
      position: relative;
      min-height: 4px;
      transition: height 0.5s ease;
    }

    .bar-fill.business-bar {
      background: linear-gradient(180deg, #1565C0 0%, #0D47A1 100%);
    }

    .bar-value {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--sb-ui-color-grayscale-D200, #5B5B5B);
      white-space: nowrap;
    }

    .bar-label {
      margin-top: 8px;
      font-size: 0.7rem;
      color: var(--sb-ui-color-grayscale-D200, #5B5B5B);
    }

    .device-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .device-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .device-header {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .device-header i {
      color: var(--sb-ui-color-primary-base, #009056);
      width: 18px;
      text-align: center;
    }

    .device-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--sb-ui-color-grayscale-D400, #282828);
      flex: 1;
    }

    .device-pct {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--sb-ui-color-primary-base, #009056);
    }

    .device-count {
      font-size: 0.75rem;
      color: var(--sb-ui-color-grayscale-D200, #5B5B5B);
    }

    .progress-bar {
      height: 8px;
      background: var(--sb-ui-color-grayscale-L400, #FAFAFA);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.5s ease;
    }

    .fill-desktop { background: var(--sb-ui-color-primary-base, #009056); }
    .fill-mobile { background: #1565C0; }
    .fill-tablet { background: #F57F17; }
    .fill-api { background: linear-gradient(90deg, var(--sb-ui-color-primary-base, #009056), var(--sb-ui-color-primary-D200, #05794A)); }

    .top-apis-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .top-api-item {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .api-rank {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--sb-ui-color-primary-base, #009056);
      width: 28px;
      text-align: center;
    }

    .api-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .api-name {
      font-size: 0.825rem;
      font-weight: 500;
      color: var(--sb-ui-color-grayscale-D400, #282828);
    }

    .api-calls {
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--sb-ui-color-grayscale-D200, #5B5B5B);
      white-space: nowrap;
    }

    .loading-state, .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 0;
      gap: 12px;
      color: var(--sb-ui-color-grayscale-D200, #5B5B5B);
    }

    .error-state i {
      font-size: 2rem;
      color: var(--sb-ui-color-feedback-error-base, #dc3545);
    }

    .header-stats {
      display: flex;
      gap: 12px;
    }

    .stat-pill {
      background: rgba(255,255,255,0.15);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 0.8rem;
      color: var(--sb-ui-text-light, #FFFFFF);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    @media (max-width: 768px) {
      .charts-row { grid-template-columns: 1fr; }
      .cards-row { grid-template-columns: 1fr 1fr; }
      .header-stats { display: none; }
    }

    @media (max-width: 576px) {
      .cards-row { grid-template-columns: 1fr; }
    }
  `],
})
export class AnalyticsDashboardComponent implements OnInit {
  data: AnalyticsDashboard | null = null;
  loading = true;
  error = '';

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.error = '';
    this.analyticsService.getDashboard().subscribe({
      next: (dashboard) => {
        this.data = dashboard;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las métricas. Intente nuevamente.';
        this.loading = false;
      },
    });
  }

  get maxVisits(): number {
    if (!this.data) return 1;
    return Math.max(...this.data.usage.visitsTrend.map((v) => v.count));
  }

  get maxApiCalls(): number {
    if (!this.data) return 1;
    return Math.max(...this.data.business.apiCallsTrend.map((t) => t.count));
  }

  get avgDailyVisits(): number {
    if (!this.data || this.data.usage.visitsTrend.length === 0) return 0;
    return this.data.usage.totalVisits / this.data.usage.visitsTrend.length;
  }

  getBarHeight(value: number, max: number): number {
    return max > 0 ? (value / max) * 90 : 0;
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric' });
  }

  formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec}s`;
  }

  getDeviceIcon(type: string): string {
    const icons: Record<string, string> = {
      Desktop: 'fa-solid fa-desktop',
      Mobile: 'fa-solid fa-mobile-screen',
      Tablet: 'fa-solid fa-tablet-screen-button',
    };
    return icons[type] || 'fa-solid fa-globe';
  }
}
