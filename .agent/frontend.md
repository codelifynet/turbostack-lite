## Frontend Agent Rules – Next.js App (`apps/web`)

This file defines detailed agent rules for the `apps/web` application, which uses **Next.js 16 (App Router) + Tailwind 4 + shadcn-ui**.

---

### 1. Architecture Overview

- **Stack**
  - Next.js 16 App Router (`apps/web/app/**`), TypeScript, Tailwind v4, shadcn-ui components from `@repo/shadcn-ui`.
  - Bun is used as the package manager and script runner.
  - Shared types live in `@repo/types`, shared validation schemas in `@repo/validations`. Prefer using those over redefining types inline.

- **Route groups**
  - `/(marketing)/**`: public marketing pages (landing, pricing, roadmap, etc.).
  - `/(auth)/**`: authentication flows (login, signup, verify-email, reset-password, etc.).
  - `/(panel)/**`: authenticated dashboard / panel pages.
  - **Rule**: When adding a new page, attach it to an existing group if possible; don’t introduce a new top-level route group unless there is a very clear architectural reason.

- **Layout & Providers**
  - Root layout: `apps/web/app/layout.tsx`
    - Fonts: Geist via `next/font/local`.
    - Theme handling: `ThemeProvider`.
    - Color & UI settings: `ColorSettingsProvider` + `ColorSettingsLoader`.
    - Notifications: `NotificationProvider` + `@repo/shadcn-ui/sonner` (`Toaster`).
  - **Rule**: If you need new global providers (feature flags, analytics, etc.), integrate them carefully into the existing provider hierarchy; avoid making the root layout overly complex.

---

### 2. File Organization

- **Components**
  - Shared UI primitives: from `@repo/shadcn-ui` (Button, Input, Card, Dialog, Sheet, Tabs, Table, Tooltip, DropdownMenu, Sidebar, etc.).
  - App-specific components: `apps/web/components/**`.
    - Panel-specific components often live under `apps/web/app/(panel)/panel/.../components/**`.
  - **Rules**:
    - If a component is reused by multiple routes, place it under `apps/web/components/**`.
    - If a component is specific to a single page, keep it under that page’s `components` folder.

- **Services and API calls**
  - All HTTP requests must go through the **service layer**:
    - `apps/web/services/*.service.ts` (e.g. `auth.service.ts`, `user.service.ts`, `media.service.ts`).
  - **Forbidden**: Ad-hoc `fetch("/api/...")` calls directly in pages/components. Always use or extend the corresponding service file.

- **Helpers / Utilities**
  - General utilities: `apps/web/lib/**` (e.g. `utils.ts`, `menu-items.ts`).
  - **Rule**: Put date/format/string helpers here; keep component files focused on UI and minimal local logic.

---

### 3. Styling, Theme and Design Rules

- **Tailwind 4 & Global Theme**
  - Theme tokens and CSS variables are defined in `apps/web/app/globals.css`:
    - `--color-*`, `--radius-*`, global animations, gradients, etc.
  - **Rule**: When choosing colors, radii, spacing, etc., use existing tokens instead of hard-coded hex colors or arbitrary pixel values.

- **shadcn-ui usage**
  - `@repo/shadcn-ui` provides:
    - The building-block components (Button, Input, Card, Dialog, etc.).
    - `@repo/shadcn-ui/sonner` for toast notifications.
  - **Do**:
    - Compose existing components to form new patterns.
    - Preserve the existing visual language of the panel (cards, stats, tables, filters).
  - **Don’t**:
    - Reimplement primitives that already exist (e.g. custom Button, custom Modal) unless absolutely necessary. Extend existing ones instead.

- **Responsive Layout**
  - Panel pages usually follow:
    - A top **page header** (title + action buttons).
    - Below, **cards / tables / charts** in grid layouts.
  - **Rule**:
    - Use single-column on mobile, grid layouts on md/lg where appropriate.
    - Avoid horizontal scrolling issues; for tables, reuse the existing table wrapper pattern.

---

### 4. State Management, Data and Auth

- **Auth & Session**
  - The backend uses **Better Auth** under `/api/auth/*`.
  - Frontend:
    - Auth services: `apps/web/services/auth.service.ts`.
    - Example login implementation: `apps/web/app/(auth)/login/page.tsx` using `signIn.email`, toast notifications and redirects.
  - **Rule**:
    - For new auth flows, follow the same pattern used in existing login/register pages (Zod schema + `react-hook-form` + toast + redirect). Do not introduce a second auth stack.

- **Global State / Context**
  - Existing contexts:
    - Theme: `ThemeProvider`.
    - Color & UI settings: `ColorSettingsProvider`.
    - Notifications: `NotificationProvider`.
  - **Rule**:
    - Prefer local state (`useState`, `useReducer`, `useMemo`, `useCallback`) for simple UI behavior.
    - For truly shared/global state, add a new context provider rather than pulling in new state libraries (Redux, MobX, etc.).

- **Environment & Config**
  - The frontend can only read env variables that start with `NEXT_PUBLIC_`.
  - **Forbidden**: Directly reading backend-only env vars from the frontend; always go through the API.

---

### 5. Error Handling, Toasts and Forms

- **User-facing errors**
  - Use the toast system for user-visible feedback:
    - `sonner` via `NotificationProvider` (e.g. `toast.error`, `toast.success`).
  - Form-level errors:
    - Use `react-hook-form` with Zod schemas and shadcn’s `Form` components.
  - **Don’t**:
    - Use `alert()` or rely solely on `console.error` for errors.

- **Form Pattern**
  - Standard pattern:
    - Zod schema (often from `@repo/validations`).
    - `useForm({ resolver: zodResolver(schema) })`.
    - Use `Form`, `FormField`, `FormItem`, `FormMessage`, etc. from shadcn-ui.
  - **Rule**:
    - New forms should follow the same pattern as existing auth/settings forms to maintain a consistent UX.

---

### 6. Performance and Code Quality

- **Server vs Client Components**
  - Server components:
    - Do data fetching and light transformation.
    - Avoid heavy computation; move it to the API or a client component where needed.
  - Client components:
    - Handle interactions (click, drag/drop, charts, etc.).
  - **Rule**:
    - Only mark files as `use client` when required, and keep the client-side scope as small as possible.

- **Charts, Tables and Heavy UI**
  - Charts: use existing chart components under `apps/web/components/charts/*` (bar, line, area, pie, radial, etc.).
  - Data tables: use existing reusable data-table components and action patterns.
  - **Forbidden**: Introducing a second charting library or rewriting charts/tables that already exist.

- **TypeScript rules**
  - Avoid `any`:
    - Only use it where third-party typings are truly missing and scope is tightly limited.
  - Prefer importing shared models from `@repo/types`:
    - For User, Subscription, Ticket, Media, etc., use the shared types; don’t redefine them.

---

### 7. Frontend–Backend Integration

- **API endpoints**
  - The frontend talks to the API using a base URL from `NEXT_PUBLIC_API_URL` (see services).
  - Path patterns must match the backend:
    - `/api/auth/*`, `/api/user/*`, `/api/media/*`, `/api/settings/*`, `/api/system/*`, etc.

- **Response format**
  - Backend standard:
    - Success: `{ success: true, data: ... }`
    - Error: `{ success: false, error, message, requestId? }`
  - **Rule**:
    - Service functions should parse according to this format (e.g. if `success` is false, surface `message` to the user and use `error`/`requestId` for logging).
    - UI should show the `message` in toasts or inline errors.
