// ============================================
// Order Types
// ============================================

import type { Product } from "./products";

export interface Order {
  id: string;
  polarOrderId: string;
  amount: number;
  currency: string;
  status: string;
  customerId: string | null;
  productId: string | null;
  priceId: string | null;
  metadata?: Record<string, any>;
  createdAt: Date | string;
  updatedAt: Date | string;
  product?: Product | null;
  price?: {
    id: string;
    type: "one_time" | "recurring";
    priceAmount: number;
    priceCurrency: string;
    recurringInterval: string | null;
  } | null;
  user?: {
    id: string;
    name: string | null;
    email: string;
    role: string;
  } | null;
}

export interface Invoice {
  id: string;
  orderId: string;
  url: string;
  pdfUrl?: string;
  createdAt: string;
}

// Service-level types
export interface OrderListParams {
  page?: number;
  limit?: number;
  status?: string;
  userId?: string;
}

// ============================================
// Frontend Panel Types
// ============================================

export interface OrderPanel {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: string;
  date: string;
  paymentMethod: string;
  items?: number;
}

export interface OrdersStats {
  total: number;
  completed: number;
  totalRevenue: number;
  pending: number;
}

// Mock Types
export interface OrderStatus {
  value: string;
  label: string;
  color: string;
}

export interface PaymentMethod {
  value: string;
  label: string;
  icon: string;
}

export interface TopProduct {
  name: string;
  orders: number;
  revenue: number;
}
