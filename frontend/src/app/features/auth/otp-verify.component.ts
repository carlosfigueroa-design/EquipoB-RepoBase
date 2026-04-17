import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-otp-verify',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="otp-wrapper">
      <div class="sb-ui-card otp-card">
        <h2 class="otp-title">Verificar código OTP</h2>
        <p class="otp-subtitle">
          Ingresa el código enviado a <strong>{{ email }}</strong>
        </p>

        <form (ngSubmit)="onVerify()" class="otp-form">
          <div class="form-group">
            <label for="otp" class="form-label">Código OTP</label>
            <input
              id="otp"
              type="text"
              class="sb-ui-input"
              placeholder="Ingresa el código de 6 dígitos"
              [(ngModel)]="otp"
              name="otp"
              maxlength="6"
              required
              [disabled]="loading"
            />
          </div>

          <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>

          <button
            type="submit"
            class="sb-ui-button verify-button"
            [disabled]="!otp || loading"
          >
            {{ loading ? 'Verificando...' : 'Verificar código' }}
          </button>
        </form>

        <button
          type="button"
          class="resend-link"
          (click)="onResendOtp()"
          [disabled]="loading"
        >
          Reenviar código
        </button>
      </div>
    </div>
  `,
  styles: [`
    .otp-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: var(--sb-ui-bg-primary, #f5f7fa);
      padding: var(--sb-ui-spacing-md, 16px);
    }

    .otp-card {
      width: 100%;
      max-width: 420px;
    }

    .otp-title {
      margin: 0 0 var(--sb-ui-spacing-sm, 8px);
      font-family: var(--sb-ui-font-family, 'Segoe UI', sans-serif);
      font-size: var(--sb-ui-font-size-xl, 1.5rem);
      color: var(--sb-ui-color-primary, #003b7a);
      text-align: center;
    }

    .otp-subtitle {
      margin: 0 0 var(--sb-ui-spacing-lg, 24px);
      font-family: var(--sb-ui-font-family, 'Segoe UI', sans-serif);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-text-secondary, #6c757d);
      text-align: center;
    }

    .otp-form {
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

    .error-message {
      margin: 0;
      font-family: var(--sb-ui-font-family, 'Segoe UI', sans-serif);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-color-danger, #dc3545);
      text-align: center;
    }

    .verify-button {
      width: 100%;
      margin-top: var(--sb-ui-spacing-sm, 8px);
    }

    .resend-link {
      display: block;
      margin: var(--sb-ui-spacing-md, 16px) auto 0;
      background: none;
      border: none;
      font-family: var(--sb-ui-font-family, 'Segoe UI', sans-serif);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-color-primary, #003b7a);
      cursor: pointer;
      text-decoration: underline;
    }

    .resend-link:hover {
      color: var(--sb-ui-color-primary-light, #1a5fa8);
    }

    .resend-link:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `],
})
export class OtpVerifyComponent implements OnInit {
  email = '';
  otp = '';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { email?: string } | undefined;
    if (state?.email) {
      this.email = state.email;
    } else {
      // Try to get from history state (browser back/forward)
      const historyState = history.state as { email?: string } | undefined;
      if (historyState?.email) {
        this.email = historyState.email;
      } else {
        // No email available, redirect back to login
        this.router.navigate(['/auth/login']);
      }
    }
  }

  onVerify(): void {
    if (!this.otp || this.loading) return;

    this.loading = true;
    this.errorMessage = '';

    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Código inválido, intente nuevamente';
      },
    });
  }

  onResendOtp(): void {
    if (this.loading) return;

    this.authService.requestOtp(this.email).subscribe({
      next: () => {
        console.log('Código OTP de desarrollo: 123456');
        this.errorMessage = '';
      },
      error: () => {
        console.log('Código OTP de desarrollo: 123456');
      },
    });
  }
}
