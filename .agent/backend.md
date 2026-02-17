## Backend Agent Rules – API (`apps/api`)

This document defines detailed agent rules for the backend application, which uses **Elysia.js + Bun + Prisma** and is exposed under `/api/*`.

---

### 1. Architecture & Entry Point

- **Entry point & composition**
  - Main app file: `apps/api/src/index.ts`.
  - The app is created with `new Elysia()` and composed in this order:
    1. Security middleware (`onRequest`) for blocking sensitive paths.
    2. Request ID & logging (`derive` + `onAfterHandle`).
    3. CORS configuration via `@elysiajs/cors`.
    4. Global rate limiting using `elysia-rate-limit` (applied only to the `/api` group).
    5. Global error handler (`.onError`) using `AppError` and `ELYSIA_ERROR_MAP`.
    6. OpenAPI documentation via `@elysiajs/openapi`.
    7. Route groups imported from `@api/routes` (`healthRoutes`, `authRoutes`, `usersRoutes`, `profileRoutes`, `mediaRoutes`, `dashboardRoutes`, `systemRoutes`, etc.).

- **Route organization (`@api/routes`)**
  - Route modules live under `apps/api/src/routes/**`:
    - `health.ts` – health checks.
    - `auth.ts` – Better Auth integration and `/api/auth/*`.
    - `users.ts` – admin-level user management.
    - `profile.ts` – current user profile.
    - `media.ts` – media management.
    - `dashboard.ts` – dashboard statistics and analytics.
    - `system.ts` – system metrics and diagnostics.
    - `settings-media-upload.ts`, `uploadthing.ts` – media upload settings and UploadThing handlers.
  - **Rules**:
    - For a new domain/feature, create both:
      - `apps/api/src/routes/<feature>.ts`
      - `apps/api/src/services/<feature>.service.ts`
    - Mount new routes via `.group("/api", app => app.use(<routes>))` in `src/index.ts`. Avoid putting raw `.get`, `.post`, etc. directly in `index.ts`.

---

### 2. Database, Prisma and Service Layer

- **Prisma Client**
  - Shared Prisma client is provided by `@repo/database` and imported as `prisma`.
  - Connection string and adapters are configured centrally in the database package.
  - **Forbidden**:
    - Creating new `PrismaClient` instances or custom adapters inside `apps/api`.
    - Managing raw DB connections yourself.

- **Schema & models**
  - Prisma schema files: `packages/database/prisma/schema/**`.
  - Important domains:
    - **Auth**: `User`, `Account`, `Session`, `Verification`.
    - **Billing**: `Product`, `Price`, `Subscription`, `Order`, `Customer`.
    - **Media**: `MediaFile`, `FileStorageSettings`, `MediaUploadSettings`.
    - **Support**: `Ticket`, `TicketMessage`.
    - **Settings**: `GlobalSettings`, `ImageOptimizationSettings`.
  - **When changing schema**:
    1. Update Prisma schema under `packages/database/prisma/schema`.
    2. Run `bun run db:generate` (via `@repo/database` commands).
    3. Import generated types from `@repo/database` instead of redefining TS interfaces.

- **Service layer (`apps/api/src/services/**`)\*\*
  - Business logic lives in service modules:
    - `user.service.ts`, `media.service.ts`, `dashboard.service.ts`, `system.service.ts`, `upload.service.ts`, `media-upload-settings.service.ts`, etc.
  - Responsibilities:
    - Encapsulate all Prisma/DB access.
    - Encapsulate business rules, validation, and cross-cutting behavior for a domain.
  - Route handlers:
    - Should only parse/validate requests, call service functions, and map results to the standard API response.
  - **Rule**:
    - Any non-trivial logic must go into a service module; keep routes thin.

---

### 3. Auth, Security and Rate Limiting

- **Better Auth integration**
  - Config: `apps/api/src/lib/auth.ts` with `betterAuth` and `prismaAdapter(prisma)`.
  - Supports:
    - Email/password sign-in/sign-up with verification and password reset.
    - Social login via Google/GitHub (`socialProviders`).
  - Routing:
    - `apps/api/src/routes/auth.ts` delegates all `/api/auth/*` to `auth.handler`.
  - **Rules**:
    - For new auth flows, extend Better Auth config and routes; don’t roll your own JWT/session layer.
    - Use `auth.api.getSession({ headers })` to retrieve the current session in protected routes.

- **Security middleware (`src/index.ts`)**
  - **Path blocking**:
    - `BLOCKED_PATH_PATTERNS` from `@api/constants` is used in `onRequest` to deny access to:
      - `.env`, `.git`, `.vscode`, `node_modules`, package/config/lock files, etc.
  - **CORS**:
    - Provided by `cors({ origin: env.CORS_ORIGIN, ...CORS_DEFAULTS })`.
    - All origin configuration must go through env; do not hardcode origins in route code.
  - **Rate limiting**:
    - `elysia-rate-limit` is applied inside the `/api` group (after `auth.handler` is mounted).
    - This ensures `/api/auth/*` (sign-in/out) are not unintentionally rate-limited.
  - **Rule**:
    - Add new cross-cutting protections (IP filters, extra headers, etc.) in `src/index.ts`, not individually in many routes.

---

### 4. Error Handling, AppError and Logging

