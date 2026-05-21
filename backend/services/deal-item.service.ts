import { prisma } from "@/lib/prisma";

export const dealItemService = {
  async attachProduct(data: any) {
    const product = await prisma.product.findUnique({
      where: {
        id: data.refId,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const item = await prisma.transactionItem.create({
      data: {
        dealId: data.dealId,
        type: "PRODUCT",
        refId: data.refId,
        quantity: data.quantity,
        price: product.price,
      },
    });

    await recalculateDeal(data.dealId);

    return item;
  },

  async attachService(data: any) {
    const service = await prisma.service.findUnique({
      where: {
        id: data.refId,
      },
    });

    if (!service) {
      throw new Error("Service not found");
    }

    const item = await prisma.transactionItem.create({
      data: {
        dealId: data.dealId,
        type: "SERVICE",
        refId: data.refId,
        quantity: data.quantity,
        price: service.price,
      },
    });

    await recalculateDeal(data.dealId);

    return item;
  },

  async list(dealId: string) {
    return prisma.transactionItem.findMany({
      where: {
        dealId,
      },
    });
  },
};

async function recalculateDeal(dealId: string) {
  const items = await prisma.transactionItem.findMany({
    where: {
      dealId,
    },
  });

  const total = items.reduce((sum: number, item: any) => {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  await prisma.deal.update({
    where: {
      id: dealId,
    },

    data: {
      value: total,
    },
  });
}