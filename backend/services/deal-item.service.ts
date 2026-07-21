import { prisma } from "@/lib/prisma";
import { activityService } from "./activity.service";
import { dealCommercialService } from "./deal-commercial.service";

export const dealItemService = {

  //////////////////////////////////////////////////////
  // ATTACH PRODUCT
  //////////////////////////////////////////////////////

  async attachProduct(
    data: any,
    user: any,
  ) {

    const { dealId, refIds, quantity } = data;

    await ensureDealUnlocked(dealId);

    const deal =
      await prisma.deal.findUnique({
        where: {
          id: dealId,
        },
      });

    if (!deal) {
      throw new Error(`Deal ${dealId} not found`);
    }

    const products =
      await prisma.product.findMany({
        where: {
          id: {
            in: refIds,
          },
        },
      });

    if (products.length !== refIds.length) {
      throw new Error(
        "One or more products not found",
      );
    }

    const items = [];

    for (const product of products) {

      const item =
        await prisma.transactionItem.create({

         data: {

  dealId,

  type: "PRODUCT",

  refId: product.id,

  itemName: product.name,

  quantity,

  price: product.price,

  unitPrice: product.price,

  totalPrice:
    Number(product.price) * quantity,

},

        });

      items.push(item);

    }

  await invalidateTotalNegotiation(
  dealId,
);

await dealCommercialService.recalculate(
  dealId,
);

    await activityService.log({

      leadId: deal.leadId,

      userId: user.userId,

      type: "SYSTEM",

      description:
        `${items.length} product(s) attached to deal`,

    });

    return items;

  },

  //////////////////////////////////////////////////////
  // ATTACH SERVICE
  //////////////////////////////////////////////////////

  async attachService(
    data: any,
    user: any,
  ) {

    const { dealId, refIds, quantity } = data;

    await ensureDealUnlocked(dealId);

    const deal =
      await prisma.deal.findUnique({
        where: {
          id: dealId,
        },
      });

    if (!deal) {
      throw new Error(`Deal ${dealId} not found`);
    }

    const services =
      await prisma.service.findMany({
        where: {
          id: {
            in: refIds,
          },
        },
      });

    if (services.length !== refIds.length) {
      throw new Error(
        "One or more services not found",
      );
    }

    const items = [];

    for (const service of services) {

      const item =
        await prisma.transactionItem.create({

          data: {

            dealId,

            type: "SERVICE",

            refId: service.id,

            itemName: service.name,

            quantity,

            price: service.price,

            unitPrice: service.price,

            totalPrice:
  Number(service.price) * quantity,

          },

        });

      items.push(item);

    }

  await invalidateTotalNegotiation(
  dealId,
);

await dealCommercialService.recalculate(
  dealId,
);

    await activityService.log({

      leadId: deal.leadId,

      userId: user.userId,

      type: "SYSTEM",

      description:
        `${items.length} service(s) attached to deal`,

    });

    return items;

  },

  //////////////////////////////////////////////////////
  // LIST
  //////////////////////////////////////////////////////

  async list(
    dealId: string,
  ) {

    return prisma.transactionItem.findMany({

      where: {
        dealId,
      },

      include: {
        negotiations: true,
      },

      orderBy: {
        createdAt: "asc",
      },

    });

  },

  //////////////////////////////////////////////////////
  // UPDATE QUANTITY
  //////////////////////////////////////////////////////

  async updateQuantity(
    id: string,
    quantity: number,
    user: any,
  ) {

    const item =
      await prisma.transactionItem.findUnique({

        where: {
          id,
        },

        include: {

          deal: {

            select: {
              leadId: true,
            },

          },

        },

      });

    if (!item) {
      throw new Error(
        "Transaction item not found",
      );
    }

    await ensureDealUnlocked(item.dealId);

    const totalPrice =
      Number(item.unitPrice ?? item.price) *
      quantity;
const updated =
  await prisma.transactionItem.update({

    where: {
      id,
    },

    data: {

      quantity,

      totalPrice,

    },

  });

await invalidateTotalNegotiation(
  item.dealId,
);

await dealCommercialService.recalculate(
  item.dealId,
);

    await activityService.log({

      leadId: item.deal.leadId,

      userId: user.userId,

      type: "SYSTEM",

      description:
        `Updated quantity "${item.itemName}" to ${quantity}`,

    });

    await prisma.auditLog.create({

      data: {

        entity: "TransactionItem",

        entityId: id,

        action: "UPDATE_QTY",

        userId: user.userId,

      },

    });

    return updated;

  },

  //////////////////////////////////////////////////////
  // DELETE ITEM
  //////////////////////////////////////////////////////

  async remove(
    id: string,
    user: any,
  ) {

    const item =
      await prisma.transactionItem.findUnique({

        where: {
          id,
        },

        include: {

          deal: {

            select: {
              leadId: true,
            },

          },

        },

      });

    if (!item) {
      throw new Error(
        "Transaction item not found",
      );
    }

    await ensureDealUnlocked(item.dealId);

   await prisma.transactionItem.delete({

  where:{
    id,
  },

});

await invalidateTotalNegotiation(
  item.dealId,
);

await dealCommercialService.recalculate(
  item.dealId,
);

    await activityService.log({

      leadId: item.deal.leadId,

      userId: user.userId,

      type: "SYSTEM",

      description:
        `Removed "${item.itemName}" from deal`,

    });

    await prisma.auditLog.create({

      data: {

        entity: "TransactionItem",

        entityId: id,

        action: "DELETE",

        userId: user.userId,

      },

    });

    return {
      success: true,
    };

  },

};

async function invalidateTotalNegotiation(
  dealId: string,
) {

  await prisma.negotiationRequest.updateMany({

    where: {

      dealId,

      scope: "TOTAL",

      status: "APPROVED",

    },

    data: {

      status: "REJECTED",

      remarks:
        "Automatically invalidated because deal items changed.",

      reviewedAt: new Date(),

    },

  });

}

//////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////

async function ensureDealUnlocked(
  dealId: string,
) {

  const deal =
    await prisma.deal.findUnique({

      where: {
        id: dealId,
      },

      select: {

        id: true,

        status: true,

        invoices: {
          select: {
            id: true,
          },
          take: 1,
        },

      },

    });

  if (!deal) {

    throw new Error(
      "Deal not found",
    );

  }

  //////////////////////////////////////////////////////
  // FINAL DEAL LOCK
  //////////////////////////////////////////////////////

  if (
    deal.status === "WON" ||
    deal.status === "LOST"
  ) {

    throw new Error(
      "This deal has been finalized. Products, services, and transaction items can no longer be modified.",
    );

  }

  //////////////////////////////////////////////////////
  // INVOICE LOCK
  //////////////////////////////////////////////////////

  if (
    deal.invoices.length > 0
  ) {

    throw new Error(
      "This deal already has an invoice and is locked.",
    );

  }

}