import { z } from "zod";
import {
  userSchema,
  userUpdateSchema,
  userQuerySchema,
  userCreateSchema,
  userProfileSchema,
} from "@repo/validations/user";

// Re-export zod schemas
export const UserSchema = userSchema;
export type User = z.infer<typeof userSchema>;

// Frontend-compatible User type (with string dates and specific role type)
export interface UserFrontend {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  image?: string | null;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  bio?: string | null;
  skills?: string[];
  createdAt: string;
  updatedAt: string;
}

export const UpdateUserSchema = userUpdateSchema;
export type UpdateUser = z.infer<typeof userUpdateSchema>;

export const UserQuerySchema = userQuerySchema;
export type UserQuery = z.infer<typeof userQuerySchema>;

// Service-level types
export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: "USER" | "ADMIN" | "SUPER_ADMIN";
}

export type CreateUserData = z.infer<typeof userCreateSchema>;

export interface UpdateUserData {
  name?: string;
  email?: string;
  image?: string;
  emailVerified?: boolean;
  bio?: string | null;
  skills?: string[];
  role?: "USER" | "ADMIN" | "SUPER_ADMIN";
}

export interface UpdateUserSettingsData {
  primaryColor?: string | null;
  primaryForeground?: string | null;
  secondaryColor?: string | null;
  secondaryForeground?: string | null;
}

// ============================================
// User Form Data (for frontend forms)
// ============================================

export interface UserFormData {
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  password: string;
}

// ============================================
// Frontend Panel Types
// ============================================

export interface UsersStats {
  totalUsers: number;
  newUsersToday: number;
  verifiedUsers: number;
  premiumUsers: number;
  adminUsers: number;
}

// Stats Card yapılandırması
export interface StatsCardConfig<T> {
  key: keyof T;
  title: string;
  gradient: string;
  iconColor: string;
  iconBg: string;
}