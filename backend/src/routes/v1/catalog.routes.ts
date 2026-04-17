import { Router } from 'express';
import { listApis, searchApis, getDetail, getSpec } from '../../controllers/catalog.controller';

const router = Router();

// Public routes
router.get('/', listApis);
router.get('/search', searchApis);
router.get('/:id', getDetail);
router.get('/:id/spec', getSpec);

export default router;
