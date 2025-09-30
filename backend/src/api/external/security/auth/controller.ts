import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorResponse, successResponse } from '../../../../utils/responseFormatter';
import { authenticateUser } from '../../../../services/security/authService';

/**
 * @summary
 * Handles user authentication and returns JWT token
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body
    const schema = z.object({
      username: z.string().min(3).max(50),
      password: z.string().min(6).max(100)
    });

    const validationResult = schema.safeParse(req.body);
    
    if (!validationResult.success) {
      res.status(400).json(errorResponse('Invalid credentials format'));
      return;
    }

    const { username, password } = validationResult.data;
    
    // Authenticate user
    const authResult = await authenticateUser(username, password);
    
    if (!authResult.success) {
      res.status(401).json(errorResponse('Invalid credentials'));
      return;
    }
    
    // Return successful authentication response
    res.json(successResponse({
      token: authResult.token,
      user: authResult.user
    }));
  } catch (error) {
    next(error);
  }
}
