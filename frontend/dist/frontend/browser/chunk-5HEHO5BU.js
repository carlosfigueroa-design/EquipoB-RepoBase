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
  API_CONFIG,
  CommonModule,
  Component,
  HttpClient,
  Injectable,
  NgIf,
  ViewChild,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-DOM3MDY3.js";

// src/app/core/services/ai-assistant.service.ts
var AiAssistantService = class _AiAssistantService {
  http;
  constructor(http) {
    this.http = http;
  }
  query(message) {
    return this.http.post(API_CONFIG.ai.assistant, { message });
  }
  static \u0275fac = function AiAssistantService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AiAssistantService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AiAssistantService, factory: _AiAssistantService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AiAssistantService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/features/ai-assistant/ai-chat.component.ts
var _c0 = ["messagesContainer"];
function AiChatComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 5)(1, "div", 13);
    \u0275\u0275element(2, "i", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4, "\xA1Hola! Soy el asistente de APIs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Puedo ayudarte a encontrar la API correcta para tu caso de uso. Prueba con:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 14)(8, "button", 15);
    \u0275\u0275listener("click", function AiChatComponent_Conditional_9_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendSuggestion("\xBFC\xF3mo emitir una p\xF3liza?"));
    });
    \u0275\u0275text(9, " \xBFC\xF3mo emitir una p\xF3liza? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 15);
    \u0275\u0275listener("click", function AiChatComponent_Conditional_9_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendSuggestion("\xBFC\xF3mo consultar siniestros?"));
    });
    \u0275\u0275text(11, " \xBFC\xF3mo consultar siniestros? ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 15);
    \u0275\u0275listener("click", function AiChatComponent_Conditional_9_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.sendSuggestion("\xBFC\xF3mo cotizar un seguro?"));
    });
    \u0275\u0275text(13, " \xBFC\xF3mo cotizar un seguro? ");
    \u0275\u0275elementEnd()()();
  }
}
function AiChatComponent_For_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 3);
  }
}
function AiChatComponent_For_11_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "i", 18);
  }
}
function AiChatComponent_For_11_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 23);
    \u0275\u0275text(1, "|");
    \u0275\u0275elementEnd();
  }
}
function AiChatComponent_For_11_Conditional_8_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "span");
    \u0275\u0275text(3, "Ejemplo cURL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 28);
    \u0275\u0275listener("click", function AiChatComponent_For_11_Conditional_8_Conditional_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r6);
      const msg_r5 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.copyCurl(msg_r5.aiResponse.curlExample));
    });
    \u0275\u0275element(5, "i", 29);
    \u0275\u0275text(6, " Copiar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "pre")(8, "code");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const msg_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(msg_r5.aiResponse.curlExample);
  }
}
function AiChatComponent_For_11_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "a", 24);
    \u0275\u0275listener("click", function AiChatComponent_For_11_Conditional_8_Template_a_click_1_listener() {
      \u0275\u0275restoreView(_r4);
      const msg_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navigateToSwagger(msg_r5.aiResponse.relatedApiId));
    });
    \u0275\u0275element(2, "i", 25);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, AiChatComponent_For_11_Conditional_8_Conditional_4_Template, 10, 1, "div", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const msg_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Ver documentaci\xF3n de ", msg_r5.aiResponse.relatedApiName || "API relacionada", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(msg_r5.aiResponse.curlExample ? 4 : -1);
  }
}
function AiChatComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17);
    \u0275\u0275template(2, AiChatComponent_For_11_Conditional_2_Template, 1, 0, "i", 3)(3, AiChatComponent_For_11_Conditional_3_Template, 1, 0, "i", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 19)(5, "div", 20);
    \u0275\u0275text(6);
    \u0275\u0275template(7, AiChatComponent_For_11_span_7_Template, 2, 0, "span", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, AiChatComponent_For_11_Conditional_8_Template, 5, 2, "div", 22);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const msg_r5 = ctx.$implicit;
    \u0275\u0275classProp("message--user", msg_r5.role === "user")("message--assistant", msg_r5.role === "assistant");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(msg_r5.role === "assistant" ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(msg_r5.displayedContent);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", msg_r5.typing);
    \u0275\u0275advance();
    \u0275\u0275conditional(!msg_r5.typing && (msg_r5.aiResponse == null ? null : msg_r5.aiResponse.relatedApiId) ? 8 : -1);
  }
}
function AiChatComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 17);
    \u0275\u0275element(2, "i", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 19)(4, "div", 30);
    \u0275\u0275element(5, "span")(6, "span")(7, "span");
    \u0275\u0275elementEnd()()();
  }
}
var AiChatComponent = class _AiChatComponent {
  aiService;
  router;
  messagesContainer;
  messages = [];
  userMessage = "";
  loading = false;
  isTyping = false;
  typingInterval = null;
  constructor(aiService, router) {
    this.aiService = aiService;
    this.router = router;
  }
  ngOnDestroy() {
    this.clearTypingInterval();
  }
  sendSuggestion(text) {
    this.userMessage = text;
    this.sendMessage();
  }
  sendMessage() {
    const text = this.userMessage.trim();
    if (!text || this.loading || this.isTyping)
      return;
    this.messages.push({
      role: "user",
      content: text,
      displayedContent: text,
      typing: false
    });
    this.userMessage = "";
    this.loading = true;
    this.scrollToBottom();
    this.aiService.query(text).subscribe({
      next: (res) => {
        this.loading = false;
        this.addAssistantMessage(res);
      },
      error: () => {
        this.loading = false;
        this.addAssistantMessage({
          answer: "Lo siento, hubo un error al procesar tu consulta. Intenta nuevamente."
        });
      }
    });
  }
  navigateToSwagger(apiId) {
    this.router.navigate(["/swagger", apiId]);
  }
  copyCurl(curl) {
    navigator.clipboard.writeText(curl).catch(() => {
    });
  }
  addAssistantMessage(res) {
    const msg = {
      role: "assistant",
      content: res.answer,
      displayedContent: "",
      typing: true,
      aiResponse: res
    };
    this.messages.push(msg);
    this.scrollToBottom();
    this.startTypingEffect(msg);
  }
  startTypingEffect(msg) {
    this.isTyping = true;
    let index = 0;
    const fullText = msg.content;
    this.typingInterval = setInterval(() => {
      if (index < fullText.length) {
        index++;
        msg.displayedContent = fullText.substring(0, index);
        this.scrollToBottom();
      } else {
        msg.typing = false;
        this.isTyping = false;
        this.clearTypingInterval();
        this.scrollToBottom();
      }
    }, 30);
  }
  clearTypingInterval() {
    if (this.typingInterval !== null) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }
  scrollToBottom() {
    setTimeout(() => {
      if (this.messagesContainer) {
        const el = this.messagesContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    });
  }
  static \u0275fac = function AiChatComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AiChatComponent)(\u0275\u0275directiveInject(AiAssistantService), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AiChatComponent, selectors: [["app-ai-chat"]], viewQuery: function AiChatComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.messagesContainer = _t.first);
    }
  }, decls: 18, vars: 5, consts: [["messagesContainer", ""], [1, "chat-container"], [1, "chat-header"], [1, "fa", "fa-robot"], [1, "chat-messages"], [1, "chat-welcome"], [1, "message", 3, "message--user", "message--assistant"], [1, "message", "message--assistant"], [1, "chat-input-area"], [1, "input-wrapper"], ["type", "text", "placeholder", "Escribe tu consulta sobre APIs...", "aria-label", "Consulta al asistente IA", 1, "sb-ui-input", 3, "ngModelChange", "keydown.enter", "ngModel", "disabled"], ["aria-label", "Enviar mensaje", 1, "sb-ui-button", "send-btn", 3, "click", "disabled"], [1, "fa", "fa-paper-plane"], [1, "welcome-icon"], [1, "suggestions"], [1, "suggestion-chip", 3, "click"], [1, "message"], [1, "message-avatar"], [1, "fa", "fa-user"], [1, "message-bubble"], [1, "message-content"], ["class", "cursor", 4, "ngIf"], [1, "message-extras"], [1, "cursor"], [1, "api-link", 3, "click"], [1, "fa", "fa-book"], [1, "curl-block"], [1, "curl-header"], [1, "copy-btn", 3, "click"], [1, "fa", "fa-copy"], [1, "typing-indicator"]], template: function AiChatComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "header", 2)(2, "h2");
      \u0275\u0275element(3, "i", 3);
      \u0275\u0275text(4, " Asistente IA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "p");
      \u0275\u0275text(6, "Preg\xFAntame sobre las APIs de Seguros Bol\xEDvar");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 4, 0);
      \u0275\u0275template(9, AiChatComponent_Conditional_9_Template, 14, 0, "div", 5);
      \u0275\u0275repeaterCreate(10, AiChatComponent_For_11_Template, 9, 8, "div", 6, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275template(12, AiChatComponent_Conditional_12_Template, 8, 0, "div", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 8)(14, "div", 9)(15, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function AiChatComponent_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.userMessage, $event) || (ctx.userMessage = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("keydown.enter", function AiChatComponent_Template_input_keydown_enter_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.sendMessage());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 11);
      \u0275\u0275listener("click", function AiChatComponent_Template_button_click_16_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.sendMessage());
      });
      \u0275\u0275element(17, "i", 12);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.messages.length === 0 ? 9 : -1);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.messages);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading ? 12 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.userMessage);
      \u0275\u0275property("disabled", ctx.loading || ctx.isTyping);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", !ctx.userMessage.trim() || ctx.loading || ctx.isTyping);
    }
  }, dependencies: [CommonModule, NgIf, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], styles: ['\n\n[_nghost-%COMP%] {\n  display: block;\n}\n.chat-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 120px);\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 24px;\n}\n.chat-header[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.chat-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--sb-ui-text-primary,#1a1a2e);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.chat-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  color: var(--sb-ui-text-secondary,#6c757d);\n  font-size: .875rem;\n}\n.chat-messages[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding: 16px 0;\n}\n.chat-welcome[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px;\n  color: var(--sb-ui-text-secondary,#6c757d);\n}\n.welcome-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  color: var(--sb-ui-color-primary,#003b7a);\n  margin-bottom: 16px;\n}\n.chat-welcome[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  color: var(--sb-ui-text-primary,#1a1a2e);\n}\n.chat-welcome[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n}\n.suggestions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  justify-content: center;\n}\n.suggestion-chip[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border: 1px solid var(--sb-ui-color-primary,#003b7a);\n  border-radius: 20px;\n  background: transparent;\n  color: var(--sb-ui-color-primary,#003b7a);\n  cursor: pointer;\n  font-size: .875rem;\n  transition: all .2s;\n}\n.suggestion-chip[_ngcontent-%COMP%]:hover {\n  background: var(--sb-ui-color-primary,#003b7a);\n  color: #fff;\n}\n.message[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  max-width: 85%;\n}\n.message--user[_ngcontent-%COMP%] {\n  align-self: flex-end;\n  flex-direction: row-reverse;\n}\n.message--assistant[_ngcontent-%COMP%] {\n  align-self: flex-start;\n}\n.message-avatar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: .875rem;\n}\n.message--user[_ngcontent-%COMP%]   .message-avatar[_ngcontent-%COMP%] {\n  background: var(--sb-ui-color-primary,#003b7a);\n  color: #fff;\n}\n.message--assistant[_ngcontent-%COMP%]   .message-avatar[_ngcontent-%COMP%] {\n  background: var(--sb-ui-bg-primary,#f5f7fa);\n  color: var(--sb-ui-color-primary,#003b7a);\n  border: 1px solid var(--sb-ui-border-color,#dee2e6);\n}\n.message-bubble[_ngcontent-%COMP%] {\n  border-radius: 8px;\n  padding: 8px 16px;\n  line-height: 1.5;\n}\n.message--user[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%] {\n  background: var(--sb-ui-color-primary,#003b7a);\n  color: #fff;\n}\n.message--assistant[_ngcontent-%COMP%]   .message-bubble[_ngcontent-%COMP%] {\n  background: var(--sb-ui-bg-primary,#f5f7fa);\n  color: var(--sb-ui-text-primary,#1a1a2e);\n  border: 1px solid var(--sb-ui-border-color,#dee2e6);\n}\n.message-content[_ngcontent-%COMP%] {\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.cursor[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_blink .7s step-end infinite;\n  font-weight: 700;\n  color: var(--sb-ui-color-primary,#003b7a);\n}\n@keyframes _ngcontent-%COMP%_blink {\n  50% {\n    opacity: 0;\n  }\n}\n.message-extras[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  border-top: 1px solid var(--sb-ui-border-color,#dee2e6);\n  padding-top: 8px;\n}\n.api-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--sb-ui-color-primary,#003b7a);\n  font-weight: 600;\n  font-size: .875rem;\n  cursor: pointer;\n  text-decoration: none;\n}\n.api-link[_ngcontent-%COMP%]:hover {\n  color: var(--sb-ui-color-primary-light,#1a5fa8);\n  text-decoration: underline;\n}\n.curl-block[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  border-radius: 4px;\n  overflow: hidden;\n  border: 1px solid var(--sb-ui-border-color,#dee2e6);\n}\n.curl-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 4px 8px;\n  background: var(--sb-ui-bg-dark,#1a1a2e);\n  color: #fff;\n  font-size: .75rem;\n  font-weight: 600;\n}\n.copy-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  color: #fff;\n  cursor: pointer;\n  font-size: .75rem;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.copy-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, .15);\n}\n.curl-block[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 8px;\n  background: var(--sb-ui-bg-dark,#1a1a2e);\n  overflow-x: auto;\n}\n.curl-block[_ngcontent-%COMP%]   code[_ngcontent-%COMP%] {\n  color: var(--sb-ui-color-secondary,#00a651);\n  font-size: .75rem;\n  font-family: "Courier New", monospace;\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n.typing-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  padding: 4px 0;\n}\n.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--sb-ui-text-muted,#adb5bd);\n  animation: _ngcontent-%COMP%_bounce 1.4s infinite ease-in-out both;\n}\n.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: -.32s;\n}\n.typing-indicator[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: -.16s;\n}\n@keyframes _ngcontent-%COMP%_bounce {\n  0%, 80%, 100% {\n    transform: scale(0);\n  }\n  40% {\n    transform: scale(1);\n  }\n}\n.chat-input-area[_ngcontent-%COMP%] {\n  padding-top: 16px;\n  border-top: 1px solid var(--sb-ui-border-color,#dee2e6);\n}\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n.input-wrapper[_ngcontent-%COMP%]   .sb-ui-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.send-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 10px 16px;\n}\n/*# sourceMappingURL=ai-chat.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AiChatComponent, [{
    type: Component,
    args: [{ selector: "app-ai-chat", standalone: true, imports: [CommonModule, FormsModule], template: `
    <div class="chat-container">
      <header class="chat-header">
        <h2><i class="fa fa-robot"></i> Asistente IA</h2>
        <p>Preg\xFAntame sobre las APIs de Seguros Bol\xEDvar</p>
      </header>

      <div class="chat-messages" #messagesContainer>
        @if (messages.length === 0) {
          <div class="chat-welcome">
            <div class="welcome-icon"><i class="fa fa-robot"></i></div>
            <h3>\xA1Hola! Soy el asistente de APIs</h3>
            <p>Puedo ayudarte a encontrar la API correcta para tu caso de uso. Prueba con:</p>
            <div class="suggestions">
              <button class="suggestion-chip" (click)="sendSuggestion('\xBFC\xF3mo emitir una p\xF3liza?')">
                \xBFC\xF3mo emitir una p\xF3liza?
              </button>
              <button class="suggestion-chip" (click)="sendSuggestion('\xBFC\xF3mo consultar siniestros?')">
                \xBFC\xF3mo consultar siniestros?
              </button>
              <button class="suggestion-chip" (click)="sendSuggestion('\xBFC\xF3mo cotizar un seguro?')">
                \xBFC\xF3mo cotizar un seguro?
              </button>
            </div>
          </div>
        }

        @for (msg of messages; track $index) {
          <div class="message" [class.message--user]="msg.role === 'user'" [class.message--assistant]="msg.role === 'assistant'">
            <div class="message-avatar">
              @if (msg.role === 'assistant') {
                <i class="fa fa-robot"></i>
              } @else {
                <i class="fa fa-user"></i>
              }
            </div>
            <div class="message-bubble">
              <div class="message-content">{{ msg.displayedContent }}<span class="cursor" *ngIf="msg.typing">|</span></div>

              @if (!msg.typing && msg.aiResponse?.relatedApiId) {
                <div class="message-extras">
                  <a class="api-link" (click)="navigateToSwagger(msg.aiResponse!.relatedApiId!)">
                    <i class="fa fa-book"></i> Ver documentaci\xF3n de {{ msg.aiResponse!.relatedApiName || 'API relacionada' }}
                  </a>
                  @if (msg.aiResponse!.curlExample) {
                    <div class="curl-block">
                      <div class="curl-header">
                        <span>Ejemplo cURL</span>
                        <button class="copy-btn" (click)="copyCurl(msg.aiResponse!.curlExample!)">
                          <i class="fa fa-copy"></i> Copiar
                        </button>
                      </div>
                      <pre><code>{{ msg.aiResponse!.curlExample }}</code></pre>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }

        @if (loading) {
          <div class="message message--assistant">
            <div class="message-avatar"><i class="fa fa-robot"></i></div>
            <div class="message-bubble">
              <div class="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="chat-input-area">
        <div class="input-wrapper">
          <input
            class="sb-ui-input"
            type="text"
            [(ngModel)]="userMessage"
            (keydown.enter)="sendMessage()"
            placeholder="Escribe tu consulta sobre APIs..."
            [disabled]="loading || isTyping"
            aria-label="Consulta al asistente IA"
          />
          <button
            class="sb-ui-button send-btn"
            (click)="sendMessage()"
            [disabled]="!userMessage.trim() || loading || isTyping"
            aria-label="Enviar mensaje"
          >
            <i class="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  `, styles: ['/* angular:styles/component:css;27adb3e2b7bf30c8500f072ab893e0af56a229546b3daf862945512a9c6464af;/Users/CristianDavidCarrenoRuiz/Desktop/Hackaton Vinculo/frontend/src/app/features/ai-assistant/ai-chat.component.ts */\n:host {\n  display: block;\n}\n.chat-container {\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 120px);\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 24px;\n}\n.chat-header {\n  margin-bottom: 16px;\n}\n.chat-header h2 {\n  margin: 0;\n  color: var(--sb-ui-text-primary,#1a1a2e);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.chat-header p {\n  margin: 4px 0 0;\n  color: var(--sb-ui-text-secondary,#6c757d);\n  font-size: .875rem;\n}\n.chat-messages {\n  flex: 1;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding: 16px 0;\n}\n.chat-welcome {\n  text-align: center;\n  padding: 32px;\n  color: var(--sb-ui-text-secondary,#6c757d);\n}\n.welcome-icon {\n  font-size: 3rem;\n  color: var(--sb-ui-color-primary,#003b7a);\n  margin-bottom: 16px;\n}\n.chat-welcome h3 {\n  margin: 0 0 8px;\n  color: var(--sb-ui-text-primary,#1a1a2e);\n}\n.chat-welcome p {\n  margin: 0 0 16px;\n}\n.suggestions {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  justify-content: center;\n}\n.suggestion-chip {\n  padding: 8px 16px;\n  border: 1px solid var(--sb-ui-color-primary,#003b7a);\n  border-radius: 20px;\n  background: transparent;\n  color: var(--sb-ui-color-primary,#003b7a);\n  cursor: pointer;\n  font-size: .875rem;\n  transition: all .2s;\n}\n.suggestion-chip:hover {\n  background: var(--sb-ui-color-primary,#003b7a);\n  color: #fff;\n}\n.message {\n  display: flex;\n  gap: 8px;\n  max-width: 85%;\n}\n.message--user {\n  align-self: flex-end;\n  flex-direction: row-reverse;\n}\n.message--assistant {\n  align-self: flex-start;\n}\n.message-avatar {\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  font-size: .875rem;\n}\n.message--user .message-avatar {\n  background: var(--sb-ui-color-primary,#003b7a);\n  color: #fff;\n}\n.message--assistant .message-avatar {\n  background: var(--sb-ui-bg-primary,#f5f7fa);\n  color: var(--sb-ui-color-primary,#003b7a);\n  border: 1px solid var(--sb-ui-border-color,#dee2e6);\n}\n.message-bubble {\n  border-radius: 8px;\n  padding: 8px 16px;\n  line-height: 1.5;\n}\n.message--user .message-bubble {\n  background: var(--sb-ui-color-primary,#003b7a);\n  color: #fff;\n}\n.message--assistant .message-bubble {\n  background: var(--sb-ui-bg-primary,#f5f7fa);\n  color: var(--sb-ui-text-primary,#1a1a2e);\n  border: 1px solid var(--sb-ui-border-color,#dee2e6);\n}\n.message-content {\n  white-space: pre-wrap;\n  word-break: break-word;\n}\n.cursor {\n  animation: blink .7s step-end infinite;\n  font-weight: 700;\n  color: var(--sb-ui-color-primary,#003b7a);\n}\n@keyframes blink {\n  50% {\n    opacity: 0;\n  }\n}\n.message-extras {\n  margin-top: 8px;\n  border-top: 1px solid var(--sb-ui-border-color,#dee2e6);\n  padding-top: 8px;\n}\n.api-link {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--sb-ui-color-primary,#003b7a);\n  font-weight: 600;\n  font-size: .875rem;\n  cursor: pointer;\n  text-decoration: none;\n}\n.api-link:hover {\n  color: var(--sb-ui-color-primary-light,#1a5fa8);\n  text-decoration: underline;\n}\n.curl-block {\n  margin-top: 8px;\n  border-radius: 4px;\n  overflow: hidden;\n  border: 1px solid var(--sb-ui-border-color,#dee2e6);\n}\n.curl-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 4px 8px;\n  background: var(--sb-ui-bg-dark,#1a1a2e);\n  color: #fff;\n  font-size: .75rem;\n  font-weight: 600;\n}\n.copy-btn {\n  background: transparent;\n  border: none;\n  color: #fff;\n  cursor: pointer;\n  font-size: .75rem;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.copy-btn:hover {\n  background: rgba(255, 255, 255, .15);\n}\n.curl-block pre {\n  margin: 0;\n  padding: 8px;\n  background: var(--sb-ui-bg-dark,#1a1a2e);\n  overflow-x: auto;\n}\n.curl-block code {\n  color: var(--sb-ui-color-secondary,#00a651);\n  font-size: .75rem;\n  font-family: "Courier New", monospace;\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n.typing-indicator {\n  display: flex;\n  gap: 4px;\n  padding: 4px 0;\n}\n.typing-indicator span {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: var(--sb-ui-text-muted,#adb5bd);\n  animation: bounce 1.4s infinite ease-in-out both;\n}\n.typing-indicator span:nth-child(1) {\n  animation-delay: -.32s;\n}\n.typing-indicator span:nth-child(2) {\n  animation-delay: -.16s;\n}\n@keyframes bounce {\n  0%, 80%, 100% {\n    transform: scale(0);\n  }\n  40% {\n    transform: scale(1);\n  }\n}\n.chat-input-area {\n  padding-top: 16px;\n  border-top: 1px solid var(--sb-ui-border-color,#dee2e6);\n}\n.input-wrapper {\n  display: flex;\n  gap: 8px;\n}\n.input-wrapper .sb-ui-input {\n  flex: 1;\n}\n.send-btn {\n  flex-shrink: 0;\n  padding: 10px 16px;\n}\n/*# sourceMappingURL=ai-chat.component.css.map */\n'] }]
  }], () => [{ type: AiAssistantService }, { type: Router }], { messagesContainer: [{
    type: ViewChild,
    args: ["messagesContainer"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AiChatComponent, { className: "AiChatComponent", filePath: "src/app/features/ai-assistant/ai-chat.component.ts", lineNumber: 161 });
})();
export {
  AiChatComponent
};
//# sourceMappingURL=chunk-5HEHO5BU.js.map
