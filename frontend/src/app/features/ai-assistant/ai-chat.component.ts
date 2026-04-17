import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AiAssistantService, AIResponse } from '../../core/services/ai-assistant.service';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  displayedContent: string;
  typing: boolean;
  aiResponse?: AIResponse;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="chat-container">
      <header class="chat-header">
        <h2><i class="fa fa-robot"></i> Asistente IA</h2>
        <p>Pregúntame sobre las APIs de Vínculo Bolívar</p>
      </header>

      <div class="chat-messages" #messagesContainer>
        @if (messages.length === 0) {
          <div class="chat-welcome">
            <div class="welcome-icon"><i class="fa fa-robot"></i></div>
            <h3>¡Hola! Soy el asistente de APIs</h3>
            <p>Puedo ayudarte a encontrar la API correcta para tu caso de uso. Prueba con:</p>
            <div class="suggestions">
              <button class="suggestion-chip" (click)="sendSuggestion('¿Cómo emitir una póliza?')">
                ¿Cómo emitir una póliza?
              </button>
              <button class="suggestion-chip" (click)="sendSuggestion('¿Cómo consultar siniestros?')">
                ¿Cómo consultar siniestros?
              </button>
              <button class="suggestion-chip" (click)="sendSuggestion('¿Cómo cotizar un seguro?')">
                ¿Cómo cotizar un seguro?
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
                  <a class="api-link" (click)="navigateToApiDetail(msg.aiResponse!.relatedApiId!)">
                    <i class="fa fa-book"></i> Ver detalle de {{ msg.aiResponse!.relatedApiName || 'API relacionada' }}
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
  `,
  styles: [`
    :host{display:block}
    .chat-container{display:flex;flex-direction:column;height:calc(100vh - 120px);max-width:900px;margin:0 auto;padding:24px}
    .chat-header{margin-bottom:16px}
    .chat-header h2{margin:0;color:var(--sb-ui-text-primary,#1a1a2e);display:flex;align-items:center;gap:8px}
    .chat-header p{margin:4px 0 0;color:var(--sb-ui-text-secondary,#6c757d);font-size:.875rem}
    .chat-messages{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:16px;padding:16px 0}
    .chat-welcome{text-align:center;padding:32px;color:var(--sb-ui-text-secondary,#6c757d)}
    .welcome-icon{font-size:3rem;color:var(--sb-ui-color-primary,#007A3D);margin-bottom:16px}
    .chat-welcome h3{margin:0 0 8px;color:var(--sb-ui-text-primary,#1a1a2e)}
    .chat-welcome p{margin:0 0 16px}
    .suggestions{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}
    .suggestion-chip{padding:8px 16px;border:1px solid var(--sb-ui-color-primary,#007A3D);border-radius:20px;background:transparent;color:var(--sb-ui-color-primary,#007A3D);cursor:pointer;font-size:.875rem;transition:all .2s}
    .suggestion-chip:hover{background:var(--sb-ui-color-primary,#007A3D);color:#fff}
    .message{display:flex;gap:8px;max-width:85%}
    .message--user{align-self:flex-end;flex-direction:row-reverse}
    .message--assistant{align-self:flex-start}
    .message-avatar{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.875rem}
    .message--user .message-avatar{background:var(--sb-ui-color-primary,#007A3D);color:#fff}
    .message--assistant .message-avatar{background:var(--sb-ui-bg-primary,#f4faf6);color:var(--sb-ui-color-primary,#007A3D);border:1px solid var(--sb-ui-border-color,#dee2e6)}
    .message-bubble{border-radius:8px;padding:8px 16px;line-height:1.5}
    .message--user .message-bubble{background:var(--sb-ui-color-primary,#007A3D);color:#fff}
    .message--assistant .message-bubble{background:var(--sb-ui-bg-primary,#f4faf6);color:var(--sb-ui-text-primary,#1a1a2e);border:1px solid var(--sb-ui-border-color,#dee2e6)}
    .message-content{white-space:pre-wrap;word-break:break-word}
    .cursor{animation:blink .7s step-end infinite;font-weight:700;color:var(--sb-ui-color-primary,#007A3D)}
    @keyframes blink{50%{opacity:0}}
    .message-extras{margin-top:8px;border-top:1px solid var(--sb-ui-border-color,#dee2e6);padding-top:8px}
    .api-link{display:inline-flex;align-items:center;gap:4px;color:var(--sb-ui-color-primary,#007A3D);font-weight:600;font-size:.875rem;cursor:pointer;text-decoration:none}
    .api-link:hover{color:var(--sb-ui-color-primary-light,#009648);text-decoration:underline}
    .curl-block{margin-top:8px;border-radius:4px;overflow:hidden;border:1px solid var(--sb-ui-border-color,#dee2e6)}
    .curl-header{display:flex;justify-content:space-between;align-items:center;padding:4px 8px;background:var(--sb-ui-bg-dark,#1a1a2e);color:#fff;font-size:.75rem;font-weight:600}
    .copy-btn{background:transparent;border:none;color:#fff;cursor:pointer;font-size:.75rem;display:flex;align-items:center;gap:4px;padding:2px 6px;border-radius:4px}
    .copy-btn:hover{background:rgba(255,255,255,.15)}
    .curl-block pre{margin:0;padding:8px;background:var(--sb-ui-bg-dark,#1a1a2e);overflow-x:auto}
    .curl-block code{color:var(--sb-ui-color-secondary,#F5A800);font-size:.75rem;font-family:'Courier New',monospace;white-space:pre-wrap;word-break:break-all}
    .typing-indicator{display:flex;gap:4px;padding:4px 0}
    .typing-indicator span{width:8px;height:8px;border-radius:50%;background:var(--sb-ui-text-muted,#adb5bd);animation:bounce 1.4s infinite ease-in-out both}
    .typing-indicator span:nth-child(1){animation-delay:-.32s}
    .typing-indicator span:nth-child(2){animation-delay:-.16s}
    @keyframes bounce{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
    .chat-input-area{padding-top:16px;border-top:1px solid var(--sb-ui-border-color,#dee2e6)}
    .input-wrapper{display:flex;gap:8px}
    .input-wrapper .sb-ui-input{flex:1}
    .send-btn{flex-shrink:0;padding:10px 16px}
  `]
})
export class AiChatComponent implements OnDestroy {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef<HTMLDivElement>;

  messages: ChatMessage[] = [];
  userMessage = '';
  loading = false;
  isTyping = false;

  private typingInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private aiService: AiAssistantService,
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.clearTypingInterval();
  }

  sendSuggestion(text: string): void {
    this.userMessage = text;
    this.sendMessage();
  }

  sendMessage(): void {
    const text = this.userMessage.trim();
    if (!text || this.loading || this.isTyping) return;

    this.messages.push({
      role: 'user',
      content: text,
      displayedContent: text,
      typing: false,
    });
    this.userMessage = '';
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
          answer: 'Lo siento, hubo un error al procesar tu consulta. Intenta nuevamente.',
        });
      },
    });
  }

  navigateToApiDetail(apiId: string): void {
    this.router.navigate(['/catalog', apiId]);
  }

  copyCurl(curl: string): void {
    navigator.clipboard.writeText(curl).catch(() => {
      /* clipboard not available */
    });
  }

  private addAssistantMessage(res: AIResponse): void {
    const msg: ChatMessage = {
      role: 'assistant',
      content: res.answer,
      displayedContent: '',
      typing: true,
      aiResponse: res,
    };
    this.messages.push(msg);
    this.scrollToBottom();
    this.startTypingEffect(msg);
  }

  private startTypingEffect(msg: ChatMessage): void {
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

  private clearTypingInterval(): void {
    if (this.typingInterval !== null) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        const el = this.messagesContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
