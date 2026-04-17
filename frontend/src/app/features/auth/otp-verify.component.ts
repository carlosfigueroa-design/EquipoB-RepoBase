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
      <div class="otp-left">
        <div class="otp-branding">
          <img src="assets/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="otp-logo" />
          <h1 class="otp-hero-title">Vínculo Bolívar</h1>
          <p class="otp-hero-subtitle">Verificación de identidad segura para acceder al portal de APIs.</p>
          <div class="otp-security-note">
            <i class="fa fa-shield-halved"></i>
            <span>Tu código expira en 5 minutos y solo puede usarse una vez.</span>
          </div>
        </div>
      </div>

      <div class="otp-right">
        <div class="sb-ui-card otp-card">
          <div class="otp-icon-wrapper">
            <i class="fa fa-envelope-open-text"></i>
          </div>
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
                class="sb-ui-input otp-input"
                placeholder="000000"
                [(ngModel)]="otp"
                name="otp"
                maxlength="6"
                required
                [disabled]="loading"
                autocomplete="one-time-code"
              />
            </div>

            <p *ngIf="errorMessage" class="error-message">
              <i class="fa fa-exclamation-circle"></i> {{ errorMessage }}
            </p>

            <button
              type="submit"
              class="sb-ui-button verify-button"
              [disabled]="!otp || loading"
            >
              @if (loading) {
                <span class="sb-ui-spinner" style="width:18px;height:18px;border-width:2px"></span>
                Verificando...
              } @else {
                <i class="fa fa-check-circle"></i> Verificar código
              }
            </button>
          </form>

          <div class="otp-footer">
            <span class="footer-text">¿No recibiste el código?</span>
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
      </div>
    </div>
  `,
  styles: [`
    .otp-wrapper {
      display: flex;
      min-height: 100vh;
    }

    .otp-left {
      flex: 1;
      background: linear-gradient(135deg, var(--sb-ui-color-primary, #007A3D) 0%, var(--sb-ui-color-primary-light, #009648) 50%, var(--sb-ui-bg-sidebar, #005a2b) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
      position: relative;
      overflow: hidden;
    }

    .otp-left::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.04);
    }

    .otp-branding {
      position: relative;
      z-index: 1;
      max-width: 440px;
      color: var(--sb-ui-text-light, #FFFFFF);
    }

    .otp-logo {
      height: 64px;
      width: auto;
      object-fit: contain;
      margin-bottom: 24px;
      border-radius: 6px;
    }

    .otp-hero-title {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0 0 12px;
      letter-spacing: -0.5px;
    }

    .otp-hero-subtitle {
      font-size: 1rem;
      line-height: 1.6;
      opacity: 0.9;
      margin: 0 0 32px;
    }

    .otp-security-note {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      font-size: 0.85rem;
      opacity: 0.9;
    }

    .otp-right {
      flex: 0 0 480px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
      background-color: var(--sb-ui-bg-primary, #f4faf6);
    }

    .otp-card {
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    .otp-icon-wrapper {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--sb-ui-bg-primary, #f4faf6);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 1.4rem;
      color: var(--sb-ui-color-primary, #007A3D);
      border: 2px solid var(--sb-ui-color-primary, #007A3D);
    }

    .otp-title {
      margin: 0 0 var(--sb-ui-spacing-sm, 8px);
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--sb-ui-color-grayscale-D400, #282828);
    }

    .otp-subtitle {
      margin: 0 0 var(--sb-ui-spacing-lg, 24px);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-text-secondary, #6c757d);
    }

    .otp-form {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-md, 16px);
      text-align: left;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: var(--sb-ui-spacing-xs, 4px);
    }

    .form-label {
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      font-weight: 600;
      color: var(--sb-ui-color-grayscale-D400, #282828);
    }

    .otp-input {
      text-align: center;
      font-size: 1.5rem;
      letter-spacing: 8px;
      font-weight: 600;
    }

    .error-message {
      margin: 0;
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-color-feedback-error-base, #dc3545);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .verify-button {
      width: 100%;
      margin-top: var(--sb-ui-spacing-sm, 8px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .otp-footer {
      margin-top: var(--sb-ui-spacing-lg, 24px);
      padding-top: var(--sb-ui-spacing-md, 16px);
      border-top: 1px solid var(--sb-ui-color-grayscale-L200, #E1E1E1);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .footer-text {
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-text-secondary, #6c757d);
    }

    .resend-link {
      background: none;
      border: none;
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-color-primary, #007A3D);
      cursor: pointer;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .resend-link:hover {
      color: var(--sb-ui-color-primary-light, #009648);
      text-decoration: underline;
    }

    .resend-link:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 900px) {
      .otp-wrapper { flex-direction: column; }
      .otp-left { padding: 32px 24px; min-height: auto; }
      .otp-right { flex: 1; padding: 32px 24px; }
    }

    @media (max-width: 576px) {
      .otp-left { display: none; }
      .otp-right { flex: none; min-height: 100vh; }
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
      const historyState = history.state as { email?: string } | undefined;
      if (historyState?.email) {
        this.email = historyState.email;
      } else {
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
