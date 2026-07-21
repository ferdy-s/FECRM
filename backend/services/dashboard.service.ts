import { prisma } from "@/lib/prisma";

import {
  reportService,
} from "./report.service";

import {
  collectionService,
} from "./collection.service";

export const dashboardService = {
  async financeDashboard() {
    const collection =
      await collectionService
        .collectionDashboard();

    const kpi =
      await collectionService
        .financeKpi();

    const overdueInvoices =
      await collectionService
        .worklist();

    const recentActivities =
  await prisma.activity.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });

const notifications =
  await prisma.invoice.findMany({
    where: {
      status: "OVERDUE",
    },
    take: 10,
  });

    const overdueDeals =
      new Set(
        overdueInvoices.map(
          (item) => item.company
        )
      ).size;

   return {
  receivable:
    collection.totalReceivable,

  collected:
    collection.totalCollected,

  outstanding:
    collection.totalOutstanding,

  overdue:
    collection.totalOverdue,

  collectionRate:
    collection.collectionRate,

  overdueInvoices:
    overdueInvoices.length,

  overdueDeals,

  aging:
    collection.aging,

  kpi,

  recentActivities,

  notifications,
};
  },

  async managerDashboard() {

  //////////////////////////////////////////////////
  // PIPELINE
  //////////////////////////////////////////////////

  const pipeline =
    await reportService
      .pipelineOverview();

  //////////////////////////////////////////////////
  // CONVERSION
  //////////////////////////////////////////////////

  const conversion =
    await reportService
      .conversionRate();

  //////////////////////////////////////////////////
  // SALES
  //////////////////////////////////////////////////

  const salesPerformance =
    await reportService
      .salesPerformance();

  const totalDeals =
  salesPerformance.reduce(
    (sum, sales) =>
      sum +
      sales.totalDeals,
    0
  );

const pipelineValue =
  salesPerformance.reduce(
    (sum, sales) =>
      sum +
      sales.pipelineValue,
    0
  );

  //////////////////////////////////////////////////
  // COLLECTION
  //////////////////////////////////////////////////

  const collection =
    await collectionService
      .collectionDashboard();

  //////////////////////////////////////////////////
  // KPI
  //////////////////////////////////////////////////

  const financeKpi =
    await collectionService
      .financeKpi();

  return {

    pipeline: {
      totalLead:
        pipeline.totalLead,

      negotiation:
        pipeline.totalNegotiation,

      won:
        pipeline.totalWon,

      lost:
        pipeline.totalLost,
    },

    conversion: {
      rate:
        conversion.conversionRate,
    },

    sales: {
  totalDeals,

  pipelineValue,
},

    finance: {
      collected:
        collection.totalCollected,

      outstanding:
        collection.totalOutstanding,
    },

    collection: {
      overdue:
        collection.totalOverdue,

      collectionRate:
        collection.collectionRate,
    },

    kpi: {
      dso:
        financeKpi.dso,

      overdueRate:
        financeKpi.overdueRate,
    },
  };
},

async salesDashboard(
  userId: string
) {

  //////////////////////////////////////////////////
  // LEAD
  //////////////////////////////////////////////////

  const assignedLeads =
    await prisma.lead.count({
      where: {
        assignedTo: userId,
      },
    });

  const negotiationLeads =
    await prisma.lead.count({
      where: {
        assignedTo: userId,

        status:
          "NEGOTIATION",
      },
    });

  const wonLeads =
    await prisma.lead.count({
      where: {
        assignedTo: userId,

        status: "WON",
      },
    });

  const lostLeads =
    await prisma.lead.count({
      where: {
        assignedTo: userId,

        status: "LOST",
      },
    });

  //////////////////////////////////////////////////
  // DEAL
  //////////////////////////////////////////////////

  const deals =
    await prisma.deal.findMany({
      where: {
        assignedTo: userId,
      },
    });

  const totalDeals =
    deals.length;

  const pipelineValue =
    deals.reduce(
      (sum, deal) =>
        sum +
        Number(deal.value),
      0
    );

  const collectedRevenue =
    deals.reduce(
      (sum, deal) =>
        sum +
        Number(
          deal.collectedAmount
        ),
      0
    );

  const outstandingRevenue =
    deals.reduce(
      (sum, deal) =>
        sum +
        Number(
          deal.outstandingAmount
        ),
      0
    );

  return {

    lead: {

      assigned:
        assignedLeads,

      negotiation:
        negotiationLeads,

      won:
        wonLeads,

      lost:
        lostLeads,
    },

    deal: {

      totalDeals,

      pipelineValue,

      collectedRevenue,

      outstandingRevenue,
    },
  };
},

