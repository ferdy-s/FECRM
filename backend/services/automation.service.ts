import { prisma } from "@/lib/prisma";

export const automationService = {

  /* ==========================================================
   * UPSERT NOTIFICATION
   * ========================================================== */

  async upsertNotification(
    userId: string,
    title: string,
    message: string,
  ) {

    const existing =
      await prisma.notification.findFirst({

        where: {

          userId,

          title,

          message,

        },

      });

    if (existing) {

      await prisma.notification.update({

        where: {

          id: existing.id,

        },

        data: {

          isRead: false,

          message,

        },

      });

      return false;

    }

    await prisma.notification.create({

      data: {

        userId,

        title,

        message,

      },

    });

    return true;

  },

  /* ==========================================================
   * FOLLOW UP REMINDER
   * ========================================================== */

  async followUpReminder() {

    const threeDaysAgo = new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000
    );

    const leads =
      await prisma.lead.findMany({

        where: {

          status: {

            in: [
              "NEW",
              "CONTACTED",
              "NEGOTIATION",
            ],

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

      const created =
        await this.upsertNotification(

          lead.assignedTo,

          "Follow-up Reminder",

          message,

        );

      if (created) {

        total++;

      }

    }

    return {

      checked: leads.length,

      created: total,

    };

  },

  /* ==========================================================
   * INACTIVE LEAD ESCALATION
   * ========================================================== */

  async inactiveLeadEscalation() {

    const sevenDaysAgo = new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    );

    const manager =
      await prisma.user.findFirst({

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

    const leads =
      await prisma.lead.findMany({

        where: {

          status: {

            in: [
              "NEW",
              "CONTACTED",
              "NEGOTIATION",
            ],

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

      const created =
        await this.upsertNotification(

          manager.id,

          "Inactive Lead",

          message,

        );

      if (created) {

        total++;

      }

    }

    return {

      checked: leads.length,

      created: total,

    };

  },

  /* ==========================================================
   * RUN ALL AUTOMATION
   * ========================================================== */

  async runAll() {

    console.log("");

    console.log(
      "========================================"
    );

    console.log(
      "🤖 FECRM AUTOMATION ENGINE"
    );

    console.log(
      new Date().toLocaleString()
    );

    console.log(
      "========================================"
    );

    const followup =
      await this.followUpReminder();

    const inactive =
      await this.inactiveLeadEscalation();

    console.table({

      FollowUp: followup,

      Inactive: inactive,

    });

    console.log(
      "✅ Automation Finished"
    );

    console.log("");

    return {

      followup,

      inactive,

    };

  },

  /* ==========================================================
   * SCHEDULER
   * ========================================================== */

  async schedulerJob() {

    try {

      await this.runAll();

    } catch (error) {

      console.error(
        "❌ Automation Scheduler Error"
      );

      console.error(error);

    }

  },

};