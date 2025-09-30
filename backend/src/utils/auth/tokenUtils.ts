import jwt from 'jsonwebtoken';
import { config } from '../../config';

/**
 * @summary
 * Generates a JWT token for user authentication
 * 
 * @param userData User data to encode in the token
 * @returns JWT token string
 */
export function generateToken(userData: { id: number; email: string; name: string }): string {
  return jwt.sign(
    userData,
    config.security.jwtSecret,
    { expiresIn: config.security.jwtExpiration }
  );
}

/**
 * @summary
 * Verifies a JWT token and returns the decoded data
 * 
 * @param token JWT token to verify
 * @returns Decoded token data or null if invalid
 */
export function verifyToken(token: string): any | null {
  try {
    return jwt.verify(token, config.security.jwtSecret);
  } catch (error) {
    return null;
  }
}
