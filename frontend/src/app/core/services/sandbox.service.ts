import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { SandboxRequest, SandboxResponse, SandboxHistoryEntry } from '../models/sandbox.model';

@Injectable({ providedIn: 'root' })
export class SandboxService {
  constructor(private http: HttpClient) {}

  execute(request: SandboxRequest): Observable<SandboxResponse> {
    return this.http.post<SandboxResponse>(API_CONFIG.sandbox.execute, request);
  }

  getHistory(): Observable<SandboxHistoryEntry[]> {
    return this.http.get<SandboxHistoryEntry[]>(API_CONFIG.sandbox.history);
  }
}
