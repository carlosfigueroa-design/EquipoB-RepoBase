import { v4 as uuidv4 } from 'uuid';
import { JsonStoreService } from './json-store.service';
import { SandboxRequest, SandboxResponse, SandboxHistoryEntry } from '../types';

/** Maximum number of history entries kept per user */
const MAX_HISTORY_ENTRIES = 10;

export class SandboxService {
  private history: Map<string, SandboxHistoryEntry[]> = new Map();

  constructor(private store: JsonStoreService) {}

  /** Executes a mock sandbox request and returns a predefined response with generated metadata. */
  async execute(request: SandboxRequest, userId: string): Promise<SandboxResponse> {
    const scenario = request.scenario ?? '200';

    let mockData: { statusCode: number; headers: Record<string, string>; body: unknown };

    try {
      mockData = await this.store.readSandboxResponse(request.apiId, scenario) as typeof mockData;
    } catch {
      const error = new Error(
        `Respuesta sandbox no encontrada para apiId="${request.apiId}" escenario="${scenario}"`
      ) as Error & { statusCode?: number };
      error.statusCode = 404;
      throw error;
    }

    const response: SandboxResponse = {
      statusCode: mockData.statusCode,
      headers: mockData.headers ?? {},
      body: mockData.body,
      responseTimeMs: Math.floor(Math.random() * 451) + 50, // 50-500
      correlationId: uuidv4(),
    };

    const entry: SandboxHistoryEntry = {
      request,
      response,
      timestamp: new Date().toISOString(),
    };

    const userHistory = this.history.get(userId) ?? [];
    userHistory.push(entry);

    if (userHistory.length > MAX_HISTORY_ENTRIES) {
      userHistory.splice(0, userHistory.length - MAX_HISTORY_ENTRIES);
    }

    this.history.set(userId, userHistory);

    return response;
  }

  /** Returns the last 10 sandbox executions for a given user. */
  getHistory(userId: string): SandboxHistoryEntry[] {
    return this.history.get(userId) ?? [];
  }
}
