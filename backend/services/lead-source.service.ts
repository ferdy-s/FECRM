import { prisma } from "@/lib/prisma";

export const leadSourceService = {

  async create(data: any) {

    if (!data.name) {
      throw new Error("Source name is required");
    }

    return prisma.leadSource.create({
      data: {
        name: data.name,
      },
    });
  },

  async list() {

    return prisma.leadSource.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },

  async detail(id: string) {

    const source =
      await prisma.leadSource.findUnique({
        where: { id },
      });

    if (!source) {
      throw new Error("Lead source not found");
    }

    return source;
  },

  async update(
    id: string,
    data: any
  ) {

    return prisma.leadSource.update({
      where: { id },

      data: {
        name: data.name,
      },
    });
  },

  async delete(id: string) {

    return prisma.leadSource.delete({
      where: { id },
    });
  },

};