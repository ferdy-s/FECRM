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
    if (!lead.phone) {
  throw new Error("Lead phone not found");
}

const provider = await waProvider.send(
  lead.phone,
  data.message
);

    // SAVE COMMUNICATION LOG
  const log = await prisma.communicationLog.create({
  data: {
    lead: {
      connect: {
        id: lead.id,
      },
    },

    user: {
      connect: {
        id: user.userId,
      },
    },

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

console.log(
  "TYPE:",
  typeof data
);

console.log(
  "IS ARRAY:",
  Array.isArray(data)
);

console.log(
  "KEYS:",
  Object.keys(data)
);

console.log(
  "RAW:",
  JSON.stringify(data)
);

console.log(
  "LEAD ID:",
  data.leadId
);

console.log(
  "LEAD ID BRACKET:",
  data["leadId"]
);

    const lead = await prisma.lead.findUnique({
      where: {
        id: data.leadId,
      },
    });

    if (!lead) {
      throw new Error("Lead not found");
    }

    // SEND EMAIL
    if (!lead.email) {
  throw new Error("Lead email not found");
}

const provider = await emailProvider.send(
  lead.email,
  data.subject,
  data.message
);

    // SAVE LOG
    const log = await prisma.communicationLog.create({
  data: {
    lead: {
      connect: {
        id: lead.id,
      },
    },

    user: {
      connect: {
        id: user.userId,
      },
    },

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