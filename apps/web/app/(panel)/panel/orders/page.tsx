import { Metadata } from "next";
import { mockOrders } from "@/mocks/orders.mock";
import { OrdersClient } from "./components/orders-client";

export const metadata: Metadata = {
  title: "Orders | TurboStack",
  description:
    "View and manage customer orders, track order status, and handle refunds.",
  openGraph: {
    title: "Orders | TurboStack",
    description:
      "View and manage customer orders, track order status, and handle refunds.",
  },
};

async function getOrders() {
  return mockOrders;
}

export default async function OrdersPage() {
  const initialOrders = await getOrders();

  return <OrdersClient initialOrders={initialOrders} />;
}
