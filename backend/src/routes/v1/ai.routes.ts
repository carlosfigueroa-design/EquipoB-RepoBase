import { Router } from 'express';
import { queryAssistant } from '../../controllers/ai.controller';

const router = Router();

// Protected by global authMiddleware registered in routes/v1/index.ts
router.post('/assistant', queryAssistant);

export default router;
