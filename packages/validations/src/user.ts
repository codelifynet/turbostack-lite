import { z } from "zod";

// ============================================
// User Profile Schema
// ============================================
export const userProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  avatar: z.string().url("Invalid URL").optional().nullable(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;

// ============================================
// User Create Schema (Admin)
// ============================================
export const userCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]).default("USER"),
  image: z.string().url("Invalid URL").optional().nullable(),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;

// ============================================
// User Update Schema (Admin)
// ============================================
export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
  role: z.enum(["USER", "ADMIN", "SUPER_ADMIN"]).optional(),
  avatar: z.string().url("Invalid URL").optional().nullable(),
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;

// ============================================
// Change Password Schema
// ============================================
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

// ============================================
// User ID Param Schema
// ============================================
export const userIdSchema = z.object({
  id: z.string().min(1, "User ID is required"),
});

export type UserIdInput = z.infer<typeof userIdSchema>;

// ============================================
// User Entity Schema (Output)
// ============================================
export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.string().optional(),
  bio: z.string().nullable().optional(),
  skills: z.array(z.string()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserOutput = z.infer<typeof userSchema>;

// ============================================
// User Query Schema
// ============================================
export const userQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  role: z.string().optional(),
});

export type UserQueryInput = z.infer<typeof userQuerySchema>;
