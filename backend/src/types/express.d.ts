import { JwtPayload } from '../services/security/securityTypes';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
