import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { HeaderComponent } from './shared/components/header.component';
import { SidebarComponent } from './shared/components/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <ng-container *ngIf="isAuthRoute; else shellLayout">
      <router-outlet />
    </ng-container>

    <ng-template #shellLayout>
      <div class="app-shell">
        <app-header />
        <div class="app-body">
          <app-sidebar />
          <main class="app-content">
            <router-outlet />
          </main>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .app-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .app-body {
      display: flex;
      flex: 1;
    }

    .app-content {
      flex: 1;
      padding: var(--sb-ui-spacing-lg, 24px);
      background-color: var(--sb-ui-bg-primary, #f4faf6);
      overflow-y: auto;
    }
  `],
})
export class AppComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  get isAuthRoute(): boolean {
    return this.router.url.startsWith('/auth') || this.router.url === '/';
  }
}
