import { Metadata } from "next";
import { mockCustomers } from "@/mocks/customers.mock";
import { CustomersClient } from "./components/customers-client";

export const metadata: Metadata = {
  title: "Customers | TurboStack",
  description:
    "View and manage customer profiles, track purchase history, and analyze customer data.",
  openGraph: {
    title: "Customers | TurboStack",
    description:
      "View and manage customer profiles, track purchase history, and analyze customer data.",
  },
};

async function getCustomers() {
  return mockCustomers;
}

export default async function CustomersPage() {
  const initialCustomers = await getCustomers();

  return <CustomersClient initialCustomers={initialCustomers} />;
}
