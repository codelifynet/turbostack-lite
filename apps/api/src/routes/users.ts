import { Elysia, t } from "elysia";
import * as userService from "@backend/services/user.service";
import { auth } from "@backend/lib/auth";
import { AppError } from "@backend/lib/errors";
import { generateRandomPassword } from "@backend/lib/utils";
import { sendWelcomeEmail } from "@backend/emails";
import { env } from "@backend/lib/env";
import { PAGINATION } from "@backend/constants";
import { requireAdmin, getSession } from "@backend/lib/route-helpers";

export const usersRoutes = new Elysia({ prefix: "/users" })
  .derive(async ({ request: { headers } }) => {
    const session = await getSession(headers);
    return { user: session?.user };
  })
  .get(
    "/",
    async ({ query, request: { headers } }) => {
      await requireAdmin(headers);
      const params = {
        page: query.page ? parseInt(query.page) : PAGINATION.DEFAULT_PAGE,
        limit: query.limit ? parseInt(query.limit) : PAGINATION.DEFAULT_LIMIT,
        search: query.search,
        role: query.role as any,
      };
      const result = await userService.getAllUsers(params);
      return {
        success: true,
        data: result.users,
        meta: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          totalPages: Math.ceil(result.total / result.limit),
        },
      };
    },
    {
      query: t.Object({
        page: t.Optional(t.String()),
        limit: t.Optional(t.String()),
        search: t.Optional(t.String()),
        role: t.Optional(t.String()),
      }),
      detail: {
        tags: ["Users"],
        summary: "List all users",
        description: "Returns paginated list of users with filters",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Array(
          t.Object({
            id: t.String(),
            email: t.String(),
            name: t.Union([t.String(), t.Null()]),
            role: t.String(),
            image: t.Union([t.String(), t.Null()]),
            emailVerified: t.Boolean(),
            createdAt: t.Date(),
            updatedAt: t.Date(),
          }),
        ),
        meta: t.Object({
          total: t.Number(),
          page: t.Number(),
          limit: t.Number(),
          totalPages: t.Number(),
        }),
      }),
    },
  )

  .get(
    "/:id",
    async ({ params, request: { headers } }) => {
      await requireAdmin(headers);
      const user = await userService.getUserById(params.id);
      if (!user) {
        throw new AppError("USER_NOT_FOUND", "User not found", 404);
      }
      return { success: true, data: user };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["Users"],
        summary: "Get user by ID",
        description: "Returns a single user's details",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Any(), // UserSchema (Zod) replaced with t.Any()
      }),
    },
  )

  .patch(
    "/:id",
    async ({ params, body, request: { headers } }) => {
      await requireAdmin(headers);
      const user = await userService.updateUser(params.id, body as any);
      return { success: true, data: user };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.Optional(t.String()),
        email: t.Optional(t.String()),
        image: t.Optional(t.String()),
      }),
      detail: {
        tags: ["Users"],
        summary: "Update user",
        description: "Updates a user's profile information",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Any(), // UserSchema (Zod) replaced with t.Any()
      }),
    },
  )

  .delete(
    "/:id",
    async ({ params, user, request: { headers } }) => {
      await requireAdmin(headers);
      if (params.id === user?.id) {
        throw new AppError(
          "INVALID_OPERATION",
          "Cannot delete your own account from admin panel",
          400,
        );
      }
      await userService.deleteUser(params.id);
      return { success: true, message: "User deleted successfully" };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["Users"],
        summary: "Delete user",
        description: "Permanently deletes a user account",
      },
      response: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
    },
  )

  .post(
    "/bulk-delete",
    async ({ body, user, request: { headers } }) => {
      await requireAdmin(headers);
      const { ids } = body;

      if (ids.includes(user?.id || "")) {
        throw new AppError(
          "INVALID_OPERATION",
          "Cannot delete your own account",
          400,
        );
      }

      let deleted = 0;
      let failed = 0;

      for (const id of ids) {
        try {
          await userService.deleteUser(id);
          deleted++;
        } catch {
          failed++;
        }
      }

      return {
        success: true,
        message: `${deleted} users deleted${failed > 0 ? `, ${failed} failed` : ""}`,
        deleted,
        failed,
      };
    },
    {
      body: t.Object({
        ids: t.Array(t.String(), { minItems: 1 }),
      }),
      detail: {
        tags: ["Users"],
        summary: "Bulk delete users",
        description: "Delete multiple users at once",
      },
    },
  )

  .post(
    "/bulk-verify",
    async ({ body, request: { headers } }) => {
      await requireAdmin(headers);
      const { ids } = body;

      let verified = 0;
      let failed = 0;

      for (const id of ids) {
        try {
          await userService.verifyUserEmail(id);
          verified++;
        } catch {
          failed++;
        }
      }

      return {
        success: true,
        message: `${verified} users verified${failed > 0 ? `, ${failed} failed` : ""}`,
        verified,
        failed,
      };
    },
    {
      body: t.Object({
        ids: t.Array(t.String(), { minItems: 1 }),
      }),
      detail: {
        tags: ["Users"],
        summary: "Bulk verify users",
        description: "Verify multiple users' emails at once",
      },
    },
  )

  .post(
    "/bulk-unverify",
    async ({ body, request: { headers } }) => {
      await requireAdmin(headers);
      const { ids } = body;

      let unverified = 0;
      let failed = 0;

      for (const id of ids) {
        try {
          await userService.unverifyUserEmail(id);
          unverified++;
        } catch {
          failed++;
        }
      }

      return {
        success: true,
        message: `${unverified} users deactivated${failed > 0 ? `, ${failed} failed` : ""}`,
        unverified,
        failed,
      };
    },
    {
      body: t.Object({
        ids: t.Array(t.String(), { minItems: 1 }),
      }),
      detail: {
        tags: ["Users"],
        summary: "Bulk unverify users",
        description: "Unverify multiple users' emails (deactivate) at once",
      },
    },
  )

  .post(
    "/create",
    async ({ body, request: { headers } }) => {
      await requireAdmin(headers);
      const result = await userService.adminCreateUser({
        email: body.email,
        name: body.name,
        role: body.role,
        password: body.password,
      });

      const loginUrl = `${env.FRONTEND_URL}/login`;

      console.log("📧 Sending welcome email to:", result.user.email);
      try {
        await sendWelcomeEmail({
          to: result.user.email,
          userName: result.user.name || undefined,
          tempPassword: result.password,
          loginUrl,
        });
        console.log("✅ Welcome email sent successfully");
      } catch (error) {
        console.error("❌ Failed to send welcome email:", error);
      }

      return {
        success: true,
        data: result.user,
        message: "User created successfully. Welcome email sent.",
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        name: t.String({ minLength: 2 }),
        role: t.Union([t.Literal("USER"), t.Literal("ADMIN")]),
        password: t.String({ minLength: 8 }),
      }),
      detail: {
        tags: ["Users"],
        summary: "Create user (Admin)",
        description:
          "Creates a new user with specified password. Sends welcome email with credentials.",
      },
    },
  )

  .get(
    "/generate-password",
    async ({ request: { headers } }) => {
      await requireAdmin(headers);
      const password = generateRandomPassword();
      return {
        success: true,
        data: { password },
      };
    },
    {
      detail: {
        tags: ["Users"],
        summary: "Generate random password",
        description: "Generates a random secure password for new user creation",
      },
    },
  )

  .post(
    "/:id/send-password-reset",
    async ({ params, request: { headers } }) => {
      await requireAdmin(headers);
      const user = await userService.getUserById(params.id);

      if (!user) {
        throw new AppError("USER_NOT_FOUND", "User not found", 404);
      }

      try {
        console.log("📧 Triggering password reset for user:", user.email);
        const backendUrl = `http://localhost:${env.PORT}`;
        const forgetPasswordRequest = new Request(
          `${backendUrl}/api/auth/forget-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              redirectTo: `${env.FRONTEND_URL}/reset-password`,
            }),
          },
        );
        const response = await auth.handler(forgetPasswordRequest);
        console.log(
          "📧 Forget password handler response status:",
          response.status,
        );
        if (!response.ok) {
          const text = await response.text();
          console.error("❌ Forget password handler error:", text);
          throw new Error(text);
        }
      } catch (error) {
        console.error("❌ Failed to send password reset email:", error);
        throw new AppError(
          "EMAIL_SEND_ERROR",
          "Failed to send password reset email",
          500,
        );
      }

      return {
        success: true,
        message: "Password reset email sent successfully",
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["Users"],
        summary: "Send password reset email",
        description: "Sends a password reset email to the specified user",
      },
      response: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
    },
  )

  .post(
    "/:id/verify-email",
    async ({ params, request: { headers } }) => {
      await requireAdmin(headers);
      const user = await userService.verifyUserEmail(params.id);

      return {
        success: true,
        data: user,
        message: "User email verified successfully",
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["Users"],
        summary: "Verify user email",
        description: "Manually verifies a user's email address",
      },
    },
  )

  .post(
    "/:id/unverify-email",
    async ({ params, request: { headers } }) => {
      await requireAdmin(headers);
      const user = await userService.unverifyUserEmail(params.id);

      return {
        success: true,
        data: user,
        message: "User email unverified successfully",
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        tags: ["Users"],
        summary: "Unverify user email",
        description: "Removes verification status from a user's email",
      },
    },
  );
