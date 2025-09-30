import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
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
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      res.status(401).json(errorResponse('No token provided'));
      return;
    }
    
    // Verify token
    try {
      const decoded = jwt.verify(token, config.security.jwtSecret);
      req.user = decoded as { id: number; username: string };
      next();
    } catch (error) {
      logger.error('Token verification failed', { error });
      res.status(401).json(errorResponse('Invalid token'));
    }
  } catch (error) {
    logger.error('Authentication middleware error', { error });
    next(error);
  }
}
