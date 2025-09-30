/**
 * @summary
 * Application error codes and messages
 */
export const ErrorCodes = {
  // Authentication errors
  AUTH_INVALID_CREDENTIALS: 'InvalidCredentials',
  AUTH_USER_EXISTS: 'UserAlreadyExists',
  AUTH_TOKEN_EXPIRED: 'TokenExpired',
  AUTH_TOKEN_INVALID: 'TokenInvalid',
  
  // Counter errors
  COUNTER_INVALID_STATE: 'InvalidCounterState',
  COUNTER_INVALID_SPEED: 'InvalidCounterSpeed',
  
  // General errors
  VALIDATION_ERROR: 'ValidationError',
  SERVER_ERROR: 'ServerError',
  NOT_FOUND: 'NotFound'
};
