"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Copy,
  Download,
  Share2,
  Ban,
  CheckCircle,
  XCircle,
  Mail,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@repo/shadcn-ui/ui/button";
import { cn } from "@/lib/utils";

export type ActionVariant = "default" | "destructive" | "success" | "warning";

export interface ActionItem<T = unknown> {
  label: string;
  icon?: LucideIcon;
  onClick: (item: T) => void;
  variant?: ActionVariant;
  disabled?: boolean;
  shortcut?: string;
  separator?: boolean;
}

interface ActionsDropdownProps<T> {
  item: T;
  actions: ActionItem<T>[];
  align?: "left" | "right";
  triggerLabel?: string;
}

const variantStyles: Record<ActionVariant, string> = {
  default:
    "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
  destructive:
    "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30",
  success:
    "text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
  warning:
    "text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30",
};

export function ActionsDropdown<T>({
  item,
  actions,
  align = "right",
  triggerLabel = "Actions",
}: ActionsDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: ActionItem<T>) => {
    if (!action.disabled) {
      action.onClick(item);
      setIsOpen(false);
    }
  };

  // Separate actions into groups by separator
  const actionGroups: ActionItem<T>[][] = [];
  let currentGroup: ActionItem<T>[] = [];

  actions.forEach((action) => {
    currentGroup.push(action);
    if (action.separator) {
      actionGroups.push(currentGroup);
      currentGroup = [];
    }
  });

  if (currentGroup.length > 0) {
    actionGroups.push(currentGroup);
  }

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 w-8 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <MoreHorizontal className="h-4 w-4" />
        <span className="sr-only">{triggerLabel}</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute z-50 min-w-[200px] rounded-xl",
                "bg-white dark:bg-zinc-900",
                "border border-zinc-200 dark:border-zinc-800",
                "shadow-xl shadow-zinc-200/50 dark:shadow-black/50",
                "py-1",
                align === "right" ? "right-0" : "left-0",
              )}
            >
              {actionGroups.map((group, groupIndex) => (
                <div key={`group-${group[0]?.label || groupIndex}`}>
                  {groupIndex > 0 && (
                    <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                  )}
                  <div className="py-1">
                    {group.map((action) => {
                      const Icon = action.icon;
                      return (
                        <motion.button
                          key={action.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: Math.random() * 0.1 }}
                          onClick={() => handleAction(action)}
                          disabled={action.disabled}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2 text-sm",
                            "transition-colors duration-150",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            variantStyles[action.variant || "default"],
                          )}
                        >
                          {Icon && <Icon className="h-4 w-4 flex-shrink-0" />}
                          <span className="flex-1 text-left">
                            {action.label}
                          </span>
                          {action.shortcut && (
                            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                              {action.shortcut}
                            </kbd>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Predefined action presets for common use cases
export const commonActions = {
  view: <T,>(onView: (item: T) => void): ActionItem<T> => ({
    label: "View Details",
    icon: Eye,
    onClick: onView,
    variant: "default",
  }),

  edit: <T,>(onEdit: (item: T) => void): ActionItem<T> => ({
    label: "Edit",
    icon: Pencil,
    onClick: onEdit,
    variant: "default",
  }),

  delete: <T,>(onDelete: (item: T) => void): ActionItem<T> => ({
    label: "Delete",
    icon: Trash2,
    onClick: onDelete,
    variant: "destructive",
    separator: true,
  }),

  duplicate: <T,>(onDuplicate: (item: T) => void): ActionItem<T> => ({
    label: "Duplicate",
    icon: Copy,
    onClick: onDuplicate,
    variant: "default",
  }),

  download: <T,>(onDownload: (item: T) => void): ActionItem<T> => ({
    label: "Download",
    icon: Download,
    onClick: onDownload,
    variant: "default",
  }),

  share: <T,>(onShare: (item: T) => void): ActionItem<T> => ({
    label: "Share",
    icon: Share2,
    onClick: onShare,
    variant: "default",
  }),

  activate: <T,>(onActivate: (item: T) => void): ActionItem<T> => ({
    label: "Activate",
    icon: CheckCircle,
    onClick: onActivate,
    variant: "success",
  }),

  deactivate: <T,>(onDeactivate: (item: T) => void): ActionItem<T> => ({
    label: "Deactivate",
    icon: Ban,
    onClick: onDeactivate,
    variant: "warning",
  }),

  sendEmail: <T,>(onSendEmail: (item: T) => void): ActionItem<T> => ({
    label: "Send Email",
    icon: Mail,
    onClick: onSendEmail,
    variant: "default",
  }),

  openExternal: <T,>(url: string): ActionItem<T> => ({
    label: "Open in New Tab",
    icon: ExternalLink,
    onClick: () => window.open(url, "_blank"),
    variant: "default",
  }),
};
