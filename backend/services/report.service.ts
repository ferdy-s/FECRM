import { prisma } from "@/lib/prisma";

export const reportService = {

  async pipelineOverview() {

    const [
      totalLead,
      totalNegotiation,
      totalWon,
      totalLost,
    ] = await Promise.all([

      prisma.lead.count(),

      prisma.lead.count({
        where: {
          status: "NEGOTIATION",
        },
      }),

      prisma.lead.count({
        where: {
          status: "WON",
        },
      }),

      prisma.lead.count({
        where: {
          status: "LOST",
        },
      }),

    ]);

    return {
      totalLead,
      totalNegotiation,
      totalWon,
      totalLost,
    };
  },

  async conversionRate() {

    const totalLead =
      await prisma.lead.count();

    const totalWon =
      await prisma.lead.count({
        where: {
          status: "WON",
        },
      });

    const conversionRate =
      totalLead === 0
        ? 0
        : (totalWon / totalLead) * 100;

    return {
      totalLead,
      totalWon,
      conversionRate:
        Number(conversionRate.toFixed(2)),
    };
  },

  async salesPerformance() {

    const salesUsers =
      await prisma.user.findMany({
        where: {
          role: "SALES",
        },

        include: {
          dealsAssigned: true,
        },
      });

    return salesUsers.map((user) => {

      const totalDeals =
        user.dealsAssigned.length;

      const activeDeals =
        user.dealsAssigned;

      const pipelineValue =
  activeDeals.reduce(
    (sum, deal) =>
      sum + Number(deal.value),
    0
  );

     const collectedRevenue =
  activeDeals.reduce(
    (sum, deal) =>
      sum + Number(deal.collectedAmount),
    0
  );

      const outstandingRevenue =
  activeDeals.reduce(
    (sum, deal) =>
      sum + Number(deal.outstandingAmount),
    0
  );

      return {
        salesId: user.id,
        salesName: user.name,

        totalDeals,

        pipelineValue,

        collectedRevenue,

        outstandingRevenue,
      };
    });
  },

  async collectionRevenue() {

    const result =
      await prisma.deal.aggregate({
        _sum: {
          collectedAmount: true,
        },
      });

    return {
      collectedRevenue:
        Number(
          result._sum.collectedAmount ?? 0
        ),
    };
  },

  async outstandingRevenue() {

    const result =
      await prisma.deal.aggregate({
        _sum: {
          outstandingAmount: true,
        },
      });

    return {
      outstandingRevenue:
        Number(
          result._sum.outstandingAmount ?? 0
        ),
    };
  },

  async collectionRate() {

    const result =
      await prisma.deal.aggregate({
        _sum: {
          collectedAmount: true,
          value: true,
        },
      });

    const collectedRevenue =
      Number(
        result._sum.collectedAmount ?? 0
      );

    const totalRevenue =
      Number(
        result._sum.value ?? 0
      );

    const collectionRate =
      totalRevenue === 0
        ? 0
        : (collectedRevenue / totalRevenue) * 100;

    return {
      totalRevenue,
      collectedRevenue,
      collectionRate:
        Number(collectionRate.toFixed(2)),
    };
  },

  async collectionDashboard() {

  //////////////////////////////////////////////////
  // RECEIVABLE
  //////////////////////////////////////////////////

  const receivable =
    await prisma.deal.aggregate({
      _sum: {
        value: true,
      },
    });

  //////////////////////////////////////////////////
  // COLLECTED
  //////////////////////////////////////////////////

  const collected =
    await prisma.deal.aggregate({
      _sum: {
        collectedAmount: true,
      },
    });

  //////////////////////////////////////////////////
  // OUTSTANDING
  //////////////////////////////////////////////////

  const outstanding =
    await prisma.deal.aggregate({
      _sum: {
        outstandingAmount: true,
      },
    });

  //////////////////////////////////////////////////
  // OVERDUE
  //////////////////////////////////////////////////

  const overdueInvoices =
    await prisma.invoice.findMany({
      where: {
        status: "OVERDUE",
      },
    });

  const totalOverdue =
    overdueInvoices.reduce(
      (sum, invoice) =>
        sum +
        Number(
          invoice.remainingAmount
        ),
      0
    );

  //////////////////////////////////////////////////
  // COLLECTION RATE
  //////////////////////////////////////////////////

  const totalReceivable =
    Number(
      receivable._sum.value ?? 0
    );

  const totalCollected =
    Number(
      collected._sum
        .collectedAmount ?? 0
    );

  const collectionRate =
    totalReceivable === 0
      ? 0
      : (
          totalCollected /
          totalReceivable
        ) * 100;

  //////////////////////////////////////////////////
  // OVERDUE DEAL COUNT
  //////////////////////////////////////////////////

  const overdueDealIds =
    new Set(
      overdueInvoices.map(
        (invoice) =>
          invoice.dealId
      )
    );

  //////////////////////////////////////////////////
  // RESPONSE
  //////////////////////////////////////////////////

  return {
    receivable:
      totalReceivable,

    collected:
      totalCollected,

    outstanding:
      Number(
        outstanding._sum
          .outstandingAmount ?? 0
      ),

    overdue:
      totalOverdue,

    collectionRate:
      Number(
        collectionRate.toFixed(2)
      ),

    overdueInvoices:
      overdueInvoices.length,

    overdueDeals:
      overdueDealIds.size,
  };
},

  async sourceEffectiveness() {

    const sources =
      await prisma.leadSource.findMany({
        include: {
          leads: true,
        },
      });

    return sources.map((source) => {

      const totalLead =
        source.leads.length;

      const totalWon =
        source.leads.filter(
          (lead) => lead.status === "WON"
        ).length;

      const conversionRate =
        totalLead === 0
          ? 0
          : (totalWon / totalLead) * 100;

      return {
        sourceId: source.id,
        sourceName: source.name,
        totalLead,
        totalWon,
        conversionRate:
          Number(conversionRate.toFixed(2)),
      };
    });
  },
};