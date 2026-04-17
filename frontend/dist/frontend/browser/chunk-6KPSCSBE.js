import {
  LoadingSpinnerComponent
} from "./chunk-FDZIWHDL.js";
import {
  CatalogService
} from "./chunk-HHHT4LPS.js";
import {
  Router
} from "./chunk-36UIY4FN.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-3TWCQFOL.js";
import {
  CommonModule,
  Component,
  NgClass,
  NgForOf,
  NgIf,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpureFunction2,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-DOM3MDY3.js";

// src/app/features/public-catalog/catalog-list.component.ts
var _c0 = (a0, a1) => ({ "sb-ui-badge--success": a0, "sb-ui-badge--warning": a1 });
function CatalogListComponent_app_loading_spinner_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function CatalogListComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275element(1, "i", 12);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "No se encontraron APIs");
    \u0275\u0275elementEnd()();
  }
}
function CatalogListComponent_div_12_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15);
    \u0275\u0275listener("click", function CatalogListComponent_div_12_div_1_Template_div_click_0_listener() {
      const api_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(api_r2.id));
    })("keydown.enter", function CatalogListComponent_div_12_div_1_Template_div_keydown_enter_0_listener() {
      const api_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(api_r2.id));
    });
    \u0275\u0275elementStart(1, "div", 16);
    \u0275\u0275element(2, "i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 17)(4, "div", 18)(5, "span", 19);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 20);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "h3", 21);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 22);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const api_r2 = ctx.$implicit;
    \u0275\u0275attribute("aria-label", "Ver detalle de " + api_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("fa ", api_r2.icon, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(api_r2.category);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(9, _c0, api_r2.status === "Publicada", api_r2.status === "Deprecada"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", api_r2.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(api_r2.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(api_r2.descriptionSummary);
  }
}
function CatalogListComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275template(1, CatalogListComponent_div_12_div_1_Template, 13, 12, "div", 14);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.filteredApis);
  }
}
var CatalogListComponent = class _CatalogListComponent {
  catalogService;
  router;
  allApis = [];
  filteredApis = [];
  searchText = "";
  loading = true;
  constructor(catalogService, router) {
    this.catalogService = catalogService;
    this.router = router;
  }
  ngOnInit() {
    this.catalogService.getPublicApis().subscribe({
      next: (apis) => {
        this.allApis = apis.filter((api) => api.status === "Publicada" || api.status === "Deprecada");
        this.filteredApis = [...this.allApis];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  filterApis() {
    const query = this.searchText.trim().toLowerCase();
    if (!query) {
      this.filteredApis = [...this.allApis];
      return;
    }
    this.filteredApis = this.allApis.filter((api) => api.name.toLowerCase().includes(query) || api.category.toLowerCase().includes(query) || api.descriptionSummary.toLowerCase().includes(query));
  }
  goToDetail(id) {
    this.router.navigate(["/catalog", id]);
  }
  static \u0275fac = function CatalogListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogListComponent)(\u0275\u0275directiveInject(CatalogService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CatalogListComponent, selectors: [["app-catalog-list"]], decls: 13, vars: 4, consts: [[1, "catalog-container"], [1, "catalog-header"], [1, "catalog-title"], [1, "fa", "fa-book"], [1, "catalog-subtitle"], [1, "search-bar"], [1, "fa", "fa-search", "search-icon"], ["type", "text", "placeholder", "Buscar por nombre, categor\xEDa o descripci\xF3n...", 1, "sb-ui-input", "search-input", 3, "ngModelChange", "ngModel", "input", "ngModel"], [4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["class", "catalog-grid", 4, "ngIf"], [1, "empty-state"], [1, "fa", "fa-search", "empty-icon"], [1, "catalog-grid"], ["class", "sb-ui-card catalog-card", "role", "button", "tabindex", "0", 3, "click", "keydown.enter", 4, "ngFor", "ngForOf"], ["role", "button", "tabindex", "0", 1, "sb-ui-card", "catalog-card", 3, "click", "keydown.enter"], [1, "card-icon"], [1, "card-body"], [1, "card-top-row"], [1, "card-category"], [1, "sb-ui-badge", 3, "ngClass"], [1, "card-name"], [1, "card-description"]], template: function CatalogListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h1", 2);
      \u0275\u0275element(3, "i", 3);
      \u0275\u0275text(4, " Cat\xE1logo de APIs ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p", 4);
      \u0275\u0275text(6, " Explora las APIs disponibles del ecosistema de Seguros Bol\xEDvar ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 5);
      \u0275\u0275element(8, "i", 6);
      \u0275\u0275elementStart(9, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function CatalogListComponent_Template_input_ngModelChange_9_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
        return $event;
      });
      \u0275\u0275listener("ngModel", function CatalogListComponent_Template_input_ngModel_9_listener() {
        return ctx.filterApis();
      })("input", function CatalogListComponent_Template_input_input_9_listener() {
        return ctx.filterApis();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(10, CatalogListComponent_app_loading_spinner_10_Template, 1, 0, "app-loading-spinner", 8)(11, CatalogListComponent_div_11_Template, 4, 0, "div", 9)(12, CatalogListComponent_div_12_Template, 2, 1, "div", 10);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredApis.length === 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.loading && ctx.filteredApis.length > 0);
    }
  }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, LoadingSpinnerComponent], styles: ['\n\n.catalog-container[_ngcontent-%COMP%] {\n  padding: var(--sb-ui-spacing-lg, 24px);\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.catalog-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n}\n.catalog-title[_ngcontent-%COMP%] {\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-xxl, 2rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  margin: 0 0 var(--sb-ui-spacing-sm, 8px) 0;\n}\n.catalog-title[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  margin-right: var(--sb-ui-spacing-sm, 8px);\n}\n.catalog-subtitle[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-md, 1rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  margin: 0;\n}\n.search-bar[_ngcontent-%COMP%] {\n  position: relative;\n  max-width: 600px;\n  margin: 0 auto var(--sb-ui-spacing-lg, 24px) auto;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--sb-ui-text-muted, #adb5bd);\n  pointer-events: none;\n}\n.search-input[_ngcontent-%COMP%] {\n  padding-left: 40px !important;\n}\n.catalog-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--sb-ui-spacing-lg, 24px);\n}\n@media (max-width: 1024px) {\n  .catalog-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 576px) {\n  .catalog-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.catalog-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-md, 16px);\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: var(--sb-ui-border-radius, 8px);\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n}\n.card-body[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.card-top-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.card-category[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.card-name[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-lg, 1.25rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  margin: 0;\n  font-weight: 600;\n}\n.card-description[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  margin: 0;\n  line-height: 1.5;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  color: var(--sb-ui-text-secondary, #6c757d);\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n  opacity: 0.4;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-lg, 1.25rem);\n  margin: 0;\n}\n/*# sourceMappingURL=catalog-list.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogListComponent, [{
    type: Component,
    args: [{ selector: "app-catalog-list", standalone: true, imports: [CommonModule, FormsModule, LoadingSpinnerComponent], template: `
    <div class="catalog-container">
      <header class="catalog-header">
        <h1 class="catalog-title">
          <i class="fa fa-book"></i> Cat\xE1logo de APIs
        </h1>
        <p class="catalog-subtitle">
          Explora las APIs disponibles del ecosistema de Seguros Bol\xEDvar
        </p>
      </header>

      <div class="search-bar">
        <i class="fa fa-search search-icon"></i>
        <input
          type="text"
          class="sb-ui-input search-input"
          placeholder="Buscar por nombre, categor\xEDa o descripci\xF3n..."
          [(ngModel)]="searchText"
          (ngModel)="filterApis()"
          (input)="filterApis()"
        />
      </div>

      <app-loading-spinner *ngIf="loading"></app-loading-spinner>

      <div *ngIf="!loading && filteredApis.length === 0" class="empty-state">
        <i class="fa fa-search empty-icon"></i>
        <p>No se encontraron APIs</p>
      </div>

      <div *ngIf="!loading && filteredApis.length > 0" class="catalog-grid">
        <div
          *ngFor="let api of filteredApis"
          class="sb-ui-card catalog-card"
          (click)="goToDetail(api.id)"
          role="button"
          tabindex="0"
          (keydown.enter)="goToDetail(api.id)"
          [attr.aria-label]="'Ver detalle de ' + api.name"
        >
          <div class="card-icon">
            <i class="fa {{ api.icon }}"></i>
          </div>
          <div class="card-body">
            <div class="card-top-row">
              <span class="card-category">{{ api.category }}</span>
              <span
                class="sb-ui-badge"
                [ngClass]="{
                  'sb-ui-badge--success': api.status === 'Publicada',
                  'sb-ui-badge--warning': api.status === 'Deprecada'
                }"
              >
                {{ api.status }}
              </span>
            </div>
            <h3 class="card-name">{{ api.name }}</h3>
            <p class="card-description">{{ api.descriptionSummary }}</p>
          </div>
        </div>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:css;39cc8d8c061f74b34191d90d0ee4310c359606d7fa0f35e95bcde5520fd0adc4;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/public-catalog/catalog-list.component.ts */\n.catalog-container {\n  padding: var(--sb-ui-spacing-lg, 24px);\n  max-width: 1200px;\n  margin: 0 auto;\n}\n.catalog-header {\n  text-align: center;\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n}\n.catalog-title {\n  font-family: var(--sb-ui-font-family, "Segoe UI", sans-serif);\n  font-size: var(--sb-ui-font-size-xxl, 2rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n  margin: 0 0 var(--sb-ui-spacing-sm, 8px) 0;\n}\n.catalog-title i {\n  margin-right: var(--sb-ui-spacing-sm, 8px);\n}\n.catalog-subtitle {\n  font-size: var(--sb-ui-font-size-md, 1rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  margin: 0;\n}\n.search-bar {\n  position: relative;\n  max-width: 600px;\n  margin: 0 auto var(--sb-ui-spacing-lg, 24px) auto;\n}\n.search-icon {\n  position: absolute;\n  left: 14px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--sb-ui-text-muted, #adb5bd);\n  pointer-events: none;\n}\n.search-input {\n  padding-left: 40px !important;\n}\n.catalog-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: var(--sb-ui-spacing-lg, 24px);\n}\n@media (max-width: 1024px) {\n  .catalog-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 576px) {\n  .catalog-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.catalog-card {\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-md, 16px);\n}\n.card-icon {\n  width: 48px;\n  height: 48px;\n  border-radius: var(--sb-ui-border-radius, 8px);\n  background-color: var(--sb-ui-bg-primary, #f5f7fa);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--sb-ui-font-size-xl, 1.5rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n}\n.card-body {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.card-top-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.card-category {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-transform: uppercase;\n  font-weight: 600;\n  letter-spacing: 0.5px;\n}\n.card-name {\n  font-size: var(--sb-ui-font-size-lg, 1.25rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  margin: 0;\n  font-weight: 600;\n}\n.card-description {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  margin: 0;\n  line-height: 1.5;\n}\n.empty-state {\n  text-align: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  color: var(--sb-ui-text-secondary, #6c757d);\n}\n.empty-icon {\n  font-size: 3rem;\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n  opacity: 0.4;\n}\n.empty-state p {\n  font-size: var(--sb-ui-font-size-lg, 1.25rem);\n  margin: 0;\n}\n/*# sourceMappingURL=catalog-list.component.css.map */\n'] }]
  }], () => [{ type: CatalogService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CatalogListComponent, { className: "CatalogListComponent", filePath: "src/app/features/public-catalog/catalog-list.component.ts", lineNumber: 213 });
})();
export {
  CatalogListComponent
};
//# sourceMappingURL=chunk-6KPSCSBE.js.map
