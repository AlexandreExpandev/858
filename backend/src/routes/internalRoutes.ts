import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import counterRoutes from './counterRoutes';

const router = Router();

// Apply authentication middleware to all internal routes
router.use(authMiddleware);

// Counter feature routes
router.use('/counter', counterRoutes);

export default router;
