"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import { MediaUploader } from "@/components/media-uploader";
import type { MediaFile } from "@/services/types";

interface MediaUploadSectionProps {
  onUploadComplete: (files: MediaFile[]) => void;
}

export function MediaUploadSection({
  onUploadComplete,
}: MediaUploadSectionProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* 1. Simple button + modal structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Global Upload Button</span>
            <MediaUploader
              mode="button"
              onUploadComplete={onUploadComplete}
              title="Upload Image"
              description="This modal demonstrates the global image upload experience that can be used anywhere in the panel."
            />
          </CardTitle>
          <CardDescription className="mt-1">
            Click the &quot;Upload Image&quot; button to open a modal with drag
            &amp; drop, optimization, and cropping features.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* 2. Inline dropzone structure */}
      <MediaUploader
        mode="dropzone"
        onUploadComplete={onUploadComplete}
        title="Inline Dropzone Uploader"
        description="This area demonstrates the dropzone variant that can be used directly within the page."
      />
    </div>
  );
}
