import { prisma } from "@/lib/prisma";
import { activityService } from "./activity.service";

export const leadService = {
  async create(data: any, user: any) {
    if (!data.name || !data.contact || !data.sourceId || !data.assignedTo) {
      throw new Error("Missing required fields");
    }

    // VALIDATE USER
    const assignedUser = await prisma.user.findUnique({
      where: { id: data.assignedTo },
    });

    if (!assignedUser) {
      throw new Error("Assigned user not found");
    }

    // CREATE LEAD
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        contact: data.contact,

        source: {
          connect: {
            id: data.sourceId,
          },
        },

        assignee: {
          connect: {
            id: data.assignedTo,
          },
        },

        creator: {
          connect: {
            id: user.userId,
          },
        },

        lastActivityAt: new Date(),
      },
    });

    // ACTIVITY LOG
    await activityService.log({
      leadId: lead.id,
      userId: user.userId,
      type: "SYSTEM",
      description: "Lead created",
    });

    // AUDIT LOG
    await prisma.auditLog.create({
      data: {
        entity: "Lead",
        entityId: lead.id,
        action: "CREATE",
        userId: user.userId,
      },
    });

    return lead;
  },

  async assign(leadId: string, assignedTo: string, user: any) {
    // VALIDATE LEAD
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      throw new Error("Lead not found");
    }

    // VALIDATE USER
    const assignedUser = await prisma.user.findUnique({
      where: { id: assignedTo },
    });

    if (!assignedUser) {
      throw new Error("Assigned user not found");
    }

    // UPDATE LEAD
    const lead = await prisma.lead.update({
      where: { id: leadId },

      data: {
        assignee: {
          connect: {
            id: assignedTo,
          },
        },

        lastActivityAt: new Date(),
      },
    });

    // ACTIVITY
    await activityService.log({
      leadId,
      userId: user.userId,
      type: "ASSIGNMENT",
      description: `Assigned to ${assignedUser.email}`,
    });

    // AUDIT
    await prisma.auditLog.create({
      data: {
        entity: "Lead",
        entityId: leadId,
        action: "ASSIGN",
        userId: user.userId,
      },
    });

    return lead;
  },

  async updateStatus(leadId: string, status: any, user: any) {
    // VALIDATE LEAD
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      throw new Error("Lead not found");
    }

    // UPDATE STATUS
    const lead = await prisma.lead.update({
      where: { id: leadId },

      data: {
        status,
        lastActivityAt: new Date(),
      },
    });

    // ACTIVITY
    await activityService.log({
      leadId,
      userId: user.userId,
      type: "STATUS",
      description: `Status changed to ${status}`,
    });

    // AUDIT
    await prisma.auditLog.create({
      data: {
        entity: "Lead",
        entityId: leadId,
        action: "STATUS_UPDATE",
        userId: user.userId,
        newData: {
          status,
        },
      },
    });

    return lead;
  },

  async list(user: any) {
    if (user.role === "MANAGER" || user.role === "ADMIN") {
      return prisma.lead.findMany({
        include: {
          assignee: true,
          source: true,
        },
      });
    }

    return prisma.lead.findMany({
      where: {
        assignedTo: user.userId,
      },

      include: {
        assignee: true,
        source: true,
      },
    });
  },

 async timeline(leadId: string) {
  const [activities, communications] = await Promise.all([
    prisma.activity.findMany({
      where: { leadId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    }),

    prisma.communicationLog.findMany({
      where: { leadId },
    }),
  ]);

  const timeline = [...activities, ...communications].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  return timeline;
}
};