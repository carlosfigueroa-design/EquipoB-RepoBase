import { Router } from 'express';
import {
  listAllApis,
  createApi,
  changeStatus,
  getAuditLog,
} from '../../controllers/lifecycle.controller';

const router = Router();

// All routes protected by global authMiddleware in routes/v1/index.ts.
// Admin role validation is handled inside each controller handler.
router.get('/', listAllApis);
router.post('/', createApi);
router.patch('/:id/status', changeStatus);
router.get('/:id/audit', getAuditLog);

export default router;
