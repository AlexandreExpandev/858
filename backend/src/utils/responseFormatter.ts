/**
 * @summary
 * Standard success response format
 */
export function successResponse<T>(data: T, metadata?: any): {
  success: true;
  data: T;
  metadata?: any;
} {
  return {
    success: true,
    data,
    ...(metadata ? { metadata } : {})
  };
}

/**
 * @summary
 * Standard error response format
 */
export function errorResponse(message: string, details?: any): {
  success: false;
  error: {
    message: string;
    details?: any;
    timestamp: string;
  };
} {
  return {
    success: false,
    error: {
      message,
      ...(details ? { details } : {}),
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * @summary
 * Standard paginated response format
 */
export function paginatedResponse<T>(
  data: T[],
  page: number,
  pageSize: number,
  total: number
): {
  success: true;
  data: T[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
} {
  const totalPages = Math.ceil(total / pageSize);
  
  return {
    success: true,
    data,
    metadata: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1
    }
  };
}
