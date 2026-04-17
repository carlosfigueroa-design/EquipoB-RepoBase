import {
  AuthService
} from "./chunk-44KKO47T.js";
import {
  Router
} from "./chunk-36UIY4FN.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-3TWCQFOL.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-DOM3MDY3.js";

// src/app/features/auth/login.component.ts
var LoginComponent = class _LoginComponent {
  authService;
  router;
  email = "";
  loading = false;
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  onSubmit() {
    if (!this.email || this.loading)
      return;
    this.loading = true;
    this.authService.requestOtp(this.email).subscribe({
      next: () => {
        console.log("C\xF3digo OTP de desarrollo: 123456");
        this.router.navigate(["/auth/otp-verify"], {
          state: { email: this.email }
        });
      },
      error: () => {
        console.log("C\xF3digo OTP de desarrollo: 123456");
        this.router.navigate(["/auth/otp-verify"], {
          state: { email: this.email }
        });
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 13, vars: 4, consts: [[1, "login-wrapper"], [1, "sb-ui-card", "login-card"], [1, "login-title"], [1, "login-subtitle"], [1, "login-form", 3, "ngSubmit"], [1, "form-group"], ["for", "email", 1, "form-label"], ["id", "email", "type", "email", "placeholder", "usuario@segurosbolivar.com", "name", "email", "required", "", 1, "sb-ui-input", 3, "ngModelChange", "ngModel", "disabled"], ["type", "submit", 1, "sb-ui-button", "login-button", 3, "disabled"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Portal de APIs \u2014 SIOP");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "Ingresa tu correo electr\xF3nico para recibir un c\xF3digo de acceso");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "form", 4);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_6_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(7, "div", 5)(8, "label", 6);
      \u0275\u0275text(9, "Correo electr\xF3nico");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "button", 8);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.email);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.email || ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "Enviando..." : "Solicitar c\xF3digo OTP", " ");
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ['\n\n.login-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  padding: var(--sb-ui-spacing-md, 16px);\n}\n.login-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n}\n.login-title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--sb-ui-spacing-sm, 8px);\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  text-align: center;\n}\n.login-subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 var(--sb-ui-spacing-lg, 24px);\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-align: center;\n}\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-md, 16px);\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.form-label[_ngcontent-%COMP%] {\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.login-button[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: var(--sb-ui-spacing-sm, 8px);\n}\n/*# sourceMappingURL=login.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="login-wrapper">
      <div class="sb-ui-card login-card">
        <h2 class="login-title">Portal de APIs \u2014 SIOP</h2>
        <p class="login-subtitle">Ingresa tu correo electr\xF3nico para recibir un c\xF3digo de acceso</p>

        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Correo electr\xF3nico</label>
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
            {{ loading ? 'Enviando...' : 'Solicitar c\xF3digo OTP' }}
          </button>
        </form>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:css;f73feec9ad0e998d3349be9970cfcea9dcea0c745dbba9d04537ffb7cfb754ac;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/auth/login.component.ts */\n.login-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  padding: var(--sb-ui-spacing-md, 16px);\n}\n.login-card {\n  width: 100%;\n  max-width: 420px;\n}\n.login-title {\n  margin: 0 0 var(--sb-ui-spacing-sm, 8px);\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  text-align: center;\n}\n.login-subtitle {\n  margin: 0 0 var(--sb-ui-spacing-lg, 24px);\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-align: center;\n}\n.login-form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-md, 16px);\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.form-label {\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.login-button {\n  width: 100%;\n  margin-top: var(--sb-ui-spacing-sm, 8px);\n}\n/*# sourceMappingURL=login.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/login.component.ts", lineNumber: 99 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-6XDBUAL5.js.map
