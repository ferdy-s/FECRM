"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Progress,
} from "@/components/ui/progress";

import {
  useInvoiceProgress,
} from "@/hooks/use-invoice-progress";

interface Props {

  invoiceId: string;

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

export function InvoiceProgressCard({
  invoiceId,
}: Props) {

  const {
    data,
    isLoading,
  } =
    useInvoiceProgress(invoiceId);

  if (isLoading) {

    return (
      <Card>
        <CardContent className="p-6">
          Loading...
        </CardContent>
      </Card>
    );

  }

  if (!data) {

    return null;

  }

  return (

    <Card>

      <CardHeader>

        <CardTitle>

          Collection Progress

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-5">

        <Progress
          value={data.progressPercent}
        />

        <div className="grid gap-4 md:grid-cols-3">

          <div>

            <p className="text-sm text-muted-foreground">
              Total
            </p>

            <p className="font-semibold">
              {currency(data.amount)}
            </p>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">
              Paid
            </p>

            <p className="font-semibold text-green-600">
              {currency(data.paidAmount)}
            </p>

          </div>

          <div>

            <p className="text-sm text-muted-foreground">
              Remaining
            </p>

            <p className="font-semibold text-red-600">
              {currency(data.remainingAmount)}
            </p>

          </div>

        </div>

      </CardContent>

    </Card>

  );

}