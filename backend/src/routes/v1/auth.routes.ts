import { Router } from 'express';
import { requestOtp, verifyOtp, getProfile } from '../../controllers/auth.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public routes
router.post('/otp/request', requestOtp);
router.post('/otp/verify', verifyOtp);

// Protected route — uses authMiddleware directly since auth routes
// are registered before the global auth middleware
router.get('/me', authMiddleware, getProfile);

export default router;
