# v1.1.0 – Release notes (paste into GitHub Description)

## Added

- **.agent/** – Agent rules and configuration (tracked in git)
- **Color settings** – Panel color settings form and context
- **API constants** – CORS, OpenAPI, rate-limit, security constants
- **Husky & lint-staged** – Pre-commit lint/format checks
- **packages/shadcn-ui** – UI components package (replaces packages/ui after refactor)

## Changed

- **Auth forms** – Login, register, forgot-password, verify-email refactor
- **Panel** – Dashboard, layout, mobile sidebar, system-stats improvements
- **API** – Index refactor, auth/media route updates
- **Prisma** – Schema, seed and MediaUploadSettings model updates
- **Dockerfile** – api and web image updates
- **Docs** – development and project-structure documentation updated
- **.gitignore** – .agent/ configured to be tracked

## Removed

- **packages/ui** – Replaced by packages/shadcn-ui (internal refactor)

## Fixed

- Various UI and API improvements
