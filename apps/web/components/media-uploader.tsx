"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NextImage from "next/image";
import { Button } from "@repo/shadcn-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/shadcn-ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/shadcn-ui/card";
import { Slider } from "@repo/shadcn-ui/slider";
import { Switch } from "@repo/shadcn-ui/switch";
import { Label } from "@repo/shadcn-ui/label";
import { Progress } from "@repo/shadcn-ui/progress";
import {
  CloudUpload,
  Crop,
  Loader2,
  Settings2,
  UploadCloud,
  X,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { mediaService } from "@/services/media.service";
import { settingsService } from "@/services/settings.service";
import type { MediaFile } from "@repo/types";
import type { MediaUploadSettings } from "@/services/types";
import { ImageCropper } from "@/components/image-cropper";

type MediaUploaderMode = "button" | "dropzone";

interface MediaUploaderProps {
  mode: MediaUploaderMode;
  onUploadComplete?: (files: MediaFile[]) => void;
  /**
   * Optional title and description
   * (used in dropzone mode, shown in dialog for button mode)
   */
  title?: string;
  description?: string;
}

const DEFAULT_UPLOAD_SETTINGS: MediaUploadSettings = {
  maxFileSize: 4,
  maxFileCount: 10,
  allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
};

export function MediaUploader({
  mode,
  onUploadComplete,
  title = "Upload Image",
  description = "Drag and drop your images or click to select.",
}: MediaUploaderProps) {
  // General states
  const [uploadSettings, setUploadSettings] = useState<MediaUploadSettings>(
    DEFAULT_UPLOAD_SETTINGS,
  );
  const [isLoadingSettings, setIsLoadingSettings] = useState(false);

  // File selection
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Optimization settings
  const [quality, setQuality] = useState(85);
  const [useWebp, setUseWebp] = useState(true);

  // Cropper state
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const [cropFileIndex, setCropFileIndex] = useState<number | null>(null);

  // Modal button mode
  const [dialogOpen, setDialogOpen] = useState(false);

  // Load upload settings
  useEffect(() => {
    let isMounted = true;

    const loadSettings = async () => {
      setIsLoadingSettings(true);
      try {
        const response = await settingsService.getPublicMediaUploadSettings();
        if (response.success && response.data && isMounted) {
          setUploadSettings(response.data);
        }
      } catch (error) {
        console.error("Error loading media upload settings:", error);
      } finally {
        if (isMounted) {
          setIsLoadingSettings(false);
        }
      }
    };

    void loadSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  // Get allowed extensions for display
  const allowedExtensions = useMemo(() => {
    const extMap: Record<string, string> = {
      "image/jpeg": "JPG",
      "image/png": "PNG",
      "image/gif": "GIF",
      "image/webp": "WEBP",
    };
    return uploadSettings.allowedMimeTypes.length > 0
      ? uploadSettings.allowedMimeTypes
          .map((type: string) => extMap[type] || type.split("/")[1]?.toUpperCase())
          .filter(Boolean)
          .join(", ")
      : "All types";
  }, [uploadSettings.allowedMimeTypes]);

  // File validation
  const validateFile = useCallback(
    (file: File): { valid: boolean; error?: string } => {
      if (uploadSettings.allowedMimeTypes.length > 0 &&
          !uploadSettings.allowedMimeTypes.includes(file.type)) {
        return {
          valid: false,
          error: `File type "${file.type}" is not supported.`,
        };
      }

      const maxSizeBytes = uploadSettings.maxFileSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return {
          valid: false,
          error: `File "${file.name}" exceeds the maximum limit of ${uploadSettings.maxFileSize}MB.`,
        };
      }

      return { valid: true };
    },
    [uploadSettings],
  );

  // Drag & drop handler'ları
  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
    },
    [],
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
    },
    [],
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(event.dataTransfer.files);
      if (droppedFiles.length === 0) return;

      const validFiles: File[] = [];
      const errors: string[] = [];

      for (const file of droppedFiles) {
        const validation = validateFile(file);
        if (validation.valid) {
          validFiles.push(file);
        } else if (validation.error) {
          errors.push(validation.error);
        }
      }

      if (validFiles.length > uploadSettings.maxFileCount) {
        toast.error(
          `You can upload a maximum of ${uploadSettings.maxFileCount} files at once.`,
        );
        return;
      }

      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
      }

      if (errors.length > 0) {
        toast.error(errors[0]);
      } else if (validFiles.length === 0) {
        toast.error(`Supported file types: ${allowedExtensions}`);
      }
    },
    [allowedExtensions, uploadSettings.maxFileCount, validateFile],
  );

  // Input ile dosya seçimi
  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files;
      if (!fileList) return;

      const selectedArray = Array.from(fileList);
      const validFiles: File[] = [];
      const errors: string[] = [];

      for (const file of selectedArray) {
        const validation = validateFile(file);
        if (validation.valid) {
          validFiles.push(file);
        } else if (validation.error) {
          errors.push(validation.error);
        }
      }

      if (validFiles.length > uploadSettings.maxFileCount) {
        toast.error(
          `You can upload a maximum of ${uploadSettings.maxFileCount} files at once.`,
        );
        return;
      }

      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
      }

      if (errors.length > 0) {
        toast.error(errors[0]);
      }

      // Reset input
      event.target.value = "";
    },
    [uploadSettings.maxFileCount, validateFile],
  );

  const removeSelectedFile = useCallback((index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Simple canvas-based optimization (quality + webp)
  const optimizeImageFile = useCallback(
    async (file: File): Promise<File> => {
      if (!file.type.startsWith("image/")) {
        return file;
      }

      return new Promise<File>((resolve) => {
        const image = new window.Image();
        image.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(file);
            return;
          }

          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

          const targetType = useWebp ? "image/webp" : file.type;
          const qualityValue = Math.min(Math.max(quality, 10), 100) / 100;

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }

              const optimizedFile = new File(
                [blob],
                useWebp
                  ? file.name.replace(/\.[^/.]+$/, "") + ".webp"
                  : file.name,
                { type: targetType },
              );
              resolve(optimizedFile);
            },
            targetType,
            qualityValue,
          );
        };
        image.onerror = () => resolve(file);
        image.src = URL.createObjectURL(file);
      });
    },
    [quality, useWebp],
  );

  const handleUpload = useCallback(async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Apply optimization first (for image files)
      const optimizedFiles: File[] = [];

      for (const file of selectedFiles) {
        const optimized = await optimizeImageFile(file);
        optimizedFiles.push(optimized);
      }

      const response = await mediaService.uploadFiles(
        optimizedFiles,
        (progress) => {
          setUploadProgress(progress);
        },
      );

      if (response.success && response.data) {
        toast.success(`${response.data.length} file(s) uploaded successfully.`);

        onUploadComplete?.(response.data);
        setSelectedFiles([]);

        // Close dialog after successful upload in modal mode
        if (mode === "button") {
          setDialogOpen(false);
        }
      } else {
        toast.error(
          response.error || "An error occurred while uploading files.",
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while uploading files.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [mode, onUploadComplete, optimizeImageFile, selectedFiles]);

  // Open cropper when thumbnail is clicked
  const handleOpenCropper = useCallback(
    (index: number) => {
      const file = selectedFiles[index];
      if (!file) return;

      const url = URL.createObjectURL(file);
      setCropImageUrl(url);
      setCropFileIndex(index);
      setCropperOpen(true);
    },
    [selectedFiles],
  );

  const handleCropComplete = useCallback(
    (croppedBlob: Blob) => {
      if (cropFileIndex === null) return;

      setSelectedFiles((prev) =>
        prev.map((file, index) =>
          index === cropFileIndex
            ? new File([croppedBlob], file.name, { type: croppedBlob.type })
            : file,
        ),
      );
    },
    [cropFileIndex],
  );

  // Common dropzone content UI
  const renderDropzone = () => (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={cn(
        "relative rounded-xl border-2 border-dashed p-6 sm:p-8 transition-all cursor-pointer",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-muted-foreground/25 bg-muted/30 hover:border-primary/50 hover:bg-muted/50",
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={uploadSettings.allowedMimeTypes.length > 0 ? uploadSettings.allowedMimeTypes.join(",") : "image/*"}
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className="flex flex-col items-center justify-center text-center">
        <div
          className={cn(
            "mb-4 rounded-full p-4 transition-colors",
            isDragging ? "bg-primary/20" : "bg-muted",
          )}
        >
          <CloudUpload
            className={cn(
              "h-8 w-8 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground",
            )}
          />
        </div>
        <p className="font-semibold text-foreground mb-1">
          {isDragging ? "Drop files here" : "Drag files here"}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          or click to select from your computer
        </p>
        <p className="text-xs text-muted-foreground">
          Max {uploadSettings.maxFileSize}MB • {allowedExtensions} • Up to{" "}
          {uploadSettings.maxFileCount} files
        </p>
      </div>
    </div>
  );

  // Selected files + optimization settings UI
  const renderSelectedFilesSection = () =>
    selectedFiles.length > 0 ? (
      <div className="space-y-4 mt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">
            {selectedFiles.length} file(s) selected
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedFiles([])}
            disabled={isUploading}
          >
            Clear all
          </Button>
        </div>

        {/* Thumbnails - single row, horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {selectedFiles.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted border cursor-pointer group"
              onClick={() => handleOpenCropper(index)}
            >
              <NextImage
                src={URL.createObjectURL(file)}
                alt={file.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Crop className="h-4 w-4 text-white" />
              </div>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  removeSelectedFile(index);
                }}
                disabled={isUploading}
                className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-destructive hover:bg-destructive/90 text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
                aria-label="Remove file"
              >
                <X className="h-3 w-3 stroke-[2.5]" />
              </button>
            </div>
          ))}
        </div>

        {/* Optimization settings */}
        <div className="rounded-lg border bg-muted/40 p-3 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Settings2 className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Image optimization</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-medium">Quality</Label>
              <span className="text-xs text-muted-foreground">{quality}%</span>
            </div>
            <Slider
              value={[quality]}
              min={50}
              max={100}
              step={5}
              onValueChange={(values) => {
                const value = values[0];
                if (value !== undefined) {
                  setQuality(value);
                }
              }}
            />
            <p className="text-[11px] text-muted-foreground">
              Lower quality means smaller file size.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-medium">Convert to WebP format</p>
              <p className="text-[11px] text-muted-foreground">
                Recommended for better compression. May not be supported in
                older browsers.
              </p>
            </div>
            <Switch checked={useWebp} onCheckedChange={setUseWebp} />
          </div>
        </div>

        {/* Upload progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={isUploading || selectedFiles.length === 0}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <UploadCloud className="h-4 w-4 mr-2" />
              Upload {selectedFiles.length} file(s)
            </>
          )}
        </Button>
      </div>
    ) : null;

  // Button modu (modal ile)
  if (mode === "button") {
    return (
      <>
        <Button
          variant="outline"
          onClick={() => setDialogOpen(true)}
          disabled={isLoadingSettings}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Upload Image
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {renderDropzone()}
              {renderSelectedFilesSection()}
            </div>
          </DialogContent>
        </Dialog>

        {cropImageUrl && (
          <ImageCropper
            open={cropperOpen}
            onOpenChange={setCropperOpen}
            imageSrc={cropImageUrl}
            onCropComplete={handleCropComplete}
            aspectRatio={1}
            cropShape="rect"
            title="Crop Image"
          />
        )}
      </>
    );
  }

  // Dropzone modu (inline)
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderDropzone()}
          {renderSelectedFilesSection()}
        </CardContent>
      </Card>

      {cropImageUrl && (
        <ImageCropper
          open={cropperOpen}
          onOpenChange={setCropperOpen}
          imageSrc={cropImageUrl}
          onCropComplete={handleCropComplete}
          aspectRatio={1}
          cropShape="rect"
          title="Crop Image"
        />
      )}
    </>
  );
}
