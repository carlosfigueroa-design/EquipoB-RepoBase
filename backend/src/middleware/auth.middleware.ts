import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/app.config';
import { AuthenticatedRequest, JwtPayload } from '../types';

/**
 * JWT authentication middleware.
 * Extracts Bearer token from Authorization header, verifies signature,
 * and attaches decoded payload to req.user.
 * Returns 401 for missing, invalid, or expired tokens.
 */
export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Token de autenticación requerido',
      correlationId: (req.headers['x-correlation-id'] as string) || 'unknown',
      statusCode: 401,
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { userId: decoded.userId, email: decoded.email, role: decoded.role };
    next();
  } catch {
    res.status(401).json({
      error: 'Unauthorized',
      message: 'Token inválido o expirado',
      correlationId: (req.headers['x-correlation-id'] as string) || 'unknown',
      statusCode: 401,
    });
  }
}
