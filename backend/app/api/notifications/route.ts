import { prisma } from "@/lib/prisma";

import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";

import { withError } from "@/middlewares/error.middleware";

export const GET = withError(
  requireAuth(async (req: Request) => {

    const user = (req as any).user;

    const notifications =
      await prisma.notification.findMany({
        where: {
          userId: user.userId,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    return success(notifications);
  })
);