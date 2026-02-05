import { z } from "zod";
import {
  priceSchema,
  productMediaSchema,
  productSchema,
  productWithPricesSchema,
  createProductSchema,
  updateProductSchema,
  productQuerySchema,
} from "@repo/validations/product";

// Define PriceSchema first as it's used in ProductSchema
export const PriceSchema = priceSchema;

// Schema for Product Media
export const ProductMediaSchema = productMediaSchema;

// Schema for Product
export const ProductSchema = productSchema;
export type Product = z.infer<typeof productSchema>;

// Frontend-compatible Product type (with string dates)
export interface ProductMedia {
  id: string;
  public_url: string;
}

export interface ProductFrontend {
  id: string;
  name: string;
  description: string | null;
  isRecurring: boolean;
  isArchived: boolean;
  medias: ProductMedia[];
  createdAt: string;
  polarProductId: string | null;
  polarSyncStatus: "pending" | "synced" | "failed";
  polarSyncError: string | null;
  prices: Array<{
    id: string;
    polarPriceId: string | null;
    type: "one_time" | "recurring";
    priceAmount: number;
    priceCurrency: string;
    recurringInterval: string | null;
  }>;
}

export const ProductWithPricesSchema = productWithPricesSchema;
export type ProductWithPrices = z.infer<typeof productWithPricesSchema>;

// Schema for creating a product
export const CreateProductSchema = createProductSchema;
export type CreateProduct = z.infer<typeof createProductSchema>;

export const UpdateProductSchema = updateProductSchema;
export type UpdateProduct = z.infer<typeof updateProductSchema>;

export const ProductQuerySchema = productQuerySchema;
export type ProductQuery = z.infer<typeof productQuerySchema>;

// Service-level types
export interface ProductListParams {
  page?: number;
  limit?: number;
  includeArchived?: boolean;
  search?: string;
}

export type CreateProductData = z.infer<typeof createProductSchema>;

export type UpdateProductData = z.infer<typeof updateProductSchema>;