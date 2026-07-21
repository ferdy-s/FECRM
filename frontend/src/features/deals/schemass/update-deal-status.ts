import { z } from "zod";

export const updateDealStatusSchema =
  z.object({

    dealId: z
      .string()
      .uuid("Invalid Deal ID"),

    status: z.enum([
      "OPEN",
      "NEGOTIATION",
      "WON",
      "LOST",
    ]),

  });

export type UpdateDealStatusSchema =
  z.infer<
    typeof updateDealStatusSchema
  >;