import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/security/tokenService';
import { errorResponse } from '../utils/responseFormatter';
import { logger } from '../utils/logger';

/**
 * @summary
 * Middleware to authenticate requests using JWT tokens
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json(errorResponse('No token provided'));
      return;
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    try {
      const decoded = verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      logger.warn('Invalid token', { error });
      res.status(401).json(errorResponse('Invalid token'));
    }
  } catch (error) {
    logger.error('Auth middleware error', { error });
    next(error);
  }
}
