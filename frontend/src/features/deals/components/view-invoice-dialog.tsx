"use client";

import Link from "next/link";

import {
  Eye,
  FileText,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import type {
  DealInvoice,
} from "@/types/deal";

interface Props {
  invoices: DealInvoice[];
}

function currency(
  value: number,
) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  ).format(value);
}

export function ViewInvoiceDialog({
  invoices,
}: Props) {

  return (

    <Dialog>

      <DialogTrigger asChild>

        <div className="flex justify-center">

  <Button
    className="
      w-full
      max-w-sm
    "
    variant="outline"
  >

    View All Invoices

  </Button>

</div>

      </DialogTrigger>

      <DialogContent className="max-w-2xl">

        <DialogHeader>

          <DialogTitle>

            Invoice Center

          </DialogTitle>

        </DialogHeader>

        <ScrollArea className="max-h-[500px]">

          <div className="space-y-4">

            {invoices.map((invoice) => (

              <div
                key={invoice.id}
                className="
                  rounded-xl
                  border
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <h4 className="font-semibold">

                      {invoice.invoiceKind === "MASTER"
                        ? "Master Invoice"
                        : `Termin ${invoice.percent ?? "-"}`}%

                    </h4>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-muted-foreground
                      "
                    >

                      {invoice.invoiceNumber}

                    </p>

                  </div>

                  <Badge>

                    {invoice.status}

                  </Badge>

                </div>

                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        text-xs
                        text-muted-foreground
                      "
                    >

                      Invoice Amount

                    </p>

                    <p className="font-semibold">

                      {currency(invoice.amount)}

                    </p>

                  </div>

                  <Button
                    asChild
                  >

                    <Link
                      href={`/api/invoices/${invoice.id}/pdf`}
                      target="_blank"
                    >

                      <Eye className="mr-2 h-4 w-4" />

                      View PDF

                    </Link>

                  </Button>

                </div>

              </div>

            ))}

          </div>

        </ScrollArea>

      </DialogContent>

    </Dialog>

  );

}