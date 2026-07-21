"use client";

import {
  ReceiptText,
  Wallet,
  CircleDollarSign,
  TrendingDown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type {
  Invoice,
} from "@/types/invoice";

//////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////

interface Props {

  invoice: Invoice;

}

//////////////////////////////////////////////////////
// FORMATTER
//////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export function InvoiceSummaryCard({
  invoice,
}: Props) {

  return (

    <div
      className="
        grid
        gap-5

        md:grid-cols-3
      "
    >

      <Card>

        <CardHeader>

          <CardTitle
            className="
              flex
              items-center
              gap-2
            "
          >

            <ReceiptText className="h-5 w-5" />

            Invoice Amount

          </CardTitle>

        </CardHeader>

        <CardContent>

          <p
            className="
              text-2xl
              font-bold
            "
          >

            {currency(
              Number(
                invoice.amount,
              ),
            )}

          </p>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle
            className="
              flex
              items-center
              gap-2
            "
          >

            <Wallet className="h-5 w-5" />

            Paid

          </CardTitle>

        </CardHeader>

        <CardContent>

          <p
            className="
              text-2xl
              font-bold
              text-green-600
            "
          >

            {currency(
              Number(
                invoice.paidAmount,
              ),
            )}

          </p>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>

          <CardTitle
            className="
              flex
              items-center
              gap-2
            "
          >

            <TrendingDown className="h-5 w-5" />

            Remaining

          </CardTitle>

        </CardHeader>

        <CardContent>

          <p
            className="
              text-2xl
              font-bold
              text-red-600
            "
          >

            {currency(
              Number(
                invoice.remainingAmount,
              ),
            )}

          </p>

        </CardContent>

      </Card>

    </div>

  );

}