import { z } from "zod";

//////////////////////////////////////////////////////
// ITEM
//////////////////////////////////////////////////////

export const createInvoiceTermSchema =
  z.object({
    percent: z
      .number()
      .min(1)
      .max(100),

    dueDate: z
      .string()
      .min(1, "Due date is required"),
  });

//////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////

export const createInvoiceSchema =
  z.object({

    dealId: z
      .string()
      .uuid("Deal must be selected"),

    paymentType: z.enum([
      "FULL",
      "TERMIN",
    ]),

    paymentMethod: z.enum([
      "MANUAL_TRANSFER",
      "QRIS_MIDTRANS",
    ]),

    terms: z
  .array(createInvoiceTermSchema)
  .optional(),

  })
 .superRefine((data, ctx) => {

  if (
    data.paymentType === "TERMIN"
  ) {

    if (
      !data.terms ||
      data.terms.length === 0
    ) {

      ctx.addIssue({

        code: z.ZodIssueCode.custom,

        path: ["terms"],

        message:
          "At least one termin is required.",

      });

      return;

    }

    const total =
      data.terms.reduce(
        (sum, term) =>
          sum + term.percent,
        0,
      );

    if (total !== 100) {

      ctx.addIssue({

        code: z.ZodIssueCode.custom,

        path: ["terms"],

        message:
          "Total percentage must equal 100%.",

      });

    }

  }

});

//////////////////////////////////////////////////////
// TYPE
//////////////////////////////////////////////////////

export type CreateInvoiceFormValues =
  z.infer<
    typeof createInvoiceSchema
  >;