import { Router } from 'express';
import { listApis, searchApis, getDetail, getSpec } from '../../controllers/catalog.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', listApis);
router.get('/search', searchApis);
router.get('/:id', getDetail);

// Protected route — requires JWT
router.get('/:id/spec', authMiddleware, getSpec);

export default router;
