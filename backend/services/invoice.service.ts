import { prisma } from "@/lib/prisma";

export const invoiceService = {
  async create(dealId: string, user: any) {

    const deal = await prisma.deal.findUnique({
      where: {
        id: dealId,
      },

      include: {
        lead: true,
      },
    });

    if (!deal) {
      throw new Error("Deal not found");
    }

    const existingInvoice =
      await prisma.invoice.findFirst({
        where: {
          dealId,
        },
      });

    if (existingInvoice) {
      throw new Error("Invoice already exists");
    }

    const invoice = await prisma.invoice.create({
      data: {
        dealId,
        amount: deal.value,
      },
    });

    await prisma.$transaction([

      prisma.activity.create({
        data: {
          leadId: deal.leadId,
          userId: user.userId,
          type: "FINANCE",
          description: "Invoice created",
        },
      }),

      prisma.auditLog.create({
        data: {
          entity: "Invoice",
          entityId: invoice.id,
          action: "CREATE",
          userId: user.userId,
        },
      }),

    ]);

    return invoice;
  },

  async list() {
    return prisma.invoice.findMany({
      include: {
        deal: true,
        payments: true,
      },

      orderBy: {
        issuedAt: "desc",
      },
    });
  },
};