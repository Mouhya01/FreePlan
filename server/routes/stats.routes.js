import { Router } from 'express';
import { getStats } from '../controllers/stats.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getStats);

export default router;