import { Router } from 'express';
import * as counterController from '../api/internal/counter/controller';

const router = Router();

// Counter routes
router.post('/start', counterController.startHandler);
router.post('/pause', counterController.pauseHandler);
router.post('/resume', counterController.resumeHandler);
router.post('/restart', counterController.restartHandler);
router.post('/speed', counterController.setSpeedHandler);
router.get('/status', counterController.getStatusHandler);

export default router;
