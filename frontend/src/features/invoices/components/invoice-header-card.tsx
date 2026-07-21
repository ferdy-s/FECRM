"use client";

import Link from "next/link";

import {
  Calendar,
  CreditCard,
  FileText,
  Landmark,
  QrCode,
} from "lucide-react";

import type {
  Invoice,
} from "@/types/invoice";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Separator,
} from "@/components/ui/separator";

import {
  useGenerateQris,
} from "@/hooks/use-generate-qris";

interface Props {
  invoice: Invoice;
}

function formatDate(
  value: string |null,
) {

  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  );

}

export function InvoiceHeaderCard({
  invoice,
}: Props) {

  const generateQris =
    useGenerateQris();

  return (

    <Card>

      <CardContent className="p-6">

        <div
          className="
            flex
            flex-col
            gap-6
            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          <div>

            <h1
              className="
                text-3xl
                font-bold
                tracking-tight
              "
            >
              {invoice.invoiceNumber ?? "-"}
            </h1>

            <p className="text-muted-foreground">
              Invoice Detail
            </p>

          </div>

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >

            <Button
              asChild
              variant="outline"
            >

              <Link
  href={`${process.env.NEXT_PUBLIC_API_URL}/api/invoices/${invoice.id}/pdf`}
  target="_blank"
>

                <FileText
                  className="
                    mr-2
                    h-4
                    w-4
                  "
                />

                View Invoice PDF

              </Link>

            </Button>

            {invoice.paymentMethod ===
              "QRIS_MIDTRANS" &&

              invoice.status !==
                "PAID" &&

              invoice.status !==
                "CANCELLED" &&

              !(
                invoice.invoiceKind ===
                  "MASTER" &&
                invoice.paymentType ===
                  "TERMIN"
              ) && (

                <Button
                  onClick={() =>
                    generateQris.mutate(
                      invoice.id,
                    )
                  }
                  disabled={
                    generateQris.isPending
                  }
                >

                  <QrCode
                    className="
                      mr-2
                      h-4
                      w-4
                    "
                  />

                  {generateQris.isPending
                    ? "Generating QRIS..."
                    : "Generate QRIS"}

                </Button>

              )}

          </div>

        </div>

        <Separator className="my-6" />

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          <div>

            <div className="flex items-center gap-2">

              <FileText className="h-4 w-4" />

              <span className="text-sm text-muted-foreground">
                Invoice ID
              </span>

            </div>

            <p className="mt-2 font-medium break-all">
              {invoice.id}
            </p>

          </div>

          <div>

            <div className="flex items-center gap-2">

              <Calendar className="h-4 w-4" />

              <span className="text-sm text-muted-foreground">
                Issued Date
              </span>

            </div>

            <p className="mt-2 font-medium">
              {formatDate(
                invoice.issuedAt,
              )}
            </p>

          </div>

          <div>

            <div className="flex items-center gap-2">

              <CreditCard className="h-4 w-4" />

              <span className="text-sm text-muted-foreground">
                Payment Type
              </span>

            </div>

            <p className="mt-2 font-medium">
              {invoice.paymentType}
            </p>

          </div>

          <div>

            <div className="flex items-center gap-2">

              <Landmark className="h-4 w-4" />

              <span className="text-sm text-muted-foreground">
                Payment Method
              </span>

            </div>

            <p className="mt-2 font-medium">
              {invoice.paymentMethod}
            </p>

          </div>

        </div>

      </CardContent>

    </Card>

  );

}

export default InvoiceHeaderCard;