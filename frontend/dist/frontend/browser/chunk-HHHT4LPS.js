import {
  API_CONFIG,
  HttpClient,
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-DOM3MDY3.js";

// src/app/core/services/catalog.service.ts
var CatalogService = class _CatalogService {
  http;
  constructor(http) {
    this.http = http;
  }
  getPublicApis() {
    return this.http.get(API_CONFIG.catalog.list);
  }
  searchApis(query) {
    return this.http.get(API_CONFIG.catalog.search, {
      params: { q: query }
    });
  }
  getApiDetail(id) {
    return this.http.get(API_CONFIG.catalog.detail(id));
  }
  getApiSpec(id) {
    return this.http.get(API_CONFIG.catalog.spec(id));
  }
  static \u0275fac = function CatalogService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CatalogService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CatalogService, factory: _CatalogService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CatalogService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  CatalogService
};
//# sourceMappingURL=chunk-HHHT4LPS.js.map
