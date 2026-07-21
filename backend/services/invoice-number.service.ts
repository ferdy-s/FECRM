import { prisma } from "@/lib/prisma";

export const invoiceNumberService = {

  async generateMasterInvoiceNumber() {

    const year =
      new Date().getFullYear();

    const prefix =
      `INV-${year}`;

    const latestInvoice =
      await prisma.invoice.findFirst({
        where: {
          invoiceKind: "MASTER",

          invoiceNumber: {
            startsWith: prefix,
          },
        },

        orderBy: {
          invoiceNumber: "desc",
        },
      });

    let nextSequence = 1;

    if (
      latestInvoice?.invoiceNumber
    ) {

      const parts =
        latestInvoice.invoiceNumber.split(
          "-"
        );

      const currentSequence =
        Number(parts[2]);

      nextSequence =
        currentSequence + 1;
    }

    return `${prefix}-${String(
      nextSequence
    ).padStart(4, "0")}`;
  },

  generateTerminInvoiceNumber(
    masterInvoiceNumber: string,
    index: number
  ) {

    return `${masterInvoiceNumber}-T${index}`;
  },
};