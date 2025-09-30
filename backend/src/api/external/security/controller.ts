import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorResponse, successResponse } from '../../../utils/responseFormatter';
import { generateToken } from '../../../services/security/tokenService';
import { validateCredentials, createUser } from '../../../services/security/authService';

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

    const { email, password } = result.data;
    
    // Validate user credentials
    const user = await validateCredentials(email, password);
    
    if (!user) {
      res.status(401).json(errorResponse('Invalid credentials'));
      return;
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email
    });

    res.json(successResponse({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
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

    const { name, email, password } = result.data;
    
    // Create new user
    const user = await createUser({
      name,
      email,
      password
    });
    
    // Generate JWT token
    const token = generateToken({
      id: user.id,
      email: user.email
    });

    res.status(201).json(successResponse({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    }));
  } catch (error) {
    if (error instanceof Error && error.message === 'UserAlreadyExists') {
      res.status(409).json(errorResponse('User with this email already exists'));
      return;
    }
    next(error);
  }
}
