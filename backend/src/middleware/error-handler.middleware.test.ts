import { Request, Response, NextFunction } from 'express';
import { errorHandlerMiddleware } from './error-handler.middleware';

describe('errorHandlerMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = { headers: { 'x-correlation-id': 'test-corr-id-001' } };
    res = { status: statusMock } as Partial<Response>;
    next = jest.fn();
  });

  it('should return 500 and standard format for a generic Error', () => {
    const err = new Error('Something broke');

    errorHandlerMiddleware(err, req as Request, res as Response, next);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Internal Server Error',
      message: 'Something broke',
      correlationId: 'test-corr-id-001',
      statusCode: 500,
    });
  });

  it('should use the statusCode from the error when provided', () => {
    const err = Object.assign(new Error('Not found'), { statusCode: 404 });

    errorHandlerMiddleware(err, req as Request, res as Response, next);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      error: 'Bad Request',
      message: 'Not found',
      correlationId: 'test-corr-id-001',
      statusCode: 404,
    });
  });

  it('should label 4xx errors as "Bad Request" and 5xx as "Internal Server Error"', () => {
    const err400 = Object.assign(new Error('Invalid input'), { statusCode: 400 });
    errorHandlerMiddleware(err400, req as Request, res as Response, next);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'Bad Request', statusCode: 400 })
    );

    const err503 = Object.assign(new Error('Unavailable'), { statusCode: 503 });
    errorHandlerMiddleware(err503, req as Request, res as Response, next);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'Internal Server Error', statusCode: 503 })
    );
  });

  it('should use "unknown" when no correlation ID is present', () => {
    req.headers = {};

    const err = new Error('Oops');
    errorHandlerMiddleware(err, req as Request, res as Response, next);

    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ correlationId: 'unknown' })
    );
  });

  it('should use a default message when the error has no message', () => {
    const err = new Error();
    err.message = '';

    errorHandlerMiddleware(err, req as Request, res as Response, next);

    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Ha ocurrido un error inesperado' })
    );
  });
});
