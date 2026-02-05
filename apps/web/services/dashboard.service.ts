import { baseApi } from "@/lib/api";
import type { ApiResponse } from "./types";
import type {
  DashboardStatsFrontend as DashboardStats,
  RecentActivityFrontend as RecentActivity,
} from "@repo/types";

export const dashboardService = {
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      const { data, error } = await baseApi.dashboard.stats.get();

      if (error) {
        return {
          success: false,
          error: "Request failed",
          message: String(error.value) || "Failed to fetch dashboard stats",
        };
      }

      return {
        success: true,
        data: (data as any).data as DashboardStats,
      };
    } catch {
      return {
        success: false,
        error: "Network Error",
        message: "Failed to connect to server",
      };
    }
  },

  async getRecentActivity(
    limit?: number,
  ): Promise<ApiResponse<RecentActivity[]>> {
    try {
      const { data, error } = await baseApi.dashboard.activity.get({
        query: {
          limit: limit?.toString(),
        },
      });

      if (error) {
        return {
          success: false,
          error: "Request failed",
          message: String(error.value) || "Failed to fetch recent activity",
        };
      }

      return {
        success: true,
        data: (data as any).data as RecentActivity[],
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
