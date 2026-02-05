import { Elysia, t } from "elysia";
import * as systemService from "@backend/services/system.service";
import { requireAdmin, successResponse } from "@backend/lib/route-helpers";

export const systemRoutes = new Elysia({ prefix: "/system" })
  .derive(async ({ request: { headers } }) => {
    const session = await requireAdmin(headers);
    return { user: session.user, session: session.session };
  })

  .get(
    "/stats",
    async () => {
      const systemInfo = await systemService.getSystemInfo();
      return successResponse(systemInfo);
    },
    {
      detail: {
        tags: ["System"],
        summary: "Get system statistics",
        description: "Returns CPU, RAM, and Disk usage statistics",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          platform: t.String(),
          arch: t.String(),
          hostname: t.String(),
          uptime: t.Number(),
          cpu: t.Object({
            cores: t.Number(),
            usage: t.Array(t.Number()),
            model: t.String(),
          }),
          memory: t.Object({
            total: t.Number(),
            used: t.Number(),
            free: t.Number(),
            swapTotal: t.Number(),
            swapUsed: t.Number(),
            swapFree: t.Number(),
          }),
          disk: t.Object({
            total: t.Number(),
            used: t.Number(),
            free: t.Number(),
            path: t.String(),
          }),
        }),
      }),
    },
  );
