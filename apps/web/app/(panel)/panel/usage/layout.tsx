import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usage | TurboStack",
  description: "Track your usage statistics and monitor resource consumption.",
  openGraph: {
    title: "Usage | TurboStack",
    description:
      "Track your usage statistics and monitor resource consumption.",
  },
};

export default function UsageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
