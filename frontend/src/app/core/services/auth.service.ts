import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { AuthSession, UserProfile } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;
  private user: UserProfile | null = null;

  constructor(private http: HttpClient) {}

  requestOtp(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(API_CONFIG.auth.requestOtp, { email });
  }

  verifyOtp(email: string, otp: string): Observable<AuthSession> {
    return this.http
      .post<AuthSession>(API_CONFIG.auth.verifyOtp, { email, otp })
      .pipe(
        tap((session) => {
          this.token = session.accessToken;
          this.user = session.user;
        }),
      );
  }

  getProfile(): UserProfile | null {
    return this.user;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
  }

  getToken(): string | null {
    return this.token;
  }

  logout(): void {
    this.token = null;
    this.user = null;
  }
}
