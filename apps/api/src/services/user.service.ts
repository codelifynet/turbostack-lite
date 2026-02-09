import { prisma } from "@repo/database";
import type { User, UserSettings } from "@repo/database";
import { AppError } from "@api/lib/errors";
import { generateRandomPassword } from "@api/lib/utils";
import type {
  UserListParams,
  CreateUserData,
  UpdateUserData,
  UpdateUserSettingsData,
} from "@repo/types";
import { hashPassword } from "better-auth/crypto";

export const getAllUsers = async (
  params: UserListParams = {},
): Promise<{ users: User[]; total: number; page: number; limit: number }> => {
  const { page = 1, limit = 20, search, role } = params;
  const skip = (page - 1) * limit;

  try {
    const where: any = {
      // Exclude SUPER_ADMIN users from the list
      role: { not: "SUPER_ADMIN" },
    };

    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role) {
      // Prevent filtering by SUPER_ADMIN
      if (role !== "SUPER_ADMIN") {
        where.role = role;
      }
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          role: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { users: users as any, total, page, limit };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new AppError("USERS_FETCH_ERROR", "Failed to fetch users", 500);
  }
};

export const getUserCount = async (): Promise<number> => {
  try {
    return await prisma.user.count();
  } catch (error) {
    console.error("Error counting users:", error);
    throw new AppError("USER_COUNT_ERROR", "Failed to count users", 500);
  }
};

export const updateProfileImage = async (
  userId: string,
  imageUrl: string | null,
): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    throw new AppError(
      "IMAGE_UPDATE_ERROR",
      "Failed to update profile image",
      500,
    );
  }
};

export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        settings: true,
      },
    });

    // Prevent viewing SUPER_ADMIN users
    if (user && user.role === "SUPER_ADMIN") {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new AppError("USER_FETCH_ERROR", "Failed to fetch user", 500);
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        settings: true,
      },
    });

    // Prevent viewing SUPER_ADMIN users
    if (user && user.role === "SUPER_ADMIN") {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new AppError("USER_FETCH_ERROR", "Failed to fetch user", 500);
  }
};

export const createUser = async (data: CreateUserData): Promise<User> => {
  try {
    const hashedPassword = await hashPassword(data.password!);

    return await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: data.email,
          name: data.name,
          image: data.image,
          settings: {
            create: {},
          },
        },
        include: {
          settings: true,
        },
      });

      if (data.password) {
        await tx.account.create({
          data: {
            accountId: newUser.id,
            providerId: "credential",
            userId: newUser.id,
            password: hashedPassword,
          },
        });
      }

      return newUser;
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new AppError("USER_CREATE_ERROR", "Failed to create user", 500);
  }
};

export const adminCreateUser = async (data: {
  email: string;
  name: string;
  role: "USER" | "ADMIN";
  password: string;
  image?: string | null;
}): Promise<{ user: User; password: string }> => {
  try {
    // Prevent creating SUPER_ADMIN users
    if (data.role === ("SUPER_ADMIN" as any)) {
      throw new AppError("FORBIDDEN", "Cannot create SUPER_ADMIN users", 403);
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new AppError(
        "EMAIL_EXISTS",
        "A user with this email already exists",
        400,
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: data.email,
          name: data.name,
          role: data.role,
          emailVerified: true,
          settings: {
            create: {},
          },
        },
        include: {
          settings: true,
        },
      });

      await tx.account.create({
        data: {
          accountId: newUser.id,
          providerId: "credential",
          userId: newUser.id,
          password: hashedPassword,
        },
      });

      return newUser;
    });

    return {
      user,
      password: data.password,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("Error creating user:", error);
    throw new AppError("USER_CREATE_ERROR", "Failed to create user", 500);
  }
};

export const verifyUserEmail = async (userId: string): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: true,
      },
    });
  } catch (error) {
    console.error("Error verifying user email:", error);
    throw new AppError("VERIFY_ERROR", "Failed to verify user email", 500);
  }
};

export const unverifyUserEmail = async (userId: string): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: false,
      },
    });
  } catch (error) {
    console.error("Error unverifying user email:", error);
    throw new AppError("UNVERIFY_ERROR", "Failed to unverify user email", 500);
  }
};

export const updateUser = async (
  userId: string,
  data: UpdateUserData,
): Promise<User> => {
  try {
    // Check if user is SUPER_ADMIN
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (existingUser?.role === "SUPER_ADMIN") {
      throw new AppError("FORBIDDEN", "Cannot modify SUPER_ADMIN users", 403);
    }

    // Prevent setting role to SUPER_ADMIN
    if (data.role === "SUPER_ADMIN") {
      throw new AppError("FORBIDDEN", "Cannot set role to SUPER_ADMIN", 403);
    }

    return await prisma.user.update({
      where: { id: userId },
      data,
      include: {
        settings: true,
      },
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("Error updating user:", error);
    throw new AppError("USER_UPDATE_ERROR", "Failed to update user", 500);
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  try {
    // Check if user is SUPER_ADMIN
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (existingUser?.role === "SUPER_ADMIN") {
      throw new AppError("FORBIDDEN", "Cannot delete SUPER_ADMIN users", 403);
    }

    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("Error deleting user:", error);
    throw new AppError("USER_DELETE_ERROR", "Failed to delete user", 500);
  }
};

export const getUserSettings = async (
  userId: string,
): Promise<UserSettings> => {
  try {
    let settings = await prisma.userSettings.findUnique({
      where: { userId },
    });

    if (!settings) {
      settings = await prisma.userSettings.create({
        data: { userId },
      });
    }

    return settings;
  } catch (error) {
    console.error("Error fetching user settings:", error);
    throw new AppError(
      "SETTINGS_FETCH_ERROR",
      "Failed to fetch user settings",
      500,
    );
  }
};

export const updateUserSettings = async (
  userId: string,
  data: UpdateUserSettingsData,
): Promise<UserSettings> => {
  try {
    await getUserSettings(userId);

    return await prisma.userSettings.update({
      where: { userId },
      data,
    });
  } catch (error) {
    console.error("Error updating user settings:", error);
    throw new AppError(
      "SETTINGS_UPDATE_ERROR",
      "Failed to update user settings",
      500,
    );
  }
};

export const isEmailTaken = async (
  email: string,
  excludeUserId?: string,
): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) return false;
    if (excludeUserId && user.id === excludeUserId) return false;

    return true;
  } catch (error) {
    console.error("Error checking email:", error);
    throw new AppError("EMAIL_CHECK_ERROR", "Failed to check email", 500);
  }
};

// getUserWithSubscriptions removed - Subscription model not in schema
