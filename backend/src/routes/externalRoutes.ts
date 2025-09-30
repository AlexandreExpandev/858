import { Router } from 'express';
import * as securityController from '../api/external/security/controller';

const router = Router();

// Authentication routes
router.post('/auth/login', securityController.loginHandler);
router.post('/auth/register', securityController.registerHandler);

// Public health check
router.get('/public/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
