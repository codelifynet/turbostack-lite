import type { Metadata } from "next";
import { SettingsClient } from "./components/settings-client";

export const metadata: Metadata = {
  title: "Settings | TurboStack",
  description:
    "Manage application settings, customize appearance, configure media uploads, and security options.",
  openGraph: {
    title: "Settings | TurboStack",
    description:
      "Manage application settings, customize appearance, configure media uploads, and security options.",
  },
};

export default function SettingsPage() {
  return <SettingsClient />;
}
