/**
 * Route helper functions
 * Common utilities for route handlers
 */

import { auth } from "@api/lib/auth";
import { AppError } from "@api/lib/errors";
import { PAGINATION } from "@api/constants";

// Elysia headers type - can be Record<string, string | undefined> or Headers object
export type ElysiaHeaders = Record<string, string | undefined> | Headers;

// ============================================
// Authentication & Authorization Helpers
// ============================================

/**
 * Convert headers to HeadersInit format for auth.api.getSession
 */
const normalizeHeaders = (headers: ElysiaHeaders): Record<string, string> => {
  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  // Record<string, string | undefined>
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
};

/**
 * Get authenticated session from headers
 */
export const getSession = async (headers: ElysiaHeaders) => {
  const headersInit = normalizeHeaders(headers);
  const session = await auth.api.getSession({ headers: headersInit });
  if (!session) {
    throw new AppError("UNAUTHORIZED", "Authentication required", 401);
  }
  return session;
};

/**
 * Get optional session from headers (does not throw if not authenticated)
 */
export const getOptionalSession = async (headers: ElysiaHeaders) => {
  const headersInit = normalizeHeaders(headers);
  const session = await auth.api.getSession({ headers: headersInit });
  return session || null;
};

/**
 * Check if user has admin permissions
 */
export const isAdmin = (role: string): boolean => {
  return role === "ADMIN" || role === "SUPERADMIN";
};

/**
 * Require admin access
 */
export const requireAdmin = async (headers: ElysiaHeaders) => {
  const session = await getSession(headers);
  const adminCheck = isAdmin(session.user.role);
  if (!adminCheck) {
    throw new AppError("FORBIDDEN", "Admin access required", 403);
  }
  return session;
};

/**
 * Require super admin access
 */
export const requireSuperAdmin = async (headers: ElysiaHeaders) => {
  const session = await getSession(headers);
  if (session.user.role !== "SUPERADMIN") {
    throw new AppError("FORBIDDEN", "Super admin access required", 403);
  }
  return session;
};

// ============================================
// Pagination Helpers
// ============================================

export interface PaginationParams {
  page?: string;
  limit?: string;
}

export interface PaginationResult {
  page: number;
  limit: number;
  skip: number;
}

/**
 * Parse pagination parameters from query
 */
export const parsePagination = (query: PaginationParams): PaginationResult => {
  const page = query.page ? parseInt(query.page) : PAGINATION.DEFAULT_PAGE;
  const limit = query.limit ? parseInt(query.limit) : PAGINATION.DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Calculate total pages
 */
export const calculateTotalPages = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};

/**
 * Create pagination metadata
 */
export const createPaginationMeta = (
  total: number,
  page: number,
  limit: number,
) => {
  return {
    total,
    page,
    limit,
    totalPages: calculateTotalPages(total, limit),
  };
};

// ============================================
// Response Helpers
// ============================================

/**
 * Create success response
 */
export const successResponse = <T>(data: T, message?: string) => {
  if (message) {
    return {
      success: true as const,
      data,
      message,
    };
  }
  return {
    success: true as const,
    data,
  };
};

/**
 * Create paginated response
 */
export const paginatedResponse = <T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) => {
  return {
    success: true as const,
    data,
    meta: createPaginationMeta(total, page, limit),
  };
};
