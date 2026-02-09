import { Elysia, t } from "elysia";
import * as userService from "@api/services/user.service";
import * as uploadService from "@api/services/upload.service";
import { getSession } from "@api/lib/route-helpers";
import { AppError } from "@api/lib/errors";
import { prisma } from "@repo/database";
import { verifyPassword, hashPassword } from "better-auth/crypto";

import {
  SettingsSchema,
  UpdateProfileSchema,
  UpdateSettingsSchema,
  ChangePasswordSchema,
} from "@repo/types";
import { UserSchema } from "@repo/types";

export const profileRoutes = new Elysia({ prefix: "/profile" })
  .derive(async ({ request: { headers } }) => {
    const session = await getSession(headers);
    return { user: session.user, session: session.session };
  })

  .get(
    "/",
    async ({ user }) => {
      const fullUser = await userService.getUserById(user.id);
      if (!fullUser) {
        throw new AppError("USER_NOT_FOUND", "User not found", 404);
      }
      return { success: true, data: fullUser };
    },
    {
      detail: {
        tags: ["Profile"],
        summary: "Get current user profile",
        description: "Returns the authenticated user's profile with settings",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          id: t.String(),
          email: t.String(),
          name: t.Union([t.String(), t.Null()]),
          role: t.String(),
          image: t.Union([t.String(), t.Null()]),
          emailVerified: t.Boolean(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          settings: t.Optional(t.Any()), // Keeping settings loose for now as it depends on relation
        }),
      }),
    },
  )

  .patch(
    "/",
    async ({ user, body }) => {
      console.log("[PATCH /api/profile] User ID:", user.id);
      console.log(
        "[PATCH /api/profile] Body received:",
        JSON.stringify(body, null, 2),
      );
      if (body.email && body.email !== user.email) {
        const isTaken = await userService.isEmailTaken(body.email, user.id);
        if (isTaken) {
          throw new AppError("EMAIL_TAKEN", "Email is already in use", 400);
        }
      }

      // Convert null to undefined for the service
      const updateData = {
        ...body,
        image: body.image ?? undefined,
        bio: body.bio ?? undefined,
      };

      const updatedUser = await userService.updateUser(user.id, updateData);
      console.log(
        "[PATCH /api/profile] Updated user:",
        JSON.stringify(updatedUser, null, 2),
      );
      return { success: true, data: updatedUser };
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        email: t.Optional(t.String()),
        bio: t.Optional(t.Union([t.String(), t.Null()])),
        skills: t.Optional(t.Array(t.String())),
        image: t.Optional(t.Union([t.String(), t.Null()])),
      }),
      detail: {
        tags: ["Profile"],
        summary: "Update profile",
        description: "Updates the current user's profile information",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          id: t.String(),
          email: t.String(),
          name: t.Union([t.String(), t.Null()]),
          role: t.String(),
          image: t.Union([t.String(), t.Null()]),
          emailVerified: t.Boolean(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        }),
      }),
    },
  )

  .post(
    "/avatar",
    async ({ user, body }) => {
      const file = body.avatar;

      if (!file) {
        throw new AppError("NO_FILE", "No file provided", 400);
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        throw new AppError(
          "INVALID_FILE_TYPE",
          "Only JPEG, PNG, GIF, and WebP images are allowed",
          400,
        );
      }

      const maxSize = 4 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new AppError(
          "FILE_TOO_LARGE",
          "File size must be less than 4MB",
          400,
        );
      }

      const currentUser = await userService.getUserById(user.id);
      if (currentUser?.image) {
        try {
          await uploadService.deleteProfileImage(user.id);
        } catch (error) {
          console.error("Error deleting old avatar:", error);
        }
      }

      const result = await uploadService.uploadProfileImage(file, user.id);

      return {
        success: true,
        data: {
          url: result.url,
          message: "Avatar uploaded successfully",
        },
      };
    },
    {
      body: t.Object({
        avatar: t.File(),
      }),
      detail: {
        tags: ["Profile"],
        summary: "Upload avatar",
        description:
          "Uploads a new profile avatar. Image will be optimized and converted to WebP.",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          url: t.String(),
          message: t.String(),
        }),
      }),
    },
  )

  .delete(
    "/avatar",
    async ({ user }) => {
      await uploadService.deleteProfileImage(user.id);
      return { success: true, message: "Avatar removed successfully" };
    },
    {
      detail: {
        tags: ["Profile"],
        summary: "Remove avatar",
        description: "Removes the current user's profile avatar",
      },
      response: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
    },
  )

  .get(
    "/has-password",
    async ({ user }) => {
      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
          providerId: "credential",
        },
      });

      return {
        success: true,
        data: {
          hasPassword: !!account?.password,
        },
      };
    },
    {
      detail: {
        tags: ["Profile"],
        summary: "Check if user has password",
        description:
          "Checks if the user has a credential account with password set",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          hasPassword: t.Boolean(),
        }),
      }),
    },
  )

  .post(
    "/set-password",
    async ({ user, body }) => {
      const { newPassword } = body;

      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: user.id,
          providerId: "credential",
        },
      });

      if (existingAccount?.password) {
        throw new AppError(
          "PASSWORD_EXISTS",
          "You already have a password set. Use change password instead.",
          400,
        );
      }

      const hashedPassword = await hashPassword(newPassword);

      if (existingAccount) {
        await prisma.account.update({
          where: { id: existingAccount.id },
          data: { password: hashedPassword },
        });
      } else {
        await prisma.account.create({
          data: {
            accountId: user.id,
            providerId: "credential",
            userId: user.id,
            password: hashedPassword,
          },
        });
      }

      return { success: true, message: "Password set successfully" };
    },
    {
      body: t.Object({
        newPassword: t.String({ minLength: 8 }),
      }),
      detail: {
        tags: ["Profile"],
        summary: "Set password",
        description: "Sets a password for OAuth users who don't have one",
      },
      response: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
    },
  )

  .post(
    "/change-password",
    async ({ user, body }) => {
      const { currentPassword, newPassword } = body;

      const account = await prisma.account.findFirst({
        where: {
          userId: user.id,
          providerId: "credential",
        },
      });

      if (!account || !account.password) {
        throw new AppError(
          "NO_PASSWORD",
          "No password set for this account. Use 'Set Password' instead.",
          400,
        );
      }

      const isValid = await verifyPassword({
        hash: account.password,
        password: currentPassword,
      });

      if (!isValid) {
        throw new AppError(
          "INVALID_PASSWORD",
          "Current password is incorrect",
          400,
        );
      }

      const hashedPassword = await hashPassword(newPassword);

      await prisma.account.update({
        where: { id: account.id },
        data: { password: hashedPassword },
      });

      return { success: true, message: "Password changed successfully" };
    },
    {
      body: t.Object({
        currentPassword: t.String(),
        newPassword: t.String({ minLength: 8 }),
      }),
      detail: {
        tags: ["Profile"],
        summary: "Change password",
        description:
          "Changes the user's password after verifying current password",
      },
      response: t.Object({
        success: t.Boolean(),
        message: t.String(),
      }),
    },
  )

  .get(
    "/settings",
    async ({ user }) => {
      const settings = await userService.getUserSettings(user.id);
      return { success: true, data: settings };
    },
    {
      detail: {
        tags: ["Profile"],
        summary: "Get user settings",
        description: "Returns the user's settings (theme colors, etc.)",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          id: t.String(),
          userId: t.String(),
          primaryColor: t.Union([t.String(), t.Null()]),
          primaryForeground: t.Union([t.String(), t.Null()]),
          secondaryColor: t.Union([t.String(), t.Null()]),
          secondaryForeground: t.Union([t.String(), t.Null()]),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        }),
      }),
    },
  )

  .patch(
    "/settings",
    async ({ user, body }) => {
      const settings = await userService.updateUserSettings(user.id, body);
      return { success: true, data: settings };
    },
    {
      body: t.Object({
        primaryColor: t.Optional(t.Union([t.String(), t.Null()])),
        primaryForeground: t.Optional(t.Union([t.String(), t.Null()])),
        secondaryColor: t.Optional(t.Union([t.String(), t.Null()])),
        secondaryForeground: t.Optional(t.Union([t.String(), t.Null()])),
      }),
      detail: {
        tags: ["Profile"],
        summary: "Update user settings",
        description: "Updates the user's settings (theme colors, etc.)",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          id: t.String(),
          userId: t.String(),
          primaryColor: t.Union([t.String(), t.Null()]),
          primaryForeground: t.Union([t.String(), t.Null()]),
          secondaryColor: t.Union([t.String(), t.Null()]),
          secondaryForeground: t.Union([t.String(), t.Null()]),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        }),
      }),
    },
  );
