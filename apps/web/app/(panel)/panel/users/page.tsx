import type { Metadata } from "next";
import { mockUsers, mockUserStats } from "@/mocks/users.mock";
import { UsersClient } from "./components/users-client";

export const metadata: Metadata = {
  title: "Users | TurboStack",
  description:
    "Manage user accounts, permissions, and roles in your application.",
  openGraph: {
    title: "Users | TurboStack",
    description:
      "Manage user accounts, permissions, and roles in your application.",
  },
};

async function getUsers() {
  // Return mock data for development
  return {
    users: mockUsers,
    stats: mockUserStats,
  };
}

export default async function UsersPage() {
  const { users, stats } = await getUsers();

  return <UsersClient initialUsers={users} initialStats={stats} />;
}
