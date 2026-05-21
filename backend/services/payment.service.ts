import { prisma } from "@/lib/prisma";

export const paymentService = {

  async upload(data: any, user: any) {

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: data.invoiceId,
      },

      include: {
        deal: true,
      },
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const payment = await prisma.payment.create({
      data: {
        invoiceId: data.invoiceId,
        amount: data.amount,
        proofUrl: data.proofUrl,
      },
    });

    await prisma.$transaction([

      prisma.activity.create({
        data: {
          leadId: invoice.deal.leadId,
          userId: user.userId,
          type: "FINANCE",
          description: "Payment proof uploaded",
        },
      }),

      prisma.auditLog.create({
        data: {
          entity: "Payment",
          entityId: payment.id,
          action: "UPLOAD",
          userId: user.userId,
        },
      }),

    ]);

    return payment;
  },

  async verify(
    paymentId: string,
    status: any,
    user: any
  ) {

    const payment = await prisma.payment.findUnique({
      where: {
        id: paymentId,
      },

      include: {
        invoice: {
          include: {
            deal: true,
          },
        },
      },
    });

    if (!payment) {
      throw new Error("Payment not found");
    }

    const updatedPayment =
      await prisma.payment.update({
        where: {
          id: paymentId,
        },

        data: {
          status,
          verifiedBy: user.userId,
          verifiedAt: new Date(),
        },
      });

    if (status === "VERIFIED") {

      await prisma.invoice.update({
        where: {
          id: payment.invoiceId,
        },

        data: {
          status: "PAID",
        },
      });

    }

    await prisma.$transaction([

      prisma.activity.create({
        data: {
          leadId: payment.invoice.deal.leadId,
          userId: user.userId,
          type: "FINANCE",
          description:
            status === "VERIFIED"
              ? "Payment verified"
              : "Payment rejected",
        },
      }),

      prisma.auditLog.create({
        data: {
          entity: "Payment",
          entityId: payment.id,
          action: status,
          userId: user.userId,
        },
      }),

    ]);

    return updatedPayment;
  },

  async list() {
    return prisma.payment.findMany({
      include: {
        invoice: true,
        verifier: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },
};