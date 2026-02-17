import path from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

const DEFAULT_DATABASE_URL =
  "postgresql://turbostack:turbostack_secret@localhost:5434/turbostack";

function getMonorepoRoot(): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  // packages/database/src -> 3 levels up = monorepo root
  return path.join(__dirname, "../../..");
}

/**
 * Loads .env from monorepo root, then from apps/api if DATABASE_URL is not set.
 * Used by db:* scripts (migrate, seed) and Prisma client so they work without a root .env.
 */
export function loadDatabaseEnv(): void {
  const root = getMonorepoRoot();
  config({ path: path.join(root, ".env") });
  if (!process.env.DATABASE_URL) {
    config({ path: path.join(root, "apps/api/.env") });
  }
}

/**
 * Loads database env and returns DATABASE_URL or docker-compose default for local dev.
 */
export function getDatabaseUrl(): string {
  loadDatabaseEnv();
  const url = process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL;

  // Enhance security and avoid warnings for PostgreSQL connections
  if (url.includes("postgresql://") && !url.includes("sslmode=")) {
    return url.includes("?")
      ? `${url}&sslmode=verify-full`
      : `${url}?sslmode=verify-full`;
  }

  return url;
}
