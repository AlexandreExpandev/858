import jwt from 'jsonwebtoken';
import { config } from '../../config';

/**
 * @summary
 * User data interface for token payload
 */
export interface UserData {
  username: string;
  id?: string;
  [key: string]: any;
}

/**
 * @summary
 * Generates a JWT token for the provided user data
 */
export function generateToken(userData: UserData): string {
  return jwt.sign(userData, config.security.jwtSecret, {
    expiresIn: config.security.jwtExpiration
  });
}

/**
 * @summary
 * Verifies a JWT token and returns the decoded data
 */
export function verifyToken(token: string): UserData {
  return jwt.verify(token, config.security.jwtSecret) as UserData;
}
