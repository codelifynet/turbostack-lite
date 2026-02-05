import { Metadata } from "next";
import { mockSubscriptions } from "@/mocks/subscriptions.mock";
import { SubscriptionsClient } from "./components/subscriptions-client";

export const metadata: Metadata = {
  title: "Subscriptions | TurboStack",
  description:
    "Manage customer subscriptions, billing cycles, and subscription plans.",
  openGraph: {
    title: "Subscriptions | TurboStack",
    description:
      "Manage customer subscriptions, billing cycles, and subscription plans.",
  },
};

async function getSubscriptions() {
  return mockSubscriptions;
}

export default async function SubscriptionsPage() {
  const initialSubscriptions = await getSubscriptions();

  return <SubscriptionsClient initialSubscriptions={initialSubscriptions} />;
}
