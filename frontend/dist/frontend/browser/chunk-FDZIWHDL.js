import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart
} from "./chunk-DOM3MDY3.js";

// src/app/shared/components/loading-spinner.component.ts
var LoadingSpinnerComponent = class _LoadingSpinnerComponent {
  static \u0275fac = function LoadingSpinnerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoadingSpinnerComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoadingSpinnerComponent, selectors: [["app-loading-spinner"]], decls: 2, vars: 0, consts: [[1, "spinner-wrapper"], [1, "sb-ui-spinner"]], template: function LoadingSpinnerComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "div", 1);
      \u0275\u0275elementEnd();
    }
  }, styles: ["\n\n.spinner-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  width: 100%;\n}\n/*# sourceMappingURL=loading-spinner.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoadingSpinnerComponent, [{
    type: Component,
    args: [{ selector: "app-loading-spinner", standalone: true, template: `
    <div class="spinner-wrapper">
      <div class="sb-ui-spinner"></div>
    </div>
  `, styles: ["/* angular:styles/component:css;ade168a88610c720741d5ba3d8675760f4e16eb72ede448b1700c0156a30e2af;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/shared/components/loading-spinner.component.ts */\n.spinner-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--sb-ui-spacing-xl, 32px);\n  width: 100%;\n}\n/*# sourceMappingURL=loading-spinner.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoadingSpinnerComponent, { className: "LoadingSpinnerComponent", filePath: "src/app/shared/components/loading-spinner.component.ts", lineNumber: 21 });
})();

export {
  LoadingSpinnerComponent
};
//# sourceMappingURL=chunk-FDZIWHDL.js.map
