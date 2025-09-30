/**
 * @summary
 * Type definitions for the security service
 */

// User entity
export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

// User creation parameters
export interface UserCreateParams {
  name: string;
  email: string;
  password: string;
}

// JWT payload structure
export interface JwtPayload {
  id: number;
  email: string;
  iat?: number;
  exp?: number;
}
