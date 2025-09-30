/**
 * @summary
 * Formats successful API responses
 */
export function successResponse<T>(data: T, metadata?: any) {
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
 * @summary
 * Formats error API responses
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
