"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Collection }
from "../types/collection";

interface Props {
  collections: Collection[];
}

function formatCurrency(
  value: number
) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

export function CollectionKPI({
  collections,
}: Props) {

  const totalInvoice =
    collections.length;

  const totalAmount =
    collections.reduce(
      (sum, invoice) =>
        sum + invoice.amount,
      0
    );

  const totalOutstanding =
    collections.reduce(
      (sum, invoice) =>
        sum +
        invoice.remainingAmount,
      0
    );

  const overdueInvoice =
    collections.filter(
      (invoice) =>
        invoice.daysOverdue > 0
    ).length;

  return (
    <div className="grid gap-4 md:grid-cols-4">

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Total Invoice
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {totalInvoice}
          </h3>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Total Amount
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {formatCurrency(
              totalAmount
            )}
          </h3>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Outstanding
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {formatCurrency(
              totalOutstanding
            )}
          </h3>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Overdue Invoice
          </p>

          <h3 className="mt-2 text-3xl font-bold text-red-500">
            {overdueInvoice}
          </h3>
        </CardContent>
      </Card>

    </div>
  );
}