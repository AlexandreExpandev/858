import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * @summary
 * Middleware for validating request data using Zod schemas
 */
export function validationMiddleware(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate request body against schema
      const result = schema.safeParse(req.body);
      
      if (!result.success) {
        res.status(400).json({
          success: false,
          error: {
            message: 'Validation failed',
            details: result.error.format()
          },
          timestamp: new Date().toISOString()
        });
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
