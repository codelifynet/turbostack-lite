import { z } from "zod";

export * from "./users";
export * from "./products";
export * from "./auth";
export * from "./dashboard";
export * from "./profile";
export * from "./settings";
export * from "./upload";
export * from "./subscriptions";
export * from "./orders";
export * from "./rbac";
export * from "./customers";
export * from "./system";

// Re-export frontend-compatible types
export type { ProductFrontend } from "./products";
export type { UserFrontend } from "./users";

// Re-export specific static types that were previously manual
export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";

// ============================================
// Auth Types
// ============================================
export interface Session {
  id: string;
  userId: string;
  sessionToken: string;
  expires: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

// ============================================
// API Response Types
// ============================================
export const CreateApiResponse = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema.optional(),
    message: z.string().optional(),
    error: z.string().optional(),
  });

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================
// Pagination Types
// ============================================
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

// ============================================
// Error Types
// ============================================
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

// ============================================
// Common Types
// ============================================
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

// Shared Constants
export * from "./constants";

// Polar Types
export * from "./polar";

// Email Types
export * from "./email";

// ============================================
// Utility Functions
// ============================================
export * from "./utils";