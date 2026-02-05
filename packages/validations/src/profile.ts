import { z } from "zod";

export const settingsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  primaryColor: z.string().nullable(),
  primaryForeground: z.string().nullable(),
  secondaryColor: z.string().nullable(),
  secondaryForeground: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SettingsOutput = z.infer<typeof settingsSchema>;

export const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().nullable().optional(),
  skills: z.array(z.string()).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const updateSettingsSchema = z.object({
  primaryColor: z.string().nullable().optional(),
  primaryForeground: z.string().nullable().optional(),
  secondaryColor: z.string().nullable().optional(),
  secondaryForeground: z.string().nullable().optional(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;

export const uploadAvatarSchema = z.object({
  avatar: z.any(),
});

export type UploadAvatarInput = z.infer<typeof uploadAvatarSchema>;
