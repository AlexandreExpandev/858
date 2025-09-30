import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { loginUser, registerUser } from '../../../../services/security/authService';
import { errorResponse, successResponse } from '../../../../utils/responseFormatter';

/**
 * @summary
 * Handles user login authentication
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    });

    const validatedData = schema.parse(req.body);
    
    // Process login
    const result = await loginUser(validatedData.email, validatedData.password);
    
    res.json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Invalid input data', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @summary
 * Handles new user registration
 */
export async function registerHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body
    const schema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6)
    });

    const validatedData = schema.parse(req.body);
    
    // Process registration
    const result = await registerUser(validatedData.name, validatedData.email, validatedData.password);
    
    res.status(201).json(successResponse(result));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse('Invalid input data', error.errors));
    } else if (error.message === 'UserAlreadyExists') {
      res.status(409).json(errorResponse('User with this email already exists'));
    } else {
      next(error);
    }
  }
}
