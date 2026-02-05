import { baseApi } from "@/lib/api";
import type { ApiResponse } from "./types";
import type { SystemInfo } from "@repo/types";

export const systemService = {
  async getSystemStats(): Promise<ApiResponse<SystemInfo>> {
    try {
      const { data, error } = await baseApi.system.stats.get();

      if (error) {
        return {
          success: false,
          error: "Request failed",
          message: String(error.value) || "Failed to fetch system stats",
        };
      }

      const response = data as { success: boolean; data: SystemInfo };

      if (response && response.success && response.data) {
        return {
          success: true,
          data: response.data,
        };
      }
      return {
        success: false,
        error: "Invalid response",
        message: "Invalid system stats response format",
      };
    } catch (err) {
      console.error("System stats error:", err);
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },
};