async adminDashboard() {

  //////////////////////////////////////////////////
  // USERS
  //////////////////////////////////////////////////

  const totalUsers =
    await prisma.user.count();

  const totalAdmins =
    await prisma.user.count({
      where: {
        role: "ADMIN",
      },
    });

  const totalSales =
    await prisma.user.count({
      where: {
        role: "SALES",
      },
    });

  const totalFinance =
    await prisma.user.count({
      where: {
        role: "FINANCE",
      },
    });

  const totalManagers =
    await prisma.user.count({
      where: {
        role: "MANAGER",
      },
    });

  //////////////////////////////////////////////////
  // LEADS
  //////////////////////////////////////////////////

  const totalLeads =
    await prisma.lead.count();

  const newLeads =
    await prisma.lead.count({
      where: {
        status: "NEW",
      },
    });

  const negotiationLeads =
    await prisma.lead.count({
      where: {
        status: "NEGOTIATION",
      },
    });

  const wonLeads =
    await prisma.lead.count({
      where: {
        status: "WON",
      },
    });

  const lostLeads =
    await prisma.lead.count({
      where: {
        status: "LOST",
      },
    });

  //////////////////////////////////////////////////
  // DEALS
  //////////////////////////////////////////////////

  const totalDeals =
    await prisma.deal.count();

  const dealValue =
    await prisma.deal.aggregate({
      _sum: {
        value: true,
      },
    });

  //////////////////////////////////////////////////
  // INVOICES
  //////////////////////////////////////////////////

  const totalInvoices =
    await prisma.invoice.count();

  const paidInvoices =
    await prisma.invoice.count({
      where: {
        status: "PAID",
      },
    });

  const partialInvoices =
    await prisma.invoice.count({
      where: {
        status: "PARTIAL",
      },
    });

  const overdueInvoices =
    await prisma.invoice.count({
      where: {
        status: "OVERDUE",
      },
    });

  //////////////////////////////////////////////////
  // PAYMENTS
  //////////////////////////////////////////////////

  const totalPayments =
    await prisma.payment.count();

  const pendingPayments =
    await prisma.payment.count({
      where: {
        status: "PENDING",
      },
    });

  const verifiedPayments =
    await prisma.payment.count({
      where: {
        status: "VERIFIED",
      },
    });

  const rejectedPayments =
    await prisma.payment.count({
      where: {
        status: "REJECTED",
      },
    });

  //////////////////////////////////////////////////
  // FINANCE
  //////////////////////////////////////////////////

  const collection =
    await collectionService
      .collectionDashboard();

  //////////////////////////////////////////////////
  // SYSTEM
  //////////////////////////////////////////////////

  const totalActivities =
    await prisma.activity.count();

  const totalAuditLogs =
    await prisma.auditLog.count();

  return {

    users: {
      total:
        totalUsers,

      admins:
        totalAdmins,

      sales:
        totalSales,

      finance:
        totalFinance,

      manager:
        totalManagers,
    },

    lead: {
      total:
        totalLeads,

      new:
        newLeads,

      negotiation:
        negotiationLeads,

      won:
        wonLeads,

      lost:
        lostLeads,
    },

    deal: {
      total:
        totalDeals,

      pipelineValue:
        Number(
          dealValue._sum.value ?? 0
        ),
    },

    invoice: {
      total:
        totalInvoices,

      paid:
        paidInvoices,

      partial:
        partialInvoices,

      overdue:
        overdueInvoices,
    },

    payment: {
      total:
        totalPayments,

      pending:
        pendingPayments,

      verified:
        verifiedPayments,

      rejected:
        rejectedPayments,
    },

    finance: {
      receivable:
        collection.totalReceivable,

      collected:
        collection.totalCollected,

      outstanding:
        collection.totalOutstanding,

      collectionRate:
        collection.collectionRate,
    },

    system: {
      activities:
        totalActivities,

      auditLogs:
        totalAuditLogs,
    },
  };
},

async marketingDashboard() {

  //////////////////////////////////////////////////
  // LEAD KPI
  //////////////////////////////////////////////////

  const totalLead =
    await prisma.lead.count();

  const newLead =
    await prisma.lead.count({
      where: {
        status: "NEW",
      },
    });

const assignedLead =
  totalLead;

const unassignedLead =
  0;

  //////////////////////////////////////////////////
  // LEAD SOURCE
  //////////////////////////////////////////////////

  const sources =
    await prisma.leadSource.findMany({
      include: {
        leads: true,
      },
    });

  const sourceSummary =
    sources.map((source) => ({
      source:
        source.name,

      totalLead:
        source.leads.length,
    }));

  //////////////////////////////////////////////////
  // SALES DISTRIBUTION
  //////////////////////////////////////////////////

  const salesUsers =
    await prisma.user.findMany({
      where: {
        role: "SALES",
      },

      include: {
        leadsAssigned: true,
      },
    });

  const salesDistribution =
    salesUsers.map((sales) => ({
      sales:
        sales.name,

      lead:
        sales.leadsAssigned.length,
    }));

  return {

    lead: {

      total:
        totalLead,

      new:
        newLead,

      assigned:
        assignedLead,

      unassigned:
        unassignedLead,
    },

    sources:
      sourceSummary,

    salesDistribution,
  };
}

};