import { prisma } from "@repo/database";
import { AppError } from "@backend/lib/errors";
import type { DashboardStats, RecentActivity } from "@repo/types";

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [totalUsers, newUsersThisMonth] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: startOfMonth } },
      }),
    ]);

    return {
      totalUsers,
      totalProducts: 0, // Product model removed from schema
      totalOrders: 0, // Order model removed from schema
      totalRevenue: 0,
      revenueThisMonth: 0,
      activeSubscriptions: 0, // Subscription model removed from schema
      newUsersThisMonth,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw new AppError(
      "DASHBOARD_ERROR",
      "Failed to fetch dashboard stats",
      500
    );
  }
};

export const getRecentActivity = async (
  limit = 10
): Promise<RecentActivity> => {
  try {
    const [recentUsers] = await Promise.all([
      prisma.user.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
      [],
    ]);

    return {
      recentUsers,
      recentOrders: [],
    };
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    throw new AppError(
      "DASHBOARD_ERROR",
      "Failed to fetch recent activity",
      500
    );
  }
};
