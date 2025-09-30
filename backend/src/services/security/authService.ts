import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { logger } from '../../utils/logger';

/**
 * @summary
 * Service for user authentication and token generation
 */

// For demo purposes - in a real app, this would be stored in a database
const demoUsers = [
  { id: 1, username: 'admin', password: 'admin123' },
  { id: 2, username: 'user', password: 'user123' }
];

interface AuthResult {
  success: boolean;
  token?: string;
  user?: {
    id: number;
    username: string;
  };
  message?: string;
}

/**
 * Authenticates a user and generates a JWT token
 */
export async function authenticateUser(username: string, password: string): Promise<AuthResult> {
  try {
    // Find user (in a real app, this would query a database)
    const user = demoUsers.find(u => u.username === username && u.password === password);
    
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      config.security.jwtSecret,
      { expiresIn: config.security.jwtExpiration }
    );
    
    return {
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username
      }
    };
  } catch (error) {
    logger.error('Authentication error', { error, username });
    return { success: false, message: 'Authentication failed' };
  }
}
