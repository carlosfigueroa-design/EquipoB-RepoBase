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

  /** Returns the OpenAPI spec for a given API */
  async getSpec(apiId: string): Promise<unknown> {
    const apis = await this.store.read<ApiCatalogItem[]>('apis.json');
    const api = apis.find((a) => a.id === apiId);

    if (!api) {
      return null;
    }

    return this.store.readSpec(api.specFile);
  }
}
