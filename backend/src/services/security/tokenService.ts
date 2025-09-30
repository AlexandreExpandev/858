import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { JwtPayload } from './securityTypes';

/**
 * @summary
 * Generates a JWT token for a user
 */
export function generateToken(payload: JwtPayload): string {
  return jwt.sign(
    payload,
    config.security.jwtSecret,
    { expiresIn: config.security.jwtExpiration }
  );
}

/**
 * @summary
 * Verifies a JWT token and returns the decoded payload
 */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, config.security.jwtSecret) as JwtPayload;
}
