"use client";

import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import type { MediaFile } from "@/services/types";
import { MediaPageHeader } from "./media-page-header";
import { MediaStatsCards } from "./media-stats-cards";
import { MediaUploadSection } from "./media-upload-section";
import { MediaTableView } from "./media-table-view";
import { MediaGridView } from "./media-grid-view";
import { MediaDeleteDialog } from "./media-delete-dialog";
import { Loader2 } from "lucide-react";
import { Button } from "@repo/shadcn-ui/ui/button";
import { mockMediaFiles } from "@/mocks/media.mock";

interface MediaClientProps {
  initialFiles: MediaFile[];
}

// Simulate loading delay
const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function MediaClient({ initialFiles }: MediaClientProps) {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<MediaFile[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<MediaFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const loadFiles = useCallback(async () => {
    try {
      setLoading(true);
      await simulateDelay(800);
      setFiles(mockMediaFiles);
      toast.success("Media files refreshed successfully");
    } catch (error) {
      console.error("Error loading files:", error);
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadFiles();
  };

  // Stats calculations
  const stats = useMemo(() => {
    const totalFiles = files.length;
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    const imageFiles = files.filter(
      (f) =>
        f.type?.startsWith("image/") ||
        f.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i),
    ).length;
    const otherFiles = totalFiles - imageFiles;

    return {
      totalFiles,
      totalSize,
      imageFiles,
      otherFiles,
    };
  }, [files]);

  const handleUploadComplete = useCallback((uploaded: MediaFile[]) => {
    if (!uploaded || uploaded.length === 0) return;
    setFiles((prev) => [...uploaded, ...prev]);
    toast.success(`${uploaded.length} file(s) uploaded successfully!`);
  }, []);

  const handleCopyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("URL copied to clipboard!");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (file: MediaFile) => {
    setIsDeleting(true);
    try {
      await simulateDelay(600);
      setFiles((prev) => prev.filter((f) => f.key !== file.key));
      toast.success(`"${file.name}" deleted successfully!`);
    } catch {
      toast.error("Failed to delete file");
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setFileToDelete(null);
    }
  };

  const handleBulkDelete = async (rows: MediaFile[]) => {
    if (rows.length === 0) return;

    try {
      await simulateDelay(800);
      setFiles((prev) =>
        prev.filter((f) => !rows.some((r) => r.key === f.key)),
      );
      setSelectedRows([]);
      toast.success(`${rows.length} file(s) deleted successfully!`);
    } catch {
      toast.error("Failed to delete some files");
    }
  };

  const openDeleteDialog = useCallback((file: MediaFile) => {
    setFileToDelete(file);
    setDeleteDialogOpen(true);
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter files
  const filteredFiles = useMemo(() => {
    if (!searchTerm) return files;
    const term = searchTerm.toLowerCase();
    return files.filter(
      (file) =>
        file.name.toLowerCase().includes(term) ||
        file.type?.toLowerCase().includes(term),
    );
  }, [files, searchTerm]);

  // Paginate files
  const paginatedFiles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredFiles.slice(start, start + pageSize);
  }, [filteredFiles, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredFiles.length / pageSize);

  return (
    <div className="space-y-6">
      <MediaPageHeader
        viewMode={viewMode}
        loading={loading || isRefreshing}
        onViewModeChange={setViewMode}
        onRefresh={handleRefresh}
      />

      <MediaStatsCards stats={stats} formatFileSize={formatFileSize} />

      <MediaUploadSection onUploadComplete={handleUploadComplete} />

      {viewMode === "table" ? (
        <MediaTableView
          files={paginatedFiles}
          loading={loading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          onCopyUrl={handleCopyUrl}
          copiedUrl={copiedUrl}
          onOpenDeleteDialog={openDeleteDialog}
          onBulkDelete={handleBulkDelete}
          formatFileSize={formatFileSize}
          formatDate={formatDate}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          onRefresh={handleRefresh}
        />
      ) : (
        <MediaGridView
          files={paginatedFiles}
          loading={loading}
          copiedUrl={copiedUrl}
          onCopyUrl={handleCopyUrl}
          onOpenDeleteDialog={openDeleteDialog}
          formatFileSize={formatFileSize}
        />
      )}

      <MediaDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        file={fileToDelete}
        onConfirm={() => fileToDelete && handleDelete(fileToDelete)}
        isDeleting={isDeleting}
      />
    </div>
  );
}
