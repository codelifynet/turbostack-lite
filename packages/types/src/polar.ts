// ============================================
// Polar Types (Shared between API and Web)
// ============================================

export interface PolarProduct {
  id: string;
  name: string;
  description: string | null;
  isRecurring: boolean;
  isArchived: boolean;
  organizationId: string;
  createdAt: Date | string;
  modifiedAt: Date | string | null;
  prices?: PolarPrice[];
}

export interface PolarPrice {
  id: string;
  productId: string;
  isArchived: boolean;
  priceCurrency: string;
  priceAmount: number;
  recurringInterval: "month" | "year" | "day" | "week" | null;
  type: "one_time" | "recurring";
}

export interface ProductsListParams {
  limit?: number;
  isArchived?: boolean;
  page?: number;
}

export interface ProductsListResponse {
  products: PolarProduct[];
  hasMore: boolean;
  totalCount?: number;
}

export interface CheckoutSession {
  id: string;
  url: string;
  status: string;
  productId: string;
  priceId?: string;
  customerId?: string;
  customerEmail?: string;
}

export interface CreateCheckoutParams {
  productPriceId?: string;
  priceId?: string;
  successUrl: string;
  customerEmail?: string;
  customerName?: string;
  metadata?: Record<string, string>;
}

export interface WebhookResult {
  success: boolean;
  message: string;
  eventType?: string;
  data?: Record<string, unknown>;
}

export type PolarWebhookEventType =
  | "checkout.created"
  | "checkout.updated"
  | "order.created"
  | "order.paid"
  | "order.refunded"
  | "subscription.created"
  | "subscription.updated"
  | "subscription.active"
  | "subscription.canceled"
  | "subscription.uncanceled"
  | "subscription.revoked"
  | "product.created"
  | "product.updated"
  | "customer.created"
  | "customer.updated"
  | "customer.deleted";

// ============================================
// Polar API Response Types (snake_case from API)
// ============================================

export interface PolarProductResponse {
  id: string;
  name: string;
  description?: string;
  is_recurring: boolean;
  is_archived: boolean;
  prices: PolarPriceResponse[];
  medias?: Array<{
    id: string;
    [key: string]: any;
  }>;
}

export interface PolarPriceResponse {
  id: string;
  price_amount: number;
  price_currency: string;
  type: string;
  recurring_interval?: string;
}

export interface PolarProductsListResponse {
  items: PolarProductResponse[];
  pagination: {
    total_count: number;
    max_page: number;
  };
}

export interface CreatePolarProductPayload {
  name: string;
  description?: string;
  is_recurring: boolean;
  is_archived?: boolean;
  prices: {
    amount_type: "fixed";
    price_amount: number;
    price_currency: string;
    recurring_interval?: "month" | "year" | "week" | "day";
  }[];
  medias?: string[];
  organization_id?: string;
  metadata?: Record<string, string>;
  recurring_interval?: "day" | "week" | "month" | "year";
  recurring_interval_count?: number;
  trial_interval?: "day" | "week" | "month" | "year";
  trial_interval_count?: number;
  attached_custom_fields?: Array<{
    custom_field_id: string;
    required: boolean;
  }>;
}

export interface PolarSubscriptionResponse {
  id: string;
  customer_id: string;
  product_id: string;
  product_price_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at?: string | null;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface PolarSubscriptionsListResponse {
  items: PolarSubscriptionResponse[];
  pagination: {
    total_count: number;
    max_page: number;
  };
}

export interface PolarSubscriptionUpdatePayload {
  id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  canceled_at?: string | null;
  customer_id?: string;
  product_id: string;
  product_price_id: string;
  metadata?: Record<string, any>;
}

export interface PolarOrderPayload {
  id: string;
  amount: number;
  currency: string;
  status: string;
  customer_id?: string;
  product_id: string;
  product_price_id: string;
  metadata?: Record<string, any>;
}

export interface PolarOrderResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
  customer_id?: string;
  product_id: string;
  product_price_id: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface PolarOrdersListResponse {
  items: PolarOrderResponse[];
  pagination: {
    total_count: number;
    max_page: number;
  };
}

export interface PolarInvoiceResponse {
  id: string;
  order_id: string;
  url: string;
  pdf_url?: string;
  created_at: string;
}

export interface CheckoutSessionResponse {
  id: string;
  url: string;
  client_secret?: string;
}

// ============================================
// Polar File Upload Types
// ============================================

export interface FileUploadPartRequest {
  number: number;
  chunk_start: number;
  chunk_end: number;
}

export interface CreateFilePayload {
  organization_id?: string;
  name: string;
  mime_type: string;
  size: number;
  checksum_sha256_base64?: string;
  upload: {
    parts: FileUploadPartRequest[] | [];
  };
  service: "product_media";
}

export interface FileUploadPart {
  number: number;
  chunk_start: number;
  chunk_end: number;
  url: string;
  expires_at: string;
  checksum_sha256_base64: string;
  headers: Record<string, string>;
}

export interface FileUploadResponse {
  id: string;
  path: string;
  mime_type: string;
  size: number;
  checksum_sha256_base64?: string;
  upload: {
    id: string;
    path: string;
    parts: FileUploadPart[];
  };
}

export interface ProductMediaFileRead {
  id: string;
  organizationId: string;
  name: string;
  path: string;
  mimeType: string;
  size: number;
  storageVersion: string;
  checksumEtag: string;
  checksumSha256Base64: string;
  checksumSha256Hex: string;
  lastModifiedAt: string | null;
  version: string;
  service: string;
  isUploaded: boolean;
  createdAt: string;
  sizeReadable: string;
  publicUrl: string;
}

// ============================================
// Polar Customer Types
// ============================================

export interface CreatePolarCustomerPayload {
  email: string;
  name?: string;
  metadata?: Record<string, any>;
  external_id?: string;
  billing_address?: {
    country?: string;
    line1?: string;
    line2?: string;
    postal_code?: string;
    city?: string;
    state?: string;
  };
  tax_id?: string[];
  organization_id?: string;
  owner?: {
    email?: string;
    name?: string;
    external_id?: string;
  };
}

export interface PolarCustomerResponse {
  id: string;
  email: string;
  name?: string;
  metadata?: Record<string, any>;
  external_id?: string;
  created_at: string;
  updated_at: string;
}
