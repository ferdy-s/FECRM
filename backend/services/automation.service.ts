import { prisma } from "@/lib/prisma";

export const automationService = {

  async followUpReminder() {

    const threeDaysAgo = new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000
    );

    const leads = await prisma.lead.findMany({
      where: {
        status: {
          in: ["NEW", "CONTACTED", "NEGOTIATION"],
        },

        lastActivityAt: {
          lte: threeDaysAgo,
        },
      },

      include: {
        assignee: true,
      },
    });

    let total = 0;

    for (const lead of leads) {

      const message =
        `Lead ${lead.name}, belum di-follow-up selama 3 hari`;

      // ✅ PREVENT DUPLICATE
      const existing =
        await prisma.notification.findFirst({
          where: {
            userId: lead.assignedTo,

            title: "Follow-up Reminder",

            message,

            isRead: false,
          },
        });

      // ✅ ONLY CREATE IF NOT EXISTS
      if (!existing) {

        await prisma.notification.create({
          data: {
            userId: lead.assignedTo,

            title: "Follow-up Reminder",

            message,
          },
        });

        total++;
      }
    }

    return {
      checked: leads.length,
      created: total,
    };
  },

  async inactiveLeadEscalation() {

    const sevenDaysAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    );

    const manager = await prisma.user.findFirst({
      where: {
        role: "MANAGER",
      },
    });

    if (!manager) {
      return {
        checked: 0,
        created: 0,
      };
    }

    const leads = await prisma.lead.findMany({
      where: {
        status: {
          in: ["NEW", "CONTACTED", "NEGOTIATION"],
        },

        lastActivityAt: {
          lte: sevenDaysAgo,
        },
      },
    });

    let total = 0;

    for (const lead of leads) {

      const message =
        `Lead ${lead.name}, inactive selama 7 hari`;

      // ✅ PREVENT DUPLICATE
      const existing =
        await prisma.notification.findFirst({
          where: {
            userId: manager.id,

            title: "Inactive Lead",

            message,

            isRead: false,
          },
        });

      // ✅ ONLY CREATE IF NOT EXISTS
      if (!existing) {

        await prisma.notification.create({
          data: {
            userId: manager.id,

            title: "Inactive Lead",

            message,
          },
        });

        total++;
      }
    }

    return {
      checked: leads.length,
      created: total,
    };
  },
};