import { prisma } from "@/lib/prisma";
import { waProvider } from "@/providers/wa.provider";
import { emailProvider } from "@/providers/email.provider";
import { activityService } from "./activity.service";

export const communicationService = {
  async sendWhatsApp(data: any, user: any) {
    // FIND LEAD
    const lead = await prisma.lead.findUnique({
      where: {
        id: data.leadId,
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    // SEND WA
    const provider = await waProvider.send(
      lead.contact,
      data.message
    );

    // SAVE COMMUNICATION LOG
    const log = await prisma.communicationLog.create({
      data: {
        leadId: lead.id,
        channel: "WA",
        direction: "OUTBOUND",
        message: data.message,
        status: "SENT",
        externalId: provider.externalId,
      },
    });

    // CENTRALIZED ACTIVITY LOG
    await activityService.log({
      leadId: lead.id,
      userId: user.userId,
      type: "COMMUNICATION",
      description: "WhatsApp message sent",
    });

    return log;
  },

  async sendEmail(data: any, user: any) {
    // FIND LEAD
    const lead = await prisma.lead.findUnique({
      where: {
        id: data.leadId,
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    // SEND EMAIL
    const provider = await emailProvider.send(
      data.to,
      data.subject,
      data.message
    );

    // SAVE LOG
    const log = await prisma.communicationLog.create({
      data: {
        leadId: lead.id,
        channel: "EMAIL",
        direction: "OUTBOUND",
        message: data.message,
        status: "SENT",
        externalId: provider.externalId,
      },
    });

    // CENTRALIZED ACTIVITY
    await activityService.log({
      leadId: lead.id,
      userId: user.userId,
      type: "COMMUNICATION",
      description: "Email sent",
    });

    return log;
  },

  async track(data: any) {
    return prisma.communicationLog.update({
      where: {
        id: data.communicationId,
      },

      data: {
        status: data.status,
      },
    });
  },

  async history(leadId: string) {
    return prisma.communicationLog.findMany({
      where: {
        leadId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },
};