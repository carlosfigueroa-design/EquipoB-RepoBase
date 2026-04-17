import { Request, Response, NextFunction } from 'express';

interface ApiError {
  error: string;
  message: string;
  correlationId: string;
  statusCode: number;
}

/**
 * Global error handler middleware.
 * Returns a standardized JSON error response with correlation ID.
 * Must be registered as the LAST middleware in the Express stack.
 */
export function errorHandlerMiddleware(
  err: Error & { statusCode?: number },
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = err.statusCode || 500;
  const correlationId = (req.headers['x-correlation-id'] as string) || 'unknown';

  const body: ApiError = {
    error: statusCode >= 500 ? 'Internal Server Error' : 'Bad Request',
    message: err.message || 'Ha ocurrido un error inesperado',
    correlationId,
    statusCode,
  };

  res.status(statusCode).json(body);
}
