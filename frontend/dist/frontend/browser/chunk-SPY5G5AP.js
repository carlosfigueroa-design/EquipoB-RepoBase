import {
  LifecycleService
} from "./chunk-5X7I3YSH.js";
import {
  AuthService
} from "./chunk-44KKO47T.js";
import {
  Router
} from "./chunk-36UIY4FN.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-DOM3MDY3.js";

// src/app/features/api-management/api-lifecycle.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.newStatus;
function ApiLifecycleComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275element(1, "i", 8);
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Acceso restringido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "Solo los usuarios con rol Admin pueden acceder a esta secci\xF3n.");
    \u0275\u0275elementEnd()();
  }
}
function ApiLifecycleComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "div", 9);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Cargando APIs...");
    \u0275\u0275elementEnd()();
  }
}
function ApiLifecycleComponent_Conditional_13_For_16_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function ApiLifecycleComponent_Conditional_13_For_16_For_14_Template_button_click_0_listener() {
      const action_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const api_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.changeStatus(api_r2, action_r5.newStatus));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const action_r5 = ctx.$implicit;
    const api_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMapInterpolate1("sb-ui-button sb-ui-button--sm ", action_r5.cssClass, "");
    \u0275\u0275property("disabled", ctx_r2.changingId === api_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", action_r5.label, " ");
  }
}
function ApiLifecycleComponent_Conditional_13_For_16_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1, "Sin acciones");
    \u0275\u0275elementEnd();
  }
}
function ApiLifecycleComponent_Conditional_13_For_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 14);
    \u0275\u0275listener("click", function ApiLifecycleComponent_Conditional_13_For_16_Template_tr_click_0_listener() {
      const api_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectApi(api_r2));
    });
    \u0275\u0275elementStart(1, "td")(2, "div", 15);
    \u0275\u0275element(3, "i");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td")(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 16);
    \u0275\u0275listener("click", function ApiLifecycleComponent_Conditional_13_For_16_Template_td_click_12_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275repeaterCreate(13, ApiLifecycleComponent_Conditional_13_For_16_For_14_Template, 2, 5, "button", 17, _forTrack1);
    \u0275\u0275template(15, ApiLifecycleComponent_Conditional_13_For_16_Conditional_15_Template, 2, 0, "span", 18);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const api_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("row-selected", ctx_r2.selectedApiId === api_r2.id);
    \u0275\u0275advance(3);
    \u0275\u0275classMapInterpolate1("fa ", api_r2.icon, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", api_r2.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(api_r2.category);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getBadgeClass(api_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(api_r2.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(api_r2.version);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.getTransitions(api_r2.status));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.getTransitions(api_r2.status).length === 0 ? 15 : -1);
  }
}
function ApiLifecycleComponent_Conditional_13_ForEmpty_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 20);
    \u0275\u0275text(2, "No hay APIs registradas");
    \u0275\u0275elementEnd()();
  }
}
function ApiLifecycleComponent_Conditional_13_Conditional_18_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "div", 9);
    \u0275\u0275elementEnd();
  }
}
function ApiLifecycleComponent_Conditional_13_Conditional_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "No hay registros de auditor\xEDa para esta API.");
    \u0275\u0275elementEnd();
  }
}
function ApiLifecycleComponent_Conditional_13_Conditional_18_Conditional_10_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td")(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const entry_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(entry_r7.timestamp));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r7.action);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getBadgeClass(entry_r7.previousStatus));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r7.previousStatus);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r2.getBadgeClass(entry_r7.newStatus));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(entry_r7.newStatus);
  }
}
function ApiLifecycleComponent_Conditional_13_Conditional_18_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 26)(1, "thead")(2, "tr")(3, "th");
    \u0275\u0275text(4, "Fecha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "th");
    \u0275\u0275text(6, "Acci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th");
    \u0275\u0275text(8, "Estado anterior");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th");
    \u0275\u0275text(10, "Nuevo estado");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "tbody");
    \u0275\u0275repeaterCreate(12, ApiLifecycleComponent_Conditional_13_Conditional_18_Conditional_10_For_13_Template, 11, 8, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(12);
    \u0275\u0275repeater(ctx_r2.auditLog);
  }
}
function ApiLifecycleComponent_Conditional_13_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 21)(2, "h3");
    \u0275\u0275element(3, "i", 22);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 23);
    \u0275\u0275listener("click", function ApiLifecycleComponent_Conditional_13_Conditional_18_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.closeAudit());
    });
    \u0275\u0275element(6, "i", 24);
    \u0275\u0275text(7, " Cerrar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, ApiLifecycleComponent_Conditional_13_Conditional_18_Conditional_8_Template, 2, 0, "div", 7)(9, ApiLifecycleComponent_Conditional_13_Conditional_18_Conditional_9_Template, 2, 0, "p", 25)(10, ApiLifecycleComponent_Conditional_13_Conditional_18_Conditional_10_Template, 14, 0, "table", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Log de auditor\xEDa \u2014 ", ctx_r2.selectedApiName, "");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.auditLoading ? 8 : ctx_r2.auditLog.length === 0 ? 9 : 10);
  }
}
function ApiLifecycleComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "table", 11)(2, "thead")(3, "tr")(4, "th");
    \u0275\u0275text(5, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th");
    \u0275\u0275text(7, "Categor\xEDa");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th");
    \u0275\u0275text(9, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th");
    \u0275\u0275text(11, "Versi\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th");
    \u0275\u0275text(13, "Acciones");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, ApiLifecycleComponent_Conditional_13_For_16_Template, 16, 12, "tr", 12, _forTrack0, false, ApiLifecycleComponent_Conditional_13_ForEmpty_17_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(18, ApiLifecycleComponent_Conditional_13_Conditional_18_Template, 11, 2, "div", 13);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.apis);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.selectedApiId ? 18 : -1);
  }
}
var STATUS_TRANSITIONS = {
  Borrador: [{ label: "Publicar", newStatus: "Publicada", cssClass: "sb-ui-button--secondary" }],
  Publicada: [{ label: "Deprecar", newStatus: "Deprecada", cssClass: "sb-ui-button--outline" }],
  Deprecada: [
    { label: "Retirar", newStatus: "Retirada", cssClass: "sb-ui-button--danger" },
    { label: "Reactivar", newStatus: "Publicada", cssClass: "sb-ui-button--secondary" }
  ],
  Retirada: []
};
var BADGE_CLASS = {
  Borrador: "sb-ui-badge sb-ui-badge--muted",
  Publicada: "sb-ui-badge sb-ui-badge--success",
  Deprecada: "sb-ui-badge sb-ui-badge--warning",
  Retirada: "sb-ui-badge sb-ui-badge--danger"
};
var ApiLifecycleComponent = class _ApiLifecycleComponent {
  lifecycleService;
  authService;
  router;
  apis = [];
  loading = true;
  isAdmin = false;
  changingId = null;
  selectedApiId = null;
  selectedApiName = "";
  auditLog = [];
  auditLoading = false;
  constructor(lifecycleService, authService, router) {
    this.lifecycleService = lifecycleService;
    this.authService = authService;
    this.router = router;
  }
  ngOnInit() {
    const profile = this.authService.getProfile();
    this.isAdmin = profile?.role === "Admin";
    if (this.isAdmin) {
      this.loadApis();
    } else {
      this.loading = false;
    }
  }
  loadApis() {
    this.loading = true;
    this.lifecycleService.getAllApis().subscribe({
      next: (data) => {
        this.apis = data;
        this.loading = false;
      },
      error: () => {
        this.apis = [];
        this.loading = false;
      }
    });
  }
  getBadgeClass(status) {
    return BADGE_CLASS[status] || "sb-ui-badge sb-ui-badge--muted";
  }
  getTransitions(status) {
    return STATUS_TRANSITIONS[status] || [];
  }
  changeStatus(api, newStatus) {
    this.changingId = api.id;
    this.lifecycleService.changeStatus(api.id, newStatus).subscribe({
      next: (updated) => {
        const idx = this.apis.findIndex((a) => a.id === updated.id);
        if (idx !== -1) {
          this.apis[idx] = updated;
        }
        this.changingId = null;
        if (this.selectedApiId === api.id) {
          this.loadAuditLog(api.id, api.name);
        }
      },
      error: () => {
        this.changingId = null;
      }
    });
  }
  selectApi(api) {
    if (this.selectedApiId === api.id) {
      this.closeAudit();
      return;
    }
    this.selectedApiId = api.id;
    this.selectedApiName = api.name;
    this.loadAuditLog(api.id, api.name);
  }
  closeAudit() {
    this.selectedApiId = null;
    this.selectedApiName = "";
    this.auditLog = [];
  }
  navigateToCreate() {
    this.router.navigate(["/admin/create"]);
  }
  formatDate(timestamp) {
    try {
      return new Date(timestamp).toLocaleString("es-CO", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return timestamp;
    }
  }
  loadAuditLog(apiId, apiName) {
    this.auditLoading = true;
    this.lifecycleService.getAuditLog(apiId).subscribe({
      next: (log) => {
        this.auditLog = log;
        this.auditLoading = false;
      },
      error: () => {
        this.auditLog = [];
        this.auditLoading = false;
      }
    });
  }
  static \u0275fac = function ApiLifecycleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiLifecycleComponent)(\u0275\u0275directiveInject(LifecycleService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApiLifecycleComponent, selectors: [["app-api-lifecycle"]], decls: 14, vars: 1, consts: [[1, "lifecycle-container"], [1, "lifecycle-header"], [1, "header-left"], [1, "fa", "fa-cogs"], [1, "sb-ui-button", 3, "click"], [1, "fa", "fa-plus"], [1, "access-denied", "sb-ui-card"], [1, "loading-state"], [1, "fa", "fa-lock"], [1, "sb-ui-spinner"], [1, "table-wrapper", "sb-ui-card"], [1, "sb-ui-table"], [2, "cursor", "pointer", 3, "row-selected"], [1, "audit-panel", "sb-ui-card"], [2, "cursor", "pointer", 3, "click"], [1, "api-name"], [1, "actions-cell", 3, "click"], [3, "class", "disabled"], [1, "no-actions"], [3, "click", "disabled"], ["colspan", "5", 1, "empty-state"], [1, "audit-header"], [1, "fa", "fa-history"], [1, "sb-ui-button", "sb-ui-button--outline", "sb-ui-button--sm", 3, "click"], [1, "fa", "fa-times"], [1, "audit-empty"], [1, "sb-ui-table", "audit-table"]], template: function ApiLifecycleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h2");
      \u0275\u0275element(4, "i", 3);
      \u0275\u0275text(5, " Gesti\xF3n del Ciclo de Vida");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p");
      \u0275\u0275text(7, "Administra el estado de las APIs del portal");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "button", 4);
      \u0275\u0275listener("click", function ApiLifecycleComponent_Template_button_click_8_listener() {
        return ctx.navigateToCreate();
      });
      \u0275\u0275element(9, "i", 5);
      \u0275\u0275text(10, " Crear nueva API ");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(11, ApiLifecycleComponent_Conditional_11_Template, 6, 0, "div", 6)(12, ApiLifecycleComponent_Conditional_12_Template, 4, 0, "div", 7)(13, ApiLifecycleComponent_Conditional_13_Template, 19, 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275conditional(!ctx.isAdmin ? 11 : ctx.loading ? 12 : 13);
    }
  }, dependencies: [CommonModule], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.lifecycle-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--sb-ui-spacing-lg, 24px);\n}\n.lifecycle-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.header-left[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-left[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow-x: auto;\n}\n.api-name[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n}\n.api-name[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: var(--sb-ui-color-primary, #003b7a);\n  width: 20px;\n  text-align: center;\n}\n.actions-cell[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.no-actions[_ngcontent-%COMP%] {\n  color: var(--sb-ui-text-muted, #adb5bd);\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n  font-style: italic;\n}\n.row-selected[_ngcontent-%COMP%] {\n  background: rgba(0, 59, 122, .06) !important;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  padding: 32px !important;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--sb-ui-text-secondary, #6c757d);\n}\n.access-denied[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: var(--sb-ui-text-secondary, #6c757d);\n}\n.access-denied[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  color: var(--sb-ui-color-danger, #dc3545);\n  margin-bottom: 16px;\n}\n.access-denied[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.audit-panel[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n.audit-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid var(--sb-ui-border-color, #dee2e6);\n}\n.audit-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--sb-ui-font-size-md, 1rem);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.audit-empty[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  margin: 0;\n}\n.audit-table[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n}\n/*# sourceMappingURL=api-lifecycle.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiLifecycleComponent, [{
    type: Component,
    args: [{ selector: "app-api-lifecycle", standalone: true, imports: [CommonModule], template: `
    <div class="lifecycle-container">
      <header class="lifecycle-header">
        <div class="header-left">
          <h2><i class="fa fa-cogs"></i> Gesti\xF3n del Ciclo de Vida</h2>
          <p>Administra el estado de las APIs del portal</p>
        </div>
        <button class="sb-ui-button" (click)="navigateToCreate()">
          <i class="fa fa-plus"></i> Crear nueva API
        </button>
      </header>

      @if (!isAdmin) {
        <div class="access-denied sb-ui-card">
          <i class="fa fa-lock"></i>
          <h3>Acceso restringido</h3>
          <p>Solo los usuarios con rol Admin pueden acceder a esta secci\xF3n.</p>
        </div>
      } @else if (loading) {
        <div class="loading-state">
          <div class="sb-ui-spinner"></div>
          <p>Cargando APIs...</p>
        </div>
      } @else {
        <div class="table-wrapper sb-ui-card">
          <table class="sb-ui-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categor\xEDa</th>
                <th>Estado</th>
                <th>Versi\xF3n</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              @for (api of apis; track api.id) {
                <tr
                  [class.row-selected]="selectedApiId === api.id"
                  (click)="selectApi(api)"
                  style="cursor:pointer"
                >
                  <td>
                    <div class="api-name">
                      <i class="fa {{ api.icon }}"></i>
                      {{ api.name }}
                    </div>
                  </td>
                  <td>{{ api.category }}</td>
                  <td><span [class]="getBadgeClass(api.status)">{{ api.status }}</span></td>
                  <td>{{ api.version }}</td>
                  <td class="actions-cell" (click)="$event.stopPropagation()">
                    @for (action of getTransitions(api.status); track action.newStatus) {
                      <button
                        class="sb-ui-button sb-ui-button--sm {{ action.cssClass }}"
                        (click)="changeStatus(api, action.newStatus)"
                        [disabled]="changingId === api.id"
                      >
                        {{ action.label }}
                      </button>
                    }
                    @if (getTransitions(api.status).length === 0) {
                      <span class="no-actions">Sin acciones</span>
                    }
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="empty-state">No hay APIs registradas</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Audit Log Panel -->
        @if (selectedApiId) {
          <div class="audit-panel sb-ui-card">
            <div class="audit-header">
              <h3><i class="fa fa-history"></i> Log de auditor\xEDa \u2014 {{ selectedApiName }}</h3>
              <button class="sb-ui-button sb-ui-button--outline sb-ui-button--sm" (click)="closeAudit()">
                <i class="fa fa-times"></i> Cerrar
              </button>
            </div>

            @if (auditLoading) {
              <div class="loading-state">
                <div class="sb-ui-spinner"></div>
              </div>
            } @else if (auditLog.length === 0) {
              <p class="audit-empty">No hay registros de auditor\xEDa para esta API.</p>
            } @else {
              <table class="sb-ui-table audit-table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Acci\xF3n</th>
                    <th>Estado anterior</th>
                    <th>Nuevo estado</th>
                  </tr>
                </thead>
                <tbody>
                  @for (entry of auditLog; track entry.id) {
                    <tr>
                      <td>{{ formatDate(entry.timestamp) }}</td>
                      <td>{{ entry.action }}</td>
                      <td><span [class]="getBadgeClass(entry.previousStatus)">{{ entry.previousStatus }}</span></td>
                      <td><span [class]="getBadgeClass(entry.newStatus)">{{ entry.newStatus }}</span></td>
                    </tr>
                  }
                </tbody>
              </table>
            }
          </div>
        }
      }
    </div>
  `, styles: ["/* angular:styles/component:css;d28b128fedb331f2ff757d3438189fe886e7fffdcc02eb58540c90f1b0442a6f;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/api-management/api-lifecycle.component.ts */\n:host {\n  display: block;\n}\n.lifecycle-container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--sb-ui-spacing-lg, 24px);\n}\n.lifecycle-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.header-left h2 {\n  margin: 0;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.header-left p {\n  margin: 4px 0 0;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n}\n.table-wrapper {\n  padding: 0;\n  overflow-x: auto;\n}\n.api-name {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n}\n.api-name i {\n  color: var(--sb-ui-color-primary, #003b7a);\n  width: 20px;\n  text-align: center;\n}\n.actions-cell {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.no-actions {\n  color: var(--sb-ui-text-muted, #adb5bd);\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n  font-style: italic;\n}\n.row-selected {\n  background: rgba(0, 59, 122, .06) !important;\n}\n.empty-state {\n  text-align: center;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  padding: 32px !important;\n}\n.loading-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  padding: 48px;\n  color: var(--sb-ui-text-secondary, #6c757d);\n}\n.access-denied {\n  text-align: center;\n  padding: 48px;\n  color: var(--sb-ui-text-secondary, #6c757d);\n}\n.access-denied i {\n  font-size: 3rem;\n  color: var(--sb-ui-color-danger, #dc3545);\n  margin-bottom: 16px;\n}\n.access-denied h3 {\n  margin: 0 0 8px;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.audit-panel {\n  margin-top: 24px;\n}\n.audit-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  border-bottom: 1px solid var(--sb-ui-border-color, #dee2e6);\n}\n.audit-header h3 {\n  margin: 0;\n  font-size: var(--sb-ui-font-size-md, 1rem);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.audit-empty {\n  padding: 24px;\n  text-align: center;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  margin: 0;\n}\n.audit-table {\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n}\n/*# sourceMappingURL=api-lifecycle.component.css.map */\n"] }]
  }], () => [{ type: LifecycleService }, { type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApiLifecycleComponent, { className: "ApiLifecycleComponent", filePath: "src/app/features/api-management/api-lifecycle.component.ts", lineNumber: 177 });
})();
export {
  ApiLifecycleComponent
};
//# sourceMappingURL=chunk-SPY5G5AP.js.map
