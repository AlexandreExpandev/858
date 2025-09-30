/**
 * @summary
 * Formats a successful response
 * 
 * @param {any} data - Response data
 * @returns {object} Formatted success response
 */
export function successResponse(data: any): object {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };
}

/**
 * @summary
 * Formats an error response
 * 
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @param {any} details - Additional error details
 * @returns {object} Formatted error response
 */
export function errorResponse(message: string, code: string = 'BAD_REQUEST', details?: any): object {
  return {
    success: false,
    error: {
      code,
      message,
      details
    },
    timestamp: new Date().toISOString()
  };
}
