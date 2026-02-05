import { Metadata } from "next";
import { UsageClient } from "./components/usage-client";

export const metadata: Metadata = {
  title: "Usage | TurboStack",
  description: "Monitor your resource usage and limits",
  openGraph: {
    title: "Usage | TurboStack",
    description: "Monitor your resource usage and limits",
  },
};

export default function UsagePage() {
  return (
    <div className="space-y-6">
      <UsageClient />
    </div>
  );
}
