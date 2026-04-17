import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { OTP_CODE, JWT_SECRET } from '../config/app.config';
import { JsonStoreService } from './json-store.service';
import { UserRole } from '../types';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  displayName: string;
}

interface StoredUser {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: string;
}

export class AuthService {
  constructor(private store: JsonStoreService) {}

  /** Simula envío de OTP. Siempre retorna éxito. */
  async requestOtp(_email: string): Promise<{ message: string }> {
    return { message: 'OTP enviado' };
  }

  /** Verifica OTP fijo "123456". Crea usuario si no existe. Retorna JWT. */
  async verifyOtp(
    email: string,
    otp: string
  ): Promise<{ accessToken: string; user: UserProfile }> {
    if (otp !== OTP_CODE) {
      const error = new Error('Código inválido, intente nuevamente') as Error & {
        statusCode?: number;
      };
      error.statusCode = 401;
      throw error;
    }

    const users = await this.store.read<StoredUser[]>('users.json');
    let user = users.find((u) => u.email === email);

    if (!user) {
      const displayName = email.split('@')[0];
      user = {
        id: uuidv4(),
        email,
        displayName,
        role: 'Externo',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      await this.store.write('users.json', users);
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    const userProfile: UserProfile = {
      id: user.id,
      email: user.email,
      role: user.role,
      displayName: user.displayName,
    };

    return { accessToken, user: userProfile };
  }
}
