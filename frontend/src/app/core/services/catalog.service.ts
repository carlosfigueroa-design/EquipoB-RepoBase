import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ApiCatalogItem } from '../models/api-catalog.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  constructor(private http: HttpClient) {}

  getPublicApis(): Observable<ApiCatalogItem[]> {
    return this.http.get<ApiCatalogItem[]>(API_CONFIG.catalog.list);
  }

  searchApis(query: string): Observable<ApiCatalogItem[]> {
    return this.http.get<ApiCatalogItem[]>(API_CONFIG.catalog.search, {
      params: { q: query }
    });
  }

  getApiDetail(id: string): Observable<ApiCatalogItem> {
    return this.http.get<ApiCatalogItem>(API_CONFIG.catalog.detail(id));
  }

  getApiSpec(id: string): Observable<unknown> {
    return this.http.get<unknown>(API_CONFIG.catalog.spec(id));
  }
}
