import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { errorResponse } from '../utils/responseFormatter';

/**
 * @summary
 * Creates a middleware function that validates request body against a Zod schema
 */
export function validationMiddleware(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
        res.status(400).json(errorResponse(`Validation error: ${errorMessage}`));
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
