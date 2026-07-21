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

export function CollectionAging({
  collections,
}: Props) {

  const current =
    collections.filter(
      (invoice) =>
        invoice.daysOverdue <= 0
    ).length;

  const bucket30 =
    collections.filter(
      (invoice) =>
        invoice.daysOverdue >= 1 &&
        invoice.daysOverdue <= 30
    ).length;

  const bucket60 =
    collections.filter(
      (invoice) =>
        invoice.daysOverdue >= 31 &&
        invoice.daysOverdue <= 60
    ).length;

  const bucket90 =
    collections.filter(
      (invoice) =>
        invoice.daysOverdue >= 61 &&
        invoice.daysOverdue <= 90
    ).length;

  const bucket90Plus =
    collections.filter(
      (invoice) =>
        invoice.daysOverdue > 90
    ).length;

  return (
    <div className="grid gap-4 md:grid-cols-5">

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            Current
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {current}
          </h3>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            1 - 30 Days
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {bucket30}
          </h3>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            31 - 60 Days
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {bucket60}
          </h3>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            61 - 90 Days
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {bucket90}
          </h3>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground">
            90+ Days
          </p>

          <h3 className="mt-2 text-3xl font-bold text-red-500">
            {bucket90Plus}
          </h3>
        </CardContent>
      </Card>

    </div>
  );
}