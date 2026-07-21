"use client";

//////////////////////////////////////////////////////
// IMPORT
//////////////////////////////////////////////////////

import { useMemo } from "react";

import {
  ReceiptText,
} from "lucide-react";

import type {
  Payment,
} from "@/types/payment";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  PaymentMethodBadge,
} from "./payment-method-badge";

import {
  PaymentStatusBadge,
} from "./payment-status-badge";

//////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////

interface PaymentDetailDialogProps {
  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

  payment: Payment | null;
}

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export function PaymentDetailDialog({
  open,
  onOpenChange,
  payment,
}: PaymentDetailDialogProps) {
  //////////////////////////////////////////////////////
  // MEMO
  //////////////////////////////////////////////////////

  const gateway =
    useMemo(
      () => payment?.gatewayResponse,
      [payment],
    );

  //////////////////////////////////////////////////////
  // FORMATTERS
  //////////////////////////////////////////////////////

  function formatCurrency(
    value?: number,
  ) {
    if (value == null)
      return "-";

    return new Intl.NumberFormat(
      "id-ID",
      {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      },
    ).format(value);
  }

  function formatDate(
    value?: string | null,
  ) {
    if (!value) return "-";

    return new Intl.DateTimeFormat(
      "id-ID",
      {
        dateStyle: "medium",
        timeStyle: "short",
      },
    ).format(
      new Date(value),
    );
  }

  //////////////////////////////////////////////////////
  // COPY
  //////////////////////////////////////////////////////

  async function copyValue(
    value?: string | null,
  ) {
    if (!value) return;

    await navigator.clipboard.writeText(
      value,
    );
  }

  //////////////////////////////////////////////////////
  // EMPTY
  //////////////////////////////////////////////////////

  if (!payment) {
    return (
      <Dialog
        open={open}
        onOpenChange={
          onOpenChange
        }
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Payment Detail
            </DialogTitle>

            <DialogDescription>
              Payment data not found.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent
        className="
          w-full
          max-w-7xl
          p-0
          overflow-hidden
        "
      >
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle className="flex items-center gap-2">
            <ReceiptText className="h-5 w-5" />
            Payment Detail
          </DialogTitle>

          <DialogDescription>
            Complete payment information,
            invoice information,
            verification history,
            and gateway transaction.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[75vh]">
          <div className="space-y-6 p-6">

<Card>
  <CardHeader>
    <CardTitle>
      Payment Information
    </CardTitle>

    <CardDescription>
      Payment transaction detail.
    </CardDescription>
  </CardHeader>

  <CardContent className="grid gap-6 md:grid-cols-2">

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Payment ID
      </p>

      <p className="font-medium break-all">
        {payment.id}
      </p>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Amount
      </p>

      <p className="font-semibold text-lg">
        {formatCurrency(payment.amount)}
      </p>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Payment Method
      </p>

      <PaymentMethodBadge
        method={payment.paymentMethod}
      />
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Payment Status
      </p>

      <PaymentStatusBadge
        status={payment.status}
      />
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Reference Number
      </p>

      <p className="font-medium break-all">
        {payment.referenceNumber ??
          "-"}
      </p>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Transaction ID
      </p>

      <p className="font-medium break-all">
        {payment.midtransTransactionId ??
          "-"}
      </p>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Uploaded At
      </p>

      <p>
        {formatDate(
          payment.createdAt,
        )}
      </p>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Paid At
      </p>

      <p>
        {payment.paidAt
          ? formatDate(
              payment.paidAt,
            )
          : "-"}
      </p>
    </div>

    <div className="space-y-1 md:col-span-2">
      <p className="text-sm text-muted-foreground">
        Payment Proof
      </p>

      {payment.proofUrl ? (
        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a
            href={payment.proofUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Proof
          </a>
        </Button>
      ) : (
        <p>-</p>
      )}
    </div>

  </CardContent>
</Card>
<Card>
  <CardHeader>
    <CardTitle>
      Invoice Information
    </CardTitle>

    <CardDescription>
      Related invoice summary.
    </CardDescription>
  </CardHeader>

  <CardContent className="grid gap-6 md:grid-cols-2">

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Invoice Number
      </p>

      <p className="font-semibold">
        {payment.invoice
          ?.invoiceNumber ?? "-"}
      </p>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Invoice Status
      </p>

      <Badge
        variant="outline"
      >
        {payment.invoice
          ?.status ?? "-"}
      </Badge>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Invoice Type
      </p>

      <Badge
        variant="secondary"
      >
        {payment.invoice
          ?.invoiceKind ?? "-"}
      </Badge>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Payment Type
      </p>

      <Badge
        variant="secondary"
      >
        {payment.invoice
          ?.paymentType ?? "-"}
      </Badge>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Invoice Amount
      </p>

      <p className="font-medium">
        {payment.invoice
          ? formatCurrency(
              payment.invoice
                .amount,
            )
          : "-"}
      </p>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Paid Amount
      </p>

      <p className="font-medium text-green-600">
        {payment.invoice
          ? formatCurrency(
              payment.invoice
                .paidAmount,
            )
          : "-"}
      </p>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Remaining Amount
      </p>

      <p className="font-medium text-red-600">
        {payment.invoice
          ? formatCurrency(
              payment.invoice
                .remainingAmount,
            )
          : "-"}
      </p>
    </div>

    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">
        Due Date
      </p>

      <p>
        {payment.invoice
          ?.dueDate
          ? formatDate(
              payment.invoice
                .dueDate,
            )
          : "-"}
      </p>
    </div>

    {payment.invoice
      ?.percent && (
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          Termin Percentage
        </p>

        <p className="font-medium">
          {
            payment.invoice
              .percent
          }
          %
        </p>
      </div>
    )}

    {payment.invoice
      ?.qrisUrl && (
      <div className="space-y-1 md:col-span-2">
        <p className="text-sm text-muted-foreground">
          QRIS URL
        </p>

        <Button
          variant="outline"
          size="sm"
          asChild
        >
          <a
            href={
              payment.invoice
                .qrisUrl
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Open QRIS
          </a>
        </Button>
      </div>
    )}

  </CardContent>
</Card>
<div className="grid gap-6 lg:grid-cols-2">
  <Card>
    <CardHeader>
      <CardTitle className="text-base">
        Uploaded By
      </CardTitle>
    </CardHeader>

    <CardContent className="space-y-4">
      {payment.uploader ? (
        <>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Name
            </span>

            <span className="font-medium">
              {payment.uploader.name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Email
            </span>

            <span>
              {payment.uploader.email}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Role
            </span>

            <Badge variant="secondary">
              {payment.uploader.role}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Uploaded At
            </span>

            <span>
              {formatDate(payment.createdAt)}
            </span>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Uploaded automatically by payment gateway.
        </p>
      )}
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle className="text-base">
        Verified By
      </CardTitle>
    </CardHeader>

    <CardContent className="space-y-4">
      {payment.verifier ? (
        <>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Name
            </span>

            <span className="font-medium">
              {payment.verifier.name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Email
            </span>

            <span>
              {payment.verifier.email}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Role
            </span>

            <Badge>
              {payment.verifier.role}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Verified At
            </span>

            <span>
              {payment.verifiedAt
                ? formatDate(payment.verifiedAt)
                : "-"}
            </span>
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground">
          Payment has not been verified.
        </p>
      )}
    </CardContent>
  </Card>
</div>

          </div>
        </ScrollArea>
          {payment.gatewayResponse && (
  <Card>
    <CardHeader>
      <CardTitle>
        Midtrans Gateway
      </CardTitle>

      <CardDescription>
        Gateway settlement information
      </CardDescription>
    </CardHeader>

    <CardContent className="grid gap-4 lg:grid-cols-2">
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Transaction ID
        </span>

        <span className="font-medium break-all text-right">
          {payment.gatewayResponse.transaction_id}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Order ID
        </span>

        <span className="font-medium break-all text-right">
          {payment.gatewayResponse.order_id}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Payment Type
        </span>

        <Badge variant="secondary">
          {payment.gatewayResponse.payment_type}
        </Badge>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Currency
        </span>

        <span>
          {payment.gatewayResponse.currency}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Gross Amount
        </span>

        <span className="font-semibold">
          {formatCurrency(
            Number(
              payment.gatewayResponse.gross_amount,
            ),
          )}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Status
        </span>

        <Badge>
          {payment.gatewayResponse.transaction_status}
        </Badge>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Issuer
        </span>

        <span>
          {payment.gatewayResponse.issuer}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Acquirer
        </span>

        <span>
          {payment.gatewayResponse.acquirer}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Fraud Status
        </span>

        <Badge variant="outline">
          {payment.gatewayResponse.fraud_status}
        </Badge>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Settlement
        </span>

        <span>
          {payment.gatewayResponse.settlement_time}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Transaction Time
        </span>

        <span>
          {payment.gatewayResponse.transaction_time}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Expired
        </span>

        <span>
          {payment.gatewayResponse.expiry_time}
        </span>
      </div>
    </CardContent>
  </Card>
)}

{payment.gatewayResponse?.customer_details && (
  <Card>
    <CardHeader>
      <CardTitle>
        Customer
      </CardTitle>

      <CardDescription>
        Customer information from Midtrans
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Full Name
        </span>

        <span className="font-medium">
          {
            payment.gatewayResponse
              .customer_details.full_name
          }
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Email
        </span>

        <span>
          {
            payment.gatewayResponse
              .customer_details.email
          }
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-muted-foreground">
          Phone
        </span>

        <span>
          {
            payment.gatewayResponse
              .customer_details.phone
          }
        </span>
      </div>
    </CardContent>
  </Card>
)}
        <DialogFooter className="gap-2">
  <Button
  variant="outline"
  onClick={() => onOpenChange(false)}
>
  Close
</Button>
</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentDetailDialog;