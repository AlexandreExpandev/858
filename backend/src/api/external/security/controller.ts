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
    // For this foundation, we'll use a mock successful login\n    const userData = {\n      id: 1,\n      email: result.data.email,\n      name: 'Demo User'\n    };\n\n    // Generate JWT token\n    const token = generateToken(userData);\n\n    res.json(successResponse({\n      user: userData,\n      token\n    }));\n  } catch (error) {\n    next(error);\n  }\n}\n\n/**\n * @summary\n * Handles new user registration\n */\nexport async function registerHandler(req: Request, res: Response, next: NextFunction): Promise<void> {\n  try {\n    // Validate request body\n    const schema = z.object({\n      name: z.string().min(2),\n      email: z.string().email(),\n      password: z.string().min(6)\n    });\n\n    const result = schema.safeParse(req.body);\n    \n    if (!result.success) {\n      res.status(400).json(errorResponse('Invalid registration data'));\n      return;\n    }\n\n    // In a real app, save to database\n    // For this foundation, we'll use a mock successful registration
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
