import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="app-header">
      <div class="header-left">
        <a routerLink="/catalog" class="header-brand">
          <i class="fa-solid fa-shield-halved brand-icon"></i>
          <span class="brand-name">Portal de APIs — SIOP</span>
        </a>
      </div>

      <div class="header-right">
        <ng-container *ngIf="authService.isAuthenticated(); else loginTpl">
          <span class="user-info">
            <i class="fa-solid fa-user-circle"></i>
            {{ authService.getProfile()?.email }}
            <span class="user-role sb-ui-badge sb-ui-badge--info">
              {{ authService.getProfile()?.role }}
            </span>
          </span>
          <button class="sb-ui-button sb-ui-button--sm sb-ui-button--outline header-logout-btn" (click)="logout()">
            <i class="fa-solid fa-sign-out-alt"></i> Salir
          </button>
        </ng-container>
        <ng-template #loginTpl>
          <a routerLink="/auth/login" class="sb-ui-button sb-ui-button--sm header-login-btn">
            <i class="fa-solid fa-sign-in-alt"></i> Iniciar sesión
          </a>
        </ng-template>
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 var(--sb-ui-spacing-lg, 24px);
      height: 56px;
      background-color: var(--sb-ui-color-primary, #003b7a);
      color: var(--sb-ui-text-light, #ffffff);
      box-shadow: var(--sb-ui-shadow-sm, 0 1px 3px rgba(0,0,0,0.08));
      position: sticky;
      top: 0;
      z-index: 200;
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-sm, 8px);
      color: var(--sb-ui-text-light, #ffffff);
      text-decoration: none;
      font-weight: 700;
      font-size: var(--sb-ui-font-size-lg, 1.25rem);
    }

    .header-brand:hover { text-decoration: none; opacity: 0.9; }

    .brand-icon { font-size: 1.4rem; }

    .header-right {
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-md, 16px);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-sm, 8px);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
    }

    .user-role { font-size: var(--sb-ui-font-size-xs, 0.75rem); }

    .header-logout-btn {
      border-color: var(--sb-ui-text-light, #ffffff);
      color: var(--sb-ui-text-light, #ffffff);
    }
    .header-logout-btn:hover {
      background-color: rgba(255,255,255,0.15);
    }

    .header-login-btn {
      background-color: var(--sb-ui-color-secondary, #00a651);
    }
  `],
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
