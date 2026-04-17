import { Request } from 'express';

/** User payload stored in JWT and attached to requests */
export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export type UserRole = 'Externo' | 'Admin';

/** Extends Express Request with authenticated user info */
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

/** Status of an API in the catalog lifecycle */
export type ApiStatus = 'Borrador' | 'Publicada' | 'Deprecada' | 'Retirada';

/** Contact information for the team owning an API */
export interface ContactInfo {
  teamName: string;
  email: string;
  area: string;
}

/** Represents an API entry in the catalog */
export interface ApiCatalogItem {
  id: string;
  name: string;
  category: string;
  description: string;
  descriptionSummary: string;
  useCases: string[];
  status: ApiStatus;
  version: string;
  contactTeam: ContactInfo;
  icon: string;
  specFile: string;
  createdAt: string;
  updatedAt: string;
}

/** Sandbox request payload */
export interface SandboxRequest {
  apiId: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  scenario?: string;
}

/** Sandbox response with mock data and generated metadata */
export interface SandboxResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
  responseTimeMs: number;
  correlationId: string;
}

/** Entry in the sandbox execution history */
export interface SandboxHistoryEntry {
  request: SandboxRequest;
  response: SandboxResponse;
  timestamp: string;
}

/** Entry in ai-responses.json */
export interface AIResponseEntry {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
  relatedApiId: string;
  curlExample: string;
}

/** Response returned by AIAssistantService.query() */
export interface AIResponse {
  answer: string;
  relatedApiId?: string;
  relatedApiName?: string;
  swaggerLink?: string;
  curlExample?: string;
}

/** Payload for creating a new API */
export interface CreateApiPayload {
  name: string;
  category: string;
  description: string;
  descriptionSummary: string;
  useCases: string[];
  contactTeam: ContactInfo;
  icon: string;
}

/** Entry in audit-log.json */
export interface AuditEntry {
  id: string;
  apiId: string;
  userId: string;
  action: string;
  previousStatus: string;
  newStatus: string;
  timestamp: string;
}
