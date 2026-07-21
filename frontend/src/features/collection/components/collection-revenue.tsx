"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

export function CollectionRevenue({
  collections,
}: Props) {

  const totalAmount =
    collections.reduce(
      (sum, invoice) =>
        sum + invoice.amount,
      0
    );

  const outstanding =
    collections.reduce(
      (sum, invoice) =>
        sum +
        invoice.remainingAmount,
      0
    );

  const collected =
    totalAmount -
    outstanding;

  const collectionRate =
    totalAmount === 0
      ? 0
      : (
          collected /
          totalAmount
        ) * 100;

  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Revenue Collection
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="grid gap-4 md:grid-cols-3">

          <div className="rounded-lg border p-6">

            <p className="text-sm text-muted-foreground">
              Total Revenue
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {formatCurrency(
                totalAmount
              )}
            </h3>

          </div>

          <div className="rounded-lg border p-6">

            <p className="text-sm text-muted-foreground">
              Collected
            </p>

            <h3 className="mt-2 text-2xl font-bold text-green-600">
              {formatCurrency(
                collected
              )}
            </h3>

          </div>

          <div className="rounded-lg border p-6">

            <p className="text-sm text-muted-foreground">
              Outstanding
            </p>

            <h3 className="mt-2 text-2xl font-bold text-red-600">
              {formatCurrency(
                outstanding
              )}
            </h3>

          </div>

        </div>

        <div className="mt-6 rounded-lg border p-6">

          <div className="flex items-center justify-between">

            <span className="text-sm text-muted-foreground">
              Collection Rate
            </span>

            <span className="text-2xl font-bold">
              {collectionRate.toFixed(
                2
              )}
              %
            </span>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}