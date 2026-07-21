"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  FileText,
} from "lucide-react";

import { Collection }
from "../types/collection";

import { CollectionStatusBadge }
from "./collection-status-badge";

import { CollectionPriorityBadge }
from "./collection-priority-badge";

interface Props {
  collections?: Collection[];

  isLoading?: boolean;
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

function formatDate(
  value: string
) {
  return new Intl.DateTimeFormat(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  ).format(
    new Date(value)
  );
}

export function CollectionTable({

  collections = [],

  isLoading = false,

}: Props) {

  ////////////////////////////////////////////////////////

  if (isLoading) {

    return (

      <Card>

        <CardContent className="flex h-56 items-center justify-center">

          <p className="text-muted-foreground">

            Loading collection data...

          </p>

        </CardContent>

      </Card>

    );

  }

  ////////////////////////////////////////////////////////

  if (collections.length === 0) {

    return (

      <Card>

        <CardContent className="flex h-56 flex-col items-center justify-center gap-4">

          <FileText className="h-10 w-10 text-muted-foreground" />

          <div className="text-center">

            <h3 className="font-semibold">

              No Collection Data

            </h3>

            <p className="text-sm text-muted-foreground">

              There are no outstanding invoices.

            </p>

          </div>

        </CardContent>

      </Card>

    );

  }

  ////////////////////////////////////////////////////////

  return (

    <div className="rounded-lg border overflow-x-auto">

      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>
              Invoice
            </TableHead>

            <TableHead>
              Type
            </TableHead>

            <TableHead>
              Company
            </TableHead>

            <TableHead>
              Customer
            </TableHead>

            <TableHead>
              Due Date
            </TableHead>

            <TableHead className="text-right">
              Amount
            </TableHead>

            <TableHead className="text-right">
              Remaining
            </TableHead>

            <TableHead className="text-center">
              Days
            </TableHead>

            <TableHead className="text-center">
              Priority
            </TableHead>

            <TableHead className="text-center">
              Status
            </TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {collections.map((invoice) => (

            <TableRow key={invoice.invoiceId}>

              <TableCell>

                <div className="font-medium">

                  {invoice.invoiceNumber}

                </div>

              </TableCell>

               <TableCell>

                <div className="font-medium">

                  {invoice.paymentType}

                </div>

              </TableCell>

              <TableCell>

                {invoice.company}

              </TableCell>

              <TableCell>

                {invoice.customer}

              </TableCell>

              <TableCell>

                {formatDate(
                  invoice.dueDate
                )}

              </TableCell>

              <TableCell className="text-right font-medium">

                {formatCurrency(
                  invoice.amount
                )}

              </TableCell>

              <TableCell className="text-right font-medium text-red-600">

                {formatCurrency(
                  invoice.remainingAmount
                )}

              </TableCell>

              <TableCell className="text-center">

                {invoice.daysOverdue}

              </TableCell>

              <TableCell className="text-center">

                <CollectionPriorityBadge
                  priority={
                    invoice.priority
                  }
                />

              </TableCell>

              <TableCell className="text-center">

                <CollectionStatusBadge
                  status={
                    invoice.status
                  }
                />

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </div>

  );

}