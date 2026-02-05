import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_POLAR_STARTER_MONTHLY_PRICE_ID: z.string().optional(),
    NEXT_PUBLIC_POLAR_PRO_MONTHLY_PRICE_ID: z.string().optional(),
    NEXT_PUBLIC_POLAR_PRO_YEARLY_PRICE_ID: z.string().optional(),
    NEXT_PUBLIC_POLAR_TEAM_MONTHLY_PRICE_ID: z.string().optional(),
    NEXT_PUBLIC_POLAR_TEAM_YEARLY_PRICE_ID: z.string().optional(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_POLAR_STARTER_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_POLAR_STARTER_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_POLAR_PRO_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_POLAR_PRO_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_POLAR_PRO_YEARLY_PRICE_ID:
      process.env.NEXT_PUBLIC_POLAR_PRO_YEARLY_PRICE_ID,
    NEXT_PUBLIC_POLAR_TEAM_MONTHLY_PRICE_ID:
      process.env.NEXT_PUBLIC_POLAR_TEAM_MONTHLY_PRICE_ID,
    NEXT_PUBLIC_POLAR_TEAM_YEARLY_PRICE_ID:
      process.env.NEXT_PUBLIC_POLAR_TEAM_YEARLY_PRICE_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
