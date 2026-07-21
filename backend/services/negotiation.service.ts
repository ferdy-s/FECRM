import { prisma } from "@/lib/prisma";
import { activityService } from "./activity.service";
import { communicationService } from "./communication.service";

export const negotiationService = {

  async start(dealId: string, user: any) {

    const lead = await prisma.lead.findUnique({
      where: {
        id: dealId,
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    // PREVENT DUPLICATE STATUS
    if (lead.status === "NEGOTIATION") {
      throw new Error("Lead already in negotiation stage");
    }

    const updated = await prisma.lead.update({
      where: {
        id: dealId,
      },

      data: {
        status: "NEGOTIATION",

        lastActivityAt: new Date(),
      },
    });

    await activityService.log({
      leadId: dealId,

      userId: user.userId,

      type: "NEGOTIATION",

      description: "Negotiation started",
    });

    return updated;
  },

 async addNote(
    data:any,
    user:any,
){

    const deal =
        await prisma.deal.findUnique({

            where:{
                id:data.dealId,
            },

        });

    if(!deal){

        throw new Error(
            "Deal not found"
        );

    }

    const note =
        await prisma.negotiationNote.create({

            data:{

                dealId:data.dealId,

                userId:user.userId,

                note:data.note,

            },

        });

    await activityService.log({

        leadId:
            deal.leadId,

        userId:
            user.userId,

        type:"NEGOTIATION",

        description:
            "Negotiation note added",

    });

    return note;

},

  async sendProposal(data: any, user: any) {

    // VALIDATE LEAD
    const lead = await prisma.lead.findUnique({
      where: {
        id: data.dealId,
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    // SEND EMAIL VIA COMMUNICATION ENGINE
    const result =
      await communicationService.sendEmail(
        {
          dealId: data.dealId,

          subject: data.subject,

          message: data.message,
        },
        user
      );

    // UPDATE LAST ACTIVITY
    await prisma.lead.update({
      where: {
        id: data.dealId,
      },

      data: {
        lastActivityAt: new Date(),
      },
    });

    // ACTIVITY LOG
    await activityService.log({
      leadId: data.dealId,

      userId: user.userId,

      type: "NEGOTIATION",

      description: "Proposal sent",
    });

    return result;
  },

  async notes(dealId:string) {

    return prisma.negotiationNote.findMany({
      where: {
        dealId,
      },

      include: {
        user: {
          select: {
            id: true,
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