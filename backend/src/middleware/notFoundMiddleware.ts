import { Request, Response } from 'express';

/**
 * @summary
 * Middleware to handle 404 Not Found errors
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route not found: ${req.method} ${req.originalUrl}`
    },
    timestamp: new Date().toISOString()
  });
}
