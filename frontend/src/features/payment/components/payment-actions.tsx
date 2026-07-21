"use client";

import { useState } from "react";
import { MoreHorizontal, Eye, CheckCircle2, ShieldX, ExternalLink } from "lucide-react";

import type { Payment } from "@/types/payment";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  PaymentDetailDialog,
} from "./payment-detail-dialog";

import {
  VerifyPaymentDialog,
} from "./verify-payment-dialog";

import {
  RejectPaymentDialog,
} from "./reject-payment-dialog";

//////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////

interface Props {
  payment: Payment;
}

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export function PaymentActions({
  payment,
}: Props) {

  const [
    openDetail,
    setOpenDetail,
  ] = useState(false);

  const [
    openVerify,
    setOpenVerify,
  ] = useState(false);

  const [
    openReject,
    setOpenReject,
  ] = useState(false);

  //////////////////////////////////////////////////////
  // RULES
  //////////////////////////////////////////////////////

  const isManual =
    payment.paymentMethod ===
    "MANUAL_TRANSFER";

  const isQris =
    payment.paymentMethod ===
    "QRIS_MIDTRANS";

  const isPending =
    payment.status ===
    "PENDING";

  const canVerify =
    isManual &&
    isPending;

  const canReject =
    isManual &&
    isPending;

  const qrisUrl =
  payment.invoice?.qrisUrl;

const canOpenGateway =
  isQris &&
  isPending &&
  Boolean(qrisUrl);

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  return (
    <>

      <DropdownMenu>

        <DropdownMenuTrigger
          asChild
        >

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <MoreHorizontal
              className="
                h-4
                w-4
              "
            />

          </Button>

        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-56"
        >

          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              setOpenDetail(true);
            }}
          >

            <Eye
              className="
                mr-2
                h-4
                w-4
              "
            />

            View Detail

          </DropdownMenuItem>

          {canVerify && (

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setOpenVerify(true);
              }}
            >

              <CheckCircle2
                className="
                  mr-2
                  h-4
                  w-4
                "
              />

              Verify Payment

            </DropdownMenuItem>

          )}

          {canReject && (

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setOpenReject(true);
              }}
              className="
                text-destructive
              "
            >

              <ShieldX
                className="
                  mr-2
                  h-4
                  w-4
                "
              />

              Reject Payment

            </DropdownMenuItem>

          )}

          {canOpenGateway && (

            <>

              <DropdownMenuSeparator />

         <DropdownMenuItem
  onClick={(e) => {
    e.stopPropagation();

    const url =
      payment.invoice?.qrisUrl;

    if (!url) return;

    window.open(
      url,
      "_blank",
    );
  }}
>
  <ExternalLink className="mr-2 h-4 w-4" />
  Open QRIS
</DropdownMenuItem>

            </>

          )}

        </DropdownMenuContent>

      </DropdownMenu>

            <PaymentDetailDialog
        payment={payment}
        open={openDetail}
        onOpenChange={setOpenDetail}
      />

      {canVerify && (
        <VerifyPaymentDialog
          payment={payment}
          open={openVerify}
          onOpenChange={setOpenVerify}
        />
      )}

      {canReject && (
        <RejectPaymentDialog
          payment={payment}
          open={openReject}
          onOpenChange={setOpenReject}
        />
      )}

    </>
  );

}

export default PaymentActions;