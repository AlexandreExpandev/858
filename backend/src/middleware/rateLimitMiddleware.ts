import { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum number of requests allowed in the time window
  message?: string; // Optional custom error message
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

/**
 * @summary
 * Simple in-memory rate limiting middleware
 * 
 * @param options Rate limiting configuration options
 */
export function rateLimitMiddleware(options: RateLimitOptions) {
  const { windowMs, maxRequests, message = 'Too many requests, please try again later.' } = options;
  
  // In-memory store for rate limiting
  // In a production environment, you would use Redis or another distributed store
  const store: RateLimitStore = {};
  
  // Clean up expired entries periodically
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (store[key].resetTime <= now) {
        delete store[key];
      }
    }
  }, windowMs);
  
  return (req: Request, res: Response, next: NextFunction): void => {
    // Use IP address as the key for rate limiting
    // In a real app, you might want to use a combination of IP and user ID
    const key = req.ip || 'unknown';
    const now = Date.now();
    
    // Initialize or reset if window has expired
    if (!store[key] || store[key].resetTime <= now) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs
      };
      return next();
    }
    
    // Increment request count
    store[key].count += 1;
    
    // Check if over limit
    if (store[key].count > maxRequests) {
      return res.status(429).json({
        success: false,
        error: {
          message,
          retryAfter: Math.ceil((store[key].resetTime - now) / 1000)
        },
        timestamp: new Date().toISOString()
      });
    }
    
    next();
  };
}
