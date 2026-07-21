"use client";

import {
  BadgeDollarSign,
  CalendarClock,
  CircleDollarSign,
  FileText,
  Handshake,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { InvoiceBreakdown } from "@/services/invoice.service";

interface InvoiceDealCardProps {
  invoice: InvoiceBreakdown;
  className?: string;
}

const currency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function formatCurrency(value?: string | number | null) {
  return currency.format(Number(value ?? 0));
}

function formatDate(date?: string | null) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date(date));
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  switch (status) {
    case "WON":
      return (
        <Badge className="bg-emerald-600 hover:bg-emerald-600">
          WON
        </Badge>
      );

    case "OPEN":
      return (
        <Badge variant="secondary">
          OPEN
        </Badge>
      );

    case "LOST":
      return (
        <Badge variant="destructive">
          LOST
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
}

function CollectionBadge({
  status,
}: {
  status: string;
}) {
  switch (status) {
    case "PAID":
      return (
        <Badge className="bg-emerald-600 hover:bg-emerald-600">
          PAID
        </Badge>
      );

    case "PARTIAL":
      return (
        <Badge className="bg-amber-500 hover:bg-amber-500">
          PARTIAL
        </Badge>
      );

    case "UNPAID":
      return (
        <Badge variant="destructive">
          UNPAID
        </Badge>
      );

    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
}

function Item({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-muted-foreground">
        {icon}
      </div>

      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <div className="text-sm font-medium">
          {children}
        </div>
      </div>
    </div>
  );
}

export function InvoiceDealCard({
  invoice,
  className,
}: InvoiceDealCardProps) {
  const deal = invoice.deal;

  const {
    id,
    value,
    status,
    collectionStatus,
    collectedAmount,
    outstandingAmount,
    createdAt,
    assignee,
    creator,
  } = deal;

  return (
    <Card
      className={cn(
        "border-border/60 shadow-sm transition-colors",
        className,
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Handshake className="h-5 w-5 text-primary" />
          Deal Information
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-8 pt-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Item
            icon={<BadgeDollarSign className="h-4 w-4" />}
            label="Deal Value"
          >
            {formatCurrency(value)}
          </Item>

          <Item
            icon={<CircleDollarSign className="h-4 w-4" />}
            label="Collection Status"
          >
            <CollectionBadge
              status={collectionStatus}
            />
          </Item>

          <Item
            icon={<Handshake className="h-4 w-4" />}
            label="Deal Status"
          >
            <StatusBadge
              status={status}
            />
          </Item>

          <Item
            icon={<CalendarClock className="h-4 w-4" />}
            label="Created At"
          >
            {formatDate(createdAt)}
          </Item>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <Item
            icon={<CircleDollarSign className="h-4 w-4" />}
            label="Collected Amount"
          >
            <span className="font-semibold text-emerald-600">
              {formatCurrency(collectedAmount)}
            </span>
          </Item>

          <Item
            icon={<CircleDollarSign className="h-4 w-4" />}
            label="Outstanding Amount"
          >
            <span className="font-semibold text-destructive">
              {formatCurrency(outstandingAmount)}
            </span>
          </Item>
        </div>

        <Separator />

        <div className="grid gap-6 lg:grid-cols-2">
          <Item
            icon={<User className="h-4 w-4" />}
            label="Assigned Sales"
          >
            <div className="space-y-1">
              <p className="font-medium">
                {assignee?.name ?? "-"}
              </p>

              <p className="text-xs text-muted-foreground">
                {assignee?.email ?? "-"}
              </p>

              <Badge
                variant="outline"
                className="mt-1"
              >
                {assignee?.role ?? "-"}
              </Badge>
            </div>
          </Item>

          <Item
            icon={<FileText className="h-4 w-4" />}
            label="Created By"
          >
            <div className="space-y-1">
              <p className="font-medium">
                {creator?.name ?? "-"}
              </p>

              <p className="text-xs text-muted-foreground">
                {creator?.email ?? "-"}
              </p>

              <Badge
                variant="outline"
                className="mt-1"
              >
                {creator?.role ?? "-"}
              </Badge>
            </div>
          </Item>
        </div>

                <Separator />

        <div className="rounded-lg border bg-muted/30 p-5">
          <h3 className="mb-4 text-sm font-semibold">
            Deal Summary
          </h3>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Total Deal
              </p>

              <p className="text-lg font-semibold">
                {formatCurrency(value)}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Collected
              </p>

              <p className="text-lg font-semibold text-emerald-600">
                {formatCurrency(collectedAmount)}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Outstanding
              </p>

              <p className="text-lg font-semibold text-destructive">
                {formatCurrency(outstandingAmount)}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Collection
              </p>

              <CollectionBadge
                status={collectionStatus}
              />
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Deal ID
            </p>

            <p className="break-all font-mono text-xs text-muted-foreground">
              {id}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Deal Created
            </p>

            <p className="font-medium">
              {formatDate(createdAt)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InvoiceDealCard;