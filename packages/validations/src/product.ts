import { z } from "zod";

// Price schema for product prices
export const priceSchema = z.object({
  type: z.enum(["one_time", "recurring"]),
  priceAmount: z.number().min(0, "Price must be positive"),
  priceCurrency: z.string().default("USD"),
  recurringInterval: z.enum(["month", "year", "day", "week"]).nullable().optional(),
});

// Product Media Schema
export const productMediaSchema = z.object({
  id: z.string(),
  public_url: z.string(),
});

// Product Schema (Output)
export const productSchema = z.object({
  id: z.string(),
  polarProductId: z.string().nullable(),
  name: z.string(),
  description: z.string().nullable(),
  medias: z.array(productMediaSchema),
  isRecurring: z.boolean(),
  isArchived: z.boolean(),
  polarSyncStatus: z.string(),
  polarSyncError: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  prices: z.array(priceSchema),
});

export type ProductOutput = z.infer<typeof productSchema>;

export const productWithPricesSchema = productSchema.extend({
  prices: z.array(z.any()), // Or specific price schema
});

// Create product schema
export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  description: z.string().max(500, "Description is too long").optional(),
  isRecurring: z.boolean(),
  prices: z.array(priceSchema).optional(),
});

// Update product schema
export const updateProductSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  isRecurring: z.boolean().optional(),
  isArchived: z.boolean().optional(),
});

// Product query params schema
export const productQuerySchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  isArchived: z.boolean().optional(),
  page: z.number().min(1).optional(),
});

// Export types
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type ProductQueryParams = z.infer<typeof productQuerySchema>;
export type PriceInput = z.infer<typeof priceSchema>;
