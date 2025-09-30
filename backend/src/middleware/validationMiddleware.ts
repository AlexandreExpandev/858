import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { errorResponse } from '../utils/responseFormatter';

/**
 * @summary
 * Middleware factory for request validation using Zod schemas
 */
export function validationMiddleware(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validationResult = schema.safeParse(req.body);
      
      if (!validationResult.success) {
        const errorDetails = validationResult.error.format();
        res.status(400).json(errorResponse('Validation failed', errorDetails));
        return;
      }
      
      req.body = validationResult.data;
      next();
    } catch (error) {
      next(error);
    }
  };
}
