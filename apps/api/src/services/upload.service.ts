import { prisma } from "@repo/database";
import { AppError } from "@backend/lib/errors";
import { utapi } from "@backend/lib/uploadthing";
import type { UploadResult } from "@repo/types";

export const uploadProfileImage = async (
  file: File,
  userId: string,
): Promise<UploadResult> => {
  try {
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      throw new AppError("UPLOAD_ERROR", response.error.message, 500);
    }

    const { data } = response;
    if (!data) {
      throw new AppError("UPLOAD_ERROR", "Upload failed", 500);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { image: data.ufsUrl },
    });

    return {
      url: data.ufsUrl,
      key: data.key,
      name: data.name,
      size: data.size,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("Error uploading profile image:", error);
    throw new AppError("UPLOAD_ERROR", "Failed to upload image", 500);
  }
};

export const deleteFile = async (fileKey: string): Promise<void> => {
  try {
    await utapi.deleteFiles(fileKey);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw new AppError("DELETE_ERROR", "Failed to delete file", 500);
  }
};

export const deleteProfileImage = async (userId: string): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { image: true },
    });

    if (user?.image) {
      const urlMatch = user.image.match(/utfs\.io\/f\/([^/]+)/);
      if (urlMatch && urlMatch[1]) {
        await deleteFile(urlMatch[1]);
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data: { image: null },
    });
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("Error deleting profile image:", error);
    throw new AppError("DELETE_ERROR", "Failed to delete profile image", 500);
  }
};

export const getFileInfo = async (fileKey: string) => {
  try {
    const files = await utapi.getFileUrls(fileKey);
    return files.data[0] || null;
  } catch (error) {
    console.error("Error getting file info:", error);
    return null;
  }
};

export const listFiles = async (params?: {
  limit?: number;
  offset?: number;
}) => {
  try {
    const response = await utapi.listFiles({
      limit: params?.limit || 50,
      offset: params?.offset || 0,
    });

    return {
      files: response.files.map((file) => ({
        key: file.key,
        name: file.name,
        size: file.size,
        uploadedAt: file.uploadedAt,
        url: (file as any).ufsUrl || `https://utfs.io/f/${file.key}`,
        type: (file as any).type || "unknown",
        customId: file.customId,
      })),
      hasMore: response.hasMore,
    };
  } catch (error) {
    console.error("Error listing files:", error);
    throw new AppError("LIST_ERROR", "Failed to list files", 500);
  }
};

export const uploadFile = async (file: File): Promise<UploadResult> => {
  try {
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      throw new AppError("UPLOAD_ERROR", response.error.message, 500);
    }

    const { data } = response;
    if (!data) {
      throw new AppError("UPLOAD_ERROR", "Upload failed", 500);
    }

    return {
      url: data.ufsUrl,
      key: data.key,
      name: data.name,
      size: data.size,
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    console.error("Error uploading file:", error);
    throw new AppError("UPLOAD_ERROR", "Failed to upload file", 500);
  }
};
