import { z } from "zod";

//////////////////////////////////////////////////////
// SCHEMA
//////////////////////////////////////////////////////

export const uploadPaymentSchema = z.object({
  invoiceId: z
    .string()
    .uuid("Invalid invoice ID"),

  amount: z.coerce
    .number()
    .positive(
      "Payment amount must be greater than zero",
    )
    .finite(),

  proofUrl: z
    .string()
    .trim()
    .url("Invalid proof URL"),
});

//////////////////////////////////////////////////////
// TYPE
//////////////////////////////////////////////////////

export type UploadPaymentFormValues =
  z.infer<typeof uploadPaymentSchema>;