import {
  Info,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  ShoppingCart,
  FileText,
  User,
  type LucideIcon,
} from "lucide-react";

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: LucideIcon;
}

export const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Payment Successful",
    message: "Your payment of $99.00 has been processed successfully.",
    timestamp: "2 hours ago",
    read: false,
    icon: CheckCircle2,
  },
  {
    id: "2",
    type: "info",
    title: "New Feature Available",
    message: "Check out our new analytics dashboard with advanced reporting features.",
    timestamp: "5 hours ago",
    read: false,
    icon: Info,
  },
  {
    id: "3",
    type: "warning",
    title: "Subscription Expiring Soon",
    message: "Your subscription will expire in 7 days. Renew now to avoid service interruption.",
    timestamp: "1 day ago",
    read: true,
    icon: AlertTriangle,
  },
  {
    id: "4",
    type: "success",
    title: "Profile Updated",
    message: "Your profile information has been updated successfully.",
    timestamp: "2 days ago",
    read: true,
    icon: User,
  },
  {
    id: "5",
    type: "info",
    title: "New Order Received",
    message: "You have received a new order #12345. View details in the orders section.",
    timestamp: "3 days ago",
    read: true,
    icon: ShoppingCart,
  },
  {
    id: "6",
    type: "error",
    title: "Payment Failed",
    message: "We couldn't process your payment. Please update your payment method.",
    timestamp: "4 days ago",
    read: true,
    icon: CreditCard,
  },
  {
    id: "7",
    type: "info",
    title: "Report Generated",
    message: "Your monthly report is ready to download.",
    timestamp: "5 days ago",
    read: true,
    icon: FileText,
  },
];

export const notificationTypeConfig = {
  info: {
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-500/20",
    border: "border-blue-200 dark:border-blue-500/30",
  },
  success: {
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-500/20",
    border: "border-green-200 dark:border-green-500/30",
  },
  warning: {
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-500/20",
    border: "border-orange-200 dark:border-orange-500/30",
  },
  error: {
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-500/20",
    border: "border-red-200 dark:border-red-500/30",
  },
};
