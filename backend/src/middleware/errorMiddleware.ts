import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * @summary
 * Global error handling middleware
 */
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  // Log the error
  logger.error('Error occurred', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Determine status code
  const statusCode = err.statusCode || 500;
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : err.message || 'Internal server error',
      details: process.env.NODE_ENV === 'production' ? undefined : err.details
    },
    timestamp: new Date().toISOString()
  });
}
