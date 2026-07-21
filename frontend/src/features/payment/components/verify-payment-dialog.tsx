"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, CheckCircle2, ReceiptText, CreditCard, User2, CalendarClock } from "lucide-react";
import { toast } from "sonner";

import { useVerifyPayment } from "@/hooks/use-verify-payment";

import type { Payment } from "@/types/payment";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { ScrollArea } from "@/components/ui/scroll-area";

import { PaymentStatusBadge } from "./payment-status-badge";
import { PaymentMethodBadge } from "./payment-method-badge";

//////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////

interface Props {
  payment: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

//////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////

function currency(value: number) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    },
  ).format(value);
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(new Date(value));
}

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export function VerifyPaymentDialog({
  payment,
  open,
  onOpenChange,
}: Props) {

  const mutation =
    useVerifyPayment();

  const queryClient =
    useQueryClient();

  const [
    loading,
    setLoading,
  ] = useState(false);

  //////////////////////////////////////////////////////
  // SUBMIT
  //////////////////////////////////////////////////////

  async function onSubmit() {

    try {

      setLoading(true);

      await mutation.mutateAsync({

        paymentId:
          payment.id,

        proofUrl:
          payment.proofUrl ?? "",

        status:
          "VERIFIED",

      });

      await Promise.all([

        queryClient.invalidateQueries({
          queryKey: ["payments"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["invoices"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["collections"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["dashboard"],
        }),

        queryClient.invalidateQueries({
          queryKey: ["reports"],
        }),

      ]);

      toast.success(
        "Payment verified successfully.",
      );

      onOpenChange(false);

    } catch (error) {

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to verify payment.",
      );

    } finally {

      setLoading(false);

    }

  }

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent
        className="
          max-w-2xl
        "
      >

        <DialogHeader>

          <DialogTitle>

            Verify Payment

          </DialogTitle>

          <DialogDescription>

            Verify this manual transfer payment.

          </DialogDescription>

        </DialogHeader>

        <ScrollArea
          className="
            max-h-[70vh]
            pr-4
          "
        >

          <div
            className="
              space-y-5
            "
          >

            <Card>

              <CardContent
                className="
                  space-y-4
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <ReceiptText
                    className="
                      h-5
                      w-5
                      text-primary
                    "
                  />

                  <span
                    className="
                      font-medium
                    "
                  >

                    Payment Summary

                  </span>

                </div>

                <Separator />

                                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Invoice Number
                  </span>

                  <strong>
                    {payment.invoice?.invoiceNumber ?? "-"}
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Amount
                  </span>

                  <strong className="text-primary">
                    {currency(payment.amount)}
                  </strong>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Payment Method
                  </span>

                  <PaymentMethodBadge
                    method={payment.paymentMethod}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Status
                  </span>

                  <PaymentStatusBadge
                    status={payment.status}
                  />
                </div>

              </CardContent>

            </Card>

            <Card>

              <CardContent
                className="
                  space-y-4
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <User2
                    className="
                      h-5
                      w-5
                      text-primary
                    "
                  />

                  <span
                    className="
                      font-medium
                    "
                  >

                    Upload Information

                  </span>

                </div>

                <Separator />

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
                    Email
                  </span>

                  <span>
                    {payment.uploader?.email ?? "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Upload Date
                  </span>

                  <span>
                    {formatDate(
                      payment.createdAt,
                    )}
                  </span>
                </div>

              </CardContent>

            </Card>

            <Card>

              <CardContent
                className="
                  space-y-4
                  p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <CreditCard
                    className="
                      h-5
                      w-5
                      text-primary
                    "
                  />

                  <span
                    className="
                      font-medium
                    "
                  >

                    Payment Proof

                  </span>

                </div>

                <Separator />

                {payment.proofUrl ? (

                  <a
                    href={payment.proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      text-sm
                      text-primary
                      underline
                      break-all
                    "
                  >

                    {payment.proofUrl}

                  </a>

                ) : (

                  <span
                    className="
                      text-muted-foreground
                    "
                  >

                    No payment proof uploaded.

                  </span>

                )}

              </CardContent>

            </Card>

            <div
              className="
                rounded-lg
                border
                bg-muted/40
                p-4
                text-sm
                leading-relaxed
              "
            >

              <div className="flex items-start gap-3">

                <CalendarClock
                  className="
                    mt-0.5
                    h-5
                    w-5
                    text-primary
                  "
                />

                <div className="space-y-2">

                  <p className="font-medium">
                    Verification Impact
                  </p>

                  <ul
                    className="
                      list-disc
                      space-y-1
                      pl-5
                    "
                  >

                    <li>
                      Payment status becomes VERIFIED.
                    </li>

                    <li>
                      Invoice progress is recalculated automatically.
                    </li>

                    <li>
                      Deal collection amount is updated.
                    </li>

                    <li>
                      Activity Log is created.
                    </li>

                    <li>
                      Audit Log is created.
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

        </ScrollArea>

        <DialogFooter>

          <Button
            variant="outline"
            type="button"
            disabled={
              loading
            }
            onClick={() =>
              onOpenChange(false)
            }
          >

            Cancel

          </Button>

          <Button
            type="button"
            disabled={
              loading ||
              mutation.isPending
            }
            onClick={onSubmit}
          >

            {loading ||
            mutation.isPending ? (

              <>

                <Loader2
                  className="
                    mr-2
                    h-4
                    w-4
                    animate-spin
                  "
                />

                Verifying...

              </>

            ) : (

              <>

                <CheckCircle2
                  className="
                    mr-2
                    h-4
                    w-4
                  "
                />

                Verify Payment

              </>

            )}

          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}