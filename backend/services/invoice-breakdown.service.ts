import { prisma } from "@/lib/prisma";

export const invoiceBreakdownService = {

  async detail(
    invoiceId: string
  ) {

    const invoice =
      await prisma.invoice.findUnique({

        where: {
          id: invoiceId,
        },

        include: {

          //////////////////////////////////////////////////
          // INVOICE ITEMS
          //////////////////////////////////////////////////

          items: true,

          //////////////////////////////////////////////////
          // DEAL
          //////////////////////////////////////////////////

          deal: {

            include: {

              lead: true,

              assignee: {

                select: {

                  id: true,

                  name: true,

                  email: true,

                  role: true,
                },
              },
              

              creator: {

                select: {

                  id: true,

                  name: true,

                  email: true,

                  role: true,
                },
              },

                 items: {

      include: {

        negotiations: {

          where: {
            status: "APPROVED",
          },

          include: {

            requester: {
              select: {
                name: true,
              },
            },

            approver: {
              select: {
                name: true,
              },
            },

          },

          orderBy: {
            createdAt: "desc",
          },

        },

      },

    },
            },
          },

          //////////////////////////////////////////////////
          // RELATION
          //////////////////////////////////////////////////

          parentInvoice: true,

          childInvoices: {

            orderBy: {
              dueDate: "asc",
            },
          },

          payments: {

            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

    if (!invoice) {

  throw new Error(
    "Invoice not found"
  );
}

const negotiations =
  invoice.deal.items.flatMap(
    (item: any) =>

      item.negotiations.map(
        (negotiation: any) => ({

          itemName:
            item.itemName,

          quantity:
            item.quantity,

          oldPrice:
            negotiation.oldPrice,

          approvedPrice:
            negotiation.approvedPrice,

          requester:
            negotiation.requester,

          approver:
            negotiation.approver,

          createdAt:
            negotiation.createdAt,

        })
      )
  );

return {
  ...invoice,
  negotiations,
};

  }
};