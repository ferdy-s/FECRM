import { prisma } from "@/lib/prisma";

export const serviceService = {
  async create(data: any) {
    if (!data.name || !data.price) {
      throw new Error("Missing required fields");
    }

    return prisma.service.create({
      data: {
        name: data.name,
        price: data.price,
      },
    });
  },

  async update(id: string, data: any) {
    return prisma.service.update({
      where: { id },

      data: {
        name: data.name,
        price: data.price,
      },
    });
  },

  async delete(id: string) {
    return prisma.service.delete({
      where: { id },
    });
  },

  async list() {
    return prisma.service.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },

  async detail(id: string) {
    return prisma.service.findUnique({
      where: { id },
    });
  },
};