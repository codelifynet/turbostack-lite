"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  RefreshCw,
  Download,
  X,
  Inbox,
} from "lucide-react";
import { Button } from "@repo/shadcn-ui/button";
import { Input } from "@repo/shadcn-ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn-ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/shadcn-ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/shadcn-ui/dropdown-menu";
import { Checkbox } from "@repo/shadcn-ui/checkbox";
import { cn } from "@/lib/utils";

// Types
export interface Column<T> {
  key: string;
  header: string | React.ReactNode;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

export interface DataTableAction<T> {
  label: string | ((row: T) => string);
  icon?: React.ReactNode | ((row: T) => React.ReactNode);
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
  disabled?: (row: T) => boolean;
}

export interface BulkAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (rows: T[]) => void;
  variant?: "default" | "destructive" | "warning";
  disabled?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: DataTableAction<T>[];
  bulkActions?: BulkAction<T>[];

  // Loading & Empty states
  loading?: boolean;
  loadingText?: string;
  emptyIcon?: React.ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;

  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  // Pagination
  pagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;

  // Selection
  selectable?: boolean;
  selectedRows?: T[];
  onSelectionChange?: (rows: T[]) => void;
  getRowId?: (row: T) => string;

  // Sorting
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSortChange?: (column: string, direction: "asc" | "desc") => void;

  // Actions
  onRefresh?: () => void;
  onExport?: () => void;

  // Styling
  className?: string;
  headerClassName?: string;
  rowClassName?: (row: T, index: number) => string;
}

export function DataTable<T>({
  data,
  columns,
  actions,
  bulkActions,
  loading = false,
  loadingText = "Loading data...",
  emptyIcon,
  emptyTitle = "No results found",
  emptyDescription = "Try adjusting your search or filter to find what you're looking for.",
  searchable = true,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  pagination = true,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  onPageChange,
  onPageSizeChange,
  selectable = false,
  selectedRows = [],
  onSelectionChange,
  getRowId = (row: T) => String((row as { id: string | number }).id),
  sortColumn,
  sortDirection,
  onSortChange,
  onRefresh,
  onExport,
  className,
  headerClassName,
  rowClassName,
}: DataTableProps<T>) {
  const [localSearchValue, setLocalSearchValue] = React.useState(searchValue);

  // Handle search with debounce
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange?.(localSearchValue);
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearchValue, onSearchChange]);

  // Selection handlers
  const isAllSelected = data.length > 0 && selectedRows.length === data.length;
  const isSomeSelected =
    selectedRows.length > 0 && selectedRows.length < data.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      onSelectionChange?.([]);
    } else {
      onSelectionChange?.(data);
    }
  };

  const handleSelectRow = (row: T) => {
    const rowId = getRowId(row);
    const isSelected = selectedRows.some((r) => getRowId(r) === rowId);
    if (isSelected) {
      onSelectionChange?.(selectedRows.filter((r) => getRowId(r) !== rowId));
    } else {
      onSelectionChange?.([...selectedRows, row]);
    }
  };

  const isRowSelected = (row: T) => {
    return selectedRows.some((r) => getRowId(r) === getRowId(row));
  };

  // Sort handler
  const handleSort = (column: string) => {
    if (!onSortChange) return;
    if (sortColumn === column) {
      onSortChange(column, sortDirection === "asc" ? "desc" : "asc");
    } else {
      onSortChange(column, "asc");
    }
  };

  // Render sort icon
  const renderSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <ArrowUpDown className="ml-2 h-3.5 w-3.5 text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-2 h-3.5 w-3.5 text-primary" />
    ) : (
      <ArrowDown className="ml-2 h-3.5 w-3.5 text-primary" />
    );
  };

  // Calculate pagination info
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Bulk Actions Bar */}
      {selectedRows.length > 0 && bulkActions && bulkActions.length > 0 && (
        <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20">
              <span className="text-sm font-semibold text-primary">
                {selectedRows.length}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {selectedRows.length === 1 ? "item selected" : "items selected"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {bulkActions.map((action, index) => (
              <Button
                key={index}
                variant={
                  action.variant === "destructive"
                    ? "destructive"
                    : action.variant === "warning"
                      ? "outline"
                      : "outline"
                }
                size="sm"
                onClick={() => action.onClick(selectedRows)}
                disabled={action.disabled || loading}
                className={cn(
                  "h-8",
                  action.variant === "warning" &&
                    "border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/50",
                  action.variant === "default" &&
                    "border-gray-200 dark:border-zinc-700",
                )}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSelectionChange?.([])}
              className="h-8 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Header Actions */}
      <div
        className={cn(
          "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
          headerClassName,
        )}
      >
        {/* Search */}
        {searchable && (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              value={localSearchValue}
              onChange={(e) => setLocalSearchValue(e.target.value)}
              className="pl-10 h-10 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 focus:border-primary focus:ring-primary/20"
            />
            {localSearchValue && (
              <button
                onClick={() => setLocalSearchValue("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {onRefresh && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={loading}
              className="h-9 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            </Button>
          )}
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="h-9 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50">
              {selectable && (
                <TableHead className="w-12 px-4">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className="border-gray-500 dark:border-zinc-600 bg-white dark:bg-zinc-900 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider",
                    column.sortable &&
                      "cursor-pointer select-none hover:text-gray-900 dark:hover:text-white transition-colors",
                    column.headerClassName,
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && renderSortIcon(column.key)}
                  </div>
                </TableHead>
              ))}
              {actions && actions.length > 0 && (
                <TableHead className="w-12 px-4 text-right">
                  <span className="sr-only">Actions</span>
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                  }
                  className="h-60"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full border-4 border-gray-200 dark:border-zinc-700" />
                      <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    </div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {loadingText}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)
                  }
                  className="h-60"
                >
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-800">
                      {emptyIcon || (
                        <Inbox className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {emptyTitle}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-62.5">
                        {emptyDescription}
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow
                  key={getRowId(row)}
                  className={cn(
                    "border-b border-gray-100 dark:border-zinc-800 last:border-0",
                    "hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors",
                    isRowSelected(row) &&
                      "bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/15",
                    rowClassName?.(row, index),
                  )}
                >
                  {selectable && (
                    <TableCell className="px-4">
                      <Checkbox
                        checked={isRowSelected(row)}
                        onCheckedChange={() => handleSelectRow(row)}
                        aria-label="Select row"
                        className="border-gray-500 dark:border-zinc-600 bg-white dark:bg-zinc-900 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn("px-4 py-3", column.className)}
                    >
                      {column.cell(row)}
                    </TableCell>
                  ))}
                  {actions && actions.length > 0 && (
                    <TableCell className="px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-48 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                        >
                          {actions.map((action, actionIndex) => {
                            const label =
                              typeof action.label === "function"
                                ? action.label(row)
                                : action.label;
                            const icon =
                              typeof action.icon === "function"
                                ? action.icon(row)
                                : action.icon;
                            return (
                              <React.Fragment key={label}>
                                {actionIndex > 0 &&
                                  action.variant === "destructive" && (
                                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-zinc-800" />
                                  )}
                                <DropdownMenuItem
                                  onClick={() => action.onClick(row)}
                                  disabled={action.disabled?.(row)}
                                  className={cn(
                                    "cursor-pointer",
                                    action.variant === "destructive" &&
                                      "text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/50",
                                  )}
                                >
                                  {icon && <span className="mr-2">{icon}</span>}
                                  {label}
                                </DropdownMenuItem>
                              </React.Fragment>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-2">
          {/* Items info */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {startItem}
            </span>{" "}
            to{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {endItem}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              {totalItems}
            </span>{" "}
            results
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-2">
            {/* Page size selector */}
            {onPageSizeChange && (
              <div className="flex items-center gap-2 mr-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Rows:
                </span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => onPageSizeChange(parseInt(value))}
                >
                  <SelectTrigger className="h-8 w-[70px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
                    {pageSizeOptions.map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange?.(1)}
                disabled={currentPage === 1 || loading}
                className="h-8 w-8 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 disabled:opacity-50"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="h-8 w-8 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page numbers */}
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      onClick={() => onPageChange?.(pageNum)}
                      disabled={loading}
                      className={cn(
                        "h-8 w-8",
                        currentPage === pageNum
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800",
                      )}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage === totalPages || loading}
                className="h-8 w-8 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onPageChange?.(totalPages)}
                disabled={currentPage === totalPages || loading}
                className="h-8 w-8 bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 disabled:opacity-50"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
