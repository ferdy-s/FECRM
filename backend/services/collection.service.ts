import { prisma } from "@/lib/prisma";

export const collectionService = {
  //////////////////////////////////////////////////
  // OVERDUE ENGINE
  //////////////////////////////////////////////////

  async markOverdueInvoices() {
    const overdueInvoices =
      await prisma.invoice.findMany({
      where: {

  status: {

    in: [

      "UNPAID",

      "PARTIAL"

    ],

  },

  remainingAmount: {

    gt: 0,

  },

  dueDate: {

    lt: new Date(),

  },

},
      });

    if (
      overdueInvoices.length === 0
    ) {
      return {
        updated: 0,
      };
    }

    const result =
      await prisma.invoice.updateMany({
        where: {
          id: {
            in: overdueInvoices.map(
              (invoice) =>
                invoice.id
            ),
          },
        },

        data: {
          status: "OVERDUE",
        },
      });

    return {
      updated: result.count,
    };
  },

  async worklist() {

  const invoices =
    await prisma.invoice.findMany({
     where: {

  status: {
    in: [
      "UNPAID",
      "PARTIAL",
      "OVERDUE",
    ],
  },

  remainingAmount: {
    gt: 0,
  },

},

     include: {

  deal: {

    include: {

      lead: true,

    },

  },

},

      orderBy: {
        dueDate: "asc",
      },
    });

  return invoices.map(
    (invoice) => {

      const today =
        new Date();

      const dueDate =
        invoice.dueDate;

      let daysOverdue = 0;

      if (
        dueDate &&
        dueDate < today
      ) {
        daysOverdue =
          Math.floor(
            (
              today.getTime() -
              dueDate.getTime()
            ) /
            (
              1000 *
              60 *
              60 *
              24
            )
          );
      }

      //////////////////////////////////////////////////
      // PRIORITY
      //////////////////////////////////////////////////

      let priority =
        "LOW";

      if (
        daysOverdue > 90
      ) {
        priority =
          "CRITICAL";
      }
      else if (
        daysOverdue > 30
      ) {
        priority =
          "HIGH";
      }
      else if (
        daysOverdue > 0
      ) {
        priority =
          "MEDIUM";
      }

      return {

  invoiceId: invoice.id,

  invoiceNumber: invoice.invoiceNumber,

  invoiceKind: invoice.invoiceKind,

  paymentType: invoice.paymentType,

  company: invoice.deal.lead.company,

  customer: invoice.deal.lead.name,

  dueDate: invoice.dueDate,

  status: invoice.status,

  amount: Number(invoice.amount),

  paidAmount: Number(invoice.paidAmount),

  remainingAmount: Number(invoice.remainingAmount),

  daysOverdue,

  priority,

};
    }
  );
},

  //////////////////////////////////////////////////
  // AGING BUCKET ENGINE
  //////////////////////////////////////////////////

  async agingBuckets() {
    const invoices =
      await prisma.invoice.findMany({
        where: {
          status: {
            in: [
              "UNPAID",
              "PARTIAL",
              "OVERDUE",
            ],
          },
        },
      });

    let bucket0to30 = 0;

    let bucket31to60 = 0;

    let bucket61to90 = 0;

    let bucket90plus = 0;

    const today =
      new Date();

    for (const invoice of invoices) {
      if (!invoice.dueDate) {
        continue;
      }

      const diffDays =
        Math.floor(
          (
            today.getTime() -
            invoice.dueDate.getTime()
          ) /
            (1000 *
              60 *
              60 *
              24)
        );

      const amount =
        Number(
          invoice.remainingAmount
        );

      if (
        diffDays >= 0 &&
        diffDays <= 30
      ) {
        bucket0to30 += amount;
      } else if (
        diffDays >= 31 &&
        diffDays <= 60
      ) {
        bucket31to60 += amount;
      } else if (
        diffDays >= 61 &&
        diffDays <= 90
      ) {
        bucket61to90 += amount;
      } else if (
        diffDays > 90
      ) {
        bucket90plus += amount;
      }
    }

    return {
      bucket0to30,

      bucket31to60,

      bucket61to90,

      bucket90plus,
    };
  },

  //////////////////////////////////////////////////
// COLLECTION DASHBOARD
//////////////////////////////////////////////////

async collectionDashboard() {

  const receivable =
    await prisma.invoice.aggregate({
      where: {
        invoiceKind: "MASTER",

        remainingAmount: {

gt: 0

}
      },

      _sum: {
        amount: true,
      },
    });

  const collected =
    await prisma.invoice.aggregate({
      where: {
        invoiceKind: "MASTER",
      },

      _sum: {
        paidAmount: true,
      },
    });

  const outstanding =
    await prisma.invoice.aggregate({
      where: {
        invoiceKind: "MASTER",
      },

      _sum: {
        remainingAmount: true,
      },
    });

  const overdue =
    await prisma.invoice.aggregate({
      where: {
        status: "OVERDUE",
      },

      _sum: {
        remainingAmount: true,
      },
    });

  const aging =
    await this.agingBuckets();

  const totalReceivable =
    Number(
      receivable._sum.amount ?? 0
    );

  const totalCollected =
    Number(
      collected._sum.paidAmount ?? 0
    );

  const collectionRate =
    totalReceivable === 0
      ? 0
      : (
          totalCollected /
          totalReceivable
        ) * 100;

  return {
    totalReceivable,

    totalCollected,

    totalOutstanding:
      Number(
        outstanding._sum
          .remainingAmount ?? 0
      ),

    totalOverdue:
      Number(
        overdue._sum
          .remainingAmount ?? 0
      ),

    collectionRate:
      Number(
        collectionRate.toFixed(2)
      ),

    aging,
  };
},

async financeKpi() {

  const receivableResult =
    await prisma.deal.aggregate({
      _sum: {
        value: true,
      },
    });

  const collectedResult =
    await prisma.deal.aggregate({
      _sum: {
        collectedAmount: true,
      },
    });

  const overdueResult =
    await prisma.invoice.aggregate({
      _sum: {
        remainingAmount: true,
      },

      where: {
        status: "OVERDUE",
      },
    });

  const totalRevenue =
    Number(
      receivableResult._sum.value ?? 0
    );

  const totalCollected =
    Number(
      collectedResult._sum
        .collectedAmount ?? 0
    );

  const totalOverdue =
    Number(
      overdueResult._sum
        .remainingAmount ?? 0
    );

  //////////////////////////////////////////////////
  // COLLECTION RATE
  //////////////////////////////////////////////////

  const collectionRate =
    totalRevenue === 0
      ? 0
      : (
          totalCollected /
          totalRevenue
        ) * 100;

  //////////////////////////////////////////////////
  // OVERDUE RATE
  //////////////////////////////////////////////////

  const overdueRate =
    totalRevenue === 0
      ? 0
      : (
          totalOverdue /
          totalRevenue
        ) * 100;

  //////////////////////////////////////////////////
  // COLLECTION EFFICIENCY
  //////////////////////////////////////////////////

  const collectionEfficiency =
    totalCollected +
      totalOverdue ===
    0
      ? 0
      : (
          totalCollected /
          (
            totalCollected +
            totalOverdue
          )
        ) * 100;

  //////////////////////////////////////////////////
  // DSO
  //////////////////////////////////////////////////

  const outstanding =
    totalRevenue -
    totalCollected;

  const dso =
    totalRevenue === 0
      ? 0
      : (
          outstanding /
          totalRevenue
        ) * 365;

  //////////////////////////////////////////////////
  // AVG COLLECTION DAYS
  //////////////////////////////////////////////////

  const paidPayments =
    await prisma.payment.findMany({
      where: {
        status: "VERIFIED",
        paidAt: {
          not: null,
        },
      },

      include: {
        invoice: true,
      },
    });

  let avgCollectionDays = 0;

  if (paidPayments.length > 0) {

    const totalDays =
      paidPayments.reduce(
        (sum, payment) => {

          const issuedAt =
            payment.invoice
              .issuedAt;

          const paidAt =
            payment.paidAt!;

          const diffDays =
            Math.ceil(
              (
                paidAt.getTime() -
                issuedAt.getTime()
              ) /
              (
                1000 *
                60 *
                60 *
                24
              )
            );

          return (
            sum + diffDays
          );
        },
        0
      );

    avgCollectionDays =
      totalDays /
      paidPayments.length;
  }

  return {
    dso:
      Number(
        dso.toFixed(2)
      ),

    collectionRate:
      Number(
        collectionRate.toFixed(2)
      ),

    overdueRate:
      Number(
        overdueRate.toFixed(2)
      ),

    collectionEfficiency:
      Number(
        collectionEfficiency.toFixed(2)
      ),

    averageCollectionDays:
      Number(
        avgCollectionDays.toFixed(2)
      ),
  };
}
};