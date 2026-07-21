"use client";

import {
  Building2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { InvoiceBreakdown } from "@/services/invoice.service";


import { cn } from "@/lib/utils";

interface InvoiceCustomerCardProps {
  invoice: InvoiceBreakdown;
  className?: string;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0]?.toUpperCase())
    .join("");
}

function buildAddress(
  customer?: InvoiceBreakdown["deal"]["lead"],
): string {
  if (!customer) {
    return "-";
  }

  return [
    customer.address,
    customer.district,
    customer.city,
    customer.province,
    customer.postalCode,
    customer.country,
  ]
    .filter(Boolean)
    .join(", ");
}

function CustomerInfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">
        {icon}
      </div>

      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="break-words text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

export function InvoiceCustomerCard({
  invoice,
  className,
}: InvoiceCustomerCardProps) {
  const customer = invoice.deal?.lead;

  if (!customer) {
    return (
      <Card className={cn("border-border/60 shadow-sm", className)}>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Customer information is unavailable.
          </p>
        </CardContent>
      </Card>
    );
  }

  const fullAddress = buildAddress(customer);

  return (
    <Card
      className={cn(
        "border-border/60 shadow-sm transition-colors",
        className,
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <User className="h-5 w-5 text-primary" />
          Customer Information
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-8 pt-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <Avatar className="h-20 w-20 rounded-xl border">
            <AvatarFallback className="rounded-xl text-xl font-semibold">
             {getInitials(customer.name || "Customer")}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-semibold">
              {customer.name || "-"}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />

              <span className="text-sm">
                {customer.company || "-"}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <CustomerInfoRow
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={customer.email ?? "-"}
          />

          <CustomerInfoRow
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={customer.phone ?? "-"}
          />
        </div>

        <Separator />

        <div className="grid gap-6 lg:grid-cols-2">
          <CustomerInfoRow
            icon={<Building2 className="h-4 w-4" />}
            label="Company"
            value={customer.company ?? "-"}
          />

          <CustomerInfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="Address"
            value={fullAddress}
          />
        </div>
                <Separator />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Customer Status
            </p>

            <div className="inline-flex items-center rounded-md border bg-muted px-3 py-1 text-sm font-medium">
              {customer.status || "-"}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Customer ID
            </p>

            <p className="break-all font-mono text-sm text-muted-foreground">
              {customer.id}
            </p>
          </div>
        </div>

        <Separator />
      </CardContent>
    </Card>
  );
}

export default InvoiceCustomerCard;