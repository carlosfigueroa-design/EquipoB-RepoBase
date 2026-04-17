import {
  CatalogService
} from "./chunk-HHHT4LPS.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
} from "./chunk-3TWCQFOL.js";
import {
  API_CONFIG,
  CommonModule,
  Component,
  DatePipe,
  EventEmitter,
  HttpClient,
  Injectable,
  Input,
  NgClass,
  Output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-DOM3MDY3.js";

// src/app/features/sandbox/request-builder.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.value;
function RequestBuilderComponent_For_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const api_r1 = ctx.$implicit;
    \u0275\u0275property("value", api_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(api_r1.name);
  }
}
function RequestBuilderComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const m_r2 = ctx.$implicit;
    \u0275\u0275property("value", m_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(m_r2);
  }
}
function RequestBuilderComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r3 = ctx.$implicit;
    \u0275\u0275property("value", s_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(s_r3.label);
  }
}
function RequestBuilderComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 18);
  }
}
function RequestBuilderComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 19);
  }
}
var RequestBuilderComponent = class _RequestBuilderComponent {
  apis = [];
  loading = false;
  executeRequest = new EventEmitter();
  selectedApiId = "";
  method = "POST";
  endpoint = "";
  scenario = "200";
  bodyText = "";
  methods = ["GET", "POST", "PUT", "DELETE"];
  scenarios = [
    { value: "200", label: "200 \u2014 \xC9xito" },
    { value: "400", label: "400 \u2014 Bad Request" },
    { value: "404", label: "404 \u2014 Not Found" },
    { value: "500", label: "500 \u2014 Server Error" }
  ];
  exampleBodies = {
    "api-001": JSON.stringify({
      asegurado: { nombre: "Juan P\xE9rez", documento: "1234567890", tipoDocumento: "CC" },
      plan: { nombre: "Vida Plus", cobertura: "Muerte + Incapacidad" }
    }, null, 2),
    "api-002": JSON.stringify({
      polizaId: "POL-2024-001234",
      periodoRenovacion: { inicio: "2025-07-01", fin: "2026-07-01" }
    }, null, 2),
    "api-003": JSON.stringify({
      polizaId: "POL-2024-001234",
      tipoConsulta: "detalle"
    }, null, 2)
  };
  exampleEndpoints = {
    "api-001": "/v1/polizas/emitir",
    "api-002": "/v1/polizas/renovar",
    "api-003": "/v1/siniestros/consultar",
    "api-004": "/v1/siniestros/registrar",
    "api-005": "/v1/cotizaciones/calcular",
    "api-006": "/v1/polizas/consultar",
    "api-007": "/v1/polizas/cancelar",
    "api-008": "/v1/pagos/consultar"
  };
  ngOnInit() {
  }
  onApiChange() {
    this.endpoint = this.exampleEndpoints[this.selectedApiId] ?? "/v1/endpoint";
    this.bodyText = this.exampleBodies[this.selectedApiId] ?? JSON.stringify({ ejemplo: "datos" }, null, 2);
  }
  onExecute() {
    let parsedBody = void 0;
    if (this.bodyText.trim()) {
      try {
        parsedBody = JSON.parse(this.bodyText);
      } catch {
        parsedBody = this.bodyText;
      }
    }
    const request = {
      apiId: this.selectedApiId,
      endpoint: this.endpoint,
      method: this.method,
      body: parsedBody,
      scenario: this.scenario
    };
    this.executeRequest.emit(request);
  }
  static \u0275fac = function RequestBuilderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RequestBuilderComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RequestBuilderComponent, selectors: [["app-request-builder"]], inputs: { apis: "apis", loading: "loading" }, outputs: { executeRequest: "executeRequest" }, decls: 34, vars: 7, consts: [[1, "request-builder"], [1, "form-group"], ["for", "api-select"], ["id", "api-select", 1, "sb-ui-select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "form-row"], [1, "form-group", "method-group"], ["for", "method-select"], ["id", "method-select", 1, "sb-ui-select", 3, "ngModelChange", "ngModel"], [1, "form-group", "endpoint-group"], ["for", "endpoint-input"], ["id", "endpoint-input", "type", "text", "placeholder", "/v1/polizas/emitir", 1, "sb-ui-input", 3, "ngModelChange", "ngModel"], ["for", "scenario-select"], ["id", "scenario-select", 1, "sb-ui-select", 3, "ngModelChange", "ngModel"], ["for", "body-editor"], ["id", "body-editor", "rows", "8", "placeholder", '{ "key": "value" }', 1, "sb-ui-textarea", "body-editor", 3, "ngModelChange", "ngModel"], [1, "sb-ui-button", "execute-btn", 3, "click", "disabled"], [1, "sb-ui-spinner", "spinner-sm"], [1, "fa", "fa-play"]], template: function RequestBuilderComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "label", 2);
      \u0275\u0275text(3, "API");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "select", 3);
      \u0275\u0275twoWayListener("ngModelChange", function RequestBuilderComponent_Template_select_ngModelChange_4_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedApiId, $event) || (ctx.selectedApiId = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function RequestBuilderComponent_Template_select_ngModelChange_4_listener() {
        return ctx.onApiChange();
      });
      \u0275\u0275elementStart(5, "option", 4);
      \u0275\u0275text(6, "-- Seleccionar API --");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(7, RequestBuilderComponent_For_8_Template, 2, 2, "option", 5, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 6)(10, "div", 7)(11, "label", 8);
      \u0275\u0275text(12, "M\xE9todo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "select", 9);
      \u0275\u0275twoWayListener("ngModelChange", function RequestBuilderComponent_Template_select_ngModelChange_13_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.method, $event) || (ctx.method = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(14, RequestBuilderComponent_For_15_Template, 2, 2, "option", 5, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 10)(17, "label", 11);
      \u0275\u0275text(18, "Endpoint");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function RequestBuilderComponent_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.endpoint, $event) || (ctx.endpoint = $event);
        return $event;
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 1)(21, "label", 13);
      \u0275\u0275text(22, "Escenario");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "select", 14);
      \u0275\u0275twoWayListener("ngModelChange", function RequestBuilderComponent_Template_select_ngModelChange_23_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.scenario, $event) || (ctx.scenario = $event);
        return $event;
      });
      \u0275\u0275repeaterCreate(24, RequestBuilderComponent_For_25_Template, 2, 2, "option", 5, _forTrack1);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 1)(27, "label", 15);
      \u0275\u0275text(28, "Body (JSON)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "textarea", 16);
      \u0275\u0275twoWayListener("ngModelChange", function RequestBuilderComponent_Template_textarea_ngModelChange_29_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.bodyText, $event) || (ctx.bodyText = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "button", 17);
      \u0275\u0275listener("click", function RequestBuilderComponent_Template_button_click_30_listener() {
        return ctx.onExecute();
      });
      \u0275\u0275template(31, RequestBuilderComponent_Conditional_31_Template, 1, 0, "span", 18)(32, RequestBuilderComponent_Conditional_32_Template, 1, 0, "i", 19);
      \u0275\u0275text(33, " Ejecutar ");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedApiId);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.apis);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.method);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.methods);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.endpoint);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.scenario);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.scenarios);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.bodyText);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.selectedApiId || !ctx.endpoint || ctx.loading);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading ? 31 : 32);
    }
  }, dependencies: [CommonModule, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel], styles: ['\n\n.request-builder[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-md, 16px);\n}\n.form-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.form-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.method-group[_ngcontent-%COMP%] {\n  flex: 0 0 130px;\n}\n.endpoint-group[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.body-editor[_ngcontent-%COMP%] {\n  font-family:\n    "Courier New",\n    Courier,\n    monospace;\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  min-height: 140px;\n  resize: vertical;\n}\n.execute-btn[_ngcontent-%COMP%] {\n  align-self: flex-start;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.spinner-sm[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border-width: 2px;\n}\n/*# sourceMappingURL=request-builder.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RequestBuilderComponent, [{
    type: Component,
    args: [{ selector: "app-request-builder", standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="request-builder">
      <div class="form-group">
        <label for="api-select">API</label>
        <select id="api-select" class="sb-ui-select" [(ngModel)]="selectedApiId" (ngModelChange)="onApiChange()">
          <option value="">-- Seleccionar API --</option>
          @for (api of apis; track api.id) {
            <option [value]="api.id">{{ api.name }}</option>
          }
        </select>
      </div>

      <div class="form-row">
        <div class="form-group method-group">
          <label for="method-select">M\xE9todo</label>
          <select id="method-select" class="sb-ui-select" [(ngModel)]="method">
            @for (m of methods; track m) {
              <option [value]="m">{{ m }}</option>
            }
          </select>
        </div>
        <div class="form-group endpoint-group">
          <label for="endpoint-input">Endpoint</label>
          <input id="endpoint-input" class="sb-ui-input" type="text"
                 [(ngModel)]="endpoint" placeholder="/v1/polizas/emitir" />
        </div>
      </div>

      <div class="form-group">
        <label for="scenario-select">Escenario</label>
        <select id="scenario-select" class="sb-ui-select" [(ngModel)]="scenario">
          @for (s of scenarios; track s.value) {
            <option [value]="s.value">{{ s.label }}</option>
          }
        </select>
      </div>

      <div class="form-group">
        <label for="body-editor">Body (JSON)</label>
        <textarea id="body-editor" class="sb-ui-textarea body-editor"
                  [(ngModel)]="bodyText" rows="8"
                  placeholder='{ "key": "value" }'></textarea>
      </div>

      <button class="sb-ui-button execute-btn"
              [disabled]="!selectedApiId || !endpoint || loading"
              (click)="onExecute()">
        @if (loading) {
          <span class="sb-ui-spinner spinner-sm"></span>
        } @else {
          <i class="fa fa-play"></i>
        }
        Ejecutar
      </button>
    </div>
  `, styles: ['/* angular:styles/component:css;2d2d0277a05dd42ee0db06b751225f04332c8a436efc638349571454d209fc82;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/sandbox/request-builder.component.ts */\n.request-builder {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-md, 16px);\n}\n.form-group {\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.form-group label {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.form-row {\n  display: flex;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.method-group {\n  flex: 0 0 130px;\n}\n.endpoint-group {\n  flex: 1;\n}\n.body-editor {\n  font-family:\n    "Courier New",\n    Courier,\n    monospace;\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  min-height: 140px;\n  resize: vertical;\n}\n.execute-btn {\n  align-self: flex-start;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.spinner-sm {\n  width: 16px;\n  height: 16px;\n  border-width: 2px;\n}\n/*# sourceMappingURL=request-builder.component.css.map */\n'] }]
  }], null, { apis: [{
    type: Input
  }], loading: [{
    type: Input
  }], executeRequest: [{
    type: Output
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RequestBuilderComponent, { className: "RequestBuilderComponent", filePath: "src/app/features/sandbox/request-builder.component.ts", lineNumber: 112 });
})();

// src/app/features/sandbox/response-viewer.component.ts
function ResponseViewerComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "i", 2);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Ejecuta una petici\xF3n para ver la respuesta aqu\xED");
    \u0275\u0275elementEnd()();
  }
}
function ResponseViewerComponent_Conditional_2_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "span", 12);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 13);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const key_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", key_r1, ":");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.response.headers[key_r1]);
  }
}
function ResponseViewerComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "span", 4);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 5);
    \u0275\u0275element(4, "i", 6);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 7)(7, "h4");
    \u0275\u0275text(8, "Correlation-ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "code", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 7)(12, "h4");
    \u0275\u0275text(13, "Headers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 9);
    \u0275\u0275repeaterCreate(15, ResponseViewerComponent_Conditional_2_For_16_Template, 5, 2, "div", 10, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 7)(18, "h4");
    \u0275\u0275text(19, "Body");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "pre", 11);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.statusBadgeClass);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.response.statusCode, " ", ctx_r1.statusText, " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.response.responseTimeMs, "ms ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.response.correlationId);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.headerKeys);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.formattedBody);
  }
}
var ResponseViewerComponent = class _ResponseViewerComponent {
  response = null;
  get statusBadgeClass() {
    if (!this.response)
      return "";
    const code = this.response.statusCode;
    if (code >= 200 && code < 300)
      return "sb-ui-badge--success";
    if (code >= 400 && code < 500)
      return "sb-ui-badge--warning";
    return "sb-ui-badge--danger";
  }
  get statusText() {
    if (!this.response)
      return "";
    const map = {
      200: "OK",
      201: "Created",
      400: "Bad Request",
      404: "Not Found",
      500: "Internal Server Error"
    };
    return map[this.response.statusCode] ?? "";
  }
  get headerKeys() {
    return this.response ? Object.keys(this.response.headers) : [];
  }
  get formattedBody() {
    if (!this.response?.body)
      return "";
    try {
      return JSON.stringify(this.response.body, null, 2);
    } catch {
      return String(this.response.body);
    }
  }
  static \u0275fac = function ResponseViewerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ResponseViewerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResponseViewerComponent, selectors: [["app-response-viewer"]], inputs: { response: "response" }, decls: 3, vars: 1, consts: [[1, "response-viewer"], [1, "empty-state"], [1, "fa", "fa-paper-plane"], [1, "response-header"], [1, "sb-ui-badge", 3, "ngClass"], [1, "meta-item"], [1, "fa", "fa-clock"], [1, "response-section"], [1, "correlation-id"], [1, "headers-list"], [1, "header-row"], [1, "json-body"], [1, "header-key"], [1, "header-value"]], template: function ResponseViewerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275template(1, ResponseViewerComponent_Conditional_1_Template, 4, 0, "div", 1)(2, ResponseViewerComponent_Conditional_2_Template, 22, 6);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.response ? 1 : 2);
    }
  }, dependencies: [CommonModule, NgClass], styles: ["\n\n.response-viewer[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-align: center;\n  min-height: 200px;\n}\n.empty-state[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n  opacity: 0.4;\n}\n.response-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-md, 16px);\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n  flex-wrap: wrap;\n}\n.meta-item[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.response-section[_ngcontent-%COMP%] {\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n}\n.response-section[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  margin: 0 0 var(--sb-ui-spacing-xs, 4px) 0;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.correlation-id[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  background: var(--sb-ui-bg-primary, #f5f7fa);\n  padding: 4px 8px;\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n  word-break: break-all;\n}\n.headers-list[_ngcontent-%COMP%] {\n  background: var(--sb-ui-bg-primary, #f5f7fa);\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n  padding: var(--sb-ui-spacing-sm, 8px);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n}\n.header-row[_ngcontent-%COMP%] {\n  padding: 2px 0;\n}\n.header-key[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--sb-ui-color-primary, #003b7a);\n}\n.header-value[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.json-body[_ngcontent-%COMP%] {\n  background: var(--sb-ui-bg-dark, #1a1a2e);\n  color: var(--sb-ui-color-secondary-light, #33b873);\n  padding: var(--sb-ui-spacing-md, 16px);\n  border-radius: var(--sb-ui-border-radius, 8px);\n  overflow-x: auto;\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  max-height: 350px;\n  overflow-y: auto;\n  margin: 0;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n/*# sourceMappingURL=response-viewer.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ResponseViewerComponent, [{
    type: Component,
    args: [{ selector: "app-response-viewer", standalone: true, imports: [CommonModule], template: `
    <div class="response-viewer">
      @if (!response) {
        <div class="empty-state">
          <i class="fa fa-paper-plane"></i>
          <p>Ejecuta una petici\xF3n para ver la respuesta aqu\xED</p>
        </div>
      } @else {
        <div class="response-header">
          <span class="sb-ui-badge" [ngClass]="statusBadgeClass">
            {{ response.statusCode }} {{ statusText }}
          </span>
          <span class="meta-item">
            <i class="fa fa-clock"></i> {{ response.responseTimeMs }}ms
          </span>
        </div>

        <div class="response-section">
          <h4>Correlation-ID</h4>
          <code class="correlation-id">{{ response.correlationId }}</code>
        </div>

        <div class="response-section">
          <h4>Headers</h4>
          <div class="headers-list">
            @for (key of headerKeys; track key) {
              <div class="header-row">
                <span class="header-key">{{ key }}:</span>
                <span class="header-value">{{ response.headers[key] }}</span>
              </div>
            }
          </div>
        </div>

        <div class="response-section">
          <h4>Body</h4>
          <pre class="json-body">{{ formattedBody }}</pre>
        </div>
      }
    </div>
  `, styles: ["/* angular:styles/component:css;681bac6729927d88de1f0dd58cfa83aedb040e2f2bdb7436e8bf5bf4493cbfe7;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/sandbox/response-viewer.component.ts */\n.response-viewer {\n  height: 100%;\n}\n.empty-state {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  text-align: center;\n  min-height: 200px;\n}\n.empty-state i {\n  font-size: 2.5rem;\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n  opacity: 0.4;\n}\n.response-header {\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-md, 16px);\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n  flex-wrap: wrap;\n}\n.meta-item {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  color: var(--sb-ui-text-secondary, #6c757d);\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.response-section {\n  margin-bottom: var(--sb-ui-spacing-md, 16px);\n}\n.response-section h4 {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  font-weight: 600;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  margin: 0 0 var(--sb-ui-spacing-xs, 4px) 0;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.correlation-id {\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  background: var(--sb-ui-bg-primary, #f5f7fa);\n  padding: 4px 8px;\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n  word-break: break-all;\n}\n.headers-list {\n  background: var(--sb-ui-bg-primary, #f5f7fa);\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n  padding: var(--sb-ui-spacing-sm, 8px);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n}\n.header-row {\n  padding: 2px 0;\n}\n.header-key {\n  font-weight: 600;\n  color: var(--sb-ui-color-primary, #003b7a);\n}\n.header-value {\n  margin-left: 4px;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n}\n.json-body {\n  background: var(--sb-ui-bg-dark, #1a1a2e);\n  color: var(--sb-ui-color-secondary-light, #33b873);\n  padding: var(--sb-ui-spacing-md, 16px);\n  border-radius: var(--sb-ui-border-radius, 8px);\n  overflow-x: auto;\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  max-height: 350px;\n  overflow-y: auto;\n  margin: 0;\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n/*# sourceMappingURL=response-viewer.component.css.map */\n"] }]
  }], null, { response: [{
    type: Input
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResponseViewerComponent, { className: "ResponseViewerComponent", filePath: "src/app/features/sandbox/response-viewer.component.ts", lineNumber: 133 });
})();

// src/app/core/services/sandbox.service.ts
var SandboxService = class _SandboxService {
  http;
  constructor(http) {
    this.http = http;
  }
  execute(request) {
    return this.http.post(API_CONFIG.sandbox.execute, request);
  }
  getHistory() {
    return this.http.get(API_CONFIG.sandbox.history);
  }
  static \u0275fac = function SandboxService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SandboxService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SandboxService, factory: _SandboxService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SandboxService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/sandbox/sandbox.component.ts
function SandboxComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 12);
    \u0275\u0275text(1, "Sin peticiones a\xFAn");
    \u0275\u0275elementEnd();
  }
}
function SandboxComponent_Conditional_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 15);
    \u0275\u0275listener("click", function SandboxComponent_Conditional_23_For_2_Template_li_click_0_listener() {
      const entry_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectHistory(entry_r2));
    });
    \u0275\u0275elementStart(1, "div", 16)(2, "span", 17);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 18);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 19);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 20);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r2 = ctx.$implicit;
    const $index_r4 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.selectedHistoryIndex === $index_r4);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", ctx_r2.getHistoryBadgeClass(entry_r2.response.statusCode));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", entry_r2.response.statusCode, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r2.request.method);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r2.request.endpoint);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 7, entry_r2.timestamp, "HH:mm:ss"));
  }
}
function SandboxComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 13);
    \u0275\u0275repeaterCreate(1, SandboxComponent_Conditional_23_For_2_Template, 11, 10, "li", 14, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.history);
  }
}
var SandboxComponent = class _SandboxComponent {
  sandboxService;
  catalogService;
  apis = [];
  currentResponse = null;
  history = [];
  loading = false;
  selectedHistoryIndex = -1;
  constructor(sandboxService, catalogService) {
    this.sandboxService = sandboxService;
    this.catalogService = catalogService;
  }
  ngOnInit() {
    this.catalogService.getPublicApis().subscribe({
      next: (apis) => this.apis = apis,
      error: () => this.apis = []
    });
    this.sandboxService.getHistory().subscribe({
      next: (h) => this.history = h,
      error: () => {
      }
    });
  }
  onExecute(request) {
    this.loading = true;
    this.selectedHistoryIndex = -1;
    this.sandboxService.execute(request).subscribe({
      next: (response) => {
        this.currentResponse = response;
        const entry = {
          request,
          response,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        };
        this.history.unshift(entry);
        if (this.history.length > 10) {
          this.history = this.history.slice(0, 10);
        }
        this.loading = false;
      },
      error: () => {
        this.currentResponse = {
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: { error: "Error de conexi\xF3n con el servidor" },
          responseTimeMs: 0,
          correlationId: "N/A"
        };
        this.loading = false;
      }
    });
  }
  selectHistory(entry) {
    this.currentResponse = entry.response;
    this.selectedHistoryIndex = this.history.indexOf(entry);
  }
  getHistoryBadgeClass(statusCode) {
    if (statusCode >= 200 && statusCode < 300)
      return "sb-ui-badge--success";
    if (statusCode >= 400 && statusCode < 500)
      return "sb-ui-badge--warning";
    return "sb-ui-badge--danger";
  }
  static \u0275fac = function SandboxComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SandboxComponent)(\u0275\u0275directiveInject(SandboxService), \u0275\u0275directiveInject(CatalogService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SandboxComponent, selectors: [["app-sandbox"]], decls: 24, vars: 4, consts: [[1, "sandbox-container"], [1, "sandbox-header"], [1, "fa", "fa-flask"], [1, "sandbox-layout"], [1, "sandbox-main"], [1, "sb-ui-card", "request-panel"], [3, "executeRequest", "apis", "loading"], [1, "sb-ui-card", "response-panel"], [3, "response"], [1, "sandbox-sidebar"], [1, "sb-ui-card", "history-panel"], [1, "fa", "fa-history"], [1, "history-empty"], [1, "history-list"], [1, "history-item", 3, "active"], [1, "history-item", 3, "click"], [1, "history-item-header"], [1, "sb-ui-badge", "sb-ui-badge--sm", 3, "ngClass"], [1, "history-method"], [1, "history-endpoint"], [1, "history-time"]], template: function SandboxComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "h2");
      \u0275\u0275element(3, "i", 2);
      \u0275\u0275text(4, " Sandbox Interactivo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "Ejecuta peticiones simuladas contra las APIs del cat\xE1logo");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 3)(8, "div", 4)(9, "div", 5)(10, "h3");
      \u0275\u0275text(11, "Request");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "app-request-builder", 6);
      \u0275\u0275listener("executeRequest", function SandboxComponent_Template_app_request_builder_executeRequest_12_listener($event) {
        return ctx.onExecute($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 7)(14, "h3");
      \u0275\u0275text(15, "Response");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "app-response-viewer", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "aside", 9)(18, "div", 10)(19, "h3");
      \u0275\u0275element(20, "i", 11);
      \u0275\u0275text(21, " Historial");
      \u0275\u0275elementEnd();
      \u0275\u0275template(22, SandboxComponent_Conditional_22_Template, 2, 0, "p", 12)(23, SandboxComponent_Conditional_23_Template, 3, 0, "ul", 13);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275property("apis", ctx.apis)("loading", ctx.loading);
      \u0275\u0275advance(4);
      \u0275\u0275property("response", ctx.currentResponse);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.history.length === 0 ? 22 : 23);
    }
  }, dependencies: [CommonModule, NgClass, DatePipe, RequestBuilderComponent, ResponseViewerComponent], styles: ["\n\n.sandbox-container[_ngcontent-%COMP%] {\n  padding: var(--sb-ui-spacing-lg, 24px);\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.sandbox-header[_ngcontent-%COMP%] {\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n}\n.sandbox-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.sandbox-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: var(--sb-ui-spacing-xs, 4px) 0 0;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n}\n.sandbox-layout[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--sb-ui-spacing-lg, 24px);\n}\n.sandbox-main[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-lg, 24px);\n  min-width: 0;\n}\n.sandbox-sidebar[_ngcontent-%COMP%] {\n  flex: 0 0 280px;\n}\n.request-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.response-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], \n.history-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 var(--sb-ui-spacing-md, 16px) 0;\n  font-size: var(--sb-ui-font-size-lg, 1.25rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.history-panel[_ngcontent-%COMP%] {\n  position: sticky;\n  top: var(--sb-ui-spacing-lg, 24px);\n}\n.history-empty[_ngcontent-%COMP%] {\n  color: var(--sb-ui-text-muted, #adb5bd);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  text-align: center;\n  padding: var(--sb-ui-spacing-md, 16px) 0;\n}\n.history-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.history-item[_ngcontent-%COMP%] {\n  padding: var(--sb-ui-spacing-sm, 8px);\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n  border: 1px solid var(--sb-ui-border-color, #dee2e6);\n  cursor: pointer;\n  transition: background-color 0.2s;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.history-item[_ngcontent-%COMP%]:hover, \n.history-item.active[_ngcontent-%COMP%] {\n  background: var(--sb-ui-bg-primary, #f5f7fa);\n}\n.history-item-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.history-method[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n}\n.history-endpoint[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.history-time[_ngcontent-%COMP%] {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-muted, #adb5bd);\n}\n@media (max-width: 900px) {\n  .sandbox-layout[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .sandbox-sidebar[_ngcontent-%COMP%] {\n    flex: none;\n  }\n}\n/*# sourceMappingURL=sandbox.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SandboxComponent, [{
    type: Component,
    args: [{ selector: "app-sandbox", standalone: true, imports: [CommonModule, RequestBuilderComponent, ResponseViewerComponent], template: `
    <div class="sandbox-container">
      <header class="sandbox-header">
        <h2><i class="fa fa-flask"></i> Sandbox Interactivo</h2>
        <p>Ejecuta peticiones simuladas contra las APIs del cat\xE1logo</p>
      </header>

      <div class="sandbox-layout">
        <div class="sandbox-main">
          <div class="sb-ui-card request-panel">
            <h3>Request</h3>
            <app-request-builder
              [apis]="apis"
              [loading]="loading"
              (executeRequest)="onExecute($event)">
            </app-request-builder>
          </div>

          <div class="sb-ui-card response-panel">
            <h3>Response</h3>
            <app-response-viewer [response]="currentResponse"></app-response-viewer>
          </div>
        </div>

        <aside class="sandbox-sidebar">
          <div class="sb-ui-card history-panel">
            <h3><i class="fa fa-history"></i> Historial</h3>
            @if (history.length === 0) {
              <p class="history-empty">Sin peticiones a\xFAn</p>
            } @else {
              <ul class="history-list">
                @for (entry of history; track $index) {
                  <li class="history-item" (click)="selectHistory(entry)"
                      [class.active]="selectedHistoryIndex === $index">
                    <div class="history-item-header">
                      <span class="sb-ui-badge sb-ui-badge--sm"
                            [ngClass]="getHistoryBadgeClass(entry.response.statusCode)">
                        {{ entry.response.statusCode }}
                      </span>
                      <span class="history-method">{{ entry.request.method }}</span>
                    </div>
                    <span class="history-endpoint">{{ entry.request.endpoint }}</span>
                    <span class="history-time">{{ entry.timestamp | date:'HH:mm:ss' }}</span>
                  </li>
                }
              </ul>
            }
          </div>
        </aside>
      </div>
    </div>
  `, styles: ["/* angular:styles/component:css;f4145a5c010c8b3d2ebd6a52ab84fc49396f494dad1f4261d68489edcfa84595;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/sandbox/sandbox.component.ts */\n.sandbox-container {\n  padding: var(--sb-ui-spacing-lg, 24px);\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.sandbox-header {\n  margin-bottom: var(--sb-ui-spacing-lg, 24px);\n}\n.sandbox-header h2 {\n  margin: 0;\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.sandbox-header p {\n  margin: var(--sb-ui-spacing-xs, 4px) 0 0;\n  color: var(--sb-ui-text-secondary, #6c757d);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n}\n.sandbox-layout {\n  display: flex;\n  gap: var(--sb-ui-spacing-lg, 24px);\n}\n.sandbox-main {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-lg, 24px);\n  min-width: 0;\n}\n.sandbox-sidebar {\n  flex: 0 0 280px;\n}\n.request-panel h3,\n.response-panel h3,\n.history-panel h3 {\n  margin: 0 0 var(--sb-ui-spacing-md, 16px) 0;\n  font-size: var(--sb-ui-font-size-lg, 1.25rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.history-panel {\n  position: sticky;\n  top: var(--sb-ui-spacing-lg, 24px);\n}\n.history-empty {\n  color: var(--sb-ui-text-muted, #adb5bd);\n  font-size: var(--sb-ui-font-size-sm, 0.875rem);\n  text-align: center;\n  padding: var(--sb-ui-spacing-md, 16px) 0;\n}\n.history-list {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  display: flex;\n  flex-direction: column;\n  gap: var(--sb-ui-spacing-sm, 8px);\n}\n.history-item {\n  padding: var(--sb-ui-spacing-sm, 8px);\n  border-radius: var(--sb-ui-border-radius-sm, 4px);\n  border: 1px solid var(--sb-ui-border-color, #dee2e6);\n  cursor: pointer;\n  transition: background-color 0.2s;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.history-item:hover,\n.history-item.active {\n  background: var(--sb-ui-bg-primary, #f5f7fa);\n}\n.history-item-header {\n  display: flex;\n  align-items: center;\n  gap: var(--sb-ui-spacing-xs, 4px);\n}\n.history-method {\n  font-weight: 600;\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-color-primary, #003b7a);\n}\n.history-endpoint {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-primary, #1a1a2e);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.history-time {\n  font-size: var(--sb-ui-font-size-xs, 0.75rem);\n  color: var(--sb-ui-text-muted, #adb5bd);\n}\n@media (max-width: 900px) {\n  .sandbox-layout {\n    flex-direction: column;\n  }\n  .sandbox-sidebar {\n    flex: none;\n  }\n}\n/*# sourceMappingURL=sandbox.component.css.map */\n"] }]
  }], () => [{ type: SandboxService }, { type: CatalogService }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SandboxComponent, { className: "SandboxComponent", filePath: "src/app/features/sandbox/sandbox.component.ts", lineNumber: 174 });
})();
export {
  SandboxComponent
};
//# sourceMappingURL=chunk-NYH6ZMW2.js.map
