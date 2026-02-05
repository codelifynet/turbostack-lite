/**
 * Utility functions for backend services
 */

import { prisma } from "@repo/database";
import sharp from "sharp";

// ============================================
// Password Generation
// ============================================

/**
 * Generate a random temporary password
 * Uses a character set that excludes easily confused characters (0, O, I, l)
 */
export const generateTempPassword = (): string => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%";
  let password = "";
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

/**
 * Generate a random password (alias for generateTempPassword)
 */
export const generateRandomPassword = (): string => {
  return generateTempPassword();
};

// ============================================
// Media/File Utilities
// ============================================

/**
 * Media item type for product medias
 */
export type MediaItem = { id: string; public_url: string };
export type MediaInput = string | MediaItem | Array<string | MediaItem>;

/**
 * Normalize media data from various formats to consistent structure
 */
export const normalizeMedias = (medias: unknown): MediaItem[] => {
  if (!medias) return [];

  // Already normalized array
  if (Array.isArray(medias)) {
    return medias.map((item) => {
      if (typeof item === "object" && item !== null && "id" in item) {
        return {
          id: String(item.id),
          public_url: String((item as MediaItem).public_url || ""),
        };
      }
      if (typeof item === "string") {
        return { id: item, public_url: item };
      }
      return { id: String(item), public_url: "" };
    });
  }

  // JSON string
  if (typeof medias === "string") {
    try {
      const parsed = JSON.parse(medias);
      if (Array.isArray(parsed)) {
        return normalizeMedias(parsed);
      }
    } catch {
      return [];
    }
  }

  return [];
};

/**
 * Prepare media data for database storage
 */
export const prepareMediasForStorage = (medias?: MediaInput[]): MediaItem[] => {
  if (!medias || medias.length === 0) return [];

  return medias.map((item) => {
    if (typeof item === "string") {
      return { id: item, public_url: "" };
    }
    if (typeof item === "object" && item !== null && "id" in item) {
      return {
        id: String(item.id),
        public_url: String((item as MediaItem).public_url || ""),
      };
    }
    return { id: String(item), public_url: "" };
  });
};

// ============================================
// Image Utilities
// ============================================

/**
 * Get MIME type and file extension for image format
 */
export const getMimeAndExtensionForFormat = (
  format: string,
): { mime: string; ext: string } | null => {
  switch (format.toLowerCase()) {
    case "webp":
      return { mime: "image/webp", ext: "webp" };
    case "avif":
      return { mime: "image/avif", ext: "avif" };
    case "jpeg":
    case "jpg":
      return { mime: "image/jpeg", ext: "jpg" };
    case "png":
      return { mime: "image/png", ext: "png" };
    default:
      return null;
  }
};

/**
 * Replace file extension in filename
 */
export const replaceFileExtension = (
  fileName: string,
  newExt: string,
): string => {
  const idx = fileName.lastIndexOf(".");
  if (idx === -1) return `${fileName}.${newExt}`;
  return `${fileName.slice(0, idx)}.${newExt}`;
};
