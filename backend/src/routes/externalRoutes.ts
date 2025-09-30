import { Router } from 'express';
import * as securityController from '../api/external/security/controller';

const router = Router();

// Security routes (authentication, etc.)
router.post('/security/login', securityController.loginHandler);
router.post('/security/register', securityController.registerHandler);

// Public health check
router.get('/public/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default router;
