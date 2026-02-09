import { Elysia } from "elysia";
import { rateLimit } from "elysia-rate-limit";
import { auth } from "@api/lib/auth";
import * as userService from "@api/services/user.service";
import { AppError } from "@api/lib/errors";
import { env } from "@api/lib/env";
import { sendPasswordResetEmail } from "@api/emails";
import { prisma } from "@repo/database";
import { RATE_LIMIT } from "@api/constants";

// Better-auth plugin - mounts auth.handler directly without additional middleware
export const betterAuthPlugin = new Elysia({
  name: "better-auth",
}).all("/api/auth/*", async ({ request }) => {
  // Better-auth handles all /api/auth/* routes internally
  return auth.handler(request);
});

/**
 * Protected Auth Routes - PROTECTED endpoints
 * All routes require authentication
 * Mounted at /api/user/*
 */
export const authRoutes = new Elysia({
  prefix: "/user",
})
  .derive(async ({ request: { headers } }) => {
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw new AppError("UNAUTHORIZED", "Unauthorized", 401);
    }

    return {
      user: session.user,
      session: session.session,
    };
  })
  .get("/me", async ({ user }) => {
    const fullUser = await userService.getUserById(user.id);

    if (!fullUser) {
      throw new AppError("USER_NOT_FOUND", "User not found", 404);
    }

    return { success: true, data: fullUser };
  })
  .patch("/me", async ({ user, body }: { user: any; body: any }) => {
    const updated = await userService.updateUser(user.id, body);
    return { success: true, data: updated };
  })
  .delete("/me", async ({ user }) => {
    await userService.deleteUser(user.id);
    return { success: true, message: "Account deleted successfully" };
  });
