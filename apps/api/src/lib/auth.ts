import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database";
import { env } from "@backend/lib/env";
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
        required: true,
        defaultValue: "USER",
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
      console.log("📧 Sending password reset email to:", user.email);
      try {
        await sendPasswordResetEmail({
          to: user.email,
          url: resetPasswordUrl,
          token,
          userName: user.name || undefined,
        });
        console.log("✅ Password reset email sent successfully");
      } catch (error) {
        console.error("❌ Failed to send password reset email:", error);
      }
    },

    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },

  // Email verification
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;
      console.log("📧 Sending verification email to:", user.email);
      try {
        await sendVerificationEmail({
          to: user.email,
          url: verificationUrl,
          token,
          userName: user.name || undefined,
        });
        console.log("✅ Verification email sent successfully");
      } catch (error) {
        console.error("❌ Failed to send verification email:", error);
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
    },
    // GitHub OAuth
    github: {
      clientId: env.GITHUB_CLIENT_ID || "",
      clientSecret: env.GITHUB_CLIENT_SECRET || "",
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
  },

  // Base URL for email links and OAuth callbacks
  baseURL: env.BETTER_AUTH_URL || env.CORS_ORIGIN,

  // Trusted origins for CORS
  trustedOrigins: [env.CORS_ORIGIN],

  // Advanced options
  advanced: {
    generateId: false, // Use Prisma's default cuid()
    crossSubDomainCookies: {
      enabled: !!env.COOKIE_DOMAIN, // Enable if COOKIE_DOMAIN is set (production)
      domain: env.COOKIE_DOMAIN, // e.g., ".turbostack.pro" for cross-subdomain cookies
    },

    cookies: {
      session_token: {
        // Production'da tarayıcılar Secure flag ile cookie'ye __Secure- öneki ekler
        // Bu yüzden cookie ismini production'da __Secure- ile başlatıyoruz
        name:
          env.NODE_ENV === "production"
            ? "__Secure-turbostack_session_token"
            : "turbostack_session_token",
      },
    },
  },
});

/**
 * Auth handler type for Elysia routes
 */
export type Auth = typeof auth;
