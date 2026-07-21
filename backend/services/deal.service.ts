import { prisma } from "@/lib/prisma";
import { activityService } from "./activity.service";
import { dealCommercialService }
from "./deal-commercial.service";

export const dealService = {
  async create(data: any, user: any) {
    const lead = await prisma.lead.findUnique({
      where: { id: data.leadId },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    const existingDeal =
  await prisma.deal.findUnique({
    where: {
      leadId: data.leadId,
    },
  });

if (existingDeal) {
  throw new Error(
    "Lead already converted to deal"
  );
}

    if (lead.status !== "WON") {
      throw new Error("Lead must be WON");
    }

    const deal = await prisma.deal.create({
  data: {
    lead: {
      connect: {
        id: data.leadId,
      },
    },

    assignee: {
      connect: {
        id: lead.assignedTo,
      },
    },

    creator: {
      connect: {
        id: user.userId,
      },
    },

    value: 0,

   collectionStatus: "UNPAID",

collectedAmount: 0,

outstandingAmount: 0,
  },
});

    await prisma.$transaction([
  prisma.activity.create({
    data: {
      leadId: data.leadId,
      userId: user.userId,
      type: "SYSTEM",
      description: "Deal created",
    },
  }),

  prisma.auditLog.create({
    data: {
      entity: "Deal",
      entityId: deal.id,
      action: "CREATE",
      userId: user.userId,
    },
  }),
]);

    return deal;
  },

  async list(user: any) {

  const where =
    user.role === "ADMIN" ||
    user.role === "MANAGER" ||
    user.role === "FINANCE"
      ? {}
      : {
          assignedTo: user.userId,
        };

  return prisma.deal.findMany({

    where,

    include:{

      lead:true,

      items:true,

    },

    orderBy:{
      createdAt:"desc",
    },

  });

},

  async listInvoiceable() {
  return prisma.deal.findMany({
    where: {
      status: "WON",
      invoices: {
        none: {},
      },
    },
    include: {
      lead: true,
      items: true,
      invoices: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
},

  async updateStatus(
  dealId: string,
  status: any,
  user: any
) {

  const allowed = [
  "OPEN",
  "NEGOTIATION",
  "WON",
  "LOST",
];

  if (!allowed.includes(status)) {
    throw new Error("Invalid status");
  }

  //////////////////////////////////////////////////////
// LOAD DEAL
//////////////////////////////////////////////////////

const currentDeal =
  await prisma.deal.findUnique({

    where: {
      id: dealId,
    },

    include: {
      items: true,
    },

  });

if (!currentDeal) {

  throw new Error(
    "Deal not found",
  );

}

//////////////////////////////////////////////////////
// SALES OWNERSHIP
//////////////////////////////////////////////////////

if (

  user.role === "SALES" &&

  currentDeal.assignedTo !==
    user.userId

) {

  throw new Error(
    "Forbidden",
  );

}

//////////////////////////////////////////////////////
// STATUS FLOW
//////////////////////////////////////////////////////

if (

  currentDeal.status === "NEGOTIATION" &&

  status === "OPEN"

) {

  throw new Error(
    "Deal cannot return to OPEN.",
  );

}

if (

  currentDeal.status === "WON"

) {

  throw new Error(
    "Completed deal cannot be changed.",
  );

}

if (

  currentDeal.status === "LOST"

) {

  throw new Error(
    "Lost deal cannot be changed.",
  );

}

//////////////////////////////////////////////////////
// WON VALIDATION
//////////////////////////////////////////////////////

if (

  status === "WON"

) {

  if (

    currentDeal.items.length === 0

  ) {

    throw new Error(

      "Attach at least one Product or Service before marking deal as WON."

    );

  }

}

  const deal = await prisma.deal.update({
    where: {
      id: dealId,
    },

    data: {
      status,
    },
  });

    await activityService.log({
  leadId: deal.leadId,
  userId: user.userId,
  type: "STATUS",
  description: `Deal status changed to ${status}`,
});

    await prisma.auditLog.create({
      data: {
        entity: "Deal",
        entityId: dealId,
        action: "STATUS_UPDATE",
        userId: user.userId,
      },
    });

    return deal;
  },
};