import { Metadata } from "next";
import { ProfileClient } from "./components/profile-client";

export const metadata: Metadata = {
  title: "Profile | TurboStack",
  description:
    "Manage your profile settings, update personal information, and configure security options.",
  openGraph: {
    title: "Profile | TurboStack",
    description:
      "Manage your profile settings, update personal information, and configure security options.",
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
