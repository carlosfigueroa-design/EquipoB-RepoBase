import path from 'path';

/** Secret key for signing JWT tokens */
export const JWT_SECRET = 'siop-hackathon-secret-2024';

/** Fixed OTP code for mock authentication */
export const OTP_CODE = '123456';

/** Server port */
export const PORT = 3000;

/** Base directory for JSON data files */
export const DATA_DIR = path.join(__dirname, '../../../data');

/** Paths to individual JSON data files */
export const DATA_FILES = {
  apis: path.join(DATA_DIR, 'apis.json'),
  users: path.join(DATA_DIR, 'users.json'),
  auditLog: path.join(DATA_DIR, 'audit-log.json'),
  aiResponses: path.join(DATA_DIR, 'ai-responses.json'),
} as const;

/** Directory paths for specs and sandbox responses */
export const DATA_DIRS = {
  specs: path.join(DATA_DIR, 'specs'),
  sandboxResponses: path.join(DATA_DIR, 'sandbox-responses'),
} as const;

/** CORS allowed origin */
export const CORS_ORIGIN = 'http://localhost:4200';
