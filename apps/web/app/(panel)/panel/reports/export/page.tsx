import { Metadata } from "next";
import { ReportsExportClient } from "./components/reports-export-client";

export const metadata: Metadata = {
  title: "Export Reports | TurboStack",
  description: "Export your reports and data",
};

export default function ReportsExportPage() {
  return <ReportsExportClient />;
}
