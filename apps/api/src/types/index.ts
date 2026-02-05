/**
 * Type definitions
 * Backend-specific types (shared types should go to @repo/types)
 */

/**
 * Standard API success response shape
 */
export interface ApiResponse<T> {
  success: true;
  data: T;
  requestId?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

/**
 * Standard API error response shape
 */
export interface ApiError {
  success: false;
  code: string;
  message: string;
  status: number;
  details?: Record<string, unknown>;
  requestId?: string;
}

/**
 * Pagination request parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Paginated response meta
 */
export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
