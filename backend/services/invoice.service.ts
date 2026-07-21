import { prisma } from "@/lib/prisma";

import {
  invoiceNumberService,
} from "./invoice-number.service";

export const invoiceService = {
 async create(data: any, user: any) {

  const deal =
await prisma.deal.findUnique({

    where:{
        id:data.dealId,
    },

    include:{

        lead:true,

        items:true,

    },

});

  if (!deal) {
    throw new Error(
      "Deal not found"
    );
  }

  if(

deal.status!=="WON"

){

throw new Error(
"Only WON deal can be invoiced."
);

}

//////////////////////////////////////////////////
// PENDING NEGOTIATION
//////////////////////////////////////////////////

const pendingNegotiation =
  await prisma.negotiationRequest.findFirst({
    where: {
      dealId: deal.id,
      status: "PENDING",
    },
  });

if (pendingNegotiation) {
  throw new Error(
    "There is pending negotiation request."
  );
}
  //////////////////////////////////////////////////
// COMMERCIAL VALIDATION
//////////////////////////////////////////////////

if(Number(deal.grandTotal)<=0){

    throw new Error(
        "Deal grand total must be greater than zero."
    );

}

  const existingMasterInvoice =
    await prisma.invoice.findFirst({
      where: {
        dealId: data.dealId,

        invoiceKind: "MASTER",
      },
    });

  if (existingMasterInvoice) {
    throw new Error(
      "Master invoice already exists"
    );
  }

  const paymentType =
    data.paymentType;

  const paymentMethod =
    data.paymentMethod;

  if (
    !["FULL", "TERMIN"].includes(
      paymentType
    )
  ) {
    throw new Error(
      "Invalid payment type"
    );
  }

  if (
    ![
      "MANUAL_TRANSFER",
      "QRIS_MIDTRANS",
    ].includes(paymentMethod)
  ) {
    throw new Error(
      "Invalid payment method"
    );
  }

  //////////////////////////////////////////////////
  // FULL PAYMENT
  //////////////////////////////////////////////////
if (paymentType === "FULL") {

  return await prisma.$transaction(async (tx) => {

    //////////////////////////////////////////////////
    // GENERATE INVOICE NUMBER
    //////////////////////////////////////////////////

    const masterInvoiceNumber =
      await invoiceNumberService.generateMasterInvoiceNumber();

    //////////////////////////////////////////////////
    // CREATE MASTER INVOICE
    //////////////////////////////////////////////////

    const masterInvoice =
      await tx.invoice.create({

        data: {

          dealId: deal.id,

          invoiceNumber: masterInvoiceNumber,

          amount: deal.grandTotal,

          paidAmount: 0,

          remainingAmount: deal.grandTotal,

          status: "UNPAID",

          paymentType: "FULL",

          paymentMethod,

          invoiceKind: "MASTER",

        },

      });

    //////////////////////////////////////////////////
    // SNAPSHOT DEAL ITEMS
    //////////////////////////////////////////////////

    for (const item of deal.items) {

      await tx.invoiceItem.create({

        data: {

          invoiceId: masterInvoice.id,

          itemType: item.type,

          itemName:
            item.itemName ?? "Unknown",

          quantity: item.quantity,

          unitPrice:
            item.unitPrice ??
            item.price,

          totalPrice:
            item.totalPrice ??
            Number(
              item.unitPrice ??
              item.price
            ) * item.quantity,

        },

      });

    }

    //////////////////////////////////////////////////
    // ACTIVITY
    //////////////////////////////////////////////////

    await tx.activity.create({

      data: {

        leadId: deal.leadId,

        userId: user.userId,

        type: "FINANCE",

        description:
          "Full invoice created",

      },

    });

    //////////////////////////////////////////////////
    // AUDIT LOG
    //////////////////////////////////////////////////

    await tx.auditLog.create({

      data: {

        entity: "Invoice",

        entityId: masterInvoice.id,

        action: "CREATE_FULL",

        userId: user.userId,

      },

    });

    //////////////////////////////////////////////////
    // RETURN
    //////////////////////////////////////////////////

    return {

      masterInvoice,

      childInvoices: [],

    };

  });

}

  //////////////////////////////////////////////////
  // TERMIN PAYMENT
  //////////////////////////////////////////////////

  const terms = data.terms;

  if (
    !terms ||
    !Array.isArray(terms) ||
    terms.length === 0
  ) {
    throw new Error(
      "Terms are required"
    );
  }

  if (terms.length > 5) {
    throw new Error(
      "Maximum 5 terms allowed"
    );
  }

  const totalPercent =
    terms.reduce(
      (
        sum: number,
        item: any
      ) =>
        sum +
        Number(item.percent),
      0
    );

  if (totalPercent !== 100) {
    throw new Error(
      "Total termin percentage must equal 100%"
    );
  }

  const masterInvoiceNumber =
    await invoiceNumberService
      .generateMasterInvoiceNumber();

  const result =
    await prisma.$transaction(
      async (tx) => {

        //////////////////////////////////////////////////
        // MASTER INVOICE
        //////////////////////////////////////////////////

        const masterInvoice =
          await tx.invoice.create({
            data: {
              dealId: deal.id,

              invoiceNumber:
                masterInvoiceNumber,

              amount: deal.grandTotal,

              paidAmount: 0,

              remainingAmount:
                deal.grandTotal,

              status: "UNPAID",

              paymentType:
                "TERMIN",

              paymentMethod,

              invoiceKind:
                "MASTER",
            },
          });

          //////////////////////////////////////////////////
// SNAPSHOT DEAL ITEMS
//////////////////////////////////////////////////

const dealItems =
  await tx.transactionItem.findMany({
    where: {
      dealId: deal.id,
    },
  });

for (const item of dealItems) {

  await tx.invoiceItem.create({
    data: {

      invoiceId:
        masterInvoice.id,

      itemType:
        item.type,

      itemName:
        item.itemName ?? "Unknown",

      quantity:
        item.quantity,

      unitPrice:
        item.unitPrice ??
        item.price,

      totalPrice:
        item.totalPrice ??
        (
          Number(
            item.unitPrice ??
            item.price
          ) *
          item.quantity
        ),
    },
  });
}

        //////////////////////////////////////////////////
        // CHILD INVOICES
        //////////////////////////////////////////////////

        const childInvoices: any[] = [];

        let allocatedAmount = 0;

        for (
          let index = 0;
          index < terms.length;
          index++
        ) {

          const term =
            terms[index];

         let amount: number;

if (
  index === terms.length - 1
) {

  amount =
    Number(deal.grandTotal) -
    allocatedAmount;

} else {

  amount = Math.round(
    (
      Number(deal.grandTotal) *
      Number(term.percent)
    ) /
    100
  );

  allocatedAmount += amount;
}

          const terminNumber =
            invoiceNumberService
              .generateTerminInvoiceNumber(
                masterInvoiceNumber,
                index + 1
              );

          const childInvoice =
            await tx.invoice.create({
              data: {

                dealId: deal.id,

                parentInvoiceId:
                  masterInvoice.id,

                invoiceNumber:
                  terminNumber,

                invoiceKind:
                  "TERMIN",

                paymentType:
                  "TERMIN",

                paymentMethod,

                amount,

                percent:
                  term.percent,

                dueDate:
                  new Date(
                    term.dueDate
                  ),

                paidAmount: 0,

                remainingAmount:
                  amount,

                status:
                  "UNPAID",
              },
            });

          childInvoices.push(
            childInvoice
          );
        }

        //////////////////////////////////////////////////
        // ACTIVITY
        //////////////////////////////////////////////////

        await tx.activity.create({
          data: {
            leadId:
              deal.leadId,

            userId:
              user.userId,

            type:
              "FINANCE",

            description:
              `Termin invoice created (${terms.length} terms)`,
          },
        });

        //////////////////////////////////////////////////
        // AUDIT
        //////////////////////////////////////////////////

        await tx.auditLog.create({
          data: {
            entity:
              "Invoice",

            entityId:
              masterInvoice.id,

            action:
              "CREATE_TERMIN",

            userId:
              user.userId,
          },
        });

        return {
          masterInvoice,
          childInvoices,
        };
      }
    );

  return result;
},

  async list() {

  return prisma.invoice.findMany({

    include: {

      deal: {

        include: {

          lead: true,

        },

      },

      payments: true,

      parentInvoice: true,

      childInvoices: true,

    },

    orderBy: {

      issuedAt: "desc",

    },

  });

},

  async detail(id: string) {

  const invoice =
  await prisma.invoice.findUnique({

    where: {
      id,
    },

    include: {

      deal: {

        include: {

          lead: true,

        },

      },

      items: true,

      payments: true,

      childInvoices: {

        include: {

          payments: true,

        },

      },

      parentInvoice: true,

    },

  });

  if (!invoice) {
    throw new Error(
      "Invoice not found"
    );
  }

  return invoice;
},

  async getTerms(invoiceId: string) {

    if (!invoiceId) {
  throw new Error(
    "Invoice ID is required"
  );
}

  const masterInvoice =
    await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
      

      include: {
        childInvoices: {
          orderBy: {
            dueDate: "asc",
          },
        },
      },
    });
    

  if (!masterInvoice) {
    throw new Error(
      "Invoice not found"
    );
  }

  return {
    masterInvoice,
    terms:
      masterInvoice.childInvoices,
  };
},

async getProgress(
  invoiceId: string
) 
  
{ 

 if (!invoiceId) {
  throw new Error(
    "Invoice ID is required"
  );
}
  const invoice =
    await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
      },
    });

  if (!invoice) {
    throw new Error(
      "Invoice not found"
    );
  }

  const progressPercent =
    Number(invoice.amount) === 0
      ? 0
      : (
          Number(
            invoice.paidAmount
          ) /
          Number(
            invoice.amount
          )
        ) *
        100;

  return {
    invoiceId:
      invoice.id,

    invoiceNumber:
      invoice.invoiceNumber,

    amount:
      Number(invoice.amount),

    paidAmount:
      Number(invoice.paidAmount),

    remainingAmount:
      Number(
        invoice.remainingAmount
      ),

    progressPercent:
      Number(
        progressPercent.toFixed(2)
      ),

    status:
      invoice.status,
  };
},

async overdueInvoices() {

  const today =
    new Date();

  return prisma.invoice.findMany({
    where: {

      invoiceKind:
        "TERMIN",

      status: {
        not: "PAID",
      },

      dueDate: {
        lt: today,
      },
    },

    orderBy: {
      dueDate: "asc",
    },
  });
},
};