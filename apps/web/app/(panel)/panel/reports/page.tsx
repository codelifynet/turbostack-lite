import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reports | TurboStack",
  description: "View and analyze your reports and analytics",
};

// Redirect to overview by default
export default function ReportsPage() {
  redirect("/panel/reports/overview");
}
