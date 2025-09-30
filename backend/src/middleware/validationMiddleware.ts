import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { errorResponse } from '../utils/responseFormatter';

/**
 * @summary
 * Creates a middleware for validating request data using Zod schemas
 */
export function validationMiddleware(schema: ZodSchema, source: 'body' | 'params' | 'query' = 'body') {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = req[source];
      const validatedData = await schema.parseAsync(data);
      req[source] = validatedData;
      next();
    } catch (error: any) {
      res.status(400).json(errorResponse('Validation failed', error.errors || error.message));
    }
  };
}
