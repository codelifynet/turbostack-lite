import {
  LayoutDashboard,
  Users,
  Settings,
  Image,
  ShoppingCart,
  CreditCard,
  UserCircle,
  User,
  BarChart3,
  HelpCircle,
  FileText,
  TrendingUp,
  PieChart,
  Download,
  Bell,
  Ticket,
} from "lucide-react";

export interface SubMenuItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
}

export interface MenuItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
  roles?: ("USER" | "ADMIN" | "SUPERADMIN")[];
  badge?: string;
  subItems?: SubMenuItem[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const menuItems: MenuSection[] = [
  {
    title: "Main",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        href: "/panel",
        roles: ["USER", "ADMIN", "SUPERADMIN"],
      },
      {
        icon: User,
        label: "Profile",
        href: "/panel/profile",
        roles: ["USER", "ADMIN", "SUPERADMIN"],
      },
      {
        icon: Bell,
        label: "Notifications",
        href: "/panel/notifications",
        roles: ["USER", "ADMIN", "SUPERADMIN"],
      },
      {
        icon: CreditCard,
        label: "Billing",
        href: "/panel/billing",
        roles: ["USER", "ADMIN", "SUPERADMIN"],
      },
      {
        icon: BarChart3,
        label: "Usage",
        href: "/panel/usage",
        roles: ["USER", "ADMIN", "SUPERADMIN"],
      },
      {
        icon: Ticket,
        label: "Tickets",
        href: "/panel/tickets",
        roles: ["USER", "ADMIN", "SUPERADMIN"],
      },
      {
        icon: Settings,
        label: "Settings",
        href: "/panel/settings",
        roles: ["USER", "ADMIN", "SUPERADMIN"],
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        icon: Image,
        label: "Media",
        href: "/panel/media",
        roles: ["ADMIN", "SUPERADMIN"],
      },
      {
        icon: Users,
        label: "Users",
        href: "/panel/users",
        roles: ["ADMIN", "SUPERADMIN"],
      },
      {
        icon: UserCircle,
        label: "Customers",
        href: "/panel/customers",
        roles: ["ADMIN", "SUPERADMIN"],
      },
      {
        icon: ShoppingCart,
        label: "Orders",
        href: "/panel/orders",
        roles: ["ADMIN", "SUPERADMIN"],
      },
      {
        icon: CreditCard,
        label: "Subscriptions",
        href: "/panel/subscriptions",
        roles: ["ADMIN", "SUPERADMIN"],
      },
      {
        icon: FileText,
        label: "Reports",
        href: "/panel/reports",
        roles: ["ADMIN", "SUPERADMIN"],
        badge: "New",
        subItems: [
          {
            icon: TrendingUp,
            label: "Overview",
            href: "/panel/reports/overview",
          },
          {
            icon: PieChart,
            label: "Analytics",
            href: "/panel/reports/analytics",
          },
          {
            icon: Download,
            label: "Export",
            href: "/panel/reports/export",
          },
        ],
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        icon: HelpCircle,
        label: "Help & Support",
        href: "/panel/support",
        roles: ["USER", "ADMIN", "SUPERADMIN"],
      },
    ],
  },
];
