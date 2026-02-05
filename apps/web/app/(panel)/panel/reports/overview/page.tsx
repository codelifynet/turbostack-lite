import { Metadata } from "next";
import { ReportsOverviewClient } from "./components/reports-overview-client";

export const metadata: Metadata = {
  title: "Reports Overview | TurboStack",
  description: "Overview of your reports and key metrics",
};

export default function ReportsOverviewPage() {
  return <ReportsOverviewClient />;
}
