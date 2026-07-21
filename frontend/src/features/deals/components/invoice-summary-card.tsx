import {
  useState,
} from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  Button,
} from "@/components/ui/button";

import {
  ViewInvoiceDialog,
} from "./view-invoice-dialog";

import {
  UploadPaymentDialog,
} from "./upload-payment-dialog";

import type {
  Deal,
} from "@/types/deal";

interface Props {
  deal: Deal;
}


function currency(value: number) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  ).format(value);
}

export function InvoiceSummaryCard({
  deal,
}: Props) {

  const invoices =
    deal.invoices ?? [];

  const [
  selectedInvoice,
  setSelectedInvoice,
] = useState<
  NonNullable<Deal["invoices"]>[number] | null
>(null);

    const [
  openUpload,
  setOpenUpload,
] = useState(false);

  return (

    <Card>
    
    <CardContent className="p-0">

  <ScrollArea
    className="
      h-[calc(50vh-300px)]
      w-full
    "
  >

    <div className="space-y-4 p-3">

      {invoices.length === 0 ? (

        <div
          className="
            flex
            h-28
            items-center
            justify-center
            rounded-xl
            border
            text-sm
            text-muted-foreground
          "
        >
          No invoice generated.
        </div>

      ) : (

        invoices.map((invoice) => (

          <div
            key={invoice.id}
            className="
              rounded-xl
              p-4
              transition-shadow
              hover:shadow-md
            "
          >

            <div
              className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-center
                lg:justify-between
              "
            >

              <div>

                <p className="font-semibold">

                  {invoice.invoiceNumber ??
                    "Draft Invoice"}

                </p>

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >

                  {invoice.invoiceKind}

                </p>

              </div>

              {invoice.paymentMethod ===
                "MANUAL_TRANSFER" &&

                invoice.status ===
                  "UNPAID" && (

                <Button
                  onClick={() => {

                    setSelectedInvoice(
                      invoice,
                    );

                    setOpenUpload(
                      true,
                    );

                  }}
                >

                  Upload Payment

                </Button>

              )}

            </div>

            <div
              className="
                mt-5
                grid
                gap-4
                sm:grid-cols-3
              "
            >

              <div
                className="
                  rounded-lg
                  border
                  p-3
                "
              >

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >

                  Amount

                </p>

                <p
                  className="
                    mt-1
                    font-semibold
                  "
                >

                  {currency(
                    Number(
                      invoice.amount,
                    ),
                  )}

                </p>

              </div>

              <div
                className="
                  rounded-lg
                  border
                  p-3
                "
              >

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >

                  Paid

                </p>

                <p
                  className="
                    mt-1
                    font-semibold
                    text-green-600
                  "
                >

                  {currency(
                    Number(
                      invoice.paidAmount,
                    ),
                  )}

                </p>

              </div>

              <div
                className="
                  rounded-lg
                  border
                  p-3
                "
              >

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >

                  Remaining

                </p>

                <p
                  className="
                    mt-1
                    font-semibold
                    text-orange-600
                  "
                >

                  {currency(
                    Number(
                      invoice.remainingAmount,
                    ),
                  )}

                </p>

              </div>

            </div>

          </div>

        ))

      )}

     
      {selectedInvoice && (

        <UploadPaymentDialog
          invoice={selectedInvoice}
          open={openUpload}
          onOpenChange={(state) => {

            setOpenUpload(
              state,
            );

            if (!state) {

              setSelectedInvoice(
                null,
              );

            }

          }}
        />

      )}

    </div>

  </ScrollArea>
   <ViewInvoiceDialog
        invoices={deal.invoices ?? []}
      />


</CardContent>

    </Card>

  );

}