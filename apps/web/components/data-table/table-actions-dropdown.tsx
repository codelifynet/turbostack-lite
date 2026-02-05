"use client";

import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@repo/shadcn-ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@repo/shadcn-ui/dropdown-menu";
import { cn } from "@/lib/utils";

export interface TableAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: "default" | "destructive" | "warning";
  disabled?: boolean;
  description?: string;
}

export interface TableActionGroup<T> {
  label?: string;
  actions: TableAction<T>[];
}

interface TableActionsDropdownProps<T> {
  row: T;
  actions?: TableAction<T>[];
  groups?: TableActionGroup<T>[];
  align?: "start" | "center" | "end";
  triggerClassName?: string;
}

export function TableActionsDropdown<T>({
  row,
  actions,
  groups,
  align = "end",
  triggerClassName,
}: TableActionsDropdownProps<T>) {
  const hasGroups = groups && groups.length > 0;
  const hasActions = actions && actions.length > 0;

  if (!hasGroups && !hasActions) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
            "hover:bg-gray-100 dark:hover:bg-zinc-800",
            "focus-visible:ring-1 focus-visible:ring-primary/50",
            "transition-all duration-200",
            triggerClassName,
          )}
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className={cn(
          "w-56 p-1.5",
          "bg-white dark:bg-zinc-900",
          "border border-gray-200 dark:border-zinc-800",
          "rounded-xl shadow-lg shadow-black/5 dark:shadow-black/20",
          "animate-in fade-in-0 zoom-in-95",
        )}
        sideOffset={8}
      >
        {hasGroups
          ? groups.map((group, groupIndex) => (
              <React.Fragment key={group.label || `group-${groupIndex}`}>
                {groupIndex > 0 && (
                  <DropdownMenuSeparator className="my-1.5 bg-gray-100 dark:bg-zinc-800" />
                )}
                {group.label && (
                  <DropdownMenuLabel className="px-2 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500">
                    {group.label}
                  </DropdownMenuLabel>
                )}
                {group.actions.map((action) => (
                  <ActionItem key={action.label} action={action} row={row} />
                ))}
              </React.Fragment>
            ))
          : hasActions &&
            actions.map((action, actionIndex) => (
              <React.Fragment key={action.label}>
                {actionIndex > 0 && action.variant === "destructive" && (
                  <DropdownMenuSeparator className="my-1.5 bg-gray-100 dark:bg-zinc-800" />
                )}
                <ActionItem action={action} row={row} />
              </React.Fragment>
            ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ActionItemProps<T> {
  action: TableAction<T>;
  row: T;
}

function ActionItem<T>({ action, row }: ActionItemProps<T>) {
  return (
    <DropdownMenuItem
      onClick={() => action.onClick(row)}
      disabled={action.disabled}
      className={cn(
        "cursor-pointer px-2.5 py-2 rounded-lg",
        "flex items-center gap-3",
        "text-sm font-medium",
        "transition-colors duration-150",
        action.variant === "destructive" && [
          "text-red-600 dark:text-red-400",
          "focus:text-red-700 dark:focus:text-red-300",
          "focus:bg-red-50 dark:focus:bg-red-950/50",
        ],
        action.variant === "warning" && [
          "text-amber-600 dark:text-amber-400",
          "focus:text-amber-700 dark:focus:text-amber-300",
          "focus:bg-amber-50 dark:focus:bg-amber-950/50",
        ],
        action.variant === "default" && [
          "text-gray-700 dark:text-gray-200",
          "focus:text-gray-900 dark:focus:text-white",
          "focus:bg-gray-100 dark:focus:bg-zinc-800",
        ],
        !action.variant && [
          "text-gray-700 dark:text-gray-200",
          "focus:text-gray-900 dark:focus:text-white",
          "focus:bg-gray-100 dark:focus:bg-zinc-800",
        ],
      )}
    >
      {action.icon && (
        <span
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg shrink-0",
            action.variant === "destructive" &&
              "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
            action.variant === "warning" &&
              "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
            (!action.variant || action.variant === "default") &&
              "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400",
          )}
        >
          {action.icon}
        </span>
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="truncate">{action.label}</span>
        {action.description && (
          <span
            className={cn(
              "text-[11px] font-normal truncate",
              action.variant === "destructive"
                ? "text-red-500/80 dark:text-red-400/60"
                : action.variant === "warning"
                  ? "text-amber-500/80 dark:text-amber-400/60"
                  : "text-gray-400 dark:text-gray-500",
            )}
          >
            {action.description}
          </span>
        )}
      </div>
    </DropdownMenuItem>
  );
}

export default TableActionsDropdown;
