"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  Package,
  CreditCard,
  UserPlus,
  AlertCircle,
  Settings,
  Trash2,
  CheckCheck,
  BellOff,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@repo/shadcn-ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/shadcn-ui/ui/dropdown-menu";
import { ScrollArea } from "@repo/shadcn-ui/ui/scroll-area";
import { cn } from "@/lib/utils";

// Types
export interface Notification {
  id: string;
  type: "order" | "user" | "payment" | "alert" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

// Initial mock data
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "New order received",
    description: "Order #1234 has been placed by John Doe",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "user",
    title: "New user registered",
    description: "Sarah Wilson just created an account",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "payment",
    title: "Payment successful",
    description: "Payment of $299.00 received for Order #1230",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "alert",
    title: "Low stock alert",
    description: "Product 'Wireless Headphones' is running low",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "System update completed",
    description: "Version 2.4.0 has been deployed successfully",
    time: "5 hours ago",
    read: true,
  },
];

// Icon configurations
const notificationIcons = {
  order: Package,
  user: UserPlus,
  payment: CreditCard,
  alert: AlertCircle,
  system: Settings,
};

const notificationColors = {
  order: {
    bg: "bg-blue-100 dark:bg-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-500/30",
  },
  user: {
    bg: "bg-emerald-100 dark:bg-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-500/30",
  },
  payment: {
    bg: "bg-green-100 dark:bg-green-500/20",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-500/30",
  },
  alert: {
    bg: "bg-amber-100 dark:bg-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-500/30",
  },
  system: {
    bg: "bg-purple-100 dark:bg-purple-500/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-500/30",
  },
};

interface NotificationsDropdownProps {
  className?: string;
}

export function NotificationsDropdown({
  className,
}: NotificationsDropdownProps) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const hasNotifications = notifications.length > 0;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "relative h-9 w-9 flex items-center justify-center rounded-xl",
            "bg-gray-100 dark:bg-zinc-800",
            "hover:bg-gray-200 dark:hover:bg-zinc-700",
            "border border-gray-200 dark:border-zinc-700",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
            className,
          )}
        >
          <Bell className="h-4.5 w-4.5 text-gray-600 dark:text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-96 p-0 overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-xl rounded-xl"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-linear-to-r from-gray-50 to-gray-100/50 dark:from-zinc-800/50 dark:to-zinc-900 border-b border-gray-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {unreadCount} unread message{unreadCount > 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
          {hasNotifications && unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2.5 text-xs font-medium text-primary hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg"
              onClick={markAllAsRead}
            >
              <CheckCheck className="mr-1.5 h-3.5 w-3.5" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notification List */}
        {!hasNotifications ? (
          <EmptyState />
        ) : (
          <ScrollArea className="h-95">
            <div className="p-2">
              {notifications.map((notification, index) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onDelete={deleteNotification}
                  isLast={index === notifications.length - 1}
                />
              ))}
            </div>
          </ScrollArea>
        )}

        {/* Footer */}
        {hasNotifications && (
          <div className="flex items-center justify-between p-2 border-t border-gray-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-900/50">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg"
              onClick={clearAll}
            >
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />
              Clear all
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-3 text-xs font-medium text-primary hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg"
              asChild
            >
              <Link href="/panel/notifications">
                View all
                <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Notification Item Component
interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  isLast: boolean;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  isLast,
}: NotificationItemProps) {
  const Icon = notificationIcons[notification.type];
  const colors = notificationColors[notification.type];

  return (
    <div
      className={cn(
        "group relative flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200",
        "hover:bg-gray-100 dark:hover:bg-zinc-800/70",
        !notification.read && "bg-primary/5 dark:bg-primary/10",
        !isLast && "mb-1",
      )}
      onClick={() => onMarkAsRead(notification.id)}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
          colors.bg,
          colors.border,
        )}
      >
        <Icon className={cn("h-5 w-5", colors.text)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm leading-tight text-gray-900 dark:text-white",
              !notification.read ? "font-semibold" : "font-medium",
            )}
          >
            {notification.title}
          </p>
          {!notification.read && (
            <span className="relative flex h-2.5 w-2.5 shrink-0 mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {notification.description}
        </p>
        <div className="flex items-center gap-1.5 pt-0.5">
          <Clock className="h-3 w-3 text-gray-400 dark:text-gray-500" />
          <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
            {notification.time}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!notification.read && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20"
            onClick={(e) => {
              e.stopPropagation();
              onMarkAsRead(notification.id);
            }}
            title="Mark as read"
          >
            <Check className="h-3.5 w-3.5 text-primary" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/50"
          onClick={(e) => onDelete(notification.id, e)}
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400" />
        </Button>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="relative mb-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 dark:bg-zinc-800">
          <BellOff className="h-8 w-8 text-gray-400 dark:text-gray-500" />
        </div>
        <div className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
          <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
        </div>
      </div>
      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
        All caught up!
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 max-w-50">
        You have no new notifications. We ll let you know when something
        arrives.
      </p>
    </div>
  );
}
