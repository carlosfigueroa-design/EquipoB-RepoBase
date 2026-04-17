import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-wrapper">
      <div class="sb-ui-card login-card">
        <h2 class="login-title">Portal de APIs — SIOP</h2>
        <p class="login-subtitle">Ingresa tu correo electrónico para recibir un código de acceso</p>

        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Correo electrónico</label>
            <input
              id="email"
              type="email"
              class="sb-ui-input"
              placeholder="usuario@segurosbolivar.com"
              [(ngModel)]="email"
              name="email"
              required
              [disabled]="loading"
            />
          </div>

          <button
            type="submit"
            class="sb-ui-button login-button"
            [disabled]="!email || loading"
          >
            {{ loading ? 'Enviando...' : 'Solicitar código OTP' }}
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: var(--sb-ui-bg-primary, #f5f7fa);
      padding: var(--sb-ui-spacing-md, 16px);
    }

    .login-card {
      width: 100%;
      max-width: 420px;
    }

    .login-title {
      margin: 0 0 var(--sb-ui-spacing-sm, 8px);
      font-family: var(--sb-ui-font-family, 'Segoe UI', sans-serif);
      font-size: var(--sb-ui-font-size-xl, 1.5rem);
      color: var(--sb-ui-color-primary, #003b7a);
      text-align: center;
    }

    .login-subtitle {
      margin: 0 0 var(--sb-ui-spacing-lg, 24px);
      font-family: var(--sb-ui-font-family, 'Segoe UI', sans-serif);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-text-secondary, #6c757d);
      text-align: center;
    }

    .login-form {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-md, 16px);
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-xs, 4px);
    }

    .form-label {
      font-family: var(--sb-ui-font-family, 'Segoe UI', sans-serif);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      font-weight: 600;
      color: var(--sb-ui-text-primary, #1a1a2e);
    }

    .login-button {
      width: 100%;
      margin-top: var(--sb-ui-spacing-sm, 8px);
    }
  `],
})
export class LoginComponent {
  email = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (!this.email || this.loading) return;

    this.loading = true;
    this.authService.requestOtp(this.email).subscribe({
      next: () => {
        console.log('Código OTP de desarrollo: 123456');
        this.router.navigate(['/auth/otp-verify'], {
          state: { email: this.email },
        });
      },
      error: () => {
        console.log('Código OTP de desarrollo: 123456');
        // Navigate anyway for MVP demo — backend may not be running
        this.router.navigate(['/auth/otp-verify'], {
          state: { email: this.email },
        });
      },
    });
  }
}
