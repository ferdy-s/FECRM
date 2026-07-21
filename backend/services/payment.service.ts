import { prisma } from "@/lib/prisma";

import { dealCommercialService }
from "./deal-commercial.service";

export const paymentService = {
  async upload(data: any, user: any) {
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: data.invoiceId,
      },

      include: {
        deal: {
          include: {
            assignee: true,
          },
        },
      },
    });

if (!invoice) {
  throw new Error(
    "Invoice not found"
  );
}

if (
  invoice.invoiceKind === "MASTER" &&
  invoice.paymentType === "TERMIN"
) {
  throw new Error(
    "Payment must be made to termin invoice"
  );
}

if (
  invoice.status === "PAID"
) {
  throw new Error(
    "Invoice already paid"
  );
}

const remainingAmount =
  Number(
    invoice.remainingAmount
  );

if (
  Number(data.amount) >
  remainingAmount
) {
  throw new Error(
    "Payment exceeds remaining amount"
  );
}

if (
  Number(data.amount) <= 0
) {
  throw new Error(
    "Payment amount must be greater than zero"
  );
}

if (!data.proofUrl) {
  throw new Error(
    "Payment proof required"
  );
}

    if (
      user.role === "SALES" &&
      invoice.deal.assignedTo !== user.userId
    ) {
      throw new Error(
        "You are not assigned to this deal"
      );
    }

const pendingPayment =
await prisma.payment.findFirst({
  where: {
    invoiceId: invoice.id,
    status: "PENDING",
  },
});

if (pendingPayment) {
  throw new Error(
    "Pending payment already exists"
  );
}

const isOverdue =
  invoice.dueDate &&
  invoice.dueDate < new Date();

    const payment = await prisma.payment.create({
  data: {
    invoiceId: data.invoiceId,

    amount: data.amount,

    paymentMethod:
      invoice.paymentMethod,

    proofUrl: data.proofUrl,

    referenceNumber:
      data.referenceNumber,

    uploadedBy: user.userId,
  },
});

    await prisma.$transaction([
      prisma.activity.create({
        data: {
          leadId: invoice.deal.leadId,
          userId: user.userId,
          type: "FINANCE",
         description:
  isOverdue
    ? "Overdue payment uploaded"
    : "Payment proof uploaded",
        },
      }),

      prisma.auditLog.create({
        data: {
          entity: "Payment",
          entityId: payment.id,
          action:
  `UPLOAD_${invoice.invoiceNumber}`,
          userId: user.userId,
        },
      }),
    ]);

    return payment;
  },

