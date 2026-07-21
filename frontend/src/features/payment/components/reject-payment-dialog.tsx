"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ShieldX, TriangleAlert } from "lucide-react";
import { useRejectPayment } from "@/hooks/use-reject-payment";
import type { Payment } from "@/types/payment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Button,
} from "@/components/ui/button";
import {
  Label,
} from "@/components/ui/label";
import {
  Textarea,
} from "@/components/ui/textarea";
import {
  Separator,
} from "@/components/ui/separator";

interface Props {
  payment: Payment;
  open: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
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

function formatDate(
  value: string | null,
) {
  if (!value) return "-";

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(new Date(value));
}

export function RejectPaymentDialog({
  payment,
  open,
  onOpenChange,
}: Props) {
  const mutation =
    useRejectPayment();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    reason,
    setReason,
  ] = useState("");

  async function onSubmit() {
    try {
      if (!reason.trim()) {
        toast.error(
          "Reject reason is required.",
        );
        return;
      }

      setLoading(true);

      await mutation.mutateAsync({
        paymentId: payment.id,
        reason,
      });

      toast.success(
        "Payment rejected successfully.",
      );

      onOpenChange(false);

      setReason("");

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to reject payment.",
      );
    } finally {
      setLoading(false);
    }
  }

    return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Reject Payment
          </DialogTitle>

          <DialogDescription>
            Reject this payment submission. The payment status
            will become <strong>REJECTED</strong> and the payer
            must upload a new payment proof.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">

          <Card>
            <CardContent className="space-y-4 p-5">

              <div className="flex items-center gap-2">
                <ShieldX className="h-5 w-5 text-destructive" />
                <span className="font-medium">
                  Payment Summary
                </span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Invoice
                </span>

                <strong>
                  {payment.invoice?.invoiceNumber ?? "-"}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Amount
                </span>

                <strong>
                  {currency(payment.amount)}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Payment Method
                </span>

                <strong>
                  {payment.paymentMethod ===
                  "QRIS_MIDTRANS"
                    ? "QRIS Midtrans"
                    : "Manual Transfer"}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Uploaded By
                </span>

                <strong>
                  {payment.uploader?.name ?? "-"}
                </strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Uploaded At
                </span>

                <strong>
                  {formatDate(
                    payment.createdAt,
                  )}
                </strong>
              </div>

            </CardContent>
          </Card>

          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">

            <div className="mb-3 flex items-center gap-2">

              <TriangleAlert className="h-5 w-5 text-destructive" />

              <span className="font-medium text-destructive">
                Rejection Reason
              </span>

            </div>

            <Label htmlFor="reason">
              Reason
            </Label>

            <Textarea
              id="reason"
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value,
                )
              }
              rows={4}
              placeholder="Example: Payment proof is blurry, invalid account destination, duplicated payment, incorrect transfer amount..."
              disabled={
                loading ||
                mutation.isPending
              }
              className="mt-2 resize-none"
            />

          </div>

          <div className="rounded-lg border bg-muted/40 p-4 text-sm leading-relaxed">
            Rejecting this payment <strong>will not delete the
            payment record</strong>. The payment status will be
            updated to <strong>REJECTED</strong>, allowing the
            customer or sales team to submit a new payment proof.
          </div>

        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={
              loading ||
              mutation.isPending
            }
            onClick={() =>
              onOpenChange(false)
            }
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={onSubmit}
            disabled={
              loading ||
              mutation.isPending ||
              !reason.trim()
            }
          >
            {loading ||
            mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              <>
                <ShieldX className="mr-2 h-4 w-4" />
                Reject Payment
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}