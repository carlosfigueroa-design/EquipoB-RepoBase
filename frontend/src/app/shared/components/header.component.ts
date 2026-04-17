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
          <img src="assets/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="brand-logo" />
          <span class="brand-divider"></span>
          <span class="brand-name">Vínculo Bolívar</span>
        </a>
      </div>

      <div class="header-right">
        <ng-container *ngIf="authService.isAuthenticated(); else loginTpl">
          <span class="user-info">
            <span class="user-avatar">
              <i class="fa-solid fa-user"></i>
            </span>
            <span class="user-details">
              <span class="user-email">{{ authService.getProfile()?.email }}</span>
              <span class="user-role sb-ui-badge sb-ui-badge--info">
                {{ authService.getProfile()?.role }}
              </span>
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
      height: 64px;
      background: linear-gradient(135deg, var(--sb-ui-color-primary, #007A3D) 0%, var(--sb-ui-color-primary-light, #009648) 100%);
      color: var(--sb-ui-text-light, #FFFFFF);
      box-shadow: 0 2px 8px rgba(0, 122, 61, 0.2);
      position: sticky;
      top: 0;
      z-index: 200;
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--sb-ui-text-light, #FFFFFF);
      text-decoration: none;
      font-weight: 700;
      font-size: var(--sb-ui-font-size-lg, 1.25rem);
    }

    .header-brand:hover { text-decoration: none; opacity: 0.95; }

    .brand-logo {
      height: 40px;
      width: auto;
      object-fit: contain;
      border-radius: 4px;
    }

    .brand-divider {
      width: 1px;
      height: 28px;
      background-color: rgba(255, 255, 255, 0.35);
    }

    .brand-name {
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.3px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-md, 16px);
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
    }

    .user-details {
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-sm, 8px);
    }

    .user-email {
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
    }

    .user-role { font-size: var(--sb-ui-font-size-xs, 0.75rem); }

    .header-logout-btn {
      border-color: rgba(255, 255, 255, 0.6);
      color: var(--sb-ui-text-light, #FFFFFF);
      transition: all 0.2s ease;
    }
    .header-logout-btn:hover {
      background-color: rgba(255, 255, 255, 0.15);
      border-color: var(--sb-ui-text-light, #FFFFFF);
    }

    .header-login-btn {
      background-color: var(--sb-ui-color-secondary, #F5A800);
      color: var(--sb-ui-color-grayscale-D400, #282828);
      font-weight: 600;
      transition: all 0.2s ease;
    }
    .header-login-btn:hover {
      background-color: var(--sb-ui-color-secondary-light, #FFC233);
    }

    @media (max-width: 768px) {
      .brand-name { display: none; }
      .brand-divider { display: none; }
      .user-email { display: none; }
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
