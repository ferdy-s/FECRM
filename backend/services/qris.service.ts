import { prisma } from "@/lib/prisma";
import { snap } from "@/lib/midtrans";

export const qrisService = {

  async generate(
    invoiceId: string
  ) {

    const invoice =
      await prisma.invoice.findUnique({
        where: {
          id: invoiceId,
        },

        include: {
          deal: {
            include: {
              lead: true,
            },
          },
        },
      });

    if (!invoice) {
      throw new Error(
        "Invoice not found"
      );
    }


    //////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////

    if (
      invoice.paymentMethod !==
      "QRIS_MIDTRANS"
    ) {
      throw new Error(
        "Invoice is not configured for QRIS"
      );
    }

    //////////////////////////////////////////////////
    // MASTER TERMIN BLOCK
    //////////////////////////////////////////////////

    if (
      invoice.invoiceKind ===
        "MASTER" &&
      invoice.paymentType ===
        "TERMIN"
    ) {
      throw new Error(
        "Master termin invoice cannot be paid"
      );
    }

    //////////////////////////////////////////////////
    // ALREADY PAID
    //////////////////////////////////////////////////

    if (
      invoice.status ===
      "PAID"
    ) {
      throw new Error(
        "Invoice already paid"
      );
    }

    //////////////////////////////////////////////////
    // ORDER ID
    //////////////////////////////////////////////////

    const orderId =
  `${invoice.invoiceNumber}-${Date.now()}`;

 //////////////////////////////////////////////////
// MIDTRANS SNAP
//////////////////////////////////////////////////

const grossAmount = Math.round(
  Number(invoice.remainingAmount)
);

console.log({
  remainingAmount:
    invoice.remainingAmount,

  grossAmount,
});

if (
  !grossAmount ||
  grossAmount <= 0
) {
  throw new Error(
    "Invalid invoice amount"
  );
}

const transaction =
  await snap.createTransaction({
    transaction_details: {
      order_id: orderId,
      gross_amount: grossAmount,
    },

    expiry: {
      unit: "day",
      duration: 7,
    },

    customer_details: {
      first_name:
        invoice.deal.lead.name,

      email:
        invoice.deal.lead.email ??
        undefined,

      phone:
        invoice.deal.lead.phone ??
        undefined,
    },
  });

console.log(
  "MIDTRANS RESPONSE:",
  JSON.stringify(
    transaction,
    null,
    2
  )
);
    //////////////////////////////////////////////////
    // SAVE
    //////////////////////////////////////////////////

    await prisma.invoice.update({
      where: {
        id: invoice.id,
      },

      data: {
        midtransOrderId:
          orderId,

        qrisUrl:
          transaction.redirect_url,
      },
    });

    return {

      invoiceId:
        invoice.id,

      invoiceNumber:
        invoice.invoiceNumber,

      amount:
        Number(
          invoice.remainingAmount
        ),

      orderId,

      qrisUrl:
        transaction.redirect_url,

      token:
        transaction.token,
    };
  },
};