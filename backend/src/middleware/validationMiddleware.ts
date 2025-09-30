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
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        const errorDetails = result.error.format();
        res.status(400).json(errorResponse('Validation failed', errorDetails));
        return;
      }
      
      // Replace request body with validated data
      req.body = result.data;
      next();
    } catch (error) {
      next(error);
    }
  };
}
