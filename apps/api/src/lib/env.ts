import { z } from "zod";

/**
 * Bun automatically loads .env files in this order:
 * 1. .env.production, .env.local, .env (from current dir and parents)
 * 2. Root .env is automatically detected in monorepo
 * No manual config needed!
 */

/**
 * Environment variable validation schema
 * App will fail fast if any required env var is missing or invalid
 */
const envSchema = z.object({
  // Environment
  NODE_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),

  // Server
  PORT: z.coerce.number().default(4101),
  CORS_ORIGIN: z.string().default("http://localhost:4100"),
  FRONTEND_URL: z.string().default("http://localhost:4100"),

  // Better Auth
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().url().optional(),

  // Database
  DATABASE_URL: z.string().url(),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional(),
  FROM_EMAIL: z.string().email().optional(),

  // OAuth (optional)
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),

  // Payments (optional)
  POLAR_ACCESS_TOKEN: z.string().optional(),
  POLAR_WEBHOOK_SECRET: z.string().optional(),

  // AI (optional)
  OPENROUTER_API_KEY: z.string().optional(),

  // File Upload (optional)
  UPLOADTHING_TOKEN: z.string().optional(),

  // Docs Auth (optional)
  DOCS_USERNAME: z.string().optional(),
  DOCS_PASSWORD: z.string().optional(),
});

// Validate on import - fails fast if invalid
export const env = envSchema.parse(process.env);

// Type export
export type Env = z.infer<typeof envSchema>;
