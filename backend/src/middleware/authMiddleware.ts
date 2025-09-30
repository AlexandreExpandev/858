import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

/**
 * @summary
 * Authentication middleware to verify JWT tokens
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        success: false, 
        error: { 
          code: 'UNAUTHORIZED', 
          message: 'Authentication required' 
        } 
      });
      return;
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ 
        success: false, 
        error: { 
          code: 'UNAUTHORIZED', 
          message: 'Authentication token missing' 
        } 
      });
      return;
    }
    
    try {
      const decoded = jwt.verify(token, config.security.jwtSecret);
      req.user = decoded as any;
      next();
    } catch (error) {
      res.status(401).json({ 
        success: false, 
        error: { 
          code: 'INVALID_TOKEN', 
          message: 'Invalid or expired token' 
        } 
      });
    }
  } catch (error) {
    next(error);
  }
}