- **AppError**
  - Domain and validation errors should throw `AppError` from `@api/lib/errors`:
    - Example: `throw new AppError("USER_NOT_FOUND", "User not found", 404)`.
  - `AppError` is recognized in `.onError` and converted to:
    - `{ success: false, error: code, message, details?, requestId? }`.

- **Global `.onError` handler**
  - Responsibilities:
    - Handle `AppError` with the proper HTTP status.
    - Parse Elysia `VALIDATION` errors into user-friendly messages (field-based or path-based).
    - For other Elysia error codes, use `ELYSIA_ERROR_MAP` to decide status, `error` code and message.
    - Log errors with `logger.error` including `requestId`, `code` and message.
  - **Rules**:
    - When introducing a new framework-level error type, consider extending `ELYSIA_ERROR_MAP`.
    - Prefer using `AppError` for business/domain errors rather than throwing plain `Error`.

- **Logging via `@api/lib/logger`**
  - Base logger uses Pino, configured in `logger.ts`.
  - Request logging:
    - `derive` assigns `requestId` and `startTime`.
    - `onAfterHandle` logs `{ requestId, method, path, status, duration }`.
  - **Rules**:
    - Use `logger.info` / `logger.warn` / `logger.error` with structured fields (no free-form strings).
    - Don’t use `console.log` in code that runs on production.

---

### 5. API Design, Endpoints and Response Format

- **Standard response format**
  - Success:
    - `{ success: true, data: <payload> }`
  - Error:
    - `{ success: false, error: "<ERROR_CODE>", message: "<message>", requestId?: string }`
  - **Rules**:
    - All endpoints (existing and new) must return responses in this format.
    - Include `requestId` when available.

- **Endpoint patterns**
  - Route prefixes:
    - `/api/auth/*` – Better Auth endpoints (login, logout, sign-up, etc.).
    - `/api/user/*` – operations for the current authenticated user.
    - `/api/users/*` – admin-facing user management.
    - `/api/media/*` – media uploads, listing, delete, optimization.
    - `/api/settings/*` – application settings (e.g. media upload configuration).
    - `/api/system/*` – system metrics and health.
    - `/api/dashboard/*` – aggregate dashboard stats.
  - Versioning:
    - Current API is unversioned (v1); if versioning is added, prefer path-based (`/api/v2/...`) and keep present conventions.

- **Validation**
  - Prefer Zod schemas from `@repo/validations` for request body/query validation.
  - Combine Zod and Elysia’s typesafe handlers where possible.
  - For invalid input:
    - Throw `AppError("VALIDATION_ERROR", message, 400, details?)` with as much structured info as is useful.

---

### 6. File Upload, Media and Optimization

- **UploadThing integration**
  - Config defined in `apps/api/src/lib/uploadthing.ts`.
  - Handles file upload transport and integration with `MediaFile`.
  - **Rules**:
    - Configure file size/format limits in upload config or settings, not ad-hoc in routes.
    - Centralize UploadThing behavior in `uploadthing.ts` and media services.

- **Media services (`media.service.ts`)**
  - Responsible for:
    - Syncing DB with UploadThing keys.
    - Creating/updating/deleting `MediaFile` rows.
    - Custom optimization logic and cleanup of old files.
  - `MediaFile` model ensures:
    - Unique `key`.
    - Stored `url`, `name`, `size`, MIME `type`, etc.
  - **Rules**:
    - Use the media service for any writes to `MediaFile`; don’t manipulate the model directly from routes.
    - Preserve uniqueness of `key`; reuse or carefully regenerate keys as needed.

- **Image optimization flow**
  - Steps:
    1. Find `MediaFile` by `key`.
    2. Fetch the source image from `url`.
    3. Call `optimizeImageUtil` with given options (quality, format, max dimensions).
    4. Upload optimized image via UploadThing.
    5. In a DB transaction, update the existing record with new key/URL/size, handling any key collisions.
  - **Rules**:
    - When extending or changing image optimization, update and reuse `OptimizeImageOptions`.
    - Avoid breaking existing defaults; preserve current behavior for callers that don’t pass new options.

---

### 7. Performance, Observability and Turborepo

- **Performance**
  - For heavy DB operations:
    - Ensure indices are present on frequently filtered fields (e.g. `userId`, status, createdAt).
    - Always paginate or limit large result sets; do not return unbounded lists.
  - For long-running jobs:
    - Consider splitting the work or moving to async/background processing.

- **Observability**
  - All endpoints already log REQUEST and RESPONSE lines with `requestId`.
  - Use `systemRoutes` and `system.service` for:
    - Health, version and internal metrics.
  - **Rules**:
    - Only add new logging where it improves debuggability or auditability.
    - Keep logs structured; don’t log arbitrary blobs of data without keys.

- **Turborepo tasks & CI**
  - Monorepo uses Turbo:
    - `bun run check-types` → `turbo run check-types` (TS typechecking).
    - `bun run lint` → `turbo run lint` (ESLint across packages).
  - Git hooks (Husky) may run `lint-staged` and `bun run check-types` on commit.
  - **Rule**:
    - New backend code must pass both lint and typecheck.
    - If you introduce new backend-side packages, ensure they are wired into Turbo tasks so hooks/CI enforce quality.
