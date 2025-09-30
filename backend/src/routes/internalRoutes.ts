import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import * as counterController from '../api/internal/counter/controller';

const router = Router();

// Apply authentication middleware to all internal routes
router.use(authMiddleware);

// Counter routes
router.post('/counter/start', counterController.startHandler);
router.post('/counter/pause', counterController.pauseHandler);
router.post('/counter/resume', counterController.resumeHandler);
router.post('/counter/restart', counterController.restartHandler);
router.put('/counter/speed', counterController.speedHandler);
router.get('/counter/status', counterController.statusHandler);

export default router;
