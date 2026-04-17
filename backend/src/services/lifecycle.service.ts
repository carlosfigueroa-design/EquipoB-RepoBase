import { v4 as uuidv4 } from 'uuid';
import { JsonStoreService } from './json-store.service';
import {
  ApiCatalogItem,
  ApiStatus,
  AuditEntry,
  CreateApiPayload,
} from '../types';

/** Valid state transitions: key = current status, value = allowed next statuses */
const VALID_TRANSITIONS: Record<string, ApiStatus[]> = {
  Borrador: ['Publicada'],
  Publicada: ['Deprecada'],
  Deprecada: ['Retirada', 'Publicada'],
};

export class LifecycleService {
  constructor(private store: JsonStoreService) {}

  /** Returns all APIs (including Borrador/Retirada) for admin view */
  async getAllApis(): Promise<ApiCatalogItem[]> {
    return this.store.read<ApiCatalogItem[]>('apis.json');
  }

  /** Creates a new API with status "Borrador" */
  async createApi(
    data: CreateApiPayload,
    userId: string
  ): Promise<ApiCatalogItem> {
    const apis = await this.store.read<ApiCatalogItem[]>('apis.json');
    const now = new Date().toISOString();

    const newApi: ApiCatalogItem = {
      id: uuidv4(),
      name: data.name,
      category: data.category,
      description: data.description,
      descriptionSummary: data.descriptionSummary,
      useCases: data.useCases,
      status: 'Borrador',
      version: 'v1',
      contactTeam: data.contactTeam,
      icon: data.icon,
      specFile: '',
      createdAt: now,
      updatedAt: now,
    };

    apis.push(newApi);
    await this.store.write('apis.json', apis);

    return newApi;
  }

  /** Changes API status validating allowed transitions. Records audit entry. */
  async changeStatus(
    apiId: string,
    newStatus: ApiStatus,
    userId: string
  ): Promise<ApiCatalogItem> {
    const apis = await this.store.read<ApiCatalogItem[]>('apis.json');
    const api = apis.find((a) => a.id === apiId);

    if (!api) {
      const error = new Error('API no encontrada') as Error & {
        statusCode?: number;
      };
      error.statusCode = 404;
      throw error;
    }

    const allowed = VALID_TRANSITIONS[api.status] || [];
    if (!allowed.includes(newStatus)) {
      const error = new Error(
        `Transición no permitida de ${api.status} a ${newStatus}`
      ) as Error & { statusCode?: number };
      error.statusCode = 400;
      throw error;
    }

    const previousStatus = api.status;
    api.status = newStatus;
    api.updatedAt = new Date().toISOString();

    await this.store.write('apis.json', apis);

    // Record audit entry
    const auditLog = await this.store.read<AuditEntry[]>('audit-log.json');
    const entry: AuditEntry = {
      id: uuidv4(),
      apiId,
      userId,
      action: `Cambio de estado: ${previousStatus} → ${newStatus}`,
      previousStatus,
      newStatus,
      timestamp: new Date().toISOString(),
    };
    auditLog.push(entry);
    await this.store.write('audit-log.json', auditLog);

    return api;
  }

  /** Returns audit log entries filtered by apiId */
  async getAuditLog(apiId: string): Promise<AuditEntry[]> {
    const auditLog = await this.store.read<AuditEntry[]>('audit-log.json');
    return auditLog.filter((entry) => entry.apiId === apiId);
  }
}
