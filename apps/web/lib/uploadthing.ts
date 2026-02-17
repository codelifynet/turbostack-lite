import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";
import type { FileRouter } from "uploadthing/types";

/**
 * UploadThing React Components
 *
 * Pre-configured upload components that use same-origin relative path
 * so requests go through Next.js rewrites and cookies are forwarded.
 */

// Define the file router type matching the backend
type OurFileRouter = {
  imageUploader: FileRouter[string];
};

export const UploadButton = generateUploadButton<OurFileRouter>({
  url: `/api/uploadthing`,
});

export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
  url: `/api/uploadthing`,
});

export const { useUploadThing } = generateReactHelpers<OurFileRouter>({
  url: `/api/uploadthing`,
});
