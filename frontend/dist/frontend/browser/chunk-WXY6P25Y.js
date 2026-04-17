import {
  LifecycleService
} from "./chunk-5X7I3YSH.js";
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
  NgSelectOption,
  RequiredValidator,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-3TWCQFOL.js";
import {
  CommonModule,
  Component,
  __spreadProps,
  __spreadValues,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-DOM3MDY3.js";

// src/app/features/api-management/api-create.component.ts
var _forTrack0 = ($index, $item) => $item.value;
function ApiCreateComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r2 = ctx.$implicit;
    \u0275\u0275property("value", cat_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r2);
  }
}
function ApiCreateComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 12);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ic_r3 = ctx.$implicit;
    \u0275\u0275property("value", ic_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ic_r3.label);
  }
}
function ApiCreateComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r3.errorMessage);
  }
}
function ApiCreateComponent_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 33);
  }
}
function ApiCreateComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 34);
    \u0275\u0275text(1, " Crear API ");
  }
}
var ApiCreateComponent = class _ApiCreateComponent {
  lifecycleService;
  router;
  categories = ["Emisi\xF3n", "Renovaci\xF3n", "Siniestros", "Consultas", "Cotizaci\xF3n", "Pagos", "Cancelaci\xF3n", "Autenticaci\xF3n", "Notificaciones"];
  icons = [
    { value: "fa-file-contract", label: "\u{1F4C4} Contratos (fa-file-contract)" },
    { value: "fa-sync-alt", label: "\u{1F504} Renovaci\xF3n (fa-sync-alt)" },
    { value: "fa-car-crash", label: "\u{1F697} Siniestros (fa-car-crash)" },
    { value: "fa-search", label: "\u{1F50D} Consultas (fa-search)" },
    { value: "fa-calculator", label: "\u{1F9EE} Cotizaci\xF3n (fa-calculator)" },
    { value: "fa-credit-card", label: "\u{1F4B3} Pagos (fa-credit-card)" },
    { value: "fa-ban", label: "\u{1F6AB} Cancelaci\xF3n (fa-ban)" },
    { value: "fa-shield-alt", label: "\u{1F6E1}\uFE0F Seguridad (fa-shield-alt)" },
    { value: "fa-bell", label: "\u{1F514} Notificaciones (fa-bell)" },
    { value: "fa-cogs", label: "\u2699\uFE0F General (fa-cogs)" }
  ];
  form = {
    name: "",
    category: "",
    description: "",
    descriptionSummary: "",
    icon: "",
    contactTeam: { teamName: "", email: "", area: "" }
  };
  useCasesText = "";
  submitting = false;
  errorMessage = "";
  constructor(lifecycleService, router) {
    this.lifecycleService = lifecycleService;
    this.router = router;
  }
  onSubmit() {
    if (this.submitting)
      return;
    this.submitting = true;
    this.errorMessage = "";
    const payload = __spreadProps(__spreadValues({}, this.form), {
      useCases: this.useCasesText.split(",").map((s) => s.trim()).filter(Boolean)
    });
    this.lifecycleService.createApi(payload).subscribe({
      next: () => {
        this.router.navigate(["/admin"]);
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = "Error al crear la API. Verifica los datos e intenta nuevamente.";
      }
    });
  }
  cancel() {
    this.router.navigate(["/admin"]);
  }
  static \u0275fac = function ApiCreateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiCreateComponent)(\u0275\u0275directiveInject(LifecycleService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ApiCreateComponent, selectors: [["app-api-create"]], decls: 64, vars: 12, consts: [["apiForm", "ngForm"], [1, "create-container"], [1, "create-header"], [1, "sb-ui-button", "sb-ui-button--outline", "sb-ui-button--sm", 3, "click"], [1, "fa", "fa-arrow-left"], [1, "create-form", "sb-ui-card", 3, "ngSubmit"], [1, "form-group"], ["for", "name"], ["id", "name", "type", "text", "name", "name", "required", "", "placeholder", "Ej: API de Emisi\xF3n de P\xF3lizas", "aria-label", "Nombre de la API", 1, "sb-ui-input", 3, "ngModelChange", "ngModel"], ["for", "category"], ["id", "category", "name", "category", "required", "", "aria-label", "Categor\xEDa de la API", 1, "sb-ui-select", 3, "ngModelChange", "ngModel"], ["value", "", "disabled", ""], [3, "value"], ["for", "descriptionSummary"], ["id", "descriptionSummary", "type", "text", "name", "descriptionSummary", "required", "", "placeholder", "Breve resumen de la API", "aria-label", "Descripci\xF3n resumida", 1, "sb-ui-input", 3, "ngModelChange", "ngModel"], ["for", "description"], ["id", "description", "name", "description", "required", "", "rows", "4", "placeholder", "Descripci\xF3n detallada de la API y sus funcionalidades", "aria-label", "Descripci\xF3n completa", 1, "sb-ui-textarea", 3, "ngModelChange", "ngModel"], ["for", "useCases"], ["id", "useCases", "type", "text", "name", "useCases", "required", "", "placeholder", "Ej: Emitir p\xF3liza, Generar certificado, Validar datos", "aria-label", "Casos de uso", 1, "sb-ui-input", 3, "ngModelChange", "ngModel"], ["for", "icon"], ["id", "icon", "name", "icon", "required", "", "aria-label", "\xCDcono de la API", 1, "sb-ui-select", 3, "ngModelChange", "ngModel"], [1, "form-fieldset"], [1, "form-row"], ["for", "teamName"], ["id", "teamName", "type", "text", "name", "teamName", "required", "", "placeholder", "Ej: Equipo Core Seguros", "aria-label", "Nombre del equipo", 1, "sb-ui-input", 3, "ngModelChange", "ngModel"], ["for", "teamEmail"], ["id", "teamEmail", "type", "email", "name", "teamEmail", "required", "", "placeholder", "equipo@segurosbolivar.com", "aria-label", "Email del equipo", 1, "sb-ui-input", 3, "ngModelChange", "ngModel"], ["for", "teamArea"], ["id", "teamArea", "type", "text", "name", "teamArea", "required", "", "placeholder", "Ej: Tecnolog\xEDa", "aria-label", "\xC1rea del equipo", 1, "sb-ui-input", 3, "ngModelChange", "ngModel"], [1, "error-message"], [1, "form-actions"], ["type", "button", 1, "sb-ui-button", "sb-ui-button--outline", 3, "click"], ["type", "submit", 1, "sb-ui-button", 3, "disabled"], [1, "sb-ui-spinner", 2, "width", "18px", "height", "18px", "border-width", "2px"], [1, "fa", "fa-plus"]], template: function ApiCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "button", 3);
      \u0275\u0275listener("click", function ApiCreateComponent_Template_button_click_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.cancel());
      });
      \u0275\u0275element(3, "i", 4);
      \u0275\u0275text(4, " Volver ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h2");
      \u0275\u0275text(6, "Crear nueva API");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "form", 5, 0);
      \u0275\u0275listener("ngSubmit", function ApiCreateComponent_Template_form_ngSubmit_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit());
      });
      \u0275\u0275elementStart(9, "div", 6)(10, "label", 7);
      \u0275\u0275text(11, "Nombre de la API *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "input", 8);
      \u0275\u0275twoWayListener("ngModelChange", function ApiCreateComponent_Template_input_ngModelChange_12_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 6)(14, "label", 9);
      \u0275\u0275text(15, "Categor\xEDa *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "select", 10);
      \u0275\u0275twoWayListener("ngModelChange", function ApiCreateComponent_Template_select_ngModelChange_16_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.category, $event) || (ctx.form.category = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(17, "option", 11);
      \u0275\u0275text(18, "Selecciona una categor\xEDa");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(19, ApiCreateComponent_For_20_Template, 2, 2, "option", 12, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 6)(22, "label", 13);
      \u0275\u0275text(23, "Descripci\xF3n resumida *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function ApiCreateComponent_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.descriptionSummary, $event) || (ctx.form.descriptionSummary = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "div", 6)(26, "label", 15);
      \u0275\u0275text(27, "Descripci\xF3n completa *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "textarea", 16);
      \u0275\u0275twoWayListener("ngModelChange", function ApiCreateComponent_Template_textarea_ngModelChange_28_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.description, $event) || (ctx.form.description = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 6)(30, "label", 17);
      \u0275\u0275text(31, "Casos de uso (separados por coma) *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function ApiCreateComponent_Template_input_ngModelChange_32_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.useCasesText, $event) || (ctx.useCasesText = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 6)(34, "label", 19);
      \u0275\u0275text(35, "\xCDcono *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "select", 20);
      \u0275\u0275twoWayListener("ngModelChange", function ApiCreateComponent_Template_select_ngModelChange_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.icon, $event) || (ctx.form.icon = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(37, "option", 11);
      \u0275\u0275text(38, "Selecciona un \xEDcono");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(39, ApiCreateComponent_For_40_Template, 2, 2, "option", 12, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "fieldset", 21)(42, "legend");
      \u0275\u0275text(43, "Equipo de contacto");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 22)(45, "div", 6)(46, "label", 23);
      \u0275\u0275text(47, "Nombre del equipo *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "input", 24);
      \u0275\u0275twoWayListener("ngModelChange", function ApiCreateComponent_Template_input_ngModelChange_48_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.contactTeam.teamName, $event) || (ctx.form.contactTeam.teamName = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "div", 6)(50, "label", 25);
      \u0275\u0275text(51, "Email *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "input", 26);
      \u0275\u0275twoWayListener("ngModelChange", function ApiCreateComponent_Template_input_ngModelChange_52_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.contactTeam.email, $event) || (ctx.form.contactTeam.email = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "div", 6)(54, "label", 27);
      \u0275\u0275text(55, "\xC1rea *");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "input", 28);
      \u0275\u0275twoWayListener("ngModelChange", function ApiCreateComponent_Template_input_ngModelChange_56_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.form.contactTeam.area, $event) || (ctx.form.contactTeam.area = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(57, ApiCreateComponent_Conditional_57_Template, 2, 1, "div", 29);
      \u0275\u0275elementStart(58, "div", 30)(59, "button", 31);
      \u0275\u0275listener("click", function ApiCreateComponent_Template_button_click_59_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.cancel());
      });
      \u0275\u0275text(60, "Cancelar");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "button", 32);
      \u0275\u0275template(62, ApiCreateComponent_Conditional_62_Template, 1, 0, "span", 33)(63, ApiCreateComponent_Conditional_63_Template, 2, 0);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      const apiForm_r5 = \u0275\u0275reference(8);
      \u0275\u0275advance(12);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.name);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.category);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.categories);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.descriptionSummary);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.description);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.useCasesText);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.icon);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.icons);
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.contactTeam.teamName);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.contactTeam.email);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.form.contactTeam.area);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage ? 57 : -1);
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !apiForm_r5.valid || ctx.submitting);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.submitting ? 62 : 63);
    }
  }, dependencies: [CommonModule, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.create-container[_ngcontent-%COMP%] {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: var(--sb-ui-spacing-lg, 24px);\n}\n.create-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.create-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.create-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.form-fieldset[_ngcontent-%COMP%] {\n  border: 1px solid var(--sb-ui-border-color, #dee2e6);\n  border-radius: var(--sb-ui-border-radius, 8px);\n  padding: 16px;\n  margin: 0;\n}\n.form-fieldset[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  padding: 0 8px;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 8px;\n}\n.error-message[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n  background: rgba(220, 53, 69, .1);\n  color: var(--sb-ui-color-danger, #dc3545);\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n}\n/*# sourceMappingURL=api-create.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiCreateComponent, [{
    type: Component,
    args: [{ selector: "app-api-create", standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="create-container">
      <header class="create-header">
        <button class="sb-ui-button sb-ui-button--outline sb-ui-button--sm" (click)="cancel()">
          <i class="fa fa-arrow-left"></i> Volver
        </button>
        <h2>Crear nueva API</h2>
      </header>

      <form class="create-form sb-ui-card" (ngSubmit)="onSubmit()" #apiForm="ngForm">
        <!-- Nombre -->
        <div class="form-group">
          <label for="name">Nombre de la API *</label>
          <input
            id="name"
            class="sb-ui-input"
            type="text"
            [(ngModel)]="form.name"
            name="name"
            required
            placeholder="Ej: API de Emisi\xF3n de P\xF3lizas"
            aria-label="Nombre de la API"
          />
        </div>

        <!-- Categor\xEDa -->
        <div class="form-group">
          <label for="category">Categor\xEDa *</label>
          <select
            id="category"
            class="sb-ui-select"
            [(ngModel)]="form.category"
            name="category"
            required
            aria-label="Categor\xEDa de la API"
          >
            <option value="" disabled>Selecciona una categor\xEDa</option>
            @for (cat of categories; track cat) {
              <option [value]="cat">{{ cat }}</option>
            }
          </select>
        </div>

        <!-- Descripci\xF3n resumida -->
        <div class="form-group">
          <label for="descriptionSummary">Descripci\xF3n resumida *</label>
          <input
            id="descriptionSummary"
            class="sb-ui-input"
            type="text"
            [(ngModel)]="form.descriptionSummary"
            name="descriptionSummary"
            required
            placeholder="Breve resumen de la API"
            aria-label="Descripci\xF3n resumida"
          />
        </div>

        <!-- Descripci\xF3n completa -->
        <div class="form-group">
          <label for="description">Descripci\xF3n completa *</label>
          <textarea
            id="description"
            class="sb-ui-textarea"
            [(ngModel)]="form.description"
            name="description"
            required
            rows="4"
            placeholder="Descripci\xF3n detallada de la API y sus funcionalidades"
            aria-label="Descripci\xF3n completa"
          ></textarea>
        </div>

        <!-- Casos de uso -->
        <div class="form-group">
          <label for="useCases">Casos de uso (separados por coma) *</label>
          <input
            id="useCases"
            class="sb-ui-input"
            type="text"
            [(ngModel)]="useCasesText"
            name="useCases"
            required
            placeholder="Ej: Emitir p\xF3liza, Generar certificado, Validar datos"
            aria-label="Casos de uso"
          />
        </div>

        <!-- \xCDcono -->
        <div class="form-group">
          <label for="icon">\xCDcono *</label>
          <select
            id="icon"
            class="sb-ui-select"
            [(ngModel)]="form.icon"
            name="icon"
            required
            aria-label="\xCDcono de la API"
          >
            <option value="" disabled>Selecciona un \xEDcono</option>
            @for (ic of icons; track ic.value) {
              <option [value]="ic.value">{{ ic.label }}</option>
            }
          </select>
        </div>

        <!-- Equipo de contacto -->
        <fieldset class="form-fieldset">
          <legend>Equipo de contacto</legend>
          <div class="form-row">
            <div class="form-group">
              <label for="teamName">Nombre del equipo *</label>
              <input
                id="teamName"
                class="sb-ui-input"
                type="text"
                [(ngModel)]="form.contactTeam.teamName"
                name="teamName"
                required
                placeholder="Ej: Equipo Core Seguros"
                aria-label="Nombre del equipo"
              />
            </div>
            <div class="form-group">
              <label for="teamEmail">Email *</label>
              <input
                id="teamEmail"
                class="sb-ui-input"
                type="email"
                [(ngModel)]="form.contactTeam.email"
                name="teamEmail"
                required
                placeholder="equipo@segurosbolivar.com"
                aria-label="Email del equipo"
              />
            </div>
            <div class="form-group">
              <label for="teamArea">\xC1rea *</label>
              <input
                id="teamArea"
                class="sb-ui-input"
                type="text"
                [(ngModel)]="form.contactTeam.area"
                name="teamArea"
                required
                placeholder="Ej: Tecnolog\xEDa"
                aria-label="\xC1rea del equipo"
              />
            </div>
          </div>
        </fieldset>

        @if (errorMessage) {
          <div class="error-message">{{ errorMessage }}</div>
        }

        <div class="form-actions">
          <button type="button" class="sb-ui-button sb-ui-button--outline" (click)="cancel()">Cancelar</button>
          <button type="submit" class="sb-ui-button" [disabled]="!apiForm.valid || submitting">
            @if (submitting) {
              <span class="sb-ui-spinner" style="width:18px;height:18px;border-width:2px"></span>
            } @else {
              <i class="fa fa-plus"></i> Crear API
            }
          </button>
        </div>
      </form>
    </div>
  `, styles: ["/* angular:styles/component:css;1c1c58de84722407897abb3d1830fc0f990e97d6c0bdac09312b19e420a3791a;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/api-management/api-create.component.ts */\n:host {\n  display: block;\n}\n.create-container {\n  max-width: 800px;\n  margin: 0 auto;\n  padding: var(--sb-ui-spacing-lg, 24px);\n}\n.create-header {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.create-header h2 {\n  margin: 0;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.create-form {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-group label {\n  font-weight: 600;\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.form-fieldset {\n  border: 1px solid var(--sb-ui-border-color, #dee2e6);\n  border-radius: var(--sb-ui-border-radius, 8px);\n  padding: 16px;\n  margin: 0;\n}\n.form-fieldset legend {\n  font-weight: 600;\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  padding: 0 8px;\n}\n.form-row {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n.form-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 12px;\n  padding-top: 8px;\n}\n.error-message {\n  padding: 10px 14px;\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n  background: rgba(220, 53, 69, .1);\n  color: var(--sb-ui-color-danger, #dc3545);\n  font-size: var(--sb-ui-font-size-sm, .875rem);\n}\n/*# sourceMappingURL=api-create.component.css.map */\n"] }]
  }], () => [{ type: LifecycleService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ApiCreateComponent, { className: "ApiCreateComponent", filePath: "src/app/features/api-management/api-create.component.ts", lineNumber: 195 });
})();
export {
  ApiCreateComponent
};
//# sourceMappingURL=chunk-WXY6P25Y.js.map
