import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { generateToken } from '../../../utils/auth/tokenUtils';
import { errorResponse, successResponse } from '../../../utils/response/responseUtils';

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

    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json(errorResponse('Invalid credentials format'));
      return;
    }

    // In a real app, validate against database
    // For this foundation, we'll use a mock successful login
    const userData = {
      id: 1,
      email: result.data.email,
      name: 'Demo User'
    };

    // Generate JWT token
    const token = generateToken(userData);

    res.json(successResponse({
      user: userData,
      token
    }));
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
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6)
    });

    const result = schema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json(errorResponse('Invalid registration data'));
      return;
    }

    // In a real app, save to database
    // For this foundation, we'll use a mock successful registration
    const userData = {
      id: 1,
      email: result.data.email,
      name: result.data.name
    };

    // Generate JWT token
    const token = generateToken(userData);

    res.status(201).json(successResponse({
      user: userData,
      token
    }));
  } catch (error) {
    next(error);
  }
}
