"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import { Button } from "@repo/shadcn-ui/button";
import { Label } from "@repo/shadcn-ui/label";
import { Badge } from "@repo/shadcn-ui/badge";
import { Alert, AlertDescription } from "@repo/shadcn-ui/alert";
import { Slider } from "@repo/shadcn-ui/slider";
import { MultiSelect } from "@repo/shadcn-ui/multi-select";
import { ImageIcon, Loader2, Save, ShieldAlert } from "lucide-react";
import { settingsService } from "@/services/settings.service";
import type { MediaUploadSettings } from "@/services/types";

// Available MIME types for media upload
const AVAILABLE_MIME_TYPES = [
  { value: "image/jpeg", label: "JPEG (.jpg, .jpeg)" },
  { value: "image/png", label: "PNG (.png)" },
  { value: "image/gif", label: "GIF (.gif)" },
  { value: "image/webp", label: "WebP (.webp)" },
  { value: "image/svg+xml", label: "SVG (.svg)" },
  { value: "image/avif", label: "AVIF (.avif)" },
  { value: "image/bmp", label: "BMP (.bmp)" },
  { value: "image/tiff", label: "TIFF (.tiff)" },
  { value: "application/pdf", label: "PDF (.pdf)" },
  { value: "video/mp4", label: "MP4 Video (.mp4)" },
  { value: "video/webm", label: "WebM Video (.webm)" },
  { value: "audio/mpeg", label: "MP3 Audio (.mp3)" },
  { value: "audio/wav", label: "WAV Audio (.wav)" },
];

interface MediaTabProps {
  userRole: string;
}

export function MediaTab({ userRole }: MediaTabProps) {
  const isSuperAdmin = userRole === "SUPERADMIN";
  
  const [mediaUploadSettings, setMediaUploadSettings] =
    useState<MediaUploadSettings>({
      maxFileSize: 4,
      maxFileCount: 10,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    });
  const [isLoadingMediaUpload, setIsLoadingMediaUpload] = useState(false);
  const [isSavingMediaUpload, setIsSavingMediaUpload] = useState(false);

  // Load settings on mount
  useEffect(() => {
    void loadMediaUploadSettings();
  }, []);

  const loadMediaUploadSettings = async () => {
    setIsLoadingMediaUpload(true);
    try {
      const response = await settingsService.getMediaUploadSettings();
      if (response.success && response.data) {
        setMediaUploadSettings(response.data);
      }
    } catch (error) {
      console.error("Failed to load media upload settings:", error);
      toast.error("Failed to load media upload settings");
    } finally {
      setIsLoadingMediaUpload(false);
    }
  };

  const handleSaveMediaUploadSettings = async () => {
    setIsSavingMediaUpload(true);
    try {
      const response =
        await settingsService.updateMediaUploadSettings(mediaUploadSettings);
      if (response.success) {
        toast.success("Media upload settings saved successfully");
      } else {
        toast.error(
          response.message ||
            response.error ||
            "Failed to save media upload settings",
        );
      }
    } catch (error) {
      console.error("Failed to save media upload settings:", error);
      toast.error("Failed to save media upload settings");
    } finally {
      setIsSavingMediaUpload(false);
    }
  };

  return (
    <>
      {!isSuperAdmin && (
        <Alert className="mb-6">
          <ShieldAlert className="h-4 w-4" />
          <AlertDescription>
            You are viewing this page in read-only mode. Only Super Admins can
            modify media upload settings.
          </AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Media Upload Settings
                {isSuperAdmin && (
                  <Badge variant="default" className="ml-2">
                    Full Access
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {isSuperAdmin
                  ? "Configure file upload limits and allowed file types for the media library"
                  : "View file upload limits and allowed file types (read-only)"}
              </CardDescription>
            </div>
            {isSuperAdmin && (
              <Button
                onClick={handleSaveMediaUploadSettings}
                disabled={isSavingMediaUpload}
              >
                {isSavingMediaUpload ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
      <CardContent className="space-y-6">
        {isLoadingMediaUpload ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {/* Max File Size */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">
                    Maximum File Size
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Set the maximum allowed file size for uploads (1-50 MB)
                  </p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {mediaUploadSettings.maxFileSize} MB
                </Badge>
              </div>
              <Slider
                value={[mediaUploadSettings.maxFileSize]}
                onValueChange={(value: number[]) =>
                  setMediaUploadSettings((prev: MediaUploadSettings) => ({
                    ...prev,
                    maxFileSize: value[0] ?? prev.maxFileSize,
                  }))
                }
                min={1}
                max={50}
                step={1}
                className="w-full"
                disabled={!isSuperAdmin}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 MB</span>
                <span>25 MB</span>
                <span>50 MB</span>
              </div>
            </div>

            {/* Max File Count */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">
                    Maximum File Count
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Maximum number of files per upload batch (1-50)
                  </p>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {mediaUploadSettings.maxFileCount} files
                </Badge>
              </div>
              <Slider
                value={[mediaUploadSettings.maxFileCount]}
                onValueChange={(value: number[]) =>
                  setMediaUploadSettings((prev: MediaUploadSettings) => ({
                    ...prev,
                    maxFileCount: value[0] ?? prev.maxFileCount,
                  }))
                }
                min={1}
                max={50}
                step={1}
                className="w-full"
                disabled={!isSuperAdmin}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>

            {/* Allowed MIME Types */}
            <div className="space-y-3">
              <div>
                <Label className="text-base font-medium">
                  Allowed File Types
                </Label>
                <p className="text-sm text-muted-foreground">
                  Select which file types users can upload to the media library
                </p>
              </div>
              <MultiSelect
                options={AVAILABLE_MIME_TYPES}
                selected={mediaUploadSettings.allowedMimeTypes || []}
                onChange={(selected: string[]) => {
                  setMediaUploadSettings((prev: MediaUploadSettings) => ({
                    ...prev,
                    allowedMimeTypes: selected,
                  }));
                }}
                placeholder="Select allowed file types..."
                searchPlaceholder="Search file types..."
                emptyMessage="No file types found."
                disabled={!isSuperAdmin}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!isSuperAdmin}
                  onClick={() => {
                    setMediaUploadSettings((prev: MediaUploadSettings) => ({
                      ...prev,
                      allowedMimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/webp",
                      ],
                    }));
                  }}
                >
                  Images Only
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!isSuperAdmin}
                  onClick={() => {
                    setMediaUploadSettings((prev: MediaUploadSettings) => ({
                      ...prev,
                      allowedMimeTypes: [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "image/webp",
                        "image/svg+xml",
                        "image/avif",
                        "application/pdf",
                      ],
                    }));
                  }}
                >
                  Images + PDF
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!isSuperAdmin}
                  onClick={() => {
                    setMediaUploadSettings((prev: MediaUploadSettings) => ({
                      ...prev,
                      allowedMimeTypes: AVAILABLE_MIME_TYPES.map(
                        (t) => t.value,
                      ),
                    }));
                  }}
                >
                  All Types
                </Button>
              </div>
            </div>

            {/* Preview Summary */}
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <h4 className="font-medium mb-2">
                  Current Configuration Summary
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    • Maximum file size:{" "}
                    <span className="font-medium text-foreground">
                      {mediaUploadSettings.maxFileSize} MB
                    </span>
                  </li>
                  <li>
                    • Files per upload:{" "}
                    <span className="font-medium text-foreground">
                      {mediaUploadSettings.maxFileCount}
                    </span>
                  </li>
                  <li>
                    • Allowed types:{" "}
                    <span className="font-medium text-foreground">
                      {mediaUploadSettings.allowedMimeTypes?.length || 0}
                    </span>{" "}
                    file type(s)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </CardContent>
    </Card>
    </>
  );
}
