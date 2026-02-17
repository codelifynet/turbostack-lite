# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-09

### Added

- **.agent/** – Agent rules and configuration (tracked in git)
- **Color settings** – Panel color settings form and context
- **API constants** – CORS, OpenAPI, rate-limit, security constants
- **Husky & lint-staged** – Pre-commit lint/format checks
- **packages/shadcn-ui** – UI components package (replaces packages/ui after refactor)

### Changed

- **Auth forms** – Login, register, forgot-password, verify-email refactor
- **Panel** – Dashboard, layout, mobile sidebar, system-stats improvements
- **API** – Index refactor, auth/media route updates
- **Prisma** – Schema, seed and MediaUploadSettings model updates
- **Dockerfile** – api and web image updates
- **Docs** – development and project-structure documentation updated
- **.gitignore** – .agent/ configured to be tracked

### Removed

- **packages/ui** – Replaced by packages/shadcn-ui (internal refactor)

### Fixed

- Various UI and API improvements

---

## [1.0.0] - 2026-02-05

### 🎉 Initial Release

First stable release is now available!

### ✨ Features

- **Next.js 16** - React 19 with App Router and Turbopack support
- **Elysia.js** - Fast Bun-powered backend API
- **Prisma** - Type-safe database ORM with PostgreSQL
- **Better Auth** - Modern authentication with OAuth support
- **Resend** - Transactional email support with React Email
- **Tailwind CSS v4** - Modern styling system with shadcn/ui
- **Turborepo** - High-performance monorepo build system
- **Polar.sh** - Integrated payment processing
- **UploadThing** - Simple file upload solution

### 🏗️ Architecture

- Monorepo structure (Turborepo)
- Type-safe shared packages
- Modular route structure
- Service layer pattern
- Error handling and logging

### 📦 Packages

- `apps/web` - Next.js frontend application
- `apps/api` - Elysia.js backend API
- `apps/docs` - Documentation application
- `packages/database` - Prisma schema and client
- `packages/types` - Shared TypeScript types
- `packages/validations` - Zod validation schemas
- `packages/ui` - Shared UI components (shadcn/ui)

### 🚀 Deployment

- Frontend deployment support for Vercel
- Backend deployment support for Railway/Render/Fly.io
- Docker container support
- Environment variable management

### 📚 Documentation

- Comprehensive documentation
- API documentation (OpenAPI)
- Development guide
- Deployment guide

### 🔧 Development

- TypeScript strict mode
- ESLint configuration
- Prettier code formatting
- Git hooks support
- Database migration system

### 🐛 Bug Fixes

- First stable release, no known critical bugs

### 📝 Notes

- Node.js >= 22 requirement
- Bun 1.1.x runtime support
- PostgreSQL database requirement

---

[1.1.0]: https://github.com/codelifynet/turbostack-lite/releases/tag/v1.1.0
[1.0.0]: https://github.com/codelifynet/turbostack-lite/releases/tag/v1.0.0
