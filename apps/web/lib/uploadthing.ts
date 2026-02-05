import {
  generateUploadButton,
  generateUploadDropzone,
  generateReactHelpers,
} from "@uploadthing/react";
import type { FileRouter } from "uploadthing/types";
import { env } from "@/lib/env";

/**
 * UploadThing React Components
 *
 * Pre-configured upload components that communicate with the API server
 * at http://localhost:4101/api/uploadthing (or production URL)
 */

const API_URL = env.NEXT_PUBLIC_API_URL;

// Define the file router type matching the backend
type OurFileRouter = {
  imageUploader: FileRouter[string];
};

export const UploadButton = generateUploadButton<OurFileRouter>({
  url: `${API_URL}/api/uploadthing`,
});

export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
  url: `${API_URL}/api/uploadthing`,
});

export const { useUploadThing } = generateReactHelpers<OurFileRouter>({
  url: `${API_URL}/api/uploadthing`,
});
