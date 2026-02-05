import { Ticket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TicketItem {
  id: string;
  subject: string;
  description: string;
  status: "open" | "pending" | "resolved";
  priority: "high" | "medium" | "low";
  created: string;
  updated: string;
}

export interface TicketStat {
  key: string;
  title: string;
  value: number;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  iconColor: string;
}

export const mockTickets: TicketItem[] = [
  {
    id: "TKT-001",
    subject: "API Integration Issue",
    description: "Having trouble with authentication endpoints",
    status: "open",
    priority: "high",
    created: "2024-01-15",
    updated: "2024-01-18",
  },
  {
    id: "TKT-002",
    subject: "Dashboard Performance",
    description: "Page loading takes too long",
    status: "pending",
    priority: "medium",
    created: "2024-01-14",
    updated: "2024-01-17",
  },
  {
    id: "TKT-003",
    subject: "Feature Request: Dark Mode",
    description: "Request for dark theme support",
    status: "open",
    priority: "low",
    created: "2024-01-12",
    updated: "2024-01-16",
  },
  {
    id: "TKT-004",
    subject: "Database Connection Error",
    description: "Intermittent connection failures",
    status: "resolved",
    priority: "high",
    created: "2024-01-10",
    updated: "2024-01-15",
  },
  {
    id: "TKT-005",
    subject: "UI Component Bug",
    description: "Button alignment issue on mobile",
    status: "resolved",
    priority: "low",
    created: "2024-01-08",
    updated: "2024-01-12",
  },
];

export const ticketStats: TicketStat[] = [
  {
    key: "open",
    title: "Open Tickets",
    value: 8,
    icon: Ticket,
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    key: "pending",
    title: "Pending Response",
    value: 5,
    icon: Ticket,
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "resolved",
    title: "Resolved",
    value: 42,
    icon: Ticket,
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];
