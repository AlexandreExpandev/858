/**
 * @summary
 * Centralized error messages for consistent API responses
 */
export const ErrorMessages = {
  // Authentication errors
  AUTH_INVALID_CREDENTIALS: 'Invalid email or password',
  AUTH_EMAIL_IN_USE: 'Email already in use',
  AUTH_TOKEN_MISSING: 'No token provided',
  AUTH_TOKEN_INVALID: 'Invalid or expired token',
  
  // Counter errors
  COUNTER_NOT_STARTED: 'Counter not started',
  COUNTER_ALREADY_PAUSED: 'Counter already paused',
  COUNTER_NOT_PAUSED: 'Counter is not paused',
  COUNTER_COMPLETED: 'Counter already completed',
  
  // General errors
  VALIDATION_FAILED: 'Validation failed',
  RESOURCE_NOT_FOUND: 'Resource not found',
  INTERNAL_SERVER_ERROR: 'Internal server error'
};
