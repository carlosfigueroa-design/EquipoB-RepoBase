import {
  CatalogService
} from "./chunk-HHHT4LPS.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-36UIY4FN.js";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  CommonModule,
  Component,
  NgIf,
  Subject,
  setClassMetadata,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-DOM3MDY3.js";

// src/app/features/swagger-viewer/swagger-viewer.component.ts
function SwaggerViewerComponent_h2_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.apiName);
  }
}
function SwaggerViewerComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "div", 10);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando documentaci\xF3n de la API...");
    \u0275\u0275elementEnd()();
  }
}
function SwaggerViewerComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "i", 12);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 13);
    \u0275\u0275listener("click", function SwaggerViewerComponent_div_7_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadSpec());
    });
    \u0275\u0275text(5, " Reintentar ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.error);
  }
}
var SwaggerViewerComponent = class _SwaggerViewerComponent {
  route;
  router;
  catalogService;
  loading = true;
  error = "";
  apiName = "";
  apiId = "";
  spec = null;
  viewInitialized = false;
  specLoaded = false;
  destroy$ = new Subject();
  constructor(route, router, catalogService) {
    this.route = route;
    this.router = router;
    this.catalogService = catalogService;
  }
  ngOnInit() {
    this.apiId = this.route.snapshot.paramMap.get("id") ?? "";
    if (!this.apiId) {
      this.error = "No se proporcion\xF3 un ID de API v\xE1lido.";
      this.loading = false;
      return;
    }
    this.loadSpec();
  }
  ngAfterViewInit() {
    this.viewInitialized = true;
    this.tryRenderSwagger();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadSpec() {
    this.loading = true;
    this.error = "";
    this.specLoaded = false;
    this.catalogService.getApiDetail(this.apiId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (api) => this.apiName = api.name,
      error: () => {
      }
    });
    this.catalogService.getApiSpec(this.apiId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (spec) => {
        this.spec = spec;
        this.specLoaded = true;
        this.loading = false;
        this.tryRenderSwagger();
      },
      error: () => {
        this.loading = false;
        this.error = "No se pudo cargar la especificaci\xF3n de la API. Verifique que la API existe e intente nuevamente.";
      }
    });
  }
  goBack() {
    this.router.navigate(["/catalog"]);
  }
  tryRenderSwagger() {
    if (!this.viewInitialized || !this.specLoaded || !this.spec) {
      return;
    }
    SwaggerUIBundle({
      spec: this.spec,
      dom_id: "#swagger-ui",
      presets: [SwaggerUIBundle.presets.apis],
      layout: "BaseLayout",
      deepLinking: true,
      docExpansion: "list"
    });
  }
  static \u0275fac = function SwaggerViewerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SwaggerViewerComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(CatalogService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SwaggerViewerComponent, selectors: [["app-swagger-viewer"]], decls: 9, vars: 3, consts: [[1, "swagger-container"], [1, "swagger-header"], [1, "back-link", 3, "click"], [1, "fa", "fa-arrow-left"], ["class", "api-title", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["id", "swagger-ui"], [1, "api-title"], [1, "loading-state"], [1, "sb-ui-spinner"], [1, "error-state"], [1, "fa", "fa-exclamation-triangle"], [1, "sb-ui-button", "sb-ui-button--outline", 3, "click"]], template: function SwaggerViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
      \u0275\u0275listener("click", function SwaggerViewerComponent_Template_a_click_2_listener() {
        return ctx.goBack();
      });
      \u0275\u0275element(3, "i", 3);
      \u0275\u0275text(4, " Volver al cat\xE1logo ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(5, SwaggerViewerComponent_h2_5_Template, 2, 1, "h2", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275template(6, SwaggerViewerComponent_div_6_Template, 4, 0, "div", 5)(7, SwaggerViewerComponent_div_7_Template, 6, 1, "div", 6);
      \u0275\u0275element(8, "div", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.apiName);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error);
    }
  }, dependencies: [CommonModule, NgIf], styles: ['\n\n.swagger-container[_ngcontent-%COMP%] {\n  padding: var(--sb-ui-spacing-lg, 24px);\n  background: var(--sb-ui-color-grayscale-L400, #fafafa);\n  min-height: 100vh;\n  font-family: var(--sb-ui-typography-fontFamily, "Segoe UI", Tahoma, sans-serif);\n}\n.swagger-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-md, 16px);\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n}\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  color: var(--sb-ui-color-primary, #003b7a);\n  cursor: pointer;\n  font-weight: 600;\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: var(--sb-ui-color-primary-light, #1a5fa8);\n}\n.api-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-grayscale-D400, #1a1a2e);\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  gap: var(--sb-ui-spacing-md, 16px);\n  color: var(--sb-ui-color-grayscale-D200, #6c757d);\n}\n.error-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  gap: var(--sb-ui-spacing-md, 16px);\n  color: var(--sb-ui-color-danger, #dc3545);\n}\n.error-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.error-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--sb-ui-color-grayscale-D200, #6c757d);\n}\n#swagger-ui[_ngcontent-%COMP%] {\n  background: var(--sb-ui-color-grayscale-white, #ffffff);\n  border-radius: var(--sb-ui-border-radius, 8px);\n  box-shadow: var(--sb-ui-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.08));\n  border: 1px solid var(--sb-ui-color-grayscale-L200, #dee2e6);\n  overflow: hidden;\n}\n/*# sourceMappingURL=swagger-viewer.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SwaggerViewerComponent, [{
    type: Component,
    args: [{ selector: "app-swagger-viewer", standalone: true, imports: [CommonModule], schemas: [CUSTOM_ELEMENTS_SCHEMA], template: `
    <div class="swagger-container">
      <div class="swagger-header">
        <a class="back-link" (click)="goBack()">
          <i class="fa fa-arrow-left"></i> Volver al cat\xE1logo
        </a>
        <h2 *ngIf="apiName" class="api-title">{{ apiName }}</h2>
      </div>

      <div *ngIf="loading" class="loading-state">
        <div class="sb-ui-spinner"></div>
        <p>Cargando documentaci\xF3n de la API...</p>
      </div>

      <div *ngIf="error" class="error-state">
        <i class="fa fa-exclamation-triangle"></i>
        <p>{{ error }}</p>
        <button class="sb-ui-button sb-ui-button--outline" (click)="loadSpec()">
          Reintentar
        </button>
      </div>

      <div id="swagger-ui"></div>
    </div>
  `, styles: ['/* angular:styles/component:css;f25c4b01b5a6ce32a26a052f70cd2cb38936e744c50c7a52a19330cbfa11eece;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/swagger-viewer/swagger-viewer.component.ts */\n.swagger-container {\n  padding: var(--sb-ui-spacing-lg, 24px);\n  background: var(--sb-ui-color-grayscale-L400, #fafafa);\n  min-height: 100vh;\n  font-family: var(--sb-ui-typography-fontFamily, "Segoe UI", Tahoma, sans-serif);\n}\n.swagger-header {\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-md, 16px);\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n}\n.back-link {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n  color: var(--sb-ui-color-primary, #003b7a);\n  cursor: pointer;\n  font-weight: 600;\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n.back-link:hover {\n  color: var(--sb-ui-color-primary-light, #1a5fa8);\n}\n.api-title {\n  margin: 0;\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-grayscale-D400, #1a1a2e);\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  gap: var(--sb-ui-spacing-md, 16px);\n  color: var(--sb-ui-color-grayscale-D200, #6c757d);\n}\n.error-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  gap: var(--sb-ui-spacing-md, 16px);\n  color: var(--sb-ui-color-danger, #dc3545);\n}\n.error-state i {\n  font-size: 2rem;\n}\n.error-state p {\n  color: var(--sb-ui-color-grayscale-D200, #6c757d);\n}\n#swagger-ui {\n  background: var(--sb-ui-color-grayscale-white, #ffffff);\n  border-radius: var(--sb-ui-border-radius, 8px);\n  box-shadow: var(--sb-ui-shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.08));\n  border: 1px solid var(--sb-ui-color-grayscale-L200, #dee2e6);\n  overflow: hidden;\n}\n/*# sourceMappingURL=swagger-viewer.component.css.map */\n'] }]
  }], () => [{ type: ActivatedRoute }, { type: Router }, { type: CatalogService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SwaggerViewerComponent, { className: "SwaggerViewerComponent", filePath: "src/app/features/swagger-viewer/swagger-viewer.component.ts", lineNumber: 121 });
})();
export {
  SwaggerViewerComponent
};
//# sourceMappingURL=chunk-WNBSP55J.js.map
