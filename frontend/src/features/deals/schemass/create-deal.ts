import { z } from "zod";

export const createDealSchema = z.object({

  leadId: z
    .string()
    .uuid("Invalid Lead ID"),

});

export type CreateDealSchema =
  z.infer<
    typeof createDealSchema
  >;