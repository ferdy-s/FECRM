import crypto from "crypto";

import { prisma } from "@/lib/prisma";

import { paymentService }
from "@/services/payment.service";

export const midtransWebhookService = {

  async handle(
    payload: any
  ) {

    //////////////////////////////////////////////////
    // SIGNATURE VALIDATION
    //////////////////////////////////////////////////

    const serverKey =
      process.env
        .MIDTRANS_SERVER_KEY!;

    const expectedSignature =
      crypto
        .createHash("sha512")
        .update(
          payload.order_id +
          payload.status_code +
          payload.gross_amount +
          serverKey
        )
        .digest("hex");

    if (
      expectedSignature !==
      payload.signature_key
    ) {
      throw new Error(
        "Invalid Midtrans signature"
      );
    }

    //////////////////////////////////////////////////
    // SUCCESS ONLY
    //////////////////////////////////////////////////

    if (
      payload.transaction_status !==
        "settlement" &&
      payload.transaction_status !==
        "capture"
    ) {
      return {
        ignored: true,
      };
    }

    //////////////////////////////////////////////////
    // DUPLICATE PROTECTION
    //////////////////////////////////////////////////

    const existingPayment =
      await prisma.payment.findFirst({
        where: {
          midtransTransactionId:
            payload.transaction_id,
        },
      });

    if (existingPayment) {
      return {
        duplicated: true,
      };
    }

    //////////////////////////////////////////////////
    // FIND INVOICE
    //////////////////////////////////////////////////

    const invoice =
      await prisma.invoice.findFirst({
        where: {
          midtransOrderId:
            payload.order_id,
        },
      });

    if (!invoice) {
      throw new Error(
        "Invoice not found"
      );
    }

    //////////////////////////////////////////////////
    // CREATE PAYMENT
    //////////////////////////////////////////////////

    const payment =
      await prisma.payment.create({
        data: {

          invoiceId:
            invoice.id,

          amount:
            Number(
              payload.gross_amount
            ),

          paymentMethod:
            "QRIS_MIDTRANS",

          status:
            "PENDING",

          referenceNumber:
            payload.order_id,

          paidAt:
            new Date(),

          midtransTransactionId:
            payload.transaction_id,

          gatewayResponse:
            payload,
        },
      });

    //////////////////////////////////////////////////
    // SYSTEM VERIFIER
    //////////////////////////////////////////////////

    //////////////////////////////////////////////////
    // REUSE EXISTING ENGINE
    //////////////////////////////////////////////////

   await paymentService.verify(
  payment.id,
  "VERIFIED",
  null,
  true,
);

    return {
      success: true,
    };
  },
};