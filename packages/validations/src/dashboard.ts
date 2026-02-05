import { z } from "zod";

export const dashboardStatsSchema = z.object({
  totalUsers: z.number(),
  totalProducts: z.number(),
  totalOrders: z.number(),
  totalRevenue: z.number(),
  activeSubscriptions: z.number(),
  newUsersThisMonth: z.number(),
  revenueThisMonth: z.number(),
});

export type DashboardStatsOutput = z.infer<typeof dashboardStatsSchema>;

export const recentActivitySchema = z.object({
  recentOrders: z.array(
    z.object({
      id: z.string(),
      amount: z.number(),
      status: z.string(),
      createdAt: z.date(),
      user: z.object({
        name: z.string().nullable(),
        email: z.string(),
      }),
      product: z.object({
        name: z.string(),
      }),
    }),
  ),
  recentUsers: z.array(
    z.object({
      id: z.string(),
      name: z.string().nullable(),
      email: z.string(),
      createdAt: z.date(),
    }),
  ),
});

export type RecentActivityOutput = z.infer<typeof recentActivitySchema>;

export const activityQuerySchema = z.object({
  limit: z.string().optional(),
});

export type ActivityQueryInput = z.infer<typeof activityQuerySchema>;
