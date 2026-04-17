import { Request, Response, NextFunction } from 'express';
import { correlationIdMiddleware } from './correlation-id.middleware';

describe('correlationIdMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} };
    res = { setHeader: jest.fn() };
    next = jest.fn();
  });

  it('should generate a UUID and set it on request and response headers', () => {
    correlationIdMiddleware(req as Request, res as Response, next);

    const correlationId = req.headers!['x-correlation-id'] as string;
    expect(correlationId).toBeDefined();
    expect(correlationId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
    expect(res.setHeader).toHaveBeenCalledWith('X-Correlation-ID', correlationId);
    expect(next).toHaveBeenCalled();
  });

  it('should preserve an existing X-Correlation-ID from the request', () => {
    const existingId = 'existing-correlation-id-123';
    req.headers = { 'x-correlation-id': existingId };

    correlationIdMiddleware(req as Request, res as Response, next);

    expect(req.headers['x-correlation-id']).toBe(existingId);
    expect(res.setHeader).toHaveBeenCalledWith('X-Correlation-ID', existingId);
    expect(next).toHaveBeenCalled();
  });

  it('should call next() exactly once', () => {
    correlationIdMiddleware(req as Request, res as Response, next);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
