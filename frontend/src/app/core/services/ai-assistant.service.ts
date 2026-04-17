import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

export interface AIResponse {
  answer: string;
  relatedApiId?: string;
  relatedApiName?: string;
  swaggerLink?: string;
  curlExample?: string;
}

@Injectable({ providedIn: 'root' })
export class AiAssistantService {
  constructor(private http: HttpClient) {}

  query(message: string): Observable<AIResponse> {
    return this.http.post<AIResponse>(API_CONFIG.ai.assistant, { message });
  }
}
