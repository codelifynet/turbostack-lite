import type {
  ApiResponse,
  UserFrontend,
  Role,
  BetterAuthUser,
  AuthResponse,
  EdenError,
} from "@repo/types";

// ============================================================================
// Constants
// ============================================================================

export const DEFAULT_ERROR_MESSAGES = {
  registration: "Registration failed",
  login: "Login failed",
  logout: "Failed to logout",
  forgotPassword: "Failed to send reset email",
  resetPassword: "Failed to reset password",
  getSession: "Failed to get session",
  network: "Failed to connect to server",
} as const;

export const DEFAULT_ROLE: Role = "USER";

// ============================================================================
// Type Guards & Validators
// ============================================================================

export function isValidRole(role: unknown): role is Role {
  return role === "USER" || role === "ADMIN" || role === "SUPER_ADMIN";
}

// ============================================================================
// Error Handling
// ============================================================================

export function parseErrorMessage(error: unknown): string {
  const edenError = error as EdenError;
  return edenError.value?.message ?? "";
}

export function createSuccessResponse<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function createErrorResponse(
  error: string,
  message?: string,
): ApiResponse<never> {
  return {
    success: false,
    error,
    message,
  };
}

export function createNetworkErrorResponse(
  action: keyof typeof DEFAULT_ERROR_MESSAGES,
): ApiResponse<never> {
  return createErrorResponse("Network Error", DEFAULT_ERROR_MESSAGES[action]);
}

// ============================================================================
// Data Transformation
// ============================================================================

export function formatDateString(date: Date | string | undefined): string {
  if (date === undefined) return "";
  if (date instanceof Date) return date.toISOString();
  return date;
}

export function mapBetterAuthUserToUser(user: BetterAuthUser): UserFrontend {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: isValidRole(user.role) ? user.role : DEFAULT_ROLE,
    image: user.image ?? null,
    emailVerified: user.emailVerified ?? false,
    emailVerifiedAt: user.emailVerifiedAt ?? null,
    bio: user.bio ?? null,
    skills: user.skills ?? [],
    createdAt: user.createdAt ? formatDateString(user.createdAt) : "",
    updatedAt: user.updatedAt ? formatDateString(user.updatedAt) : "",
  };
}

export function createAuthResponse(user: BetterAuthUser, session?: any): AuthResponse {
  return {
    user: mapBetterAuthUserToUser(user),
    session,
  };
}
