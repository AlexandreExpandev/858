import { Request, Response } from 'express';
import { errorResponse } from '../utils/responseFormatter';

/**
 * @summary
 * Middleware to handle 404 Not Found errors
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json(errorResponse(`Route not found: ${req.method} ${req.originalUrl}`));
}
