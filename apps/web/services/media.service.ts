import { apiClient } from "@/lib/api";
import type { ApiResponse } from "./types";
import type { MediaFile, MediaListResponse } from "@repo/types";

export const mediaService = {
  async listFiles(params?: {
    limit?: number;
    offset?: number;
  }): Promise<ApiResponse<MediaListResponse>> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.set("limit", params.limit.toString());
      if (params?.offset) queryParams.set("offset", params.offset.toString());

      const queryString = queryParams.toString();
      const url = `/api/media${queryString ? `?${queryString}` : ""}`;

      const response = await apiClient.get<{
        success: boolean;
        data?: MediaFile[];
        pagination?: {
          limit: number;
          offset: number;
          hasMore: boolean;
        };
        error?: string;
        message?: string;
      }>(url);

      if (!response.success) {
        return {
          success: false,
          error: response.error || "Failed to fetch media",
          message: response.message,
        };
      }

      return {
        success: true,
        data: {
          files: response.data || [],
          pagination: response.pagination || {
            limit: params?.limit || 50,
            offset: params?.offset || 0,
            hasMore: false,
          },
        },
      };
    } catch (error) {
      console.error("Error fetching media:", error);
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },
  async deleteFile(key: string): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.delete<{
        success: boolean;
        message?: string;
        error?: string;
      }>(`/api/media/${key}`);

      if (!response || !response.success) {
        return {
          success: false,
          error: response?.error || "Failed to delete file",
          message: response?.message,
        };
      }

      return {
        success: true,
        data: undefined,
        message: response.message || "File deleted successfully",
      };
    } catch (error) {
      console.error("Error deleting file:", error);
      return {
        success: false,
        error: "Network Error",
        message: "Failed to delete file",
      };
    }
  },

  async uploadFiles(
    files: File[],
    onProgress?: (progress: number) => void,
  ): Promise<ApiResponse<MediaFile[]>> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      onProgress?.(10);

      const response = await fetch(`/api/uploadthing`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      onProgress?.(50);

      const data = await response.json();

      onProgress?.(100);

      if (!response.ok || !Array.isArray(data)) {
        return {
          success: false,
          error: data?.error || "Failed to upload files",
          message: data?.message,
        };
      }

      return {
        success: true,
        data: data.map((file: any) => ({
          key: file.key,
          name: file.name,
          size: file.size,
          url: file.url,
          type: file.type || "image/unknown",
          uploadedAt: Date.now(),
        })),
      };
    } catch (error) {
      console.error("Error uploading files:", error);
      return {
        success: false,
        error: "Network Error",
        message: "Failed to upload files",
      };
    }
  },
};
