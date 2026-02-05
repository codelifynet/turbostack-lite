// Generic API Response wrapper type
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Paginated Response type
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  meta: {
    total: number;
    totalPages: number;
  };
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  image: string | null;
  emailVerified: boolean;
  emailVerifiedAt: string | null;
  bio?: string | null;
  skills?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  primaryColor?: string | null;
  primaryForeground?: string | null;
  secondaryColor?: string | null;
  secondaryForeground?: string | null;
}

export interface UserSettingsWithId extends UserSettings {
  id: string;
  userId: string;
}

// Media types - Re-export from @repo/types
export type { MediaFile } from "@repo/types";

export interface MediaUploadSettings {
  maxFileSize: number; // in MB
  maxFileCount: number;
  allowedMimeTypes: string[];
}

// System types - Re-export from @repo/types
export type { SystemInfo } from "@repo/types";
