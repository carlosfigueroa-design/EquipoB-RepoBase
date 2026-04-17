import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './auth.middleware';
import { JWT_SECRET } from '../config/app.config';
import { AuthenticatedRequest } from '../types';

function buildReq(headers: Record<string, string> = {}): Partial<AuthenticatedRequest> {
  return { headers: { 'x-correlation-id': 'test-corr-id', ...headers } };
}

function buildRes(): Partial<Response> {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe('authMiddleware', () => {
  let next: NextFunction;

  beforeEach(() => {
    next = jest.fn();
  });

  it('should set req.user and call next() for a valid JWT', () => {
    const payload = { userId: 'u-1', email: 'test@example.com', role: 'Externo' as const };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    const req = buildReq({ authorization: `Bearer ${token}` });
    const res = buildRes();

    authMiddleware(req as AuthenticatedRequest, res as Response, next);

    expect(req.user).toEqual(payload);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('should return 401 when Authorization header is missing', () => {
    const req = buildReq();
    const res = buildRes();

    authMiddleware(req as AuthenticatedRequest, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Token de autenticación requerido' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 for an invalid token', () => {
    const req = buildReq({ authorization: 'Bearer invalid.token.here' });
    const res = buildRes();

    authMiddleware(req as AuthenticatedRequest, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Token inválido o expirado' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 for an expired token', () => {
    const payload = { userId: 'u-2', email: 'expired@example.com', role: 'Admin' as const };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '-1s' });
    const req = buildReq({ authorization: `Bearer ${token}` });
    const res = buildRes();

    authMiddleware(req as AuthenticatedRequest, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Token inválido o expirado' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 when Authorization header has no Bearer prefix', () => {
    const payload = { userId: 'u-3', email: 'no-bearer@example.com', role: 'Externo' as const };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    const req = buildReq({ authorization: token });
    const res = buildRes();

    authMiddleware(req as AuthenticatedRequest, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Token de autenticación requerido' })
    );
    expect(next).not.toHaveBeenCalled();
  });
});
