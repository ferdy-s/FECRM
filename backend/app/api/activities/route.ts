import { prisma } from "@/lib/prisma";
import { success } from "@/lib/response";
import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

export const GET = withError(
  requireAuth(async () => {
    const activities = await prisma.activity.findMany({
      include: {
        lead: {
          select: {
            id: true,
            name: true,
            company: true,
            status: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return success(activities);
  })
);