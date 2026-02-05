# TurboStack Lite

Production-ready monorepo starter kit with Next.js 16, Elysia.js, and Prisma. Built for speed and simplicity.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/codelifynet/turbostack-lite&project-name=turbostack&repository-name=turbostack&root-directory=apps/web&env=DATABASE_URL,JWT_SECRET,SESSION_SECRET,BETTER_AUTH_SECRET,NEXT_PUBLIC_API_URL&envDescription=Required%20environment%20variables%20for%20turbostack)

## ✨ Features

- 🚀 **Next.js 16** - React 19 with App Router & Turbopack
- ⚡ **Elysia.js** - Fast Bun-powered backend API
- 🗄️ **Prisma** - Type-safe database ORM with PostgreSQL
- 🔐 **Better Auth** - Modern authentication with OAuth support
- 📧 **Resend** - Transactional emails with React Email
- 🎨 **Tailwind CSS v4** - Modern styling with shadcn/ui
- 📦 **Turborepo** - High-performance monorepo build system
- 💳 **Polar.sh** - Integrated payment processing
- 📁 **UploadThing** - File uploads made simple

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/codelifynet/turbostack-lite.git
cd turbostack-lite

# Install dependencies
bun install

# Setup environment variables
cp .env.example .env
# Edit .env and add your configuration

# Setup database
bun run db:push
bun run db:seed

# Start development servers
bun run dev
```

The app will be available at:

- **Frontend**: http://localhost:4100
- **Backend API**: http://localhost:4101
- **API Docs**: http://localhost:4101/openapi

## 📁 Project Structure

```
turbostack-lite/
├── apps/
│   ├── web/          # Next.js 16 frontend (port 4100)
│   ├── api/          # Elysia.js backend (port 4101)
│   └── docs/         # Documentation app (Fumadocs)
├── packages/
│   ├── database/     # Prisma schema & client
│   ├── types/        # Shared TypeScript types
│   ├── validations/  # Zod validation schemas
│   └── ui/           # Shared UI components (shadcn/ui)
├── turbo.json        # Turborepo configuration
└── package.json      # Root workspace config
```

## 🛠️ Available Commands

| Command               | Description                        |
| --------------------- | ---------------------------------- |
| `bun run dev`         | Start all apps in development mode |
| `bun run dev:web`     | Start only the web app             |
| `bun run dev:api`     | Start only the API server          |
| `bun run dev:docs`    | Start only the docs app            |
| `bun run build`       | Build all apps for production      |
| `bun run start`       | Start all apps in production mode  |
| `bun run db:generate` | Generate Prisma client             |
| `bun run db:push`     | Push Prisma schema to database     |
| `bun run db:migrate`  | Create a new migration             |
| `bun run db:seed`     | Seed the database with sample data |
| `bun run db:studio`   | Open Prisma Studio                 |
| `bun run db:start`    | Reset, push, and seed database     |
| `bun run lint`        | Lint all packages                  |
| `bun run check-types` | Type-check all packages            |
| `bun run format`      | Format code with Prettier          |
| `bun run clean`       | Clean build artifacts              |

## 🔧 Environment Variables

Required environment variables are documented in `.env.example`. Key variables:

**Backend (apps/api/.env):**

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `BETTER_AUTH_SECRET` - Better Auth secret key
- `RESEND_API_KEY` - Resend email API key
- `POLAR_ACCESS_TOKEN` - Polar.sh payment access token

**Frontend (apps/web/.env.local):**

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_POLAR_*_PRICE_ID` - Polar.sh price IDs

See `.env.example` for the complete list.

## 🌐 Deployment

### Frontend (Vercel)

Deploy the Next.js app to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/codelifynet/turbostack-lite&project-name=turbostack&repository-name=turbostack&root-directory=apps/web&env=DATABASE_URL,JWT_SECRET,SESSION_SECRET,BETTER_AUTH_SECRET,NEXT_PUBLIC_API_URL&envDescription=Required%20environment%20variables%20for%20turbostack)

**Manual deployment:**

```bash
cd apps/web
vercel
```

### Backend (Railway/Render/Fly.io)

The Elysia.js API requires a platform that supports Bun runtime:

- **[Railway](https://railway.app)** - Recommended, easy Bun support
- **[Render](https://render.com)** - Supports Bun runtime
- **[Fly.io](https://fly.io)** - Global edge deployment

**Deployment steps:**

1. Set environment variables in your hosting platform
2. Point to `apps/api` as the root directory
3. Use `bun run start` as the start command

### Database

Choose a PostgreSQL provider:

- **[Supabase](https://supabase.com)** - Managed PostgreSQL with free tier
- **[Neon](https://neon.tech)** - Serverless PostgreSQL
- **[Railway](https://railway.app)** - Database + Backend in one place

## 📚 Documentation

- **Online Docs**: [turbostack-docs.vercel.app](https://turbostack-docs.vercel.app)
- **Local Docs**: Run `bun run dev:docs` and visit http://localhost:4102

## 🏗️ Tech Stack

| Layer             | Technology          | Version |
| ----------------- | ------------------- | ------- |
| **Monorepo**      | Turborepo           | 2.x     |
| **Runtime**       | Bun                 | 1.1.x   |
| **Frontend**      | Next.js             | 16.x    |
| **UI Framework**  | React               | 19.x    |
| **Styling**       | Tailwind CSS        | 4.x     |
| **UI Components** | shadcn/ui           | Latest  |
| **Backend**       | Elysia.js           | 1.4.x   |
| **Database**      | Prisma + PostgreSQL | 6.x     |
| **Validation**    | Zod                 | 3.x     |
| **Auth**          | Better Auth         | 1.4.x   |
| **Email**         | Resend              | Latest  |
| **Payments**      | Polar.sh            | Latest  |

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ⭐ Star History

If you find this project useful, please consider giving it a star ⭐
