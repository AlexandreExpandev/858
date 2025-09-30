import jwt from 'jsonwebtoken';
import { config } from '../../config';

/**
 * @summary
 * Generates a JWT token for authenticated users
 * 
 * @param {object} payload - User data to include in the token
 * @returns {string} JWT token
 */
export function generateToken(payload: object): string {
  return jwt.sign(
    payload,
    config.security.jwtSecret,
    { expiresIn: config.security.jwtExpiration }
  );
}

/**
 * @summary
 * Verifies a JWT token
 * 
 * @param {string} token - JWT token to verify
 * @returns {object|null} Decoded token payload or null if invalid
 */
export function verifyToken(token: string): object | null {
  try {
    return jwt.verify(token, config.security.jwtSecret) as object;
  } catch (error) {
    return null;
  }
}
