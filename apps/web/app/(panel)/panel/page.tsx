import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | TurboStack",
  description:
    "View analytics, statistics, and key metrics for your application in one centralized dashboard.",
  openGraph: {
    title: "Dashboard | TurboStack",
    description:
      "View analytics, statistics, and key metrics for your application in one centralized dashboard.",
  },
};

import { DashboardClient } from "./components/dashboard-client";

export default function AdminDashboard() {
  return <DashboardClient />;
}
