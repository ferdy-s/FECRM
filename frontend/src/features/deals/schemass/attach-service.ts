import { z } from "zod";

export const attachServiceSchema =
  z.object({

    dealId: z
      .string()
      .uuid("Invalid Deal ID"),

    refIds: z
      .array(
        z.string().uuid()
      )
      .min(
        1,
        "Select at least one service"
      ),

   quantity: z
    .number()
    .min(
        1,
        "Quantity minimal 1",
    )
      .int()
      .positive(),

  });

export type AttachServiceSchema =
  z.infer<
    typeof attachServiceSchema
  >;