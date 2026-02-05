"use client";

import Image from "next/image";
import { Button } from "@repo/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/card";
import {
  Grid3X3,
  Loader2,
  ImageIcon,
  Copy,
  Eye,
  Trash2,
  Check,
  File,
} from "lucide-react";
import type { MediaFile } from "@/services/types";

interface MediaGridViewProps {
  files: MediaFile[];
  loading: boolean;
  copiedUrl: string | null;
  formatFileSize: (bytes: number) => string;
  onCopyUrl: (url: string) => void;
  onOpenDeleteDialog: (file: MediaFile) => void;
}

export function MediaGridView({
  files,
  loading,
  copiedUrl,
  formatFileSize,
  onCopyUrl,
  onOpenDeleteDialog,
}: MediaGridViewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="h-5 w-5 text-primary" />
            Gallery View
          </CardTitle>
          <CardDescription>{files.length} files</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : files.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map((file) => (
              <div
                key={file.key}
                className="group relative aspect-square rounded-xl overflow-hidden bg-muted border ring-1 ring-gray-200 dark:ring-zinc-700 hover:ring-primary/50 transition-all"
              >
                {file.type?.startsWith("image/") ||
                file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ? (
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <File className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onCopyUrl(file.url)}
                  >
                    {copiedUrl === file.url ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => window.open(file.url, "_blank")}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onOpenDeleteDialog(file)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs truncate">{file.name}</p>
                  <p className="text-white/70 text-xs">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">No files yet</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              Upload files using the dropzone above to see them here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
