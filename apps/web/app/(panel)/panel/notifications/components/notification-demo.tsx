"use client";

import { useNotifications } from "@/components/notification-provider";
import { Button } from "@repo/shadcn-ui/ui/button";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Sparkles,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/shadcn-ui/ui/card";
import { Badge } from "@repo/shadcn-ui/ui/badge";

const notificationTypes = [
  {
    type: "success" as const,
    title: "New Feature Enabled",
    message: "Real-time notifications are now active for your account!",
    icon: CheckCircle,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    borderColor: "border-emerald-200 dark:border-emerald-900",
    label: "Success Notification",
  },
  {
    type: "error" as const,
    title: "Connection Failed",
    message: "Unable to sync data. Please check your internet connection.",
    icon: AlertCircle,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    borderColor: "border-red-200 dark:border-red-900",
    label: "Error Notification",
  },
  {
    type: "warning" as const,
    title: "Storage Warning",
    message: "Your storage is 85% full. Consider upgrading your plan.",
    icon: AlertTriangle,
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    borderColor: "border-amber-200 dark:border-amber-900",
    label: "Warning Notification",
  },
  {
    type: "info" as const,
    title: "System Update",
    message: "A new version of TurboStack is available. Click to learn more.",
    icon: Info,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    borderColor: "border-blue-200 dark:border-blue-900",
    label: "Info Notification",
  },
];

export function NotificationDemo() {
  const { showNotification } = useNotifications();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center gap-2">
                Notification Center
                <Badge variant="secondary" className="text-xs">
                  Demo
                </Badge>
              </CardTitle>
              <CardDescription>
                Test the animated notification system with different types
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {notificationTypes.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      showNotification({
                        type: notification.type,
                        title: notification.title,
                        message: notification.message,
                        duration: 5000,
                      })
                    }
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 group ${notification.bgColor} ${notification.borderColor} hover:shadow-lg`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-br ${notification.color} shadow-md group-hover:shadow-lg transition-shadow`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                          {notification.label}
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="p-2 rounded-full bg-white/50 dark:bg-zinc-800/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Send className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-800/50 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-zinc-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  How it works
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Click any notification type above to see it animate from the
                  top of the screen with auto-dismiss progress bar.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
