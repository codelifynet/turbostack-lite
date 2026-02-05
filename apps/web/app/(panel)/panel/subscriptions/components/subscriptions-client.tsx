"use client";

import { useState, useMemo } from "react";
import type { Subscription, SubscriptionsStats } from "@repo/types";
import { SubscriptionsPageHeader } from "./subscriptions-page-header";
import { SubscriptionsStatsCards } from "./subscriptions-stats-cards";
import { SubscriptionsTable } from "./subscriptions-table";

interface SubscriptionsClientProps {
  initialSubscriptions: Subscription[];
}

export function SubscriptionsClient({
  initialSubscriptions,
}: SubscriptionsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscriptions = useMemo(() => {
    if (!searchTerm) return initialSubscriptions;
    const term = searchTerm.toLowerCase();
    return initialSubscriptions.filter(
      (subscription) =>
        subscription.id.toLowerCase().includes(term) ||
        subscription.customer.toLowerCase().includes(term) ||
        subscription.email.toLowerCase().includes(term),
    );
  }, [initialSubscriptions, searchTerm]);

  const stats = useMemo<SubscriptionsStats>(() => {
    const total = initialSubscriptions.length;
    const active = initialSubscriptions.filter(
      (s) => s.status === "active",
    ).length;
    const mrr = initialSubscriptions
      .filter((s) => s.status === "active")
      .reduce((sum, s) => {
        const monthlyAmount =
          s.billingCycle === "yearly" ? s.amount / 12 : s.amount;
        return sum + monthlyAmount;
      }, 0);
    const arr = initialSubscriptions
      .filter((s) => s.status === "active")
      .reduce((sum, s) => {
        return s.billingCycle === "yearly"
          ? sum + s.amount
          : sum + s.amount * 12;
      }, 0);

    return { total, active, mrr, arr };
  }, [initialSubscriptions]);

  return (
    <div className="space-y-6">
      <SubscriptionsPageHeader totalSubscriptions={stats.total} />
      <SubscriptionsStatsCards stats={stats} />
      <SubscriptionsTable
        subscriptions={filteredSubscriptions}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
    </div>
  );
}
