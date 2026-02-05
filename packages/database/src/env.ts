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
  return process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL;
}
