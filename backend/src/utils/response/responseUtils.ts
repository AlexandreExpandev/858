/**
 * @summary
 * Utility functions for standardized API responses
 */

/**
 * Creates a standardized success response
 * 
 * @param data Response data
 * @param metadata Optional metadata
 * @returns Formatted success response
 */
export function successResponse<T>(data: T, metadata?: any): {
  success: true;
  data: T;
  metadata?: any;
  timestamp: string;
} {
  return {
    success: true,
    data,
    ...(metadata && { metadata }),
    timestamp: new Date().toISOString()
  };
}

/**
 * Creates a standardized error response
 * 
 * @param message Error message
 * @param details Optional error details
 * @returns Formatted error response
 */
export function errorResponse(
  message: string,
  details?: any
): {
  success: false;
  error: {
    message: string;
    details?: any;
  };
  timestamp: string;
} {
  return {
    success: false,
    error: {
      message,
      ...(details && { details })
    },
    timestamp: new Date().toISOString()
  };
}
