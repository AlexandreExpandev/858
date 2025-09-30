import { Request, Response } from 'express';

/**
 * @summary
 * 404 Not Found middleware for handling undefined routes
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`
    },
    timestamp: new Date().toISOString()
  });
}
