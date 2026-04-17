import {
  AuthService
} from "./chunk-44KKO47T.js";
import {
  LoadingSpinnerComponent
} from "./chunk-FDZIWHDL.js";
import {
  CatalogService
} from "./chunk-HHHT4LPS.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-36UIY4FN.js";
import {
  CommonModule,
  Component,
  NgClass,
  NgForOf,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction4,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DOM3MDY3.js";

// src/app/features/public-catalog/catalog-detail.component.ts
var _c0 = (a0, a1, a2, a3) => ({ "sb-ui-badge--success": a0, "sb-ui-badge--warning": a1, "sb-ui-badge--muted": a2, "sb-ui-badge--danger": a3 });
function CatalogDetailComponent_app_loading_spinner_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function CatalogDetailComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "i", 7);
    \u0275\u0275elementStart(2, "h2");
    \u0275\u0275text(3, "API no encontrada");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "La API solicitada no existe o no est\xE1 disponible.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 8);
    \u0275\u0275listener("click", function CatalogDetailComponent_div_5_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(7, " Volver al cat\xE1logo ");
    \u0275\u0275elementEnd()();
  }
}
function CatalogDetailComponent_div_6_section_23_li_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const useCase_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(useCase_r4);
  }
}
function CatalogDetailComponent_div_6_section_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 21)(1, "h3", 22);
    \u0275\u0275element(2, "i", 37);
    \u0275\u0275text(3, " Casos de Uso ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "ul", 38);
    \u0275\u0275template(5, CatalogDetailComponent_div_6_section_23_li_5_Template, 2, 1, "li", 39);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r1.api.useCases);
  }
}
function CatalogDetailComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "div", 11)(3, "div", 12)(4, "div", 13);
    \u0275\u0275element(5, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 14)(7, "div", 15)(8, "span", 16);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 17);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 18);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "h1", 19);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "div", 20)(17, "section", 21)(18, "h3", 22);
    \u0275\u0275element(19, "i", 23);
    \u0275\u0275text(20, " Descripci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "p", 24);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, CatalogDetailComponent_div_6_section_23_Template, 6, 1, "section", 25);
    \u0275\u0275elementStart(24, "section", 21)(25, "h3", 22);
    \u0275\u0275element(26, "i", 26);
    \u0275\u0275text(27, " Equipo de Contacto ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 27)(29, "div", 28)(30, "span", 29);
    \u0275\u0275text(31, "Equipo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span", 30);
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 28)(35, "span", 29);
    \u0275\u0275text(36, "Email:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "a", 31);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 28)(40, "span", 29);
    \u0275\u0275text(41, "\xC1rea:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span", 30);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(44, "div", 32)(45, "button", 33);
    \u0275\u0275listener("click", function CatalogDetailComponent_div_6_Template_button_click_45_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.viewDocumentation());
    });
    \u0275\u0275element(46, "i", 34);
    \u0275\u0275text(47, " Ver Documentaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "button", 35);
    \u0275\u0275listener("click", function CatalogDetailComponent_div_6_Template_button_click_48_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.trySandbox());
    });
    \u0275\u0275element(49, "i", 36);
    \u0275\u0275text(50, " Probar en Sandbox ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275classMapInterpolate1("fa ", ctx_r1.api.icon, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.api.category);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(14, _c0, ctx_r1.api.status === "Publicada", ctx_r1.api.status === "Deprecada", ctx_r1.api.status === "Borrador", ctx_r1.api.status === "Retirada"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.api.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.api.version);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.api.name);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.api.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.api.useCases && ctx_r1.api.useCases.length > 0);
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r1.api.contactTeam.teamName);
    \u0275\u0275advance(4);
    \u0275\u0275property("href", "mailto:" + ctx_r1.api.contactTeam.email, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.api.contactTeam.email, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.api.contactTeam.area);
  }
}
var CatalogDetailComponent = class _CatalogDetailComponent {
  route;
  router;
  catalogService;
  authService;
  api = null;
  loading = true;
  apiId = "";
  constructor(route, router, catalogService, authService) {
    this.route = route;
    this.router = router;
    this.catalogService = catalogService;
    this.authService = authService;
  }
  ngOnInit() {
    this.apiId = this.route.snapshot.paramMap.get("id") ?? "";
    if (!this.apiId) {
      this.loading = false;
      return;
    }
    this.catalogService.getApiDetail(this.apiId).subscribe({
      next: (api) => {
        this.api = api;
        this.loading = false;
      },
      error: () => {
        this.api = null;
        this.loading = false;
      }
    });
  }
  goBack() {
    this.router.navigate(["/catalog"]);
  }
  viewDocumentation() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/swagger", this.apiId]);
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }
  trySandbox() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/sandbox"], { state: { apiId: this.apiId } });
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }
  static \u0275fac = function CatalogDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(CatalogService), \u0275\u0275directiveInject(AuthService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CatalogDetailComponent, selectors: [["app-catalog-detail"]], decls: 7, vars: 3, consts: [[1, "detail-container"], ["role", "button", "tabindex", "0", 1, "back-link", 3, "click", "keydown.enter"], [1, "fa", "fa-arrow-left"], [4, "ngIf"], ["class", "not-found", 4, "ngIf"], ["class", "detail-content", 4, "ngIf"], [1, "not-found"], [1, "fa", "fa-exclamation-triangle", "not-found-icon"], [1, "sb-ui-button", "sb-ui-button--outline", 3, "click"], [1, "detail-content"], [1, "sb-ui-card", "detail-card"], [1, "detail-header"], [1, "header-left"], [1, "api-icon"], [1, "header-info"], [1, "header-meta"], [1, "api-category"], [1, "sb-ui-badge", 3, "ngClass"], [1, "api-version"], [1, "api-name"], [1, "detail-body"], [1, "detail-section"], [1, "section-title"], [1, "fa", "fa-info-circle"], [1, "section-text"], ["class", "detail-section", 4, "ngIf"], [1, "fa", "fa-users"], [1, "contact-info"], [1, "contact-item"], [1, "contact-label"], [1, "contact-value"], [1, "contact-email", 3, "href"], [1, "detail-actions"], [1, "sb-ui-button", 3, "click"], [1, "fa", "fa-file-lines"], [1, "sb-ui-button", "sb-ui-button--secondary", 3, "click"], [1, "fa", "fa-flask"], [1, "fa", "fa-list-check"], [1, "use-cases-list"], [4, "ngFor", "ngForOf"]], template: function CatalogDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
      \u0275\u0275listener("click", function CatalogDetailComponent_Template_a_click_1_listener() {
        return ctx.goBack();
      })("keydown.enter", function CatalogDetailComponent_Template_a_keydown_enter_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275element(2, "i", 2);
      \u0275\u0275text(3, " Volver al cat\xE1logo ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(4, CatalogDetailComponent_app_loading_spinner_4_Template, 1, 0, "app-loading-spinner", 3)(5, CatalogDetailComponent_div_5_Template, 8, 0, "div", 4)(6, CatalogDetailComponent_div_6_Template, 51, 19, "div", 5);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && !ctx.api);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.api);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, LoadingSpinnerComponent], styles: ["\n\n.detail-container[_ngcontent-%COMP%] {\n  padding: var(--sb-ui-spacing-lg, 24px);\n  max-width: 900px;\n  margin: 0 auto;\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  color: var(--sb-ui-color-primary, #003b7a);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  cursor: pointer;\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n  text-decoration: none;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.not-found[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  color: var(--sb-ui-text-secondary, #6c757d);\n}\n.not-found-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n  color: var(--sb-ui-color-warning, #ffc107);\n}\n.not-found[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  margin: 0 0 var(--sb-ui-spacing-sm, 8px) 0;\n}\n.not-found[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 var(--sb-ui-spacing-lg, 24px) 0;\n}\n.detail-card[_ngcontent-%COMP%] {\n  padding: var(--sb-ui-spacing-xl, 32px);\n}\n.detail-card[_ngcontent-%COMP%]:hover {\n  transform: none;\n}\n.detail-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n  padding-bottom: var(--sb-ui-spacing-lg, 24px);\n  border-bottom: 1px solid var(--sb-ui-border-color, #dee2e6);\n}\n.header-left[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--sb-ui-spacing-md, 16px);\n  align-items: flex-start;\n}\n.api-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: var(--sb-ui-border-radius, 8px);\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  flex-shrink: 0;\n}\n.header-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.header-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  flex-wrap: wrap;\n}\n.api-category[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.api-version[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-muted, #adb5bd);\n  font-weight: 600;\n}\n.api-name[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  margin: 0;\n  font-weight: 700;\n}\n.detail-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-lg, 24px);\n}\n.detail-section[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-md, 1rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  margin: 0;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.section-text[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-md, 1rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  line-height: 1.6;\n  margin: 0;\n}\n.use-cases-list[_ngcontent-%COMP%] {\n  margin: 0;\n  padding-left: var(--sb-ui-spacing-lg, 24px);\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.use-cases-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  line-height: 1.5;\n}\n.contact-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  padding: var(--sb-ui-spacing-md, 16px);\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n}\n.contact-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n}\n.contact-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  min-width: 60px;\n}\n.contact-value[_ngcontent-%COMP%] {\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.contact-email[_ngcontent-%COMP%] {\n  color: var(--sb-ui-color-primary, #003b7a);\n  text-decoration: none;\n}\n.contact-email[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.detail-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--sb-ui-spacing-md, 16px);\n  margin-top: var(--sb-ui-spacing-lg, 24px);\n  padding-top: var(--sb-ui-spacing-lg, 24px);\n  border-top: 1px solid var(--sb-ui-border-color, #dee2e6);\n  flex-wrap: wrap;\n}\n@media (max-width: 576px) {\n  .detail-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .detail-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .header-left[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=catalog-detail.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogDetailComponent, [{
    type: Component,
    args: [{ selector: "app-catalog-detail", standalone: true, imports: [CommonModule, LoadingSpinnerComponent], template: `
    <div class="detail-container">
      <a class="back-link" (click)="goBack()" role="button" tabindex="0" (keydown.enter)="goBack()">
        <i class="fa fa-arrow-left"></i> Volver al cat\xE1logo
      </a>

      <app-loading-spinner *ngIf="loading"></app-loading-spinner>

      <div *ngIf="!loading && !api" class="not-found">
        <i class="fa fa-exclamation-triangle not-found-icon"></i>
        <h2>API no encontrada</h2>
        <p>La API solicitada no existe o no est\xE1 disponible.</p>
        <button class="sb-ui-button sb-ui-button--outline" (click)="goBack()">
          Volver al cat\xE1logo
        </button>
      </div>

      <div *ngIf="!loading && api" class="detail-content">
        <div class="sb-ui-card detail-card">
          <div class="detail-header">
            <div class="header-left">
              <div class="api-icon">
                <i class="fa {{ api.icon }}"></i>
              </div>
              <div class="header-info">
                <div class="header-meta">
                  <span class="api-category">{{ api.category }}</span>
                  <span
                    class="sb-ui-badge"
                    [ngClass]="{
                      'sb-ui-badge--success': api.status === 'Publicada',
                      'sb-ui-badge--warning': api.status === 'Deprecada',
                      'sb-ui-badge--muted': api.status === 'Borrador',
                      'sb-ui-badge--danger': api.status === 'Retirada'
                    }"
                  >
                    {{ api.status }}
                  </span>
                  <span class="api-version">{{ api.version }}</span>
                </div>
                <h1 class="api-name">{{ api.name }}</h1>
              </div>
            </div>
          </div>

          <div class="detail-body">
            <section class="detail-section">
              <h3 class="section-title">
                <i class="fa fa-info-circle"></i> Descripci\xF3n
              </h3>
              <p class="section-text">{{ api.description }}</p>
            </section>

            <section *ngIf="api.useCases && api.useCases.length > 0" class="detail-section">
              <h3 class="section-title">
                <i class="fa fa-list-check"></i> Casos de Uso
              </h3>
              <ul class="use-cases-list">
                <li *ngFor="let useCase of api.useCases">{{ useCase }}</li>
              </ul>
            </section>

            <section class="detail-section">
              <h3 class="section-title">
                <i class="fa fa-users"></i> Equipo de Contacto
              </h3>
              <div class="contact-info">
                <div class="contact-item">
                  <span class="contact-label">Equipo:</span>
                  <span class="contact-value">{{ api.contactTeam.teamName }}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-label">Email:</span>
                  <a class="contact-email" [href]="'mailto:' + api.contactTeam.email">
                    {{ api.contactTeam.email }}
                  </a>
                </div>
                <div class="contact-item">
                  <span class="contact-label">\xC1rea:</span>
                  <span class="contact-value">{{ api.contactTeam.area }}</span>
                </div>
              </div>
            </section>
          </div>

          <div class="detail-actions">
            <button class="sb-ui-button" (click)="viewDocumentation()">
              <i class="fa fa-file-lines"></i> Ver Documentaci\xF3n
            </button>
            <button class="sb-ui-button sb-ui-button--secondary" (click)="trySandbox()">
              <i class="fa fa-flask"></i> Probar en Sandbox
            </button>
          </div>
        </div>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;99daef702bd095e27666ca9990ef03657524120a180cdc115287a2abce66f0bd;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/public-catalog/catalog-detail.component.ts */\n.detail-container {\n  padding: var(--sb-ui-spacing-lg, 24px);\n  max-width: 900px;\n  margin: 0 auto;\n}\n.back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  color: var(--sb-ui-color-primary, #003b7a);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  cursor: pointer;\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n  text-decoration: none;\n}\n.back-link:hover {\n  text-decoration: underline;\n}\n.not-found {\n  text-align: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  color: var(--sb-ui-text-secondary, #6c757d);\n}\n.not-found-icon {\n  font-size: 3rem;\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n  color: var(--sb-ui-color-warning, #ffc107);\n}\n.not-found h2 {\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  margin: 0 0 var(--sb-ui-spacing-sm, 8px) 0;\n}\n.not-found p {\n  margin: 0 0 var(--sb-ui-spacing-lg, 24px) 0;\n}\n.detail-card {\n  padding: var(--sb-ui-spacing-xl, 32px);\n}\n.detail-card:hover {\n  transform: none;\n}\n.detail-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n  padding-bottom: var(--sb-ui-spacing-lg, 24px);\n  border-bottom: 1px solid var(--sb-ui-border-color, #dee2e6);\n}\n.header-left {\n  display: flex;\n  gap: var(--sb-ui-spacing-md, 16px);\n  align-items: flex-start;\n}\n.api-icon {\n  width: 56px;\n  height: 56px;\n  border-radius: var(--sb-ui-border-radius, 8px);\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  flex-shrink: 0;\n}\n.header-info {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.header-meta {\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  flex-wrap: wrap;\n}\n.api-category {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.api-version {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-muted, #adb5bd);\n  font-weight: 600;\n}\n.api-name {\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  margin: 0;\n  font-weight: 700;\n}\n.detail-body {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-lg, 24px);\n}\n.detail-section {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.section-title {\n  font-size: var(--sb-ui-font-size-md, 1rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  margin: 0;\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.section-text {\n  font-size: var(--sb-ui-font-size-md, 1rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  line-height: 1.6;\n  margin: 0;\n}\n.use-cases-list {\n  margin: 0;\n  padding-left: var(--sb-ui-spacing-lg, 24px);\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.use-cases-list li {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  line-height: 1.5;\n}\n.contact-info {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  padding: var(--sb-ui-spacing-md, 16px);\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n}\n.contact-item {\n  display: flex;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n}\n.contact-label {\n  font-weight: 600;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  min-width: 60px;\n}\n.contact-value {\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.contact-email {\n  color: var(--sb-ui-color-primary, #003b7a);\n  text-decoration: none;\n}\n.contact-email:hover {\n  text-decoration: underline;\n}\n.detail-actions {\n  display: flex;\n  gap: var(--sb-ui-spacing-md, 16px);\n  margin-top: var(--sb-ui-spacing-lg, 24px);\n  padding-top: var(--sb-ui-spacing-lg, 24px);\n  border-top: 1px solid var(--sb-ui-border-color, #dee2e6);\n  flex-wrap: wrap;\n}\n@media (max-width: 576px) {\n  .detail-actions {\n    flex-direction: column;\n  }\n  .detail-actions button {\n    width: 100%;\n  }\n  .header-left {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=catalog-detail.component.css.map */\n"] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: CatalogService }, { type: AuthService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CatalogDetailComponent, { className: "CatalogDetailComponent", filePath: "src/app/features/public-catalog/catalog-detail.component.ts", lineNumber: 325 });
})();
export {
  CatalogDetailComponent
};
//# sourceMappingURL=chunk-H4YHP6E3.js.map
