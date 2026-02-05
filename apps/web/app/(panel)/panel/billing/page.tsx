import { Metadata } from "next";
import { BillingClient } from "./components/billing-client";

export const metadata: Metadata = {
  title: "Billing | TurboStack",
  description:
    "Manage your billing information, view invoices, and update payment methods.",
  openGraph: {
    title: "Billing | TurboStack",
    description:
      "Manage your billing information, view invoices, and update payment methods.",
  },
};

export default function BillingPage() {
  return <BillingClient />;
}
