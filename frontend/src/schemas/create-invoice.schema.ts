import { z } from "zod";

export const createInvoiceSchema =

  z.object({

    //////////////////////////////////////////////////////
    // DEAL
    //////////////////////////////////////////////////////

    dealId:

      z.string()

        .uuid(

          "Deal is required",

        ),

    //////////////////////////////////////////////////////
    // PAYMENT
    //////////////////////////////////////////////////////

    paymentType:

      z.enum([

        "FULL",

        "TERMIN",

      ]),

    paymentMethod:

      z.enum([

        "MANUAL_TRANSFER",

        "QRIS_MIDTRANS",

      ]),

    //////////////////////////////////////////////////////
    // TERMS
    //////////////////////////////////////////////////////

    terms:

      z.array(

        z.object({

          percent:

            z.number()

              .min(1)

              .max(100),

          dueDate:

            z.string()

              .min(

                1,

                "Due date is required",

              ),

        }),

      )

      .max(12)

      .optional(),

  })

.superRefine(

  (data, ctx) => {

    if (

      data.paymentType ===

      "TERMIN"

    ) {

      if (

        !data.terms ||

        data.terms.length === 0

      ) {

        ctx.addIssue({

          code:

            z.ZodIssueCode.custom,

          path: [

            "terms",

          ],

          message:

            "Minimum one term is required.",

        });

        return;

      }

      const total =

        data.terms.reduce(

          (sum, item) =>

            sum +

            item.percent,

          0,

        );

      if (total !== 100) {

        ctx.addIssue({

          code:

            z.ZodIssueCode.custom,

          path: [

            "terms",

          ],

          message:

            "Total percentage must equal 100%.",

        });

      }

    }

  },

);

export type CreateInvoiceForm =

  z.infer<

    typeof createInvoiceSchema

  >;