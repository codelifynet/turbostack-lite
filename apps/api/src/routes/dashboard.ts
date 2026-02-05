import { Elysia, t } from "elysia";
import * as dashboardService from "@backend/services/dashboard.service";
import { requireAdmin, successResponse } from "@backend/lib/route-helpers";
import {
  DashboardStatsSchema,
  RecentActivitySchema,
  ActivityQuerySchema,
} from "@repo/types";
import { PAGINATION } from "@backend/constants";

export const dashboardRoutes = new Elysia({ prefix: "/dashboard" })
  .derive(async ({ request: { headers } }) => {
    const session = await requireAdmin(headers);
    return { user: session.user, session: session.session };
  })

  .get(
    "/stats",
    async () => {
      const stats = await dashboardService.getDashboardStats();
      return successResponse(stats);
    },
    {
      detail: {
        tags: ["Dashboard"],
        summary: "Get dashboard statistics",
        description: "Returns aggregated statistics for the admin dashboard",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          totalUsers: t.Number(),
          totalProducts: t.Number(),
          totalOrders: t.Number(),
          totalRevenue: t.Number(),
          revenueThisMonth: t.Number(),
          activeSubscriptions: t.Number(),
          newUsersThisMonth: t.Number(),
        }),
      }),
    },
  )

  .get(
    "/activity",
    async ({ query }) => {
      const limit = query.limit
        ? parseInt(query.limit)
        : PAGINATION.DEFAULT_LIMIT;
      const activity = await dashboardService.getRecentActivity(limit);
      return successResponse(activity);
    },
    {
      query: t.Object({ limit: t.Optional(t.String()) }), // ActivityQuerySchema replacement
      detail: {
        tags: ["Dashboard"],
        summary: "Get recent activity",
        description: "Returns recent orders and user signups",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          recentUsers: t.Array(
            t.Object({
              id: t.String(),
              name: t.Union([t.String(), t.Null()]),
              email: t.String(),
              createdAt: t.Date(),
            }),
          ),
          recentOrders: t.Array(t.Any()), // Placeholder until Order type is defined
        }),
      }),
    },
  );
