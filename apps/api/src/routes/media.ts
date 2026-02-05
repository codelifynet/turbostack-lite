import { Elysia, t } from "elysia";
import { AppError } from "@backend/lib/errors";
import { requireAdmin, successResponse } from "@backend/lib/route-helpers";
import * as uploadService from "@backend/services/upload.service";
import { PAGINATION } from "@backend/constants";

export const mediaRoutes = new Elysia({ prefix: "/media" })
  .get(
    "/",
    async ({ request: { headers }, query }) => {
      await requireAdmin(headers);

      const limit = query.limit
        ? parseInt(query.limit)
        : PAGINATION.DEFAULT_LIMIT;
      const offset = query.offset
        ? parseInt(query.offset)
        : PAGINATION.DEFAULT_OFFSET;

      const result = await uploadService.listFiles({ limit, offset });

      return {
        success: true,
        data: result.files,
        pagination: {
          limit,
          offset,
          hasMore: result.hasMore,
        },
      };
    },
    {
      query: t.Object({
        limit: t.Optional(t.String()),
        offset: t.Optional(t.String()),
      }),
      detail: {
        tags: ["Media"],
        summary: "List all uploaded files",
        description:
          "Returns list of all files uploaded to UploadThing. Admin/SuperAdmin only.",
      },
    },
  )

  .post(
    "/upload",
    async ({ request: { headers }, body }) => {
      await requireAdmin(headers);

      const { file } = body;
      if (!file) {
        throw new AppError("VALIDATION_ERROR", "File is required", 400);
      }

      const result = await uploadService.uploadFile(file);

      return successResponse(result, "File uploaded successfully");
    },
    {
      body: t.Object({
        file: t.File(),
      }),
      detail: {
        tags: ["Media"],
        summary: "Upload a file",
        description: "Upload a file to UploadThing. Admin/SuperAdmin only.",
      },
    },
  )

  .delete(
    "/:key",
    async ({ request: { headers }, params }) => {
      await requireAdmin(headers);

      await uploadService.deleteFile(params.key);

      return {
        success: true,
        message: "File deleted successfully",
      };
    },
    {
      params: t.Object({
        key: t.String(),
      }),
      detail: {
        tags: ["Media"],
        summary: "Delete a file",
        description:
          "Delete a file from UploadThing by its key. Admin/SuperAdmin only.",
      },
    },
  );
