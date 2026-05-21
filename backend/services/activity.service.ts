import { prisma } from "@/lib/prisma";

export const activityService = {
  async log(data: {
    leadId: string;
    userId: string;
    type: any;
    description: string;
  }) {
    // CREATE ACTIVITY
    const activity = await prisma.activity.create({
      data,
    });

    // UPDATE LAST ACTIVITY
    await prisma.lead.update({
      where: {
        id: data.leadId,
      },
      data: {
        lastActivityAt: new Date(),
      },
    });

    return activity;
  },
};