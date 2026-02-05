"use client";

import { Button } from "@repo/shadcn-ui/button";
import { Images, List, Grid3X3, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaPageHeaderProps {
  viewMode: "grid" | "table";
  loading: boolean;
  onViewModeChange: (mode: "grid" | "table") => void;
  onRefresh: () => void;
}

export function MediaPageHeader({
  viewMode,
  loading,
  onViewModeChange,
  onRefresh,
}: MediaPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10">
            <Images className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Media Library
            </h1>
            <p className="text-muted-foreground text-sm">
              Upload and manage your files
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === "table" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewModeChange("table")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewModeChange("grid")}
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={onRefresh} disabled={loading}>
          <RefreshCw
            className={cn("h-4 w-4 mr-2", loading && "animate-spin")}
          />
          Refresh
        </Button>
      </div>
    </div>
  );
}
