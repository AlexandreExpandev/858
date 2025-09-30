import { UserData } from '../../services/security/authService';

declare global {
  namespace Express {
    interface Request {
      user?: UserData;
    }
  }
}
