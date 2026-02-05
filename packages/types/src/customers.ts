import { z } from "zod";
import { customerSchema, customerQuerySchema } from "@repo/validations/customer";

// ============================================
// Customer Types (Local + Polar mapping)
// ============================================

export const CustomerSchema = customerSchema;
export type Customer = z.infer<typeof customerSchema>;

// Frontend-friendly customer type (string dates)
export interface CustomerFrontend {
  id: string;
  userId: string;
  email: string;
  name: string | null;
  polarCustomerId: string;
  createdAt: string;
  updatedAt: string;
}

export const CustomerQuerySchema = customerQuerySchema;
export type CustomerQuery = z.infer<typeof customerQuerySchema>;

// Service-level params
export interface CustomerListParams {
  page?: number;
  limit?: number;
  search?: string;
}

// ============================================
// Frontend Panel Types
// ============================================

export interface CustomerPanel {
  id: string;
  name: string;
  email: string;
  status: string;
  orders: number;
  totalSpent: number;
  joinedDate: string;
}

export interface CustomersStats {
  total: number;
  active: number;
  totalRevenue: number;
  totalOrders: number;
}

// Mock Types
export interface CustomerSegment {
  name: string;
  count: number;
  description: string;
  color: string;
}