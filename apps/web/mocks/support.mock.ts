import {
  Book,
  MessageSquare,
  FileQuestion,
  Zap,
  Clock,
  type LucideIcon,
} from "lucide-react";

export interface SupportStat {
  key: string;
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  iconColor: string;
}

export interface HelpTopic {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export const supportStats: SupportStat[] = [
  {
    key: "articles",
    title: "Help Articles",
    value: 248,
    icon: Book,
    gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    key: "avgResponse",
    title: "Avg Response Time",
    value: "2h",
    icon: Clock,
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "satisfaction",
    title: "Satisfaction Rate",
    value: "98%",
    icon: Zap,
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

export const helpTopics: HelpTopic[] = [
  {
    icon: Book,
    title: "Documentation",
    description: "Browse our comprehensive guides and tutorials",
    href: "/docs",
  },
  {
    icon: MessageSquare,
    title: "Community Forum",
    description: "Connect with other users and get answers",
    href: "#",
  },
  {
    icon: FileQuestion,
    title: "FAQ",
    description: "Find answers to commonly asked questions",
    href: "#",
  },
];
