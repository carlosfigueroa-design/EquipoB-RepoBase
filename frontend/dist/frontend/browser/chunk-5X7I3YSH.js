import {
  API_CONFIG,
  HttpClient,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-DOM3MDY3.js";

// src/app/core/services/lifecycle.service.ts
var LifecycleService = class _LifecycleService {
  http;
  constructor(http) {
    this.http = http;
  }
  getAllApis() {
    return this.http.get(API_CONFIG.lifecycle.list);
  }
  createApi(data) {
    return this.http.post(API_CONFIG.lifecycle.create, data);
  }
  changeStatus(apiId, newStatus) {
    return this.http.patch(API_CONFIG.lifecycle.changeStatus(apiId), { newStatus });
  }
  getAuditLog(apiId) {
    return this.http.get(API_CONFIG.lifecycle.audit(apiId));
  }
  static \u0275fac = function LifecycleService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LifecycleService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _LifecycleService, factory: _LifecycleService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LifecycleService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  LifecycleService
};
//# sourceMappingURL=chunk-5X7I3YSH.js.map
