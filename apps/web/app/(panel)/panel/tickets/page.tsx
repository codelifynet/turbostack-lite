import type { Metadata } from "next";
import { TicketsClient } from "./components/tickets-client";

export const metadata: Metadata = {
  title: "Tickets | TurboStack",
  description:
    "Manage your support tickets and track their status.",
  openGraph: {
    title: "Tickets | TurboStack",
    description:
      "Manage your support tickets and track their status.",
  },
};

export default function TicketsPage() {
  return <TicketsClient />;
}
