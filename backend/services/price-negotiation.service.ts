import { prisma } from "@/lib/prisma";

import { activityService } from "./activity.service";
import { dealCommercialService } from "./deal-commercial.service";

function validateScope(scope: string) {

    if (!["ITEM", "TOTAL"].includes(scope)) {

        throw new Error(
            "Invalid negotiation scope"
        );

    }

}

async function validatePendingItem(
    transactionItemId: string,
) {

    const pending =
        await prisma.negotiationRequest.findFirst({

            where: {

                transactionItemId,

                scope: "ITEM",

                status: "PENDING",

            },

        });

    if (pending) {

        throw new Error(
            "There is already a pending negotiation for this item."
        );

    }

}

async function validatePendingTotal(
    dealId: string,
) {

    const pending =
        await prisma.negotiationRequest.findFirst({

            where: {

                dealId,

                scope: "TOTAL",

                status: "PENDING",

            },

        });

    if (pending) {

        throw new Error(
            "There is already a pending total negotiation."
        );

    }

}

export const priceNegotiationService = {

  //////////////////////////////////////////////////
  // REQUEST NEGOTIATION
  //////////////////////////////////////////////////

  async request(
    data: any,
    user: any,
) {

    //////////////////////////////////////////////////////
    // VALIDATE DEAL
    //////////////////////////////////////////////////////

    const deal =
        await prisma.deal.findUnique({

            where: {
                id: data.dealId,
            },

            include: {

                lead: true,

            },

        });

    if (!deal) {

        throw new Error(
            "Deal not found"
        );

    }

    //////////////////////////////////////////////////////
    // VALIDATE
    //////////////////////////////////////////////////////

    validateScope(
        data.scope
    );

    let item = null;

    let oldAmount = 0;

    //////////////////////////////////////////////////////
    // ITEM
    //////////////////////////////////////////////////////

    if (data.scope === "ITEM") {

        if (!data.transactionItemId) {

            throw new Error(
                "Transaction item is required."
            );

        }

        item =
            await prisma.transactionItem.findUnique({

                where: {
                    id: data.transactionItemId,
                },

            });

        if (!item) {

            throw new Error(
                "Transaction item not found"
            );

        }

        if (item.dealId !== deal.id) {

            throw new Error(
                "Transaction item does not belong to this deal."
            );

        }

        await validatePendingItem(
            item.id
        );

        oldAmount =
            Number(item.unitPrice);

    }

    //////////////////////////////////////////////////////
    // TOTAL
    //////////////////////////////////////////////////////

    if (data.scope === "TOTAL") {

        await validatePendingTotal(
            deal.id
        );

        oldAmount =
            Number(
                deal.grandTotal
            );

    }

    //////////////////////////////////////////////////////
    // CREATE REQUEST
    //////////////////////////////////////////////////////

    const negotiation =
        await prisma.negotiationRequest.create({

            data: {

                dealId:
                    deal.id,

                transactionItemId:
                    item?.id ?? null,

                scope:
                    data.scope,

                requestedBy:
                    user.userId,

                oldAmount,

                requestedAmount:
                    data.requestedAmount,

                reason:
                    data.reason,

            },

            include: {

                requester: {

                    select: {

                        id: true,

                        name: true,

                        email: true,

                    },

                },

                item: true,

                deal: {

                    select: {

                        id: true,

                        subtotal: true,

                        grandTotal: true,

                    },

                },

            },

        });

    //////////////////////////////////////////////////////
    // ACTIVITY
    //////////////////////////////////////////////////////

    await activityService.log({

        leadId:
            deal.leadId,

        userId:
            user.userId,

        type:
            "NEGOTIATION",

        description:
            `${data.scope} negotiation requested`,

    });

    //////////////////////////////////////////////////////
    // AUDIT
    //////////////////////////////////////////////////////

    await prisma.auditLog.create({

        data: {

            entity:
                "NegotiationRequest",

            entityId:
                negotiation.id,

            action:
                "CREATE",

            newData: {

                scope:
                    data.scope,

                requestedAmount:
                    data.requestedAmount,

                reason:
                    data.reason,

            },

            userId:
                user.userId,

        },

    });

    return negotiation;

},

  //////////////////////////////////////////////////
  // LIST PENDING
  //////////////////////////////////////////////////
async pending() {

  return prisma.negotiationRequest.findMany({

    where: {

      status: "PENDING",

    },

    include: {

      requester: {

        select: {

          id: true,
          name: true,
          email: true,

        },

      },

      deal: {

        select: {

          id: true,

          subtotal: true,

          discountAmount: true,

          grandTotal: true,

          status: true,

          lead: {

            select: {

              id: true,
              name: true,
              company: true,

            },

          },

        },

      },

      item: {

        select: {

          id: true,

          itemName: true,

          quantity: true,

          price: true,

          unitPrice: true,

          totalPrice: true,

        },

      },

    },

    orderBy: {

      createdAt: "asc",

    },

  });

},

  //////////////////////////////////////////////////
// DASHBOARD
//////////////////////////////////////////////////

async dashboard() {

  const [

    total,

    pending,

    approved,

    rejected,

    itemNegotiations,

    totalNegotiations,

  ] = await Promise.all([

    prisma.negotiationRequest.count(),

    prisma.negotiationRequest.count({

      where: {

        status: "PENDING",

      },

    }),

    prisma.negotiationRequest.count({

      where: {

        status: "APPROVED",

      },

    }),

    prisma.negotiationRequest.count({

      where: {

        status: "REJECTED",

      },

    }),

    prisma.negotiationRequest.count({

      where: {

        scope: "ITEM",

      },

    }),

    prisma.negotiationRequest.count({

      where: {

        scope: "TOTAL",

      },

    }),

  ]);

  return {

    total,

    pending,

    approved,

    rejected,

    itemNegotiations,

    totalNegotiations,

  };

},

//////////////////////////////////////////////////
// HISTORY
//////////////////////////////////////////////////

async history() {

  return prisma.negotiationRequest.findMany({

    include: {

      requester: {

        select: {

          id: true,
          name: true,

        },

      },

      approver: {

        select: {

          id: true,
          name: true,

        },

      },

      deal: {

        select: {

          id: true,

          subtotal: true,

          discountAmount: true,

          grandTotal: true,

          lead: {

            select: {

              id: true,
              name: true,
              company: true,

            },

          },

        },

      },

      item: {

        select: {

          id: true,

          itemName: true,

          quantity: true,

          unitPrice: true,

          totalPrice: true,

        },

      },

    },

    orderBy: {

      reviewedAt: "desc",

    },

  });

},
  //////////////////////////////////////////////////
  // APPROVE
  //////////////////////////////////////////////////

  async approve(
    data: {
        negotiationId: string;
        approvedAmount?: number;
        remarks?: string;
    },
    user: any,
) {

    //////////////////////////////////////////////////////
    // LOAD REQUEST
    //////////////////////////////////////////////////////

    const negotiation =
        await prisma.negotiationRequest.findUnique({

            where: {
                id: data.negotiationId,
            },

            include: {

                deal: true,

                item: true,

            },

        });

    if (!negotiation) {

        throw new Error(
            "Negotiation request not found"
        );

    }

    if (negotiation.status !== "PENDING") {

        throw new Error(
            "Negotiation already processed"
        );

    }

    const approvedAmount =
        data.approvedAmount ??
        Number(negotiation.requestedAmount);

    //////////////////////////////////////////////////////
    // TRANSACTION
    //////////////////////////////////////////////////////

    await prisma.$transaction(async (tx) => {

        /////////////////////////////////////////////////
        // ITEM NEGOTIATION
        /////////////////////////////////////////////////

        if (negotiation.scope === "ITEM") {

            if (!negotiation.item) {

                throw new Error(
                    "Transaction item not found"
                );

            }

            const quantity =
                negotiation.item.quantity;

            await tx.transactionItem.update({

                where: {

                    id:
                        negotiation.item.id,

                },

                data: {

                    unitPrice:
                        approvedAmount,

                    totalPrice:
                        approvedAmount * quantity,

                },

            });

        }

        /////////////////////////////////////////////////
        // UPDATE NEGOTIATION
        /////////////////////////////////////////////////

        await tx.negotiationRequest.update({

            where: {

                id:
                    negotiation.id,

            },

            data: {

                status:
                    "APPROVED",

                approvedBy:
                    user.userId,

                approvedAmount,

                remarks:
                    data.remarks,

                reviewedAt:
                    new Date(),

            },

        });

        /////////////////////////////////////////////////
        // AUDIT
        /////////////////////////////////////////////////

        await tx.auditLog.create({

            data: {

                entity:
                    "NegotiationRequest",

                entityId:
                    negotiation.id,

                action:
                    "APPROVE",

                oldData: {

                    requestedAmount:
                        negotiation.requestedAmount,

                },

                newData: {

                    approvedAmount,

                    remarks:
                        data.remarks,

                },

                userId:
                    user.userId,

            },

        });

    });

    //////////////////////////////////////////////////////
    // RECALCULATE DEAL
    //////////////////////////////////////////////////////

    await dealCommercialService.recalculate(
        negotiation.dealId
    );

    //////////////////////////////////////////////////////
    // ACTIVITY
    //////////////////////////////////////////////////////

    await activityService.log({

        leadId:
            negotiation.deal.leadId,

        userId:
            user.userId,

        type:
            "NEGOTIATION",

        description:
            `${negotiation.scope} negotiation approved`,

    });

    //////////////////////////////////////////////////////
    // RETURN
    //////////////////////////////////////////////////////

    return {

        success: true,

        message:
            "Negotiation approved",

    };

},

  //////////////////////////////////////////////////
  // REJECT
  //////////////////////////////////////////////////

  async reject(
    data:{
        negotiationId:string;
        remarks?:string;
    },
    user:any,
){

    //////////////////////////////////////////////////////
    // LOAD
    //////////////////////////////////////////////////////

    const negotiation =
        await prisma.negotiationRequest.findUnique({

            where:{
                id:data.negotiationId,
            },

            include:{
                deal:true,
            },

        });

    if(!negotiation){

        throw new Error(
            "Negotiation request not found"
        );

    }

    if(
        negotiation.status!=="PENDING"
    ){

        throw new Error(
            "Negotiation already processed"
        );

    }

    //////////////////////////////////////////////////////
    // TRANSACTION
    //////////////////////////////////////////////////////

    await prisma.$transaction(

        async(tx)=>{

            await tx.negotiationRequest.update({

                where:{
                    id:negotiation.id,
                },

                data:{

                    status:"REJECTED",

                    approvedBy:user.userId,

                    reviewedAt:new Date(),

                    remarks:data.remarks,

                },

            });

            await tx.auditLog.create({

                data:{

                    entity:"NegotiationRequest",

                    entityId:negotiation.id,

                    action:"REJECT",

                    newData:{
                        remarks:data.remarks,
                    },

                    userId:user.userId,

                },

            });

        }

    );

    //////////////////////////////////////////////////////
    // ACTIVITY
    //////////////////////////////////////////////////////

    await activityService.log({

        leadId:
            negotiation.deal.leadId,

        userId:
            user.userId,

        type:"NEGOTIATION",

        description:
            `${negotiation.scope} negotiation rejected`,

    });

    return{

        success:true,

        message:
            "Negotiation rejected",

    };

},
};

