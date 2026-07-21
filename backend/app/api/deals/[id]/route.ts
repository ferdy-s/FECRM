import { prisma } from "@/lib/prisma";
import { success } from "@/lib/response";

import { requireAuth } from "@/middlewares/auth.middleware";
import { withError } from "@/middlewares/error.middleware";

export const GET = withError(
  requireAuth(
    async (
      req: Request,
      context: any,
    ) => {

      const { id } =
        await context.params;

      const user =
        (req as any).user;

      //////////////////////////////////////////////////////
      // BUILD WHERE CLAUSE (RBAC)
      //////////////////////////////////////////////////////

      const where =

        user.role === "ADMIN" ||
        user.role === "MANAGER" ||
        user.role === "FINANCE"

          ? {
              id,
            }

          : {
              id,
              assignedTo:
                user.userId,
            };

      //////////////////////////////////////////////////////
      // LOAD DEAL
      //////////////////////////////////////////////////////

      const deal =
        await prisma.deal.findFirst({

          where,

          include: {

            lead: true,

            assignee: {

              select: {

                id: true,

                name: true,

                email: true,

              },

            },

            creator: {

              select: {

                id: true,

                name: true,

                email: true,

              },

            },

            items: {

              include: {

                negotiations: {

                  orderBy: {

                    createdAt: "desc",

                  },

                },

              },

            },

            invoices: true,

          },

        });

      //////////////////////////////////////////////////////
      // NOT FOUND / FORBIDDEN
      //////////////////////////////////////////////////////

      if (!deal) {

        throw new Error(
          "Deal not found",
        );

      }

      return success(deal);

    },
  ),
);