import { Router } from 'express';
import * as securityController from '../api/external/security/auth/controller';

const router = Router();

// Authentication routes
router.post('/security/auth/login', securityController.loginHandler);
router.post('/security/auth/register', securityController.registerHandler);

export default router;
