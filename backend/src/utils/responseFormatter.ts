/**
 * @summary
 * Utility functions for formatting API responses
 */

/**
 * Formats a successful response
 */
export function successResponse<T>(data: T, metadata?: Record<string, any>) {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Formats an error response
 */
export function errorResponse(message: string, details?: any) {
  return {
    success: false,
    error: {
      message,
      details
    },
    timestamp: new Date().toISOString()
  };
}
