import { Router } from 'express';
import { executeSandbox, getHistory } from '../../controllers/sandbox.controller';

const router = Router();

// Both routes are already protected by the global authMiddleware
// registered in routes/v1/index.ts before sandbox routes
router.post('/execute', executeSandbox);
router.get('/history', getHistory);

export default router;
