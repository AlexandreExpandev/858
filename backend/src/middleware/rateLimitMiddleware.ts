import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/responseFormatter';

// Simple in-memory rate limiting (in a production app, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

/**
 * @summary
 * Middleware to limit the rate of requests to specific endpoints
 * @param maxRequests Maximum number of requests allowed in the time window
 * @param windowMs Time window in milliseconds
 */
export function rateLimitMiddleware(maxRequests: number = 5, windowMs: number = 60000) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Create a key based on IP and user ID if available
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const userId = req.user?.id ? `-${req.user.id}` : '';
    const key = `${ip}${userId}-${req.path}`;
    
    const now = Date.now();
    const requestData = requestCounts.get(key) || { count: 0, resetTime: now + windowMs };
    
    // Reset count if the time window has passed
    if (now > requestData.resetTime) {
      requestData.count = 0;
      requestData.resetTime = now + windowMs;
    }
    
    requestData.count += 1;
    requestCounts.set(key, requestData);
    
    if (requestData.count > maxRequests) {
      res.status(429).json(errorResponse('Too many requests, please try again later'));
      return;
    }
    
    next();
  };
}
