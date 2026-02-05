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
import { ImageZoom } from "@repo/shadcn-ui/image-zoom";
import {
  DataTable,
  type Column,
  type DataTableAction,
  type BulkAction,
} from "@/components/data-table";
import {
  FileImage,
  ImageIcon,
  Trash2,
  Download,
  Copy,
  Check,
  Eye,
  Calendar,
  File,
} from "lucide-react";
import type { MediaFile } from "@/services/types";

interface MediaTableViewProps {
  files: MediaFile[];
  loading: boolean;
  copiedUrl: string | null;
  searchTerm: string;
  selectedRows: MediaFile[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  formatFileSize: (bytes: number) => string;
  formatDate: (timestamp: number) => string;
  onCopyUrl: (url: string) => void;
  onOpenDeleteDialog: (file: MediaFile) => void;
  onBulkDelete: (rows: MediaFile[]) => void;
  onSearchChange: (value: string) => void;
  onSelectionChange: (rows: MediaFile[]) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onRefresh: () => void;
}

export function MediaTableView({
  files,
  loading,
  copiedUrl,
  searchTerm,
  selectedRows,
  currentPage,
  totalPages,
  pageSize,
  formatFileSize,
  formatDate,
  onCopyUrl,
  onOpenDeleteDialog,
  onBulkDelete,
  onSearchChange,
  onSelectionChange,
  onPageChange,
  onPageSizeChange,
  onRefresh,
}: MediaTableViewProps) {
  const columns: Column<MediaFile>[] = [
    {
      key: "preview",
      header: "Preview",
      cell: (file) => {
        const isImage =
          file.type?.startsWith("image/") ||
          file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);
        return (
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted ring-1 ring-gray-200 dark:ring-zinc-700 flex-shrink-0">
            {isImage ? (
              <ImageZoom>
                <Image
                  src={file.url}
                  alt={file.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full cursor-zoom-in"
                  unoptimized
                />
              </ImageZoom>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <File className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        );
      },
      className: "w-16",
    },
    {
      key: "name",
      header: "File Name",
      cell: (file) => (
        <div className="min-w-0">
          <p className="font-medium text-gray-900 dark:text-white truncate max-w-50">
            {file.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {file.type || "Unknown type"}
          </p>
        </div>
      ),
      sortable: true,
    },
    {
      key: "size",
      header: "Size",
      cell: (file) => (
        <span className="text-sm font-medium">{formatFileSize(file.size)}</span>
      ),
      sortable: true,
    },
    {
      key: "uploadedAt",
      header: "Uploaded",
      cell: (file) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(file.uploadedAt)}
        </div>
      ),
      sortable: true,
    },
    {
      key: "url",
      header: "URL",
      cell: (file) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopyUrl(file.url)}
          className="h-8 px-2"
        >
          {copiedUrl === file.url ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="ml-1 text-xs">Copy</span>
        </Button>
      ),
    },
  ];

  const actions: DataTableAction<MediaFile>[] = [
    {
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: (file) => window.open(file.url, "_blank"),
    },
    {
      label: "Download",
      icon: <Download className="h-4 w-4" />,
      onClick: (file) => {
        const a = document.createElement("a");
        a.href = file.url;
        a.download = file.name;
        a.target = "_blank";
        a.click();
      },
    },
    {
      label: "Copy URL",
      icon: <Copy className="h-4 w-4" />,
      onClick: (file) => onCopyUrl(file.url),
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: onOpenDeleteDialog,
      variant: "destructive",
    },
  ];

  const bulkActions: BulkAction<MediaFile>[] = [
    {
      label: "Delete Selected",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: onBulkDelete,
      variant: "destructive",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FileImage className="h-5 w-5 text-primary" />
            All Files
          </CardTitle>
          <CardDescription>
            {files.length} files in your media library
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          data={files}
          columns={columns}
          actions={actions}
          bulkActions={bulkActions}
          loading={loading}
          loadingText="Loading files..."
          emptyIcon={<ImageIcon className="h-8 w-8 text-gray-400" />}
          emptyTitle="No files uploaded yet"
          emptyDescription="Upload your first file using the dropzone above"
          searchable={true}
          searchPlaceholder="Search files..."
          searchValue={searchTerm}
          onSearchChange={onSearchChange}
          pagination={true}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={files.length}
          pageSize={pageSize}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          selectable={true}
          selectedRows={selectedRows}
          onSelectionChange={onSelectionChange}
          getRowId={(row) => row.key}
          onRefresh={onRefresh}
        />
      </CardContent>
    </Card>
  );
}
