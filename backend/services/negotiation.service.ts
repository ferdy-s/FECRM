import { prisma } from "@/lib/prisma";
import { activityService } from "./activity.service";
import { communicationService } from "./communication.service";

export const negotiationService = {
  async start(leadId: string, user: any) {
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    const updated = await prisma.lead.update({
      where: { id: leadId },
      data: {
        status: "NEGOTIATION",
        lastActivityAt: new Date(),
      },
    });

    await activityService.log({
      leadId,
      userId: user.userId,
      type: "NEGOTIATION",
      description: "Negotiation started",
    });

    return updated;
  },

  async addNote(data: any, user: any) {
    const note = await prisma.negotiationNote.create({
      data: {
        leadId: data.leadId,
        userId: user.userId,
        note: data.note,
      },
    });

    await activityService.log({
      leadId: data.leadId,
      userId: user.userId,
      type: "NEGOTIATION",
      description: "Negotiation note added",
    });

    return note;
  },

  async sendProposal(data: any, user: any) {
    const result =
      await communicationService.sendEmail(
        {
          leadId: data.leadId,
          to: data.to,
          subject: data.subject,
          message: data.message,
        },
        user
      );

    await activityService.log({
      leadId: data.leadId,
      userId: user.userId,
      type: "NEGOTIATION",
      description: "Proposal sent",
    });

    return result;
  },

  async notes(leadId: string) {
    return prisma.negotiationNote.findMany({
      where: { leadId },
      include: {
        user: {
          select: {
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
};