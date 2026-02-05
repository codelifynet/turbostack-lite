import { Elysia, t } from "elysia";
import { AppError } from "@backend/lib/errors";
import { getSession } from "@backend/lib/route-helpers";
import { utapi } from "@backend/lib/uploadthing";

export const uploadthingRoutes = new Elysia({ prefix: "/uploadthing" })
  .get("/", () => {
    return [
      {
        slug: "imageUploader",
        config: {
          image: {
            maxFileSize: "4MB",
            maxFileCount: 1,
            minFileCount: 1,
            contentDisposition: "inline",
          },
        },
      },
    ];
  })

  .post(
    "/",
    async ({ request: { headers }, body }) => {
      await getSession(headers);

      const { files } = body;
      if (!files || files.length === 0) {
        throw new AppError("VALIDATION_ERROR", "No files provided", 400);
      }

      try {
        const uploadResults = await Promise.all(
          files.map(async (file: File) => {
            const response = await utapi.uploadFiles(file);
            if (response.error) {
              throw new AppError("UPLOAD_ERROR", response.error.message, 500);
            }
            return {
              name: response.data?.name,
              size: response.data?.size,
              key: response.data?.key,
              url: response.data?.ufsUrl,
              type: file.type,
            };
          }),
        );

        return uploadResults;
      } catch (error) {
        if (error instanceof AppError) throw error;
        console.error("Upload error:", error);
        throw new AppError("UPLOAD_ERROR", "Failed to upload files", 500);
      }
    },
    {
      body: t.Object({
        files: t.Files(),
      }),
      detail: {
        tags: ["Media"],
        summary: "Upload files",
        description: "Upload files to UploadThing storage",
      },
    },
  )

  .post("/callback", async ({ body }) => {
    console.log("UploadThing callback received:", body);
    return { success: true };
  });
