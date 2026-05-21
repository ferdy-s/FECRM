import { prisma } from "@/lib/prisma";

export const productService = {
  async create(data: any) {
    if (!data.name || !data.price) {
      throw new Error("Missing required fields");
    }

    return prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.product.update({
      where: { id },

      data: {
        name: data.name,
        price: data.price,
      },
    });
  },

  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  },

  async list() {
    return prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },

  async detail(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  },
};