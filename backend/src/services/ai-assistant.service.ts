import { JsonStoreService } from './json-store.service';
import { AIResponseEntry, AIResponse, ApiCatalogItem } from '../types';

export class AIAssistantService {
  constructor(private store: JsonStoreService) {}

  /**
   * Busca respuesta por pattern matching de keywords.
   * Tokeniza el mensaje del usuario, cuenta coincidencias por cada entrada
   * y retorna la respuesta con mayor número de matches.
   */
  async query(userMessage: string): Promise<AIResponse> {
    const tokens = this.tokenize(userMessage);
    const entries = await this.store.read<AIResponseEntry[]>('ai-responses.json');

    let bestEntry: AIResponseEntry | null = null;
    let bestScore = 0;

    for (const entry of entries) {
      const score = this.countMatches(tokens, entry.keywords);
      if (score > bestScore) {
        bestScore = score;
        bestEntry = entry;
      }
    }

    if (!bestEntry || bestScore === 0) {
      return {
        answer:
          'No encontré información específica sobre tu consulta. Te sugiero explorar el catálogo de APIs o contactar al equipo de soporte.',
      };
    }

    const response: AIResponse = {
      answer: bestEntry.answer,
    };

    if (bestEntry.relatedApiId) {
      response.relatedApiId = bestEntry.relatedApiId;
      response.swaggerLink = `/#/swagger/${bestEntry.relatedApiId}`;

      const apis = await this.store.read<ApiCatalogItem[]>('apis.json');
      const api = apis.find((a) => a.id === bestEntry!.relatedApiId);
      if (api) {
        response.relatedApiName = api.name;
      }
    }

    if (bestEntry.curlExample) {
      response.curlExample = bestEntry.curlExample;
    }

    return response;
  }

  /** Tokeniza mensaje: lowercase, elimina puntuación, split por espacios */
  private tokenize(message: string): string[] {
    return message
      .toLowerCase()
      .replace(/[.,;:!?¿¡"'()\[\]{}<>]/g, '')
      .split(/\s+/)
      .filter((t) => t.length > 0);
  }

  /** Cuenta cuántos keywords de la entrada aparecen en los tokens del mensaje */
  private countMatches(tokens: string[], keywords: string[]): number {
    let count = 0;
    for (const keyword of keywords) {
      const kwLower = keyword.toLowerCase();
      // Support multi-word keywords (e.g. "crear póliza")
      if (kwLower.includes(' ')) {
        const kwParts = kwLower.split(/\s+/);
        if (kwParts.every((part) => tokens.includes(part))) {
          count++;
        }
      } else {
        if (tokens.includes(kwLower)) {
          count++;
        }
      }
    }
    return count;
  }
}
