import { ActivityType } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const activityService = {
  async log(data: {
    leadId: string;
    userId: string;
    type: ActivityType;
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