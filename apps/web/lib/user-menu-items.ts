import {
  LayoutDashboard,
  Settings,
  User,
  CreditCard,
  Bell,
  HelpCircle,
} from "lucide-react";

export interface UserMenuItem {
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}

export interface UserMenuGroup {
  group: string;
  items: UserMenuItem[];
}

export const userMenuItems: UserMenuGroup[] = [
  {
    group: "main",
    items: [
      { href: "/panel", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/panel/settings", icon: Settings, label: "Settings" },
      { href: "/panel/profile", icon: User, label: "Profile" },
    ],
  },
  {
    group: "secondary",
    items: [
      { href: "/panel/billing", icon: CreditCard, label: "Billing" },
      { href: "/panel/notifications", icon: Bell, label: "Notifications" },
      { href: "/panel/support", icon: HelpCircle, label: "Help & Support" },
    ],
  },
];
