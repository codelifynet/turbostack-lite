import { Metadata } from "next";
import { NotificationsClient } from "./components/notifications-client";

export const metadata: Metadata = {
  title: "Notifications | TurboStack",
  description: "View and manage your notifications",
};

export default function NotificationsPage() {
  return <NotificationsClient />;
}
