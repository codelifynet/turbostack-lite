import { Shield, User, Crown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface RoleConfig {
  label: string;
  icon: LucideIcon;
  className: string;
}

export const roleConfig: Record<string, RoleConfig> = {
  USER: {
    label: "User",
    icon: User,
    className: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  },
  ADMIN: {
    label: "Admin",
    icon: Shield,
    className: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
  },
  SUPER_ADMIN: {
    label: "Super Admin",
    icon: Crown,
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  },
};
