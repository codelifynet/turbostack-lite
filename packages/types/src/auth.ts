import { z } from "zod";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  socialSignInParamsSchema,
  socialSignInQuerySchema,
} from "@repo/validations/auth";

// Re-export zod schemas (aliased to match old names if possible, or just new names)
// We encourage using the schemas from @repo/validations directly, but for compat:
export const SignUpSchema = registerSchema;
export type SignUp = z.infer<typeof registerSchema>;

export const SignInSchema = loginSchema;
export type SignIn = z.infer<typeof loginSchema>;

export const ForgotPasswordSchema = forgotPasswordSchema;
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;

export const ResetPasswordSchema = resetPasswordSchema;
export type ResetPassword = z.infer<typeof resetPasswordSchema>;

export const SocialSignInParamsSchema = socialSignInParamsSchema;
export type SocialSignInParams = z.infer<typeof socialSignInParamsSchema>;

export const SocialSignInQuerySchema = socialSignInQuerySchema;
export type SocialSignInQuery = z.infer<typeof socialSignInQuerySchema>;

// ============================================
// Frontend Auth Types
// ============================================

import type { UserFrontend } from "./users";

// Role type for auth
export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";

export interface AuthResponse {
  user: UserFrontend;
  session?: {
    token: string;
    expiresAt: string;
  };
}

// ============================================
// Better-Auth API Types
// ============================================

export interface BetterAuthSession {
  token: string;
  expiresAt: string;
}

export interface BetterAuthUser {
  id: string;
  email: string;
  name: string;
  role?: Role | string;
  image?: string | null;
  emailVerified?: boolean;
  emailVerifiedAt?: string | null;
  bio?: string | null;
  skills?: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface BetterAuthAuthResponse {
  user?: BetterAuthUser;
  session?: BetterAuthSession;
  error?: string;
  message?: string;
}

export type BetterAuthSignUpResponse = BetterAuthAuthResponse;
export type BetterAuthSignInResponse = BetterAuthAuthResponse;

export interface BetterAuthSessionResponse {
  user: BetterAuthUser | null;
  session: BetterAuthSession | null;
}

// ============================================
// Eden Treaty Types
// ============================================

export interface EdenError {
  value: {
    message?: string;
    [key: string]: unknown;
  };
}