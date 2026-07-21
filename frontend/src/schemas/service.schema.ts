import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Service name is required")
    .max(100, "Service name must not exceed 100 characters"),

  price: z
    .number()
    .positive("Price must be greater than 0"),
});

export const updateServiceSchema =
  createServiceSchema.partial();

export type CreateServiceFormValues =
  z.infer<typeof createServiceSchema>;

export type UpdateServiceFormValues =
  z.infer<typeof updateServiceSchema>;