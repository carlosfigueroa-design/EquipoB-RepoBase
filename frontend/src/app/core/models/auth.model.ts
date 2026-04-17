export interface OtpRequestPayload {
  email: string;
}

export interface OtpVerifyPayload {
  email: string;
  otp: string;
}

export interface AuthSession {
  accessToken: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
}

export type UserRole = 'Externo' | 'Admin';
