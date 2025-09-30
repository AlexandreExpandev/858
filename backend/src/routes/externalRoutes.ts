import { Router } from 'express';
import * as securityController from '../api/external/security/authentication/controller';

const router = Router();

// Authentication routes
router.post('/security/login', securityController.loginHandler);
router.post('/security/register', securityController.registerHandler);

// Public health check
router.get('/public/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default router;
