import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { generateToken } from '../../../../services/security/authService';
import { errorResponse, successResponse } from '../../../../utils/responseFormatter';

/**
 * @summary
 * Handles user login authentication
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body
    const schema = z.object({
      username: z.string().min(3),
      password: z.string().min(6)
    });

    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json(errorResponse('Invalid credentials format'));
      return;
    }

    // For demo purposes, accept any valid format credentials
    // In a real app, this would validate against database
    const token = generateToken({ username: result.data.username });
    
    res.json(successResponse({ token }));
  } catch (error) {
    next(error);
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
      username: z.string().min(3),
      password: z.string().min(6),
      email: z.string().email()
    });

    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json(errorResponse('Invalid registration data'));
      return;
    }

    // For demo purposes, always succeed
    // In a real app, this would create a user in the database
    const token = generateToken({ username: result.data.username });
    
    res.status(201).json(successResponse({ 
      message: 'User registered successfully',
      token 
    }));
  } catch (error) {
    next(error);
  }
}
