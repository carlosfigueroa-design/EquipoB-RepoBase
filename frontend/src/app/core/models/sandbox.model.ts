export interface SandboxRequest {
  apiId: string;
  endpoint: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  scenario?: string;
}

export interface SandboxHistoryEntry {
  request: SandboxRequest;
  response: SandboxResponse;
  timestamp: string;
}

export interface SandboxResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
  responseTimeMs: number;
  correlationId: string;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
