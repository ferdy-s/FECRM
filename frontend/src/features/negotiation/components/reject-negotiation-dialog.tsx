"use client";

import {
  useQueryClient,
} from "@tanstack/react-query";

import {
  useState,
} from "react";

import {
  Loader2,
  XCircle,
  BadgeDollarSign,
  AlertTriangle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Separator,
} from "@/components/ui/separator";

import {
  useRejectNegotiation,
} from "@/hooks/use-reject-negotiation";

import type {
  Negotiation,
} from "@/types/negotiation";

interface Props {

  negotiation: Negotiation;

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

export function RejectNegotiationDialog({

  negotiation,

  open,

  onOpenChange,

}: Props) {

 const mutation =
  useRejectNegotiation();

const queryClient =
  useQueryClient();

  const [

    loading,

    setLoading,

  ] = useState(false);

  const currentPrice =
    Number(
      negotiation.oldAmount,
    );

  const requestedPrice =
    Number(
      negotiation.requestedAmount,
    );

  const discount =
    currentPrice -
    requestedPrice;

  const discountPercent =
    currentPrice === 0
      ? 0
      : (
          discount /
          currentPrice
        ) * 100;

  async function onSubmit() {

  try {

    setLoading(true);

    await mutation.mutateAsync({

      negotiationId:
        negotiation.id,

    });

    await Promise.all([

      queryClient.invalidateQueries({

        queryKey: [
          "pending-negotiations",
        ],

      }),

      queryClient.invalidateQueries({

        queryKey: [
          "deals",
        ],

      }),

      queryClient.invalidateQueries({

        queryKey: [
          "deal",
          negotiation.dealId,
        ],

      }),

    ]);

    onOpenChange(false);

  } finally {

    setLoading(false);

  }

}

      return (

    <Dialog

      open={open}

      onOpenChange={onOpenChange}

    >

      <DialogContent
        className="
          max-w-xl
        "
      >

        <DialogHeader>

          <DialogTitle>

            Reject Negotiation

          </DialogTitle>

          <DialogDescription>

            Reject this negotiation request.
            The transaction item price will remain unchanged.

          </DialogDescription>

        </DialogHeader>

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

                <BadgeDollarSign
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

                  Negotiation Summary

                </span>

              </div>

              <Separator />

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span className="text-muted-foreground">

                  Current Price

                </span>

                <strong>

                  {currency(
                    currentPrice,
                  )}

                </strong>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span className="text-muted-foreground">

                  Requested Price

                </span>

                <strong>

                  {currency(
                    requestedPrice,
                  )}

                </strong>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span className="text-muted-foreground">

                  Requested Discount

                </span>

                <strong
                  className="
                    text-amber-600
                  "
                >

                  {currency(
                    discount,
                  )}

                </strong>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span className="text-muted-foreground">

                  Discount %

                </span>

                <strong
                  className="
                    text-red-600
                  "
                >

                  {discountPercent.toFixed(
                    2,
                  )}%

                </strong>

              </div>

            </CardContent>

          </Card>

          <div
            className="
              flex
              gap-3
              rounded-lg
              border
              border-red-200
              bg-red-50
              p-4
            "
          >

            <AlertTriangle
              className="
                mt-0.5
                h-5
                w-5
                text-red-600
              "
            />

            <div
              className="
                space-y-1
              "
            >

              <p
                className="
                  font-medium
                  text-red-700
                "
              >

                Reject Confirmation

              </p>

              <p
                className="
                  text-sm
                  text-red-600
                "
              >

                Rejecting this negotiation will keep the
                original transaction price. The sales user
                can submit another negotiation request later
                if necessary.

              </p>

            </div>

          </div>

        </div>

        <DialogFooter>

          <Button

            type="button"

            variant="outline"

            onClick={() =>
              onOpenChange(
                false,
              )
            }

            disabled={
              loading
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

    mutation.isPending

  }

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

      Rejecting...

    </>

  ) : (

    <>

      <XCircle
        className="
          mr-2
          h-4
          w-4
        "
      />

      Reject Negotiation

    </>

  )}

</Button>
        </DialogFooter>

      </DialogContent>

        </Dialog>

  );

}