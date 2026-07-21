import { z } from "zod";

export const createLeadSchema = z.object({

  //////////////////////////////////////////////////////
  // BASIC INFORMATION
  //////////////////////////////////////////////////////

  name: z
    .string()
    .trim()
    .min(1, "Contact person is required")
    .max(100),

  company: z
    .string()
    .trim()
    .min(1, "Company is required")
    .max(200),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .or(z.literal(""))
    .optional(),

  phone: z
    .string()
    .trim()
    .or(z.literal(""))
    .optional(),

  //////////////////////////////////////////////////////
  // ADDRESS
  //////////////////////////////////////////////////////

  address: z
    .string()
    .trim()
    .optional(),

  district: z
    .string()
    .trim()
    .optional(),

  city: z
    .string()
    .trim()
    .optional(),

  province: z
    .string()
    .trim()
    .optional(),

  postalCode: z
    .string()
    .trim()
    .optional(),

  country: z
    .string()
    .trim()
    .default("Indonesia"),

  //////////////////////////////////////////////////////
  // RELATION
  //////////////////////////////////////////////////////

  sourceId: z
    .string()
    .uuid("Lead Source is required"),

  assignedTo: z
    .string()
    .uuid("Sales is required"),

});

export type CreateLeadForm =
  z.infer<
    typeof createLeadSchema
  >;