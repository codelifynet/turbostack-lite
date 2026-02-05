import { z } from "zod";

export const customerSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  polarCustomerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CustomerOutput = z.infer<typeof customerSchema>;

export const customerQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
});

export type CustomerQueryInput = z.infer<typeof customerQuerySchema>;