async detail(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },

    include: {
      invoice: {
        include: {
          deal: {
            include: {
              lead: true,
              assignee: true,
              creator: true,
            },
          },
        },
      },

      uploader: true,

      verifier: true,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
},



 async verify(
  paymentId: string,
  status: any,
  user: any | null,
  isGateway = false,
) {

  const verifiedBy =
  isGateway ? null : user!.userId;

  const payment =
    await prisma.payment.findUnique({
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
      throw new Error(
        "Payment not found"
      );
    }

    if (
      payment.status === "VERIFIED"
    ) {
      throw new Error(
        "Payment already verified"
      );
    }

    if (
  status !== "VERIFIED" &&
  status !== "REJECTED"
) {
  throw new Error(
    "Invalid payment status"
  );
}

    const updatedPayment =
      await prisma.payment.update({
        where: {
          id: paymentId,
        },

        data: {
  status,

 verifiedBy,

  verifiedAt: new Date(),

  ...(status === "VERIFIED" && {
    paidAt: new Date(),
  }),
},
      });

    if (status === "VERIFIED") {
      //////////////////////////////////////////////////
      // INVOICE PROGRESS
      //////////////////////////////////////////////////

      const newPaidAmount =
        Number(
          payment.invoice.paidAmount
        ) +
        Number(payment.amount);

      if (
        newPaidAmount >
        Number(
          payment.invoice.amount
        )
      ) {
        throw new Error(
          "Payment exceeds invoice amount"
        );
      }

      const remainingAmount =
        Math.max(
          Number(
            payment.invoice.amount
          ) - newPaidAmount,
          0
        );

      let invoiceStatus:
        | "UNPAID"
        | "PARTIAL"
        | "PAID" = "UNPAID";

      if (newPaidAmount > 0) {
        invoiceStatus = "PARTIAL";
      }

      if (
        newPaidAmount >=
        Number(
          payment.invoice.amount
        )
      ) {
        invoiceStatus = "PAID";
      }

      const updatedInvoice =
  await prisma.invoice.update({
    where: {
      id: payment.invoiceId,
    },

    data: {
      paidAmount: newPaidAmount,

      remainingAmount,

      status: invoiceStatus,
    },
  });

  //////////////////////////////////////////////////
// MASTER INVOICE PROGRESS ENGINE
//////////////////////////////////////////////////

if (
  updatedInvoice.invoiceKind ===
  "TERMIN" &&
  updatedInvoice.parentInvoiceId
) {

  const termInvoices =
    await prisma.invoice.findMany({
      where: {
        parentInvoiceId:
          updatedInvoice.parentInvoiceId,
      },
    });

  const totalAmount =
    termInvoices.reduce(
      (sum, invoice) =>
        sum +
        Number(invoice.amount),
      0
    );

  const totalPaid =
    termInvoices.reduce(
      (sum, invoice) =>
        sum +
        Number(
          invoice.paidAmount
        ),
      0
    );

  const masterRemainingAmount =
    Math.max(
      totalAmount -
        totalPaid,
      0
    );

  let masterStatus:
    | "UNPAID"
    | "PARTIAL"
    | "PAID" =
    "UNPAID";

  if (totalPaid > 0) {
    masterStatus =
      "PARTIAL";
  }

  if (
    totalPaid >=
    totalAmount
  ) {
    masterStatus =
      "PAID";
  }

  await prisma.invoice.update({
    where: {
      id:
        updatedInvoice.parentInvoiceId,
    },

    data: {
      paidAmount:
        totalPaid,

      remainingAmount:
        masterRemainingAmount,

      status:
        masterStatus,
    },
  });
}

      //////////////////////////////////////////////////
      // DEAL COLLECTION
      //////////////////////////////////////////////////
      

      await dealCommercialService.recalculate(
    payment.invoice.deal.id
);
    }

    if (!isGateway) {

    await prisma.$transaction([

        prisma.activity.create({

            data: {

                leadId:
                    payment.invoice.deal.leadId,

                userId:
                    user!.userId,

                type:"FINANCE",

                description:
                    status==="VERIFIED"
                    ? "Payment verified"
                    : "Payment rejected",

            },

        }),

        prisma.auditLog.create({

            data:{

                entity:"Payment",

                entityId:payment.id,

                action:
                    `${status}_${payment.invoice.invoiceNumber}`,

                userId:
                    user!.userId,

            },

        }),

    ]);

}

    return updatedPayment;
  },

  async reject(
  paymentId: string,
  reason: string,
  user: any
) {

  const payment =
    await prisma.payment.findUnique({

      where: {
        id: paymentId,
      },

      include: {
        invoice: true,
      },

    });

  if (!payment) {
    throw new Error(
      "Payment not found"
    );
  }

  if (
    payment.status !== "PENDING"
  ) {
    throw new Error(
      "Only pending payment can be rejected"
    );
  }

  const updated =
    await prisma.payment.update({

      where: {
        id: paymentId,
      },

      data: {

        status: "REJECTED",

        verifiedBy:
          user.userId,

        verifiedAt:
          new Date(),

      },

    });

  return updated;
},

  async list() {
    return prisma.payment.findMany({
      include: {
        invoice: true,

        verifier: true,

        uploader: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },
};