import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="app-sidebar">
      <ul class="sidebar-nav">
        <li>
          <a routerLink="/catalog" routerLinkActive="active" class="nav-link">
            <i class="fa-solid fa-book"></i>
            <span>Catálogo</span>
          </a>
        </li>
        <ng-container *ngIf="authService.isAuthenticated()">
          <li>
            <a routerLink="/swagger" routerLinkActive="active" class="nav-link">
              <i class="fa-solid fa-code"></i>
              <span>Swagger</span>
            </a>
          </li>
          <li>
            <a routerLink="/sandbox" routerLinkActive="active" class="nav-link">
              <i class="fa-solid fa-flask"></i>
              <span>Sandbox</span>
            </a>
          </li>
          <li>
            <a routerLink="/ai" routerLinkActive="active" class="nav-link">
              <i class="fa-solid fa-robot"></i>
              <span>Asistente IA</span>
            </a>
          </li>
          <li *ngIf="isAdmin">
            <a routerLink="/admin" routerLinkActive="active" class="nav-link">
              <i class="fa-solid fa-cog"></i>
              <span>Administración</span>
            </a>
          </li>
        </ng-container>
      </ul>
    </nav>
  `,
  styles: [`
    .app-sidebar {
      width: 220px;
      min-height: 100%;
      background-color: var(--sb-ui-bg-sidebar, #002a5c);
      padding: var(--sb-ui-spacing-md, 16px) 0;
      flex-shrink: 0;
    }

    .sidebar-nav {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-xs, 4px);
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: var(--sb-ui-spacing-sm, 8px);
      padding: var(--sb-ui-spacing-sm, 8px) var(--sb-ui-spacing-lg, 24px);
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      font-weight: 500;
      transition: background-color 0.2s, color 0.2s;
      border-left: 3px solid transparent;
    }

    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.08);
      color: var(--sb-ui-text-light, #ffffff);
      text-decoration: none;
    }

    .nav-link.active {
      background-color: rgba(255, 255, 255, 0.12);
      color: var(--sb-ui-text-light, #ffffff);
      border-left-color: var(--sb-ui-color-secondary, #00a651);
      font-weight: 600;
    }

    .nav-link i { width: 20px; text-align: center; }
  `],
})
export class SidebarComponent {
  constructor(public authService: AuthService) {}

  get isAdmin(): boolean {
    return this.authService.getProfile()?.role === 'Admin';
  }
}
