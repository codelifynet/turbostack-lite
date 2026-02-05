import { Elysia, t } from "elysia";
import { requireAdmin, successResponse } from "@backend/lib/route-helpers";
import { AppError } from "@backend/lib/errors";
import {
  getMediaUploadSettings,
  updateMediaUploadSettings,
} from "@backend/services/media-upload-settings.service";

export const settingsMediaUploadRoutes = new Elysia({
  prefix: "/settings",
})
  .get(
    "/media-upload",
    async ({ request: { headers } }) => {
      await requireAdmin(headers);

      const settings = await getMediaUploadSettings();

      return successResponse(settings);
    },
    {
      detail: {
        tags: ["Settings"],
        summary: "Get media upload settings",
        description:
          "Returns global media upload settings (max file size, allowed MIME types, etc.).",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          maxFileSize: t.Number(),
          maxFileCount: t.Number(),
          allowedMimeTypes: t.Array(t.String()),
        }),
      }),
    },
  )

  .get(
    "/media-upload/public",
    async () => {
      const settings = await getMediaUploadSettings();

      return {
        success: true as const,
        data: settings,
      };
    },
    {
      detail: {
        tags: ["Settings"],
        summary: "Get public media upload settings",
        description:
          "Returns public media upload settings for frontend validation.",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          maxFileSize: t.Number(),
          maxFileCount: t.Number(),
          allowedMimeTypes: t.Array(t.String()),
        }),
      }),
    },
  )

  .patch(
    "/media-upload",
    async ({ body, request: { headers } }) => {
      await requireAdmin(headers);

      // Validate maxFileSize (1-50 MB)
      if (body.maxFileSize !== undefined) {
        if (body.maxFileSize < 1 || body.maxFileSize > 50) {
          throw new AppError(
            "VALIDATION_ERROR",
            "Max file size must be between 1 and 50 MB",
            400,
          );
        }
      }

      // Validate maxFileCount (1-50)
      if (body.maxFileCount !== undefined) {
        if (body.maxFileCount < 1 || body.maxFileCount > 50) {
          throw new AppError(
            "VALIDATION_ERROR",
            "Max file count must be between 1 and 50",
            400,
          );
        }
      }

      // Validate allowedMimeTypes
      if (body.allowedMimeTypes !== undefined) {
        const validMimeTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
          "image/svg+xml",
          "image/avif",
          "image/bmp",
          "image/tiff",
          "application/pdf",
          "video/mp4",
          "video/webm",
          "audio/mpeg",
          "audio/wav",
        ];
        const invalidTypes = body.allowedMimeTypes.filter(
          (type) => !validMimeTypes.includes(type),
        );
        if (invalidTypes.length > 0) {
          throw new AppError(
            "VALIDATION_ERROR",
            `Invalid MIME types: ${invalidTypes.join(", ")}`,
            400,
          );
        }
      }

      const settings = await updateMediaUploadSettings(body);

      return successResponse(settings);
    },
    {
      body: t.Object({
        maxFileSize: t.Optional(t.Number()),
        maxFileCount: t.Optional(t.Number()),
        allowedMimeTypes: t.Optional(t.Array(t.String())),
      }),
      detail: {
        tags: ["Settings"],
        summary: "Update media upload settings",
        description:
          "Updates global media upload settings (max file size, allowed MIME types, etc.).",
      },
      response: t.Object({
        success: t.Boolean(),
        data: t.Object({
          maxFileSize: t.Number(),
          maxFileCount: t.Number(),
          allowedMimeTypes: t.Array(t.String()),
        }),
      }),
    },
  );
