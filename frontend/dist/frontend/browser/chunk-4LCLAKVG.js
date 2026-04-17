import {
  AuthService
} from "./chunk-44KKO47T.js";
import {
  Router
} from "./chunk-36UIY4FN.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxLengthValidator,
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
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-DOM3MDY3.js";

// src/app/features/auth/otp-verify.component.ts
function OtpVerifyComponent_p_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
var OtpVerifyComponent = class _OtpVerifyComponent {
  authService;
  router;
  email = "";
  otp = "";
  loading = false;
  errorMessage = "";
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;
    if (state?.email) {
      this.email = state.email;
    } else {
      const historyState = history.state;
      if (historyState?.email) {
        this.email = historyState.email;
      } else {
        this.router.navigate(["/auth/login"]);
      }
    }
  }
  onVerify() {
    if (!this.otp || this.loading)
      return;
    this.loading = true;
    this.errorMessage = "";
    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: () => {
        this.router.navigate(["/catalog"]);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = "C\xF3digo inv\xE1lido, intente nuevamente";
      }
    });
  }
  onResendOtp() {
    if (this.loading)
      return;
    this.authService.requestOtp(this.email).subscribe({
      next: () => {
        console.log("C\xF3digo OTP de desarrollo: 123456");
        this.errorMessage = "";
      },
      error: () => {
        console.log("C\xF3digo OTP de desarrollo: 123456");
      }
    });
  }
  static \u0275fac = function OtpVerifyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OtpVerifyComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OtpVerifyComponent, selectors: [["app-otp-verify"]], decls: 18, vars: 7, consts: [[1, "otp-wrapper"], [1, "sb-ui-card", "otp-card"], [1, "otp-title"], [1, "otp-subtitle"], [1, "otp-form", 3, "ngSubmit"], [1, "form-group"], ["for", "otp", 1, "form-label"], ["id", "otp", "type", "text", "placeholder", "Ingresa el c\xF3digo de 6 d\xEDgitos", "name", "otp", "maxlength", "6", "required", "", 1, "sb-ui-input", 3, "ngModelChange", "ngModel", "disabled"], ["class", "error-message", 4, "ngIf"], ["type", "submit", 1, "sb-ui-button", "verify-button", 3, "disabled"], ["type", "button", 1, "resend-link", 3, "click", "disabled"], [1, "error-message"]], template: function OtpVerifyComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3, "Verificar c\xF3digo OTP");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, " Ingresa el c\xF3digo enviado a ");
      \u0275\u0275elementStart(6, "strong");
      \u0275\u0275text(7);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "form", 4);
      \u0275\u0275listener("ngSubmit", function OtpVerifyComponent_Template_form_ngSubmit_8_listener() {
        return ctx.onVerify();
      });
      \u0275\u0275elementStart(9, "div", 5)(10, "label", 6);
      \u0275\u0275text(11, "C\xF3digo OTP");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function OtpVerifyComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.otp, $event) || (ctx.otp = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(13, OtpVerifyComponent_p_13_Template, 2, 1, "p", 8);
      \u0275\u0275elementStart(14, "button", 9);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "button", 10);
      \u0275\u0275listener("click", function OtpVerifyComponent_Template_button_click_16_listener() {
        return ctx.onResendOtp();
      });
      \u0275\u0275text(17, " Reenviar c\xF3digo ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.email);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.otp);
      \u0275\u0275property("disabled", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.otp || ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.loading ? "Verificando..." : "Verificar c\xF3digo", " ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, NgModel, NgForm], styles: ['\n\n.otp-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  padding: var(--sb-ui-spacing-md, 16px);\n}\n.otp-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n}\n.otp-title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--sb-ui-spacing-sm, 8px);\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  text-align: center;\n}\n.otp-subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 var(--sb-ui-spacing-lg, 24px);\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-align: center;\n}\n.otp-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-md, 16px);\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.form-label[_ngcontent-%COMP%] {\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.error-message[_ngcontent-%COMP%] {\n  margin: 0;\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-color-danger, #dc3545);\n  text-align: center;\n}\n.verify-button[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: var(--sb-ui-spacing-sm, 8px);\n}\n.resend-link[_ngcontent-%COMP%] {\n  display: block;\n  margin: var(--sb-ui-spacing-md, 16px) auto 0;\n  background: none;\n  border: none;\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  cursor: pointer;\n  text-decoration: underline;\n}\n.resend-link[_ngcontent-%COMP%]:hover {\n  color: var(--sb-ui-color-primary-light, #1a5fa8);\n}\n.resend-link[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=otp-verify.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OtpVerifyComponent, [{
    type: Component,
    args: [{ selector: "app-otp-verify", standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="otp-wrapper">
      <div class="sb-ui-card otp-card">
        <h2 class="otp-title">Verificar c\xF3digo OTP</h2>
        <p class="otp-subtitle">
          Ingresa el c\xF3digo enviado a <strong>{{ email }}</strong>
        </p>

        <form (ngSubmit)="onVerify()" class="otp-form">
          <div class="form-group">
            <label for="otp" class="form-label">C\xF3digo OTP</label>
            <input
              id="otp"
              type="text"
              class="sb-ui-input"
              placeholder="Ingresa el c\xF3digo de 6 d\xEDgitos"
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
            {{ loading ? 'Verificando...' : 'Verificar c\xF3digo' }}
          </button>
        </form>

        <button
          type="button"
          class="resend-link"
          (click)="onResendOtp()"
          [disabled]="loading"
        >
          Reenviar c\xF3digo
        </button>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:css;96adfec26bdcfbf193edc78cefd9db0a7830ed396979748f6679e1beff80de9b;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/auth/otp-verify.component.ts */\n.otp-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100vh;\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  padding: var(--sb-ui-spacing-md, 16px);\n}\n.otp-card {\n  width: 100%;\n  max-width: 420px;\n}\n.otp-title {\n  margin: 0 0 var(--sb-ui-spacing-sm, 8px);\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  text-align: center;\n}\n.otp-subtitle {\n  margin: 0 0 var(--sb-ui-spacing-lg, 24px);\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-align: center;\n}\n.otp-form {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-md, 16px);\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.form-label {\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.error-message {\n  margin: 0;\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-color-danger, #dc3545);\n  text-align: center;\n}\n.verify-button {\n  width: 100%;\n  margin-top: var(--sb-ui-spacing-sm, 8px);\n}\n.resend-link {\n  display: block;\n  margin: var(--sb-ui-spacing-md, 16px) auto 0;\n  background: none;\n  border: none;\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  cursor: pointer;\n  text-decoration: underline;\n}\n.resend-link:hover {\n  color: var(--sb-ui-color-primary-light, #1a5fa8);\n}\n.resend-link:disabled {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n/*# sourceMappingURL=otp-verify.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OtpVerifyComponent, { className: "OtpVerifyComponent", filePath: "src/app/features/auth/otp-verify.component.ts", lineNumber: 142 });
})();
export {
  OtpVerifyComponent
};
//# sourceMappingURL=chunk-4LCLAKVG.js.map
