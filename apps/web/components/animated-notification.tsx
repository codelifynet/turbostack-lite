"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
  Bell,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AnimatedNotificationProps {
  notification: Notification;
  onDismiss: (id: string) => void;
}

const notificationConfig = {
  success: {
    icon: CheckCircle,
    colors: {
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-900",
      icon: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
      progress: "bg-emerald-500",
    },
  },
  error: {
    icon: XCircle,
    colors: {
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-900",
      icon: "text-red-600 dark:text-red-400",
      iconBg: "bg-red-100 dark:bg-red-900/50",
      progress: "bg-red-500",
    },
  },
  warning: {
    icon: AlertTriangle,
    colors: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-900",
      icon: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
      progress: "bg-amber-500",
    },
  },
  info: {
    icon: Info,
    colors: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-900",
      icon: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
      progress: "bg-blue-500",
    },
  },
};

function AnimatedNotification({
  notification,
  onDismiss,
}: AnimatedNotificationProps) {
  const [progress, setProgress] = useState(100);
  const config = notificationConfig[notification.type];
  const Icon = config.icon;
  const duration = notification.duration || 5000;

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const remaining = Math.max(0, endTime - now);
      const newProgress = (remaining / duration) * 100;

      setProgress(newProgress);

      if (remaining > 0) {
        requestAnimationFrame(updateProgress);
      } else {
        onDismiss(notification.id);
      }
    };

    const animationFrame = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrame);
  }, [duration, notification.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.4,
      }}
      className={cn(
        "relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl",
        "border backdrop-blur-sm",
        config.colors.bg,
        config.colors.border,
      )}
    >
      {/* Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 opacity-50 blur-xl",
          notification.type === "success" && "bg-emerald-500/20",
          notification.type === "error" && "bg-red-500/20",
          notification.type === "warning" && "bg-amber-500/20",
          notification.type === "info" && "bg-blue-500/20",
        )}
      />

      <div className="relative p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            className={cn(
              "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
              config.colors.iconBg,
            )}
          >
            <Icon className={cn("w-6 h-6", config.colors.icon)} />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <motion.h4
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-semibold text-zinc-900 dark:text-zinc-100 text-base"
                >
                  {notification.title}
                </motion.h4>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-1 text-sm text-zinc-600 dark:text-zinc-400"
                >
                  {notification.message}
                </motion.p>
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDismiss(notification.id)}
                className="flex-shrink-0 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Action Button */}
            {notification.action && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={notification.action.onClick}
                className={cn(
                  "mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
                )}
              >
                {notification.action.label}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-200 dark:bg-zinc-800">
        <motion.div
          className={cn("h-full", config.colors.progress)}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0 }}
        />
      </div>
    </motion.div>
  );
}

// Notification Provider/Container
export function NotificationContainer({
  notifications,
  onDismiss,
}: {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}) {
  return (
    <AnimatePresence mode="popLayout">
      {notifications.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pointer-events-auto">
            <div className="flex flex-col gap-3">
              {notifications.map((notification) => (
                <AnimatedNotification
                  key={notification.id}
                  notification={notification}
                  onDismiss={onDismiss}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Hook for using notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback(
    (notification: Omit<Notification, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setNotifications((prev) => [...prev, { ...notification, id }]);
      return id;
    },
    [],
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    showNotification,
    dismissNotification,
    clearAll,
  };
}

// Example trigger button component
export function NotificationTrigger({
  onClick,
  label = "Show Notification",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-xl",
        "bg-gradient-to-r from-primary to-primary/80",
        "text-white font-medium shadow-lg shadow-primary/25",
        "hover:shadow-xl hover:shadow-primary/30 transition-shadow",
      )}
    >
      <Bell className="w-4 h-4" />
      {label}
      <Sparkles className="w-4 h-4 ml-1" />
    </motion.button>
  );
}
