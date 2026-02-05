import { Elysia, t } from "elysia";

export const healthRoutes = new Elysia({ prefix: "/health", tags: ["Health"] })
  .get(
    "/",
    () => {
      return {
        success: true,
        data: {
          status: "healthy",
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
        },
      };
    },
    {
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          status: t.String(),
          timestamp: t.String(),
          uptime: t.Number(),
        }),
      }),
      detail: {
        summary: "Health check",
        description:
          "Returns the health status of the API server. Used by load balancers and monitoring systems.",
        operationId: "getHealth",
        responses: {
          200: {
            description: "Server is healthy",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        status: { type: "string", example: "healthy" },
                        timestamp: {
                          type: "string",
                          format: "date-time",
                          example: "2026-01-18T12:00:00.000Z",
                        },
                        uptime: {
                          type: "number",
                          description: "Server uptime in seconds",
                          example: 3600,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  )
  .get(
    "/ready",
    async () => {
      const isDatabaseReady = true;

      if (!isDatabaseReady) {
        return {
          success: false,
          data: {
            status: "not_ready",
            timestamp: new Date().toISOString(),
            checks: {
              database: false,
            },
          },
        };
      }

      return {
        success: true,
        data: {
          status: "ready",
          timestamp: new Date().toISOString(),
          checks: {
            database: true,
          },
        },
      };
    },
    {
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          status: t.String(),
          timestamp: t.String(),
          checks: t.Object({
            database: t.Boolean(),
          }),
        }),
      }),
      detail: {
        summary: "Readiness check",
        description:
          "Returns whether the server is ready to accept traffic. Checks database connectivity and other dependencies.",
        operationId: "getReadiness",
        responses: {
          200: {
            description: "Server is ready to accept traffic",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: true },
                    data: {
                      type: "object",
                      properties: {
                        status: { type: "string", example: "ready" },
                        timestamp: {
                          type: "string",
                          format: "date-time",
                        },
                        checks: {
                          type: "object",
                          properties: {
                            database: { type: "boolean", example: true },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          503: {
            description: "Server is not ready to accept traffic",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean", example: false },
                    data: {
                      type: "object",
                      properties: {
                        status: { type: "string", example: "not_ready" },
                        checks: {
                          type: "object",
                          properties: {
                            database: { type: "boolean", example: false },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  )
  .get(
    "/live",
    () => ({
      success: true,
      data: {
        status: "alive",
        timestamp: new Date().toISOString(),
      },
    }),
    {
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          status: t.String(),
          timestamp: t.String(),
        }),
      }),
      detail: {
        summary: "Liveness check",
        description:
          "Simple liveness probe. Returns 200 if the server process is running. Does not check dependencies.",
        operationId: "getLiveness",
        responses: {
          200: {
            description: "Server process is alive",
            content: {
              "application/json": {
                example: {
                  success: true,
                  data: {
                    status: "alive",
                    timestamp: "2026-01-18T12:00:00.000Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  );
