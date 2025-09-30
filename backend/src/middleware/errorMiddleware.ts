import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { errorResponse } from '../utils/responseFormatter';

/**
 * @summary
 * Global error handling middleware
 */
export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  // Log the error
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Send appropriate response
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json(errorResponse(
    process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message
  ));
}
