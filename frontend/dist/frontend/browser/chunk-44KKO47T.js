import {
  API_CONFIG,
  HttpClient,
  Injectable,
  setClassMetadata,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-DOM3MDY3.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  http;
  token = null;
  user = null;
  constructor(http) {
    this.http = http;
  }
  requestOtp(email) {
    return this.http.post(API_CONFIG.auth.requestOtp, { email });
  }
  verifyOtp(email, otp) {
    return this.http.post(API_CONFIG.auth.verifyOtp, { email, otp }).pipe(tap((session) => {
      this.token = session.accessToken;
      this.user = session.user;
    }));
  }
  getProfile() {
    return this.user;
  }
  isAuthenticated() {
    return this.token !== null;
  }
  getToken() {
    return this.token;
  }
  logout() {
    this.token = null;
    this.user = null;
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

export {
  AuthService
};
//# sourceMappingURL=chunk-44KKO47T.js.map
