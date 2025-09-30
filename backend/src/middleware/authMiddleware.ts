import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

/**
 * @summary
 * Authentication middleware to verify JWT tokens
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      res.status(401).json({ success: false, error: 'No token provided' });
      return;
    }
    
    // Verify token
    jwt.verify(token, config.security.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ success: false, error: 'Invalid token' });
        return;
      }
      
      // Add user info to request
      req.user = decoded as { id: number; email: string; name: string };
      next();
    });
  } catch (error) {
    res.status(401).json({ success: false, error: 'Authentication failed' });
  }
}
