import { Router } from 'express';
import { getDashboard, trackEvent } from '../../controllers/analytics.controller';

const router = Router();

router.get('/dashboard', getDashboard);
router.post('/events', trackEvent);

export default router;
