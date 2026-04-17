import path from 'path';
import {
  JWT_SECRET,
  OTP_CODE,
  PORT,
  DATA_DIR,
  DATA_FILES,
  DATA_DIRS,
  CORS_ORIGIN,
} from './app.config';

describe('app.config', () => {
  it('should export a non-empty JWT_SECRET string', () => {
    expect(typeof JWT_SECRET).toBe('string');
    expect(JWT_SECRET.length).toBeGreaterThan(0);
  });

  it('should export OTP_CODE as "123456"', () => {
    expect(OTP_CODE).toBe('123456');
  });

  it('should export PORT as 3000', () => {
    expect(PORT).toBe(3000);
  });

  it('should export DATA_DIR pointing to the data folder', () => {
    expect(DATA_DIR).toContain('data');
    expect(path.isAbsolute(DATA_DIR)).toBe(true);
  });

  it('should export DATA_FILES with correct paths under DATA_DIR', () => {
    expect(DATA_FILES.apis).toBe(path.join(DATA_DIR, 'apis.json'));
    expect(DATA_FILES.users).toBe(path.join(DATA_DIR, 'users.json'));
    expect(DATA_FILES.auditLog).toBe(path.join(DATA_DIR, 'audit-log.json'));
    expect(DATA_FILES.aiResponses).toBe(path.join(DATA_DIR, 'ai-responses.json'));
  });

  it('should export DATA_DIRS with correct subdirectory paths', () => {
    expect(DATA_DIRS.specs).toBe(path.join(DATA_DIR, 'specs'));
    expect(DATA_DIRS.sandboxResponses).toBe(path.join(DATA_DIR, 'sandbox-responses'));
  });

  it('should export CORS_ORIGIN as http://localhost:4200', () => {
    expect(CORS_ORIGIN).toBe('http://localhost:4200');
  });
});
