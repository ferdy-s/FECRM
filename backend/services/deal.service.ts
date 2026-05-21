import { prisma } from "@/lib/prisma";

export const dealService = {
  async create(data: any, user: any) {
    const lead = await prisma.lead.findUnique({
      where: { id: data.leadId },
    });

    if (!lead) {
      throw new Error("Lead not found");
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

    value: data.value,
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

  async list() {
    return prisma.deal.findMany({
      include: {
  lead: true,
  items: true,
},
    });
  },

  async updateStatus(
    dealId: string,
    status: any,
    user: any
  ) {
    const deal = await prisma.deal.update({
      where: {
        id: dealId,
      },

      data: {
        status,
      },
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