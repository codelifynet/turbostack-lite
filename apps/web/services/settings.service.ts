import { baseApi, apiClient } from "@/lib/api";
import type { ApiResponse } from "./types";
import type {
  MediaUploadSettings,
} from "@repo/types";

export const settingsService = {
  async getMediaUploadSettings(): Promise<ApiResponse<MediaUploadSettings>> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data?: MediaUploadSettings;
        error?: string;
        message?: string;
      }>("/api/settings/media-upload");

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to get media upload settings",
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to get media upload settings",
      };
    }
  },

  async getPublicMediaUploadSettings(): Promise<
    ApiResponse<MediaUploadSettings>
  > {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data?: MediaUploadSettings;
        error?: string;
        message?: string;
      }>("/api/settings/media-upload/public");

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to get media upload settings",
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to get media upload settings",
      };
    }
  },

  async updateMediaUploadSettings(
    body: Partial<MediaUploadSettings>,
  ): Promise<ApiResponse<MediaUploadSettings>> {
    try {
      const response = await apiClient.patch<{
        success: boolean;
        data?: MediaUploadSettings;
        error?: string;
        message?: string;
      }>("/api/settings/media-upload", body);

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to update media upload settings",
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to update media upload settings",
      };
    }
  },

  // Notification Settings
  async getNotificationSettings(): Promise<
    ApiResponse<{
      emailAccountActivity: boolean;
      emailSecurityAlerts: boolean;
      emailMarketing: boolean;
      emailWeeklyDigest: boolean;
      pushBrowser: boolean;
    }>
  > {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data?: {
          emailAccountActivity: boolean;
          emailSecurityAlerts: boolean;
          emailMarketing: boolean;
          emailWeeklyDigest: boolean;
          pushBrowser: boolean;
        };
        error?: string;
        message?: string;
      }>("/api/settings/notifications");

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to get notification settings",
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to get notification settings",
      };
    }
  },

  async updateNotificationSettings(
    body: Partial<{
      emailAccountActivity: boolean;
      emailSecurityAlerts: boolean;
      emailMarketing: boolean;
      emailWeeklyDigest: boolean;
      pushBrowser: boolean;
    }>,
  ): Promise<
    ApiResponse<{
      emailAccountActivity: boolean;
      emailSecurityAlerts: boolean;
      emailMarketing: boolean;
      emailWeeklyDigest: boolean;
      pushBrowser: boolean;
    }>
  > {
    try {
      const response = await apiClient.patch<{
        success: boolean;
        data?: {
          emailAccountActivity: boolean;
          emailSecurityAlerts: boolean;
          emailMarketing: boolean;
          emailWeeklyDigest: boolean;
          pushBrowser: boolean;
        };
        error?: string;
        message?: string;
      }>("/api/settings/notifications", body);

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to update notification settings",
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to update notification settings",
      };
    }
  },

  // API Keys
  async getApiKeys(): Promise<
    ApiResponse<
      Array<{
        id: string;
        name: string;
        keyPrefix: string;
        lastUsedAt: string | null;
        expiresAt: string | null;
        isActive: boolean;
        createdAt: string;
      }>
    >
  > {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data?: Array<{
          id: string;
          name: string;
          keyPrefix: string;
          lastUsedAt: string | null;
          expiresAt: string | null;
          isActive: boolean;
          createdAt: string;
        }>;
        error?: string;
        message?: string;
      }>("/api/settings/api-keys");

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to get API keys",
        };
      }

      return {
        success: true,
        data: response.data || [],
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to get API keys",
      };
    }
  },

  async createApiKey(data: {
    name: string;
    expiresAt?: string | null;
  }): Promise<
    ApiResponse<{
      id: string;
      name: string;
      keyPrefix: string;
      fullKey: string;
      expiresAt: string | null;
      isActive: boolean;
      createdAt: string;
    }>
  > {
    try {
      const response = await apiClient.post<{
        success: boolean;
        data?: {
          id: string;
          name: string;
          keyPrefix: string;
          fullKey: string;
          expiresAt: string | null;
          isActive: boolean;
          createdAt: string;
        };
        error?: string;
        message?: string;
      }>("/api/settings/api-keys", data);

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to create API key",
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to create API key",
      };
    }
  },

  async deleteApiKey(keyId: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.delete<{
        success: boolean;
        data?: { message: string };
        error?: string;
        message?: string;
      }>(`/api/settings/api-keys/${keyId}`);

      if (!response || !response.success) {
        return {
          success: false,
          error: response?.error || "Request failed",
          message: response?.message || "Failed to delete API key",
        };
      }

      return {
        success: true,
        data: response.data || { message: "API key deleted successfully" },
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to delete API key",
      };
    }
  },

  async revokeApiKey(keyId: string): Promise<
    ApiResponse<{
      id: string;
      name: string;
      keyPrefix: string;
      lastUsedAt: string | null;
      expiresAt: string | null;
      isActive: boolean;
      createdAt: string;
    }>
  > {
    try {
      const response = await apiClient.patch<{
        success: boolean;
        data?: {
          id: string;
          name: string;
          keyPrefix: string;
          lastUsedAt: string | null;
          expiresAt: string | null;
          isActive: boolean;
          createdAt: string;
        };
        error?: string;
        message?: string;
      }>(`/api/settings/api-keys/${keyId}/revoke`);

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Request failed",
          message: response.message || "Failed to revoke API key",
        };
      }

      return {
        success: true,
        data: response.data,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to revoke API key",
      };
    }
  },
};
