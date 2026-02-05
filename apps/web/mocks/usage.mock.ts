import {
  Activity,
  Database,
  Users,
  Upload,
  type LucideIcon,
} from "lucide-react";

export interface UsageItem {
  name: string;
  icon: LucideIcon;
  current: number;
  limit: number;
  unit: string;
  color: string;
  iconColor: string;
  iconBg: string;
  gradient: string;
}

export const usageData: UsageItem[] = [
  {
    name: "API Requests",
    icon: Activity,
    current: 1250,
    limit: 10000,
    unit: "requests",
    color: "text-blue-600 dark:text-blue-400",
    iconColor: "text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-500/20",
    gradient: "from-blue-50/50 to-white dark:from-blue-500/10 dark:to-transparent",
  },
  {
    name: "Storage",
    icon: Database,
    current: 2.3,
    limit: 5,
    unit: "GB",
    color: "text-green-600 dark:text-green-400",
    iconColor: "text-green-600 dark:text-green-400",
    iconBg: "bg-green-100 dark:bg-green-500/20",
    gradient: "from-green-50/50 to-white dark:from-green-500/10 dark:to-transparent",
  },
  {
    name: "Users",
    icon: Users,
    current: 45,
    limit: 100,
    unit: "users",
    color: "text-purple-600 dark:text-purple-400",
    iconColor: "text-purple-600 dark:text-purple-400",
    iconBg: "bg-purple-100 dark:bg-purple-500/20",
    gradient: "from-purple-50/50 to-white dark:from-purple-500/10 dark:to-transparent",
  },
  {
    name: "Uploads",
    icon: Upload,
    current: 320,
    limit: 1000,
    unit: "files",
    color: "text-orange-600 dark:text-orange-400",
    iconColor: "text-orange-600 dark:text-orange-400",
    iconBg: "bg-orange-100 dark:bg-orange-500/20",
    gradient: "from-orange-50/50 to-white dark:from-orange-500/10 dark:to-transparent",
  },
];
