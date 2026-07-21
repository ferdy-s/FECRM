import { prisma } from "@/lib/prisma";

export const dealCommercialService = {

  //////////////////////////////////////////////////////
  // RECALCULATE COMMERCIAL
  //////////////////////////////////////////////////////

  async recalculate(
    dealId: string,
  ) {

    ////////////////////////////////////////////////////
    // LOAD DEAL
    ////////////////////////////////////////////////////

    const deal =
      await this.loadDeal(
        dealId,
      );

    ////////////////////////////////////////////////////
    // LOAD ITEMS
    ////////////////////////////////////////////////////

    const items =
  await this.loadItems(
    dealId,
  );

    ////////////////////////////////////////////////////
    // SUBTOTAL
    ////////////////////////////////////////////////////

    const subtotal =
  this.calculateSubtotal(
    items,
  );

    ////////////////////////////////////////////////////
    // TOTAL NEGOTIATION
    ////////////////////////////////////////////////////

    const totalNegotiation =
      await this.getApprovedTotalNegotiation(
        dealId,
      );

    ////////////////////////////////////////////////////
    // GRAND TOTAL
    ////////////////////////////////////////////////////

    const {
      grandTotal,
      discountAmount,
    } =
      this.calculateGrandTotal(
        subtotal,
        totalNegotiation,
      );

    //////////////////////////////////////////////////////
// LOAD INVOICES
//////////////////////////////////////////////////////

const masterInvoice =
await prisma.invoice.findFirst({

    where:{
        dealId,
        invoiceKind:"MASTER",
    },

    select:{
        paidAmount:true,
        remainingAmount:true,
        status:true,
    },

});

const collectedAmount =
Number(
    masterInvoice?.paidAmount ?? 0,
);


  //////////////////////////////////////////////////////
// OUTSTANDING
//////////////////////////////////////////////////////

const outstandingAmount =
  this.calculateOutstanding(
    grandTotal,
    collectedAmount,
  );

//////////////////////////////////////////////////////
// COLLECTION STATUS
//////////////////////////////////////////////////////

const collectionStatus =
  masterInvoice?.status === "PAID"
    ? "PAID"
    : masterInvoice?.status === "PARTIAL"
    ? "PARTIAL"
    : "UNPAID";

    ////////////////////////////////////////////////////
    // UPDATE DEAL
    ////////////////////////////////////////////////////
const updated = await this.updateDeal({
  dealId,
  subtotal,
  grandTotal,
  discountAmount,
  collectedAmount,
  outstandingAmount,
  collectionStatus,
  negotiatedAt:
    totalNegotiation?.reviewedAt ?? null,
});

console.log("========== DEAL RECALCULATED ==========");
console.log({
  dealId,
  subtotal,
  grandTotal,
  collectedAmount,
  outstandingAmount,
  collectionStatus,
});

return updated;

  },

  //////////////////////////////////////////////////////
  // LOAD DEAL
  //////////////////////////////////////////////////////

  async loadDeal(
    dealId: string,
  ) {

    const deal =
      await prisma.deal.findUnique({

        where: {
          id: dealId,
        },

      });

    if (!deal) {

      throw new Error(
        "Deal not found",
      );

    }

    return deal;

  },

  //////////////////////////////////////////////////////
  // LOAD ITEMS
  //////////////////////////////////////////////////////

  async loadItems(
    dealId: string,
  ) {

    return prisma.transactionItem.findMany({

      where: {
        dealId,
      },

      orderBy: {
        createdAt: "asc",
      },

    });

  },



  //////////////////////////////////////////////////////
  // CALCULATE SUBTOTAL
  //////////////////////////////////////////////////////

  calculateSubtotal(
  items: Awaited<
    ReturnType<typeof this.loadItems>
  >,
) {

  return items.reduce(

    (
      total,
      item,
    ) =>

      total +

      (
        Number(
          item.unitPrice ??
          item.price,
        ) *

        item.quantity
      ),

    0,

  );

},

  //////////////////////////////////////////////////////
  // GET LAST APPROVED TOTAL NEGOTIATION
  //////////////////////////////////////////////////////

  async getApprovedTotalNegotiation(
    dealId: string,
  ) {

    return prisma.negotiationRequest.findFirst({

      where: {

        dealId,

        scope: "TOTAL",

        status:
          "APPROVED",

      },

      orderBy: {

        reviewedAt:
          "desc",

      },

    });

  },

    //////////////////////////////////////////////////////
  // CALCULATE GRAND TOTAL
  //////////////////////////////////////////////////////

  calculateGrandTotal(
    subtotal: number,
    totalNegotiation: {
      approvedAmount: any;
    } | null,
  ) {

    ////////////////////////////////////////////////////
    // DEFAULT
    ////////////////////////////////////////////////////

    let grandTotal =
      subtotal;

    let discountAmount =
      0;

    ////////////////////////////////////////////////////
    // TOTAL NEGOTIATION
    ////////////////////////////////////////////////////

    if (
      totalNegotiation &&
      totalNegotiation.approvedAmount !== null
    ) {

      grandTotal =
        Number(
          totalNegotiation.approvedAmount,
        );

      discountAmount =
        subtotal -
        grandTotal;

    }

    ////////////////////////////////////////////////////
    // SAFETY
    ////////////////////////////////////////////////////

    if (
      discountAmount < 0
    ) {

      discountAmount = 0;

    }

    if (
      grandTotal < 0
    ) {

      grandTotal = 0;

    }

    ////////////////////////////////////////////////////
    // GRAND TOTAL SHOULD NEVER EXCEED SUBTOTAL
    ////////////////////////////////////////////////////

    if (
      grandTotal > subtotal
    ) {

      grandTotal =
        subtotal;

      discountAmount =
        0;

    }

    return {

      grandTotal,

      discountAmount,

    };

  },

  //////////////////////////////////////////////////////
  // CALCULATE OUTSTANDING
  //////////////////////////////////////////////////////

  calculateOutstanding(

    grandTotal: number,

    collectedAmount: number,

  ) {

    let outstandingAmount =

      grandTotal -

      collectedAmount;

    if (
      outstandingAmount < 0
    ) {

      outstandingAmount = 0;

    }

    return outstandingAmount;

  },

    //////////////////////////////////////////////////////
  // UPDATE DEAL
  //////////////////////////////////////////////////////

async updateDeal(
  data: {

      dealId: string;

      subtotal: number;

      discountAmount: number;

      grandTotal: number;

      collectedAmount: number;

      outstandingAmount: number;

      collectionStatus:
        "UNPAID"
        | "PARTIAL"
        | "PAID";

      negotiatedAt:
        Date | null;

  },
)

{

    return prisma.deal.update({

      where: {

        id:
          data.dealId,

      },

      data: {

        //////////////////////////////////////////////////
        // COMMERCIAL
        //////////////////////////////////////////////////

       subtotal:
    data.subtotal,

discountAmount:
    data.discountAmount,

grandTotal:
    data.grandTotal,

negotiatedAt:
    data.negotiatedAt,

collectedAmount:
    data.collectedAmount,

outstandingAmount:
    data.outstandingAmount,

collectionStatus:
    data.collectionStatus,

value:
    data.grandTotal,

      },

    });

  },

  //////////////////////////////////////////////////////
  // COMMERCIAL SUMMARY
  //////////////////////////////////////////////////////

  async summary(
    dealId: string,
  ) {

    return prisma.deal.findUnique({

      where: {

        id:
          dealId,

      },

      select: {

        id: true,

        subtotal: true,

        discountAmount: true,

        grandTotal: true,

        collectedAmount: true,

        outstandingAmount: true,

        collectionStatus: true,

        negotiatedAt: true,

      },

    });

  },

  //////////////////////////////////////////////////////
  // REFRESH
  //////////////////////////////////////////////////////

  async refresh(
    dealId: string,
  ) {

    return this.recalculate(
      dealId,
    );

  },

  //////////////////////////////////////////////////////
  // HAS TOTAL NEGOTIATION
  //////////////////////////////////////////////////////

  async hasApprovedTotalNegotiation(
    dealId: string,
  ) {

    const negotiation =

      await prisma.negotiationRequest.findFirst({

        where: {

          dealId,

          scope:
            "TOTAL",

          status:
            "APPROVED",

        },

      });

    return !!negotiation;

  },

  //////////////////////////////////////////////////////
  // GET GRAND TOTAL
  //////////////////////////////////////////////////////

  async getGrandTotal(
    dealId: string,
  ) {

    const deal =

      await prisma.deal.findUnique({

        where: {

          id:
            dealId,

        },

        select: {

          grandTotal: true,

        },

      });

    if (!deal) {

      throw new Error(
        "Deal not found",
      );

    }

    return Number(
      deal.grandTotal,
    );

  },

};

