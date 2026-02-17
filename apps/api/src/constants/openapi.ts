/**
 * OpenAPI (Swagger) documentation configuration.
 *
 * Kept in a separate file to avoid bloating `src/index.ts`.
 */
export function getOpenApiDocumentation(port: number) {
  return {
    openapi: "3.1.0",
    info: {
      title: "TurboStack API",
      version: "1.0.0",
      description: `
# TurboStack Backend API

Modern full-stack starter kit API built with **Elysia.js** and **Bun** runtime.

## Features
- 🚀 High-performance Bun runtime
- 🔐 JWT-based authentication
- 📧 Email notifications with Resend
- 💳 Payment integration with Polar
- 📁 File uploads with UploadThing

## Authentication
Most endpoints require authentication via Bearer token in the Authorization header.
          `,
      termsOfService: "https://turbostack.pro/terms",
      contact: {
        name: "TurboStack Support",
        email: "support@turbostack.pro",
        url: "https://turbostack.pro",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development server",
      },
      {
        url: "https://api.turbostack.pro",
        description: "Production server",
      },
    ],
    tags: [
      {
        name: "Health",
        description: "Health check and monitoring endpoints",
      },
      {
        name: "Auth",
        description: "Authentication and authorization endpoints",
      },
      {
        name: "Users",
        description: "User management and profile endpoints",
      },
      {
        name: "Media",
        description: "File upload and media management endpoints",
      },
      {
        name: "Tasks",
        description: "Kanban task management endpoints",
      },
      {
        name: "Versions",
        description: "Version and changelog management endpoints",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http" as const,
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token obtained from /auth/login",
        },
      },
      schemas: {
        Error: {
          type: "object" as const,
          properties: {
            success: { type: "boolean" as const, example: false },
            code: { type: "string" as const, example: "VALIDATION_ERROR" },
            message: { type: "string" as const, example: "Invalid input data" },
            status: { type: "integer" as const, example: 400 },
            requestId: {
              type: "string" as const,
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
          },
        },
        Success: {
          type: "object" as const,
          properties: {
            success: { type: "boolean" as const, example: true },
            data: { type: "object" as const },
            requestId: {
              type: "string" as const,
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
          },
        },
      },
    },
  };
}

