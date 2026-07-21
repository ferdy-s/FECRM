import { prisma } from "@/lib/prisma";

export const notificationService = {
  async getAll(userId: string) {
    return prisma.notification.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async markRead(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: {
        id,
        userId,
      },

      data: {
        isRead: true,
      },
    });
  },

  async markUnread(id: string, userId: string) {
    return prisma.notification.updateMany({
      where: {
        id,
        userId,
      },

      data: {
        isRead: false,
      },
    });
  },

  async markAllRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },

      data: {
        isRead: true,
      },
    });
  },

  async remove(id: string, userId: string) {
    return prisma.notification.deleteMany({
      where: {
        id,
        userId,
      },
    });
  },
};