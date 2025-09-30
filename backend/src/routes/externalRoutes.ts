import { Router } from 'express';
import * as securityController from '../api/external/security/auth/controller';

const router = Router();

// Authentication routes
router.post('/security/auth/login', securityController.postHandler);

// Public health check
router.get('/public/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default router;
