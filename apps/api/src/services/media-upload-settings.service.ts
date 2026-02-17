import { prisma } from "@repo/database";
import { AppError } from "@api/lib/errors";
import { MEDIA_UPLOAD_DEFAULTS } from "@api/constants";

export interface MediaUploadSettingsDTO {
  maxFileSize: number;
  maxFileCount: number;
  allowedMimeTypes: string[];
}

export async function getMediaUploadSettings(): Promise<MediaUploadSettingsDTO> {
  try {
    let settings = await prisma.mediaUploadSettings.findFirst();

    if (!settings) {
      settings = await prisma.mediaUploadSettings.create({
        data: {
          maxFileSize: MEDIA_UPLOAD_DEFAULTS.MAX_FILE_SIZE,
          maxFileCount: MEDIA_UPLOAD_DEFAULTS.MAX_FILE_COUNT,
          allowedMimeTypes: [...MEDIA_UPLOAD_DEFAULTS.ALLOWED_MIME_TYPES],
        },
      });
    }

    return {
      maxFileSize: settings.maxFileSize,
      maxFileCount: settings.maxFileCount,
      allowedMimeTypes: settings.allowedMimeTypes,
    };
  } catch (error) {
    console.error("Error fetching media upload settings:", error);
    throw new AppError(
      "MEDIA_UPLOAD_SETTINGS_FETCH_ERROR",
      "Failed to fetch media upload settings",
      500,
    );
  }
}

/**
 * Update global media upload settings.
 */
export async function updateMediaUploadSettings(
  data: Partial<MediaUploadSettingsDTO>,
): Promise<MediaUploadSettingsDTO> {
  try {
    let existing = await prisma.mediaUploadSettings.findFirst();

    if (!existing) {
      existing = await prisma.mediaUploadSettings.create({
        data: {
          maxFileSize: MEDIA_UPLOAD_DEFAULTS.MAX_FILE_SIZE,
          maxFileCount: MEDIA_UPLOAD_DEFAULTS.MAX_FILE_COUNT,
          allowedMimeTypes: [...MEDIA_UPLOAD_DEFAULTS.ALLOWED_MIME_TYPES],
        },
      });
    }

    const updated = await prisma.mediaUploadSettings.update({
      where: { id: existing.id },
      data: {
        maxFileSize:
          data.maxFileSize !== undefined
            ? data.maxFileSize
            : existing.maxFileSize,
        maxFileCount:
          data.maxFileCount !== undefined
            ? data.maxFileCount
            : existing.maxFileCount,
        allowedMimeTypes:
          data.allowedMimeTypes !== undefined
            ? data.allowedMimeTypes
            : existing.allowedMimeTypes,
      },
    });

    return {
      maxFileSize: updated.maxFileSize,
      maxFileCount: updated.maxFileCount,
      allowedMimeTypes: updated.allowedMimeTypes,
    };
  } catch (error) {
    console.error("Error updating media upload settings:", error);
    throw new AppError(
      "MEDIA_UPLOAD_SETTINGS_UPDATE_ERROR",
      "Failed to update media upload settings",
      500,
    );
  }
}
