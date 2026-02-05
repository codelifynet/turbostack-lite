import { Metadata } from "next";
import { ReportsAnalyticsClient } from "./components/reports-analytics-client";

export const metadata: Metadata = {
  title: "Analytics | TurboStack",
  description: "Detailed analytics and insights",
};

export default function ReportsAnalyticsPage() {
  return <ReportsAnalyticsClient />;
}
