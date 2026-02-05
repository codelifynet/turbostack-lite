import { baseApi, apiClient } from "@/lib/api";
import type {
  ApiResponse,
  User,
  PaginatedResponse,
  UserSettings,
  UserSettingsWithId,
} from "./types";

export const userService = {
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const { data, error } = await baseApi.users.get({
        query: {
          page: params?.page?.toString(),
          limit: params?.limit?.toString(),
          search: params?.search,
          role: params?.role,
        },
      });

      if (error) {
        return {
          success: false,
          error: "Request failed",
          message: String(error.value) || "Failed to fetch users",
        };
      }

      return {
        success: true,
        data: data as unknown as PaginatedResponse<User>,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await baseApi.users({ id }).get();

      if (error) {
        return {
          success: false,
          error: "Request failed",
          message: String(error.value) || "Failed to fetch user",
        };
      }

      const response = data as unknown as { success: boolean; data: User };
      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async createUser(body: {
    name: string;
    email: string;
    role: "USER" | "ADMIN" | "SUPER_ADMIN";
    password: string;
  }): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        data?: User;
        message?: string;
        error?: string;
      }>("/api/users/create", body);

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to create user",
        };
      }

      return {
        success: true,
        data: response.data as User,
        message: response.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async generatePassword(): Promise<ApiResponse<{ password: string }>> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data?: { password: string };
        error?: string;
      }>("/api/users/generate-password");

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: "Failed to generate password",
        };
      }

      return {
        success: true,
        data: response.data as { password: string },
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async sendPasswordReset(userId: string): Promise<ApiResponse<void>> {
    try {
      const { data, error } = await baseApi
        .users({ id: userId })
        ["send-password-reset"].post();

      if (error) {
        const errorData = error.value as any;
        return {
          success: false,
          error: errorData?.error || "Request failed",
          message: errorData?.message || "Failed to send password reset email",
        };
      }

      return {
        success: true,
        data: undefined,
        message: (data as any)?.message || "Password reset email sent",
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async verifyEmail(userId: string): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await baseApi
        .users({ id: userId })
        ["verify-email"].post();

      if (error) {
        const errorData = error.value as any;
        return {
          success: false,
          error: errorData?.error || "Request failed",
          message: errorData?.message || "Failed to verify email",
        };
      }

      return {
        success: true,
        data: (data as any)?.data as User,
        message: (data as any)?.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async unverifyEmail(userId: string): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await baseApi
        .users({ id: userId })
        ["unverify-email"].post();

      if (error) {
        const errorData = error.value as any;
        return {
          success: false,
          error: errorData?.error || "Request failed",
          message: errorData?.message || "Failed to unverify email",
        };
      }

      return {
        success: true,
        data: (data as any)?.data as User,
        message: (data as any)?.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async updateUser(
    id: string,
    body: Partial<{
      name: string;
      email: string;
      role: "USER" | "ADMIN";
    }>,
  ): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.patch<{
        success: boolean;
        data?: User;
        message?: string;
        error?: string;
      }>(`/api/users/${id}`, body);

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to update user",
        };
      }

      return {
        success: true,
        data: response.data as User,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete<{
        success: boolean;
        message?: string;
        error?: string;
      }>(`/api/users/${id}`);

      if (!response || !response.success) {
        return {
          success: false,
          error: response?.error || "Request failed",
          message: response?.message || "Failed to delete user",
        };
      }

      return {
        success: true,
        data: undefined,
        message: response.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async getProfile(): Promise<ApiResponse<User>> {
    try {
      const { data, error } = await baseApi.profile.get();

      if (error) {
        return {
          success: false,
          error: "Request failed",
          message: String(error.value) || "Failed to get profile",
        };
      }

      return {
        success: true,
        data: (data as any).data as User,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to get profile",
      };
    }
  },

  async updateProfile(body: {
    name?: string;
    email?: string;
    bio?: string | null;
    skills?: string[];
  }): Promise<ApiResponse<User>> {
    try {
      console.log("[updateProfile] Sending request with body:", body);

      // Use apiClient instead of eden treaty for better control
      const response = await apiClient.patch<{
        success: boolean;
        data?: User;
        message?: string;
        error?: string;
      }>("/api/profile", body);

      console.log("[updateProfile] Response:", response);

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to update profile",
        };
      }

      return {
        success: true,
        data: response.data as User,
      };
    } catch (err) {
      console.error("[updateProfile] Catch error:", err);
      return {
        success: false,
        error: "Network Error",
        message: "Failed to update profile",
      };
    }
  },

  async uploadAvatar(file: File): Promise<ApiResponse<{ url: string }>> {
    try {
      const { data, error } = await baseApi.profile.avatar.post({
        avatar: file,
      });

      if (error) {
        const errorData = error.value as any;
        return {
          success: false,
          error: errorData?.error || "Upload failed",
          message: errorData?.message || "Failed to upload avatar",
        };
      }

      const result = data as any;
      return {
        success: true,
        data: result.data,
        message: result.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to upload avatar",
      };
    }
  },

  async deleteAvatar(): Promise<ApiResponse<void>> {
    try {
      const { data, error } = await baseApi.profile.avatar.delete();

      if (error) {
        const errorData = error.value as any;
        return {
          success: false,
          error: errorData?.error || "Request failed",
          message: errorData?.message || "Failed to delete avatar",
        };
      }

      return {
        success: true,
        data: undefined,
        message: (data as any)?.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to delete avatar",
      };
    }
  },

  async hasPassword(): Promise<ApiResponse<{ hasPassword: boolean }>> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data?: { hasPassword: boolean };
        error?: string;
      }>("/api/profile/has-password");

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: "Failed to check password status",
        };
      }

      return {
        success: true,
        data: response.data as { hasPassword: boolean },
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to check password status",
      };
    }
  },

  async setPassword(newPassword: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message?: string;
        error?: string;
      }>("/api/profile/set-password", { newPassword });

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to set password",
        };
      }

      return {
        success: true,
        data: undefined,
        message: response.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to set password",
      };
    }
  },

  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message?: string;
        error?: string;
      }>("/api/profile/change-password", { currentPassword, newPassword });

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to change password",
        };
      }

      return {
        success: true,
        data: undefined,
        message: response.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to change password",
      };
    }
  },

  async getUserSettings(): Promise<ApiResponse<UserSettings>> {
    try {
      const { data, error } = await baseApi.profile.settings.get();

      if (error) {
        return {
          success: false,
          error: "Request failed",
          message: String(error.value) || "Failed to get settings",
        };
      }

      const response = data as { success: boolean; data: UserSettings | null };
      // Return default settings if data is null
      const settings: UserSettings = response.data || {
        primaryColor: null,
        primaryForeground: null,
        secondaryColor: null,
        secondaryForeground: null,
      };

      return {
        success: true,
        data: settings,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to get settings",
      };
    }
  },

  async updateUserSettings(
    settings: Partial<UserSettings>,
  ): Promise<ApiResponse<UserSettingsWithId>> {
    try {
      const body: {
        primaryColor?: string | null;
        primaryForeground?: string | null;
        secondaryColor?: string | null;
        secondaryForeground?: string | null;
      } = {};

      if (settings.primaryColor !== undefined) {
        body.primaryColor = settings.primaryColor;
      }
      if (settings.primaryForeground !== undefined) {
        body.primaryForeground = settings.primaryForeground;
      }
      if (settings.secondaryColor !== undefined) {
        body.secondaryColor = settings.secondaryColor;
      }
      if (settings.secondaryForeground !== undefined) {
        body.secondaryForeground = settings.secondaryForeground;
      }

      const { data, error } = await baseApi.profile.settings.patch(body);

      if (error) {
        return {
          success: false,
          error: "Request failed",
          message: String(error.value) || "Failed to update settings",
        };
      }

      const response = data as { success: boolean; data: UserSettingsWithId };
      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to update settings",
      };
    }
  },

  async bulkDelete(
    ids: string[],
  ): Promise<ApiResponse<{ deleted: number; failed: number }>> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message?: string;
        deleted?: number;
        failed?: number;
        error?: string;
      }>("/api/users/bulk-delete", { ids });

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to delete users",
        };
      }

      return {
        success: true,
        data: { deleted: response.deleted || 0, failed: response.failed || 0 },
        message: response.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async bulkVerify(
    ids: string[],
  ): Promise<ApiResponse<{ verified: number; failed: number }>> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message?: string;
        verified?: number;
        failed?: number;
        error?: string;
      }>("/api/users/bulk-verify", { ids });

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to verify users",
        };
      }

      return {
        success: true,
        data: {
          verified: response.verified || 0,
          failed: response.failed || 0,
        },
        message: response.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async bulkUnverify(
    ids: string[],
  ): Promise<ApiResponse<{ unverified: number; failed: number }>> {
    try {
      const response = await apiClient.post<{
        success: boolean;
        message?: string;
        unverified?: number;
        failed?: number;
        error?: string;
      }>("/api/users/bulk-unverify", { ids });

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to deactivate users",
        };
      }

      return {
        success: true,
        data: {
          unverified: response.unverified || 0,
          failed: response.failed || 0,
        },
        message: response.message,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },
};
