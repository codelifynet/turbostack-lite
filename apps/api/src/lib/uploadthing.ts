import { createUploadthing, type FileRouter, UTApi } from "uploadthing/server";
import { env } from "./env";
import { auth } from "./auth";

const f = createUploadthing();

/**
 * UploadThing API client instance
 * Used for server-side file operations (upload, delete, list, etc.)
 */
export const utapi = new UTApi({
  token: env.UPLOADTHING_TOKEN,
});

/**
 * UploadThing File Router
 * Defines available upload endpoints and their configurations
 */
export const uploadRouter: FileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      // UploadThing middleware receives { req }
      // req is a Request object (Web Standard)
      const request = req as Request;
      const headers = request.headers;

      // Check authentication
      const session = await auth.api.getSession({ headers });
      if (!session) {
        throw new Error("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // File upload completed successfully
      // You can add additional logic here (e.g., save to database)
      return {
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),
};

export type OurFileRouter = typeof uploadRouter;
