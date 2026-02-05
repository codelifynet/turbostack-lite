import { Metadata } from "next";
import { SupportClient } from "./components/support-client";

export const metadata: Metadata = {
  title: "Help & Support | TurboStack",
  description:
    "Get help and support for your TurboStack account.",
  openGraph: {
    title: "Help & Support | TurboStack",
    description:
      "Get help and support for your TurboStack account.",
  },
};

export default function SupportPage() {
  return <SupportClient />;
}
