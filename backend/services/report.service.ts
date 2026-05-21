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

      const totalRevenue =
        user.dealsAssigned.reduce(
          (sum: number, deal: any) =>
            sum + Number(deal.value),
          0
        );

      return {
        salesId: user.id,
        salesName: user.name,
        totalDeals,
        totalRevenue,
      };
    });
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