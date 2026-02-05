import { z } from "zod";
import {
  dashboardStatsSchema,
  recentActivitySchema,
  activityQuerySchema,
} from "@repo/validations/dashboard";

export const DashboardStatsSchema = dashboardStatsSchema;
export type DashboardStats = z.infer<typeof dashboardStatsSchema>;

export const RecentActivitySchema = recentActivitySchema;
export type RecentActivity = z.infer<typeof recentActivitySchema>;

export const ActivityQuerySchema = activityQuerySchema;
export type ActivityQuery = z.infer<typeof activityQuerySchema>;

// Frontend service types (simplified versions)
export interface DashboardStatsFrontend {
  totalRevenue: number;
  subscriptions: number;
  sales: number;
  activeUsers: number;
}

export interface RecentActivityFrontend {
  id: string;
  user: string;
  action: string;
  status: "success" | "warning" | "error" | "info";
  time: string;
}