// Common types used across the application

/**
 * @summary
 * Standard API response structure for success cases
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    timestamp: string;
    [key: string]: any;
  };
}

/**
 * @summary
 * Standard API response structure for error cases
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @summary
 * Combined type for all API responses
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
