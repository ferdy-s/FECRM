import { z } from "zod";

const leadSourceName = z
  .string()
  .trim()
  .refine(
    (value) => value.length > 0,
    {
      message: "Source name is required",
    }
  )
  .refine(
    (value) => value.length >= 3,
    {
      message: "Source name must be at least 3 characters",
    }
  )
  .max(
    100,
    "Source name cannot exceed 100 characters"
  );

export const createLeadSourceSchema = z.object({
  name: leadSourceName,
});

export const updateLeadSourceSchema =
  createLeadSourceSchema;

export type CreateLeadSourceSchema =
  z.infer<
    typeof createLeadSourceSchema
  >;

export type UpdateLeadSourceSchema =
  z.infer<
    typeof updateLeadSourceSchema
  >;