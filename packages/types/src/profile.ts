import { z } from "zod";
import {
  settingsSchema,
  updateProfileSchema,
  updateSettingsSchema,
  uploadAvatarSchema,
} from "@repo/validations/profile";
import { changePasswordSchema } from "@repo/validations/user";

export const SettingsSchema = settingsSchema;
export type Settings = z.infer<typeof settingsSchema>;

// ============================================
// User Settings Types (Frontend compatible)
// ============================================

export interface UserSettings {
  primaryColor: string | null;
  primaryForeground: string | null;
  secondaryColor: string | null;
  secondaryForeground: string | null;
}

export interface UserSettingsWithId extends UserSettings {
  id: string;
  userId: string;
}

export const UpdateProfileSchema = updateProfileSchema;
export type UpdateProfile = z.infer<typeof updateProfileSchema>;

export const ChangePasswordSchema = changePasswordSchema;
export type ChangePassword = z.infer<typeof changePasswordSchema>;

export const UpdateSettingsSchema = updateSettingsSchema;
export type UpdateSettings = z.infer<typeof updateSettingsSchema>;

export const UploadAvatarSchema = uploadAvatarSchema;
export type UploadAvatar = z.infer<typeof uploadAvatarSchema>;