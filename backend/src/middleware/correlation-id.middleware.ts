import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Middleware that generates a UUID correlation ID per request.
 * Sets the X-Correlation-ID header on both the request and response.
 */
export function correlationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const correlationId = req.headers['x-correlation-id'] as string || uuidv4();

  req.headers['x-correlation-id'] = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);

  next();
}
