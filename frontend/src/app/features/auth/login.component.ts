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
      <div class="login-left">
        <div class="login-branding">
          <img src="assets/logo-seguros-bolivar.png" alt="Seguros Bolívar" class="login-logo" />
          <h1 class="login-hero-title">Vínculo Bolívar</h1>
          <p class="login-hero-subtitle">
            Portal de APIs para el ecosistema digital de Seguros Bolívar.
            Explora, prueba e integra nuestras APIs de forma segura.
          </p>
          <div class="login-features">
            <div class="feature-item">
              <i class="fa fa-book"></i>
              <span>Catálogo de APIs documentadas</span>
            </div>
            <div class="feature-item">
              <i class="fa fa-flask"></i>
              <span>Sandbox interactivo de pruebas</span>
            </div>
            <div class="feature-item">
              <i class="fa fa-robot"></i>
              <span>Asistente IA para integración</span>
            </div>
          </div>
        </div>
      </div>

      <div class="login-right">
        <div class="sb-ui-card login-card">
          <h2 class="login-title">Iniciar sesión</h2>
          <p class="login-subtitle">Ingresa tu correo electrónico para recibir un código de acceso</p>

          <form (ngSubmit)="onSubmit()" class="login-form">
            <div class="form-group">
              <label for="email" class="form-label">Correo electrónico</label>
              <input
                id="email"
                type="email"
                class="sb-ui-input"
                placeholder="usuario&#64;segurosbolivar.com"
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
              @if (loading) {
                <span class="sb-ui-spinner" style="width:18px;height:18px;border-width:2px"></span>
                Enviando...
              } @else {
                <i class="fa fa-paper-plane"></i> Solicitar código OTP
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      min-height: 100vh;
    }

    .login-left {
      flex: 1;
      background: linear-gradient(135deg, var(--sb-ui-color-primary, #007A3D) 0%, var(--sb-ui-color-primary-light, #009648) 50%, var(--sb-ui-bg-sidebar, #005a2b) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
      position: relative;
      overflow: hidden;
    }

    .login-left::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.04);
    }

    .login-left::after {
      content: '';
      position: absolute;
      bottom: -30%;
      left: -10%;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.03);
    }

    .login-branding {
      position: relative;
      z-index: 1;
      max-width: 440px;
      color: var(--sb-ui-text-light, #FFFFFF);
    }

    .login-logo {
      height: 64px;
      width: auto;
      object-fit: contain;
      margin-bottom: 24px;
      border-radius: 6px;
    }

    .login-hero-title {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0 0 12px;
      letter-spacing: -0.5px;
    }

    .login-hero-subtitle {
      font-size: 1rem;
      line-height: 1.6;
      opacity: 0.9;
      margin: 0 0 32px;
    }

    .login-features {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.9rem;
      opacity: 0.85;
    }

    .feature-item i {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      flex-shrink: 0;
    }

    .login-right {
      flex: 0 0 480px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px;
      background-color: var(--sb-ui-bg-primary, #f4faf6);
    }

    .login-card {
      width: 100%;
      max-width: 400px;
    }

    .login-title {
      margin: 0 0 var(--sb-ui-spacing-sm, 8px);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--sb-ui-color-grayscale-D400, #282828);
    }

    .login-subtitle {
      margin: 0 0 var(--sb-ui-spacing-lg, 24px);
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      color: var(--sb-ui-text-secondary, #6c757d);
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
      font-size: var(--sb-ui-font-size-sm, 0.875rem);
      font-weight: 600;
      color: var(--sb-ui-color-grayscale-D400, #282828);
    }

    .login-button {
      width: 100%;
      margin-top: var(--sb-ui-spacing-sm, 8px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    @media (max-width: 900px) {
      .login-wrapper { flex-direction: column; }
      .login-left { padding: 32px 24px; min-height: auto; }
      .login-right { flex: 1; padding: 32px 24px; }
      .login-hero-title { font-size: 1.6rem; }
    }

    @media (max-width: 576px) {
      .login-left { display: none; }
      .login-right { flex: none; min-height: 100vh; }
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
        this.router.navigate(['/auth/otp-verify'], {
          state: { email: this.email },
        });
      },
    });
  }
}
