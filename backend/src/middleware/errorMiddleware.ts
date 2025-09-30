import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { errorResponse } from '../utils/responseFormatter';

/**
 * @summary
 * Global error handling middleware
 */
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  // Log the error
  logger.error('Error occurred', {
    error: err,
    path: req.path,
    method: req.method,
    ip: req.ip
  });
  
  // Send error response
  res.status(statusCode).json(errorResponse(message, process.env.NODE_ENV === 'development' ? err.stack : undefined));
}
