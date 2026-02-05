"use client";

import {
  User,
  Shield,
  Bell,
  Lock,
  Palette,
  CreditCard,
  BarChart3,
  Plug,
  Database,
  ImageIcon,
} from "lucide-react";
import { Card, CardContent } from "@repo/shadcn-ui/card";
import { Badge } from "@repo/shadcn-ui/badge";

export type SettingsTab =
  | "profile"
  | "account"
  | "notifications"
  | "privacy"
  | "appearance"
  | "billing"
  | "usage"
  | "integrations"
  | "data"
  | "media";

interface SettingsNavigationProps {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
  userRole: string;
}

type NavItem = {
  id: SettingsTab;
  label: string;
  icon: typeof User;
  roles: string[];
  badge?: string;
};

const navItems: NavItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
    roles: ["USER", "ADMIN", "SUPERADMIN"],
  },
  {
    id: "account",
    label: "Account & Security",
    icon: Shield,
    roles: ["USER", "ADMIN", "SUPERADMIN"],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    roles: ["USER", "ADMIN", "SUPERADMIN"],
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Lock,
    roles: ["USER", "ADMIN", "SUPERADMIN"],
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    roles: ["USER", "ADMIN", "SUPERADMIN"],
  },
  {
    id: "billing",
    label: "Billing & Subscription",
    icon: CreditCard,
    roles: ["USER", "ADMIN", "SUPERADMIN"],
  },
  {
    id: "usage",
    label: "Usage & Limits",
    icon: BarChart3,
    roles: ["USER", "ADMIN", "SUPERADMIN"],
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Plug,
    roles: ["USER", "ADMIN", "SUPERADMIN"],
  },
  {
    id: "data",
    label: "Data Management",
    icon: Database,
    roles: ["USER", "ADMIN", "SUPERADMIN"],
  },
  {
    id: "media",
    label: "Media Upload",
    icon: ImageIcon,
    roles: ["ADMIN", "SUPERADMIN"],
    badge: "Admin",
  },
];

export function SettingsNavigation({
  activeTab,
  onTabChange,
  userRole,
}: SettingsNavigationProps) {
  const filteredItems = navItems.filter((item) =>
    item.roles.includes(userRole),
  );

  return (
    <Card className="lg:col-span-1 h-fit">
      <CardContent className="p-4">
        <nav className="space-y-1">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {item.label}
                </div>
                {item.badge && !isActive && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] px-1.5 py-0"
                  >
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </nav>
      </CardContent>
    </Card>
  );
}
