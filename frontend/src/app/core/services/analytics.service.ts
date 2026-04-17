import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { AnalyticsDashboard } from '../models/analytics.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getDashboard(): Observable<AnalyticsDashboard> {
    return this.http.get<AnalyticsDashboard>(API_CONFIG.analytics.dashboard);
  }

  trackEvent(event: { type: string; page: string; device: string; userId?: string; metadata?: Record<string, unknown> }): Observable<unknown> {
    return this.http.post(API_CONFIG.analytics.events, event);
  }
}
