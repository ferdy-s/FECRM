"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BadgeDollarSign,
  CircleDollarSign,
  Wallet,
  ReceiptText,
} from "lucide-react";

import {
  useInvoices,
} from "@/hooks/use-invoices";

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

export function InvoiceKPICards() {

  const {
    data = [],
  } =
    useInvoices();

  const total =
    data.reduce(
      (a, b) =>
        a + Number(b.amount),
      0,
    );

  const paid =
    data.reduce(
      (a, b) =>
        a + Number(b.paidAmount),
      0,
    );

  const remaining =
    data.reduce(
      (a, b) =>
        a + Number(b.remainingAmount),
      0,
    );

 return (

  <div
    className="
      grid
      gap-4
      md:grid-cols-2
      xl:grid-cols-4
    "
  >

    {/* Total Invoice */}

    <Card
      className="
        transition-all
        hover:shadow-lg
      "
    >

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
          
        "
      >

        <CardTitle
          className="
            text-sm
            font-medium
            text-muted-foreground
          "
        >

          Total Invoice

        </CardTitle>

        <ReceiptText
          className="
            h-7
            w-7
            text-primary
          "
        />

      </CardHeader>

      <CardContent>

        <div
          className="
            text-3xl
            font-bold
          "
        >

          {data.length} Invoices

        </div>

        <p
          className="
            mt-2
            text-xs
            text-muted-foreground
          "
        >

          Active invoices

        </p>

      </CardContent>

    </Card>

    {/* Invoice Value */}

    <Card
      className="
        transition-all
        hover:shadow-lg
      "
    >

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
          
        "
      >

        <CardTitle
          className="
            text-sm
            font-medium
            text-muted-foreground
          "
        >

          Invoice Value

        </CardTitle>

        <BadgeDollarSign
          className="
            h-7
            w-7
            text-blue-600
          "
        />

      </CardHeader>

      <CardContent>

        <div
          className="
            text-3xl
            font-bold
          "
        >

          {currency(total)}

        </div>

        <p
          className="
            mt-2
            text-xs
            text-muted-foreground
          "
        >

          Gross invoice amount

        </p>

      </CardContent>

    </Card>

    {/* Paid */}

    <Card
      className="
        transition-all
        hover:shadow-lg
      "
    >

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
          
        "
      >

        <CardTitle
          className="
            text-sm
            font-medium
            text-muted-foreground
          "
        >

          Paid Revenue

        </CardTitle>

        <CircleDollarSign
          className="
            h-7
            w-7
            text-green-600
          "
        />

      </CardHeader>

      <CardContent>

        <div
          className="
            text-3xl
            font-bold
            text-green-600
          "
        >

          {currency(paid)}

        </div>

        <p
          className="
            mt-2
            text-xs
            text-muted-foreground
          "
        >

          Successfully collected

        </p>

      </CardContent>

    </Card>

    {/* Outstanding */}

    <Card
      className="
        transition-all
        hover:shadow-lg
      "
    >

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
          
        "
      >

        <CardTitle
          className="
            text-sm
            font-medium
            text-muted-foreground
          "
        >

          Outstanding

        </CardTitle>

        <Wallet
          className="
            h-7
            w-7
            text-red-600
          "
        />

      </CardHeader>

      <CardContent>

        <div
          className="
            text-3xl
            font-bold
            text-red-600
          "
        >

          {currency(remaining)}

        </div>

        <p
          className="
            mt-2
            text-xs
            text-muted-foreground
          "
        >

          Awaiting payment

        </p>

      </CardContent>

    </Card>

  </div>

);

}