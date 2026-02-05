// ============================================
// Subscription Types
// ============================================

import type { Product } from "./products";

export interface Subscription {
  id: string;
  customer: string;
  email: string;
  plan: string;
  amount: number;
  status: "active" | "inactive" | "cancelled" | "past_due" | "trialing";
  billingCycle: "monthly" | "yearly";
  startDate: string;
  nextBilling: string | null;
  paymentMethod: string;
  productDetails?: Product;
}

// ============================================
// Frontend Panel Types
// ============================================

export interface SubscriptionsStats {
  total: number;
  active: number;
  mrr: number;
  arr: number;
}

// Mock Types
export interface SubscriptionStatus {
  value: string;
  label: string;
  color: string;
}

export interface BillingCycle {
  value: string;
  label: string;
  description: string;
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  billingCycle: string;
  features: string[];
}
