import { Elysia } from "elysia";
import { AppError } from "./errors";
import { logger } from "./logger";
import { env } from "./env";

export interface RateLimitOptions {
  duration: number;
  max: number;
  keyPrefix?: string;
}

// Global store for rate limiting (in-memory)
// In a production environment with multiple instances, this should be moved to Redis
declare global {
  // eslint-disable-next-line no-var
  var rateLimitStore: Map<string, { count: number; resetAt: number }> | undefined;
  // eslint-disable-next-line no-var
  var rateLimitCleanupInterval: ReturnType<typeof setInterval> | undefined;
}

if (!globalThis.rateLimitStore) {
  globalThis.rateLimitStore = new Map();
}

/**
 * Elysia plugin for rate limiting
 */
export const rateLimit = (options: RateLimitOptions) => {
  const { duration, max, keyPrefix = "rl" } = options;

  return new Elysia({ name: `rate-limit:${keyPrefix}` })
    .derive(({ request, set }) => {
      // Skip rate limiting in development
      if (env.NODE_ENV === "development") {
        return {
          rateLimitRemaining: 999999,
          rateLimitReset: Date.now() + duration,
        };
      }

      // Get client identifier (IP address)
      const forwardedFor = request.headers.get("x-forwarded-for");
      const realIp = request.headers.get("x-real-ip");
      const clientId =
        forwardedFor?.split(",")[0]?.trim() ||
        realIp ||
        request.headers.get("cf-connecting-ip") ||
        "unknown";

      const store = globalThis.rateLimitStore!;
      const now = Date.now();
      const key = `${keyPrefix}:${clientId}`;
      const limit = store.get(key);

      // Initialize cleanup interval if not exists
      if (!globalThis.rateLimitCleanupInterval) {
        globalThis.rateLimitCleanupInterval = setInterval(() => {
          const cleanupNow = Date.now();
          for (const [cleanupKey, cleanupValue] of store.entries()) {
            if (cleanupValue.resetAt < cleanupNow) {
              store.delete(cleanupKey);
            }
          }
        }, 5 * 60 * 1000); // 5 minutes
      }

      if (limit && limit.resetAt > now) {
        limit.count++;

        if (limit.count > max) {
          logger.warn({ clientId, key, count: limit.count, max }, "Rate limit exceeded");
          throw new AppError(
            "TOO_MANY_REQUESTS",
            `Too many requests. Limit: ${max} requests per ${duration / 1000}s. Please try again later.`,
            429,
          );
        }
      } else {
        store.set(key, {
          count: 1,
          resetAt: now + duration,
        });
      }

      const currentLimit = store.get(key)!;
      const remaining = Math.max(0, max - currentLimit.count);
      const reset = Math.ceil((currentLimit.resetAt - Date.now()) / 1000);

      // Add headers to response
      set.headers["x-ratelimit-limit"] = String(max);
      set.headers["x-ratelimit-remaining"] = String(remaining);
      set.headers["x-ratelimit-reset"] = String(reset);

      return {
        rateLimitRemaining: remaining,
        rateLimitReset: currentLimit.resetAt,
      };
    });
};
