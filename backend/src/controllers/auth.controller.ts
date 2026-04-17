import { Request, Response, NextFunction } from 'express';
import { JsonStoreService } from '../services/json-store.service';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../types';

const store = new JsonStoreService();
const authService = new AuthService(store);

/** POST /otp/request — Solicitar OTP (simulado) */
export async function requestOtp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email } = req.body;
    const result = await authService.requestOtp(email);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** POST /otp/verify — Verificar OTP → JWT */
export async function verifyOtp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyOtp(email, otp);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

/** GET /me — Perfil del usuario actual (requiere JWT) */
export function getProfile(
  req: AuthenticatedRequest,
  res: Response
): void {
  const user = req.user;
  res.status(200).json(user);
}
