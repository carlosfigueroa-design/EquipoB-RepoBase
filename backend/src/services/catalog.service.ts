import { JsonStoreService } from './json-store.service';
import { ApiCatalogItem } from '../types';

const PUBLIC_STATUSES = ['Publicada', 'Deprecada'];

export class CatalogService {
  constructor(private store: JsonStoreService) {}

  /** Returns APIs with status "Publicada" or "Deprecada" */
  async getPublicApis(): Promise<ApiCatalogItem[]> {
    const apis = await this.store.read<ApiCatalogItem[]>('apis.json');
    return apis.filter((api) => PUBLIC_STATUSES.includes(api.status));
  }

  /** Searches public APIs by name, category or description (case-insensitive) */
  async search(query: string): Promise<ApiCatalogItem[]> {
    const publicApis = await this.getPublicApis();
    const lowerQuery = query.toLowerCase();

    return publicApis.filter(
      (api) =>
        api.name.toLowerCase().includes(lowerQuery) ||
        api.category.toLowerCase().includes(lowerQuery) ||
        api.description.toLowerCase().includes(lowerQuery)
    );
  }

  /** Returns public detail of an API by id. Returns null if not found or not public. */
  async getPublicDetail(apiId: string): Promise<ApiCatalogItem | null> {
    const apis = await this.store.read<ApiCatalogItem[]>('apis.json');
    const api = apis.find((a) => a.id === apiId);

    if (!api || !PUBLIC_STATUSES.includes(api.status)) {
      return null;
    }

    return api;
  }

  /** Returns the OpenAPI spec for a given API. Auto-generates if no spec file exists. */
  async getSpec(apiId: string): Promise<unknown> {
    const apis = await this.store.read<ApiCatalogItem[]>('apis.json');
    const api = apis.find((a) => a.id === apiId);

    if (!api) {
      return null;
    }

    if (!api.specFile) {
      return this.generateSpec(api);
    }

    return this.store.readSpec(api.specFile);
  }

  /** Generates a realistic OpenAPI spec from API metadata */
  private generateSpec(api: ApiCatalogItem): unknown {
    const basePath = this.inferBasePath(api);
    const tag = api.category;
    const paths: Record<string, unknown> = {};

    // Generate a POST endpoint for the main operation
    paths[basePath] = {
      post: {
        summary: api.descriptionSummary,
        description: api.description,
        operationId: this.toOperationId(api.name),
        tags: [tag],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                description: `Payload para ${api.name}`,
              },
              example: { mensaje: 'Ejemplo de request' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Operación exitosa',
            content: {
              'application/json': {
                schema: { type: 'object' },
                example: { success: true, data: {} },
              },
            },
          },
          '400': {
            description: 'Datos inválidos',
            content: {
              'application/json': {
                example: { error: 'VALIDATION_ERROR', message: 'Datos inválidos', statusCode: 400 },
              },
            },
          },
        },
      },
    };

    // Generate a GET endpoint for consultation
    paths[`${basePath}/{id}`] = {
      get: {
        summary: `Consultar ${api.name.replace('API de ', '').replace('API ', '')}`,
        description: `Obtiene el detalle de un recurso de ${api.name}`,
        operationId: `consultar${this.toOperationId(api.name)}`,
        tags: [tag],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Identificador único del recurso',
            schema: { type: 'string' },
            example: 'ID-2025-001234',
          },
        ],
        responses: {
          '200': {
            description: 'Recurso encontrado',
            content: {
              'application/json': {
                schema: { type: 'object' },
              },
            },
          },
          '404': {
            description: 'Recurso no encontrado',
            content: {
              'application/json': {
                example: { error: 'NOT_FOUND', message: 'Recurso no encontrado', statusCode: 404 },
              },
            },
          },
        },
      },
    };

    // Add use-case specific endpoints
    if (api.useCases && api.useCases.length > 0) {
      for (let i = 0; i < Math.min(api.useCases.length, 3); i++) {
        const useCase = api.useCases[i];
        const slug = this.toSlug(useCase);
        paths[`${basePath}/${slug}`] = {
          post: {
            summary: useCase,
            description: `Endpoint para: ${useCase}`,
            operationId: this.toOperationId(useCase),
            tags: [tag],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { type: 'object' },
                },
              },
            },
            responses: {
              '200': {
                description: 'Operación exitosa',
                content: { 'application/json': { schema: { type: 'object' } } },
              },
              '400': {
                description: 'Error de validación',
                content: {
                  'application/json': {
                    example: { error: 'VALIDATION_ERROR', message: 'Datos inválidos', statusCode: 400 },
                  },
                },
              },
            },
          },
        };
      }
    }

    return {
      openapi: '3.0.3',
      info: {
        title: api.name,
        version: api.version || '1.0.0',
        description: api.description,
        contact: {
          name: api.contactTeam.teamName,
          email: api.contactTeam.email,
        },
      },
      servers: [
        { url: 'https://sandbox.segurosbolivar.com/v1', description: 'Sandbox' },
      ],
      tags: [{ name: tag, description: `Operaciones de ${tag}` }],
      paths,
      components: {
        schemas: {
          ErrorResponse: {
            type: 'object',
            properties: {
              error: { type: 'string' },
              message: { type: 'string' },
              statusCode: { type: 'integer' },
            },
          },
        },
      },
    };
  }

  private inferBasePath(api: ApiCatalogItem): string {
    const name = api.name
      .replace(/^API de /i, '')
      .replace(/^API /i, '')
      .replace(/^CAI - /i, 'cai/')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9/]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return `/${name}`;
  }

  private toOperationId(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(/\s+/)
      .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('');
  }

  private toSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 30);
  }
}
