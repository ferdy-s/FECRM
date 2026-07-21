"use client";

import {
  useState,
} from "react";

import {
  useQueryClient,
} from "@tanstack/react-query";

import {
  Loader2,
  CheckCircle2,
  BadgeDollarSign,
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
  useApproveNegotiation,
} from "@/hooks/use-approve-negotiation";

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

export function ApproveNegotiationDialog({

  negotiation,

  open,

  onOpenChange,

}: Props) {

  const mutation =
    useApproveNegotiation();

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

    const queryClient =
  useQueryClient();
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

            Approve Negotiation

          </DialogTitle>

          <DialogDescription>

            Approve this negotiation request and update
            the transaction item price.

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

                  Price Summary

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

                <span
                  className="
                    text-muted-foreground
                  "
                >

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

                <span
                  className="
                    text-muted-foreground
                  "
                >

                  Requested Price

                </span>

                <strong
                  className="
                    text-primary
                  "
                >

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

                <span
                  className="
                    text-muted-foreground
                  "
                >

                  Discount

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

                <span
                  className="
                    text-muted-foreground
                  "
                >

                  Discount %

                </span>

                <strong
                  className="
                    text-green-600
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
              rounded-lg
              border
              bg-muted/40
              p-4
              text-sm
              leading-relaxed
            "
          >

            After approval, the item unit price and total
            transaction value will automatically be updated.
            This action will also create an Activity Log and
            Audit Log.

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

      Approving...

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

      Approve Negotiation

    </>

  )}

</Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>

  );

}