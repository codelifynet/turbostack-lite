import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database";
import { env } from "@api/lib/env";
import { logger } from "@api/lib/logger";
import { sendVerificationEmail, sendPasswordResetEmail } from "../emails";

/**
 * Better Auth Configuration
 * Main authentication instance with Prisma adapter, email/password, and OAuth providers
 */
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  basePath: "/api/auth", // Better Auth endpoints at /api/auth/*

  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },

  // Email and Password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: false,

    // Send password reset email
    sendResetPassword: async ({ user, url, token }, request) => {
      const resetPasswordUrl = `${env.FRONTEND_URL}/reset-password?token=${token}&email=${encodeURIComponent(user.email)}`;
      logger.info({ email: user.email }, "Sending password reset email");
      try {
        await sendPasswordResetEmail({
          to: user.email,
          url: resetPasswordUrl,
          token,
          userName: user.name || undefined,
        });
        logger.info({ email: user.email }, "Password reset email sent successfully");
      } catch (error) {
        logger.error({ err: error, email: user.email }, "Failed to send password reset email");
      }
    },

    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },

  // Email verification
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;
      logger.info({ email: user.email }, "Sending verification email");
      try {
        await sendVerificationEmail({
          to: user.email,
          url: verificationUrl,
          token,
          userName: user.name || undefined,
        });
        logger.info({ email: user.email }, "Verification email sent successfully");
      } catch (error) {
        logger.error({ err: error, email: user.email }, "Failed to send verification email");
      }
    },
    sendVerificationOnSignUp: true,
  },

  // Social OAuth Providers
  socialProviders: {
    // Google OAuth
    google: {
      clientId: env.GOOGLE_CLIENT_ID || "",
      clientSecret: env.GOOGLE_CLIENT_SECRET || "",
      // Callback URL: {baseURL}/api/auth/callback/google
    },
    // GitHub OAuth
    github: {
      clientId: env.GITHUB_CLIENT_ID || "",
      clientSecret: env.GITHUB_CLIENT_SECRET || "",
      // Callback URL: {baseURL}/api/auth/callback/github
    },
  },

  // Session configuration
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (updates session if older than this)
    cookieName: "turbostack_session",
  },

  // Base URL for email links and OAuth callbacks
  baseURL: env.BETTER_AUTH_URL || env.FRONTEND_URL,

  // Trusted origins for CORS
  trustedOrigins: [env.FRONTEND_URL],

  // Advanced options
  advanced: {
    generateId: false, // Use Prisma's default cuid()
    crossSubDomainCookies: {
      enabled: false,
    },
  },
});

/**
 * Auth handler type for Elysia routes
 */
export type Auth = typeof auth;