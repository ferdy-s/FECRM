"use client";

import { useMemo, useState } from "react";

import { AxiosError } from "axios";

import {
  Loader2,
  Wallet,
  BadgeDollarSign,
  Percent,
  TriangleAlert,
} from "lucide-react";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";

import { negotiationService } from "@/services/negotiation.service";

import { formatCurrency } from "@/lib/currency";

import type { Deal } from "@/types/deal";

interface Props {
  deal: Deal;
}

export function DealCommercialNegotiationCard({
  deal,
}: Props) {

  const queryClient =
    useQueryClient();

  const [requestedAmount, setRequestedAmount] =
    useState(
      deal.grandTotal,
    );

  const [reason, setReason] =
    useState("");

  //////////////////////////////////////////////////////

  const estimatedDiscount =
    useMemo(
      () =>
        Math.max(
          deal.grandTotal -
            requestedAmount,
          0,
        ),
      [
        deal.grandTotal,
        requestedAmount,
      ],
    );

  const discountPercent =
    useMemo(() => {

      if (
        deal.grandTotal <= 0
      ) {

        return 0;

      }

      return (
        estimatedDiscount /
        deal.grandTotal
      ) * 100;

    }, [
      estimatedDiscount,
      deal.grandTotal,
    ]);

  //////////////////////////////////////////////////////

  const mutation =
    useMutation({

      mutationFn: () =>

        negotiationService.request({

          dealId:
            deal.id,

          scope:
            "TOTAL",

          requestedAmount,

          reason,

        }),

      onSuccess: () => {

        toast.success(
          "Commercial negotiation submitted.",
        );

        queryClient.invalidateQueries({

          queryKey: [
            "deal",
            deal.id,
          ],

        });

        queryClient.invalidateQueries({

          queryKey: [
            "negotiations",
          ],

        });

      },

      onError: (

        error:
          AxiosError<{
            message: string;
          }>,

      ) => {

        toast.error(

          error.response?.data
            ?.message ??

            "Failed to submit negotiation.",

        );

      },

    });

  //////////////////////////////////////////////////////

  function handleSubmit() {

    if (
      requestedAmount <= 0
    ) {

      toast.error(
        "Invalid amount.",
      );

      return;

    }

    if (
      requestedAmount >=
      deal.grandTotal
    ) {

      toast.error(
        "Requested amount must be lower than current Grand Total.",
      );

      return;

    }

    if (
      !reason.trim()
    ) {

      toast.error(
        "Reason is required.",
      );

      return;

    }

    mutation.mutate();

  }

  //////////////////////////////////////////////////////

  return (

    <Card>

      <CardHeader>

        <CardTitle>

          Commercial Negotiation

        </CardTitle>

        <CardDescription>

          Submit a commercial discount request
          for managerial approval.

        </CardDescription>

      </CardHeader>

      <CardContent className="space-y-6">

        <div className="grid gap-4 md:grid-cols-3">

          <Card>

            <CardContent className="p-5">

              <Wallet className="mb-3 h-5 w-5 text-primary" />

              <p className="text-sm text-muted-foreground">

                Current Grand Total

              </p>

              <p className="mt-1 text-2xl font-bold">

                {formatCurrency(
                  deal.grandTotal,
                )}

              </p>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-5">

              <BadgeDollarSign className="mb-3 h-5 w-5 text-emerald-600" />

              <p className="text-sm text-muted-foreground">

                Requested Total

              </p>

              <p className="mt-1 text-2xl font-bold">

                {formatCurrency(
                  requestedAmount,
                )}

              </p>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-5">

              <Percent className="mb-3 h-5 w-5 text-orange-500" />

              <p className="text-sm text-muted-foreground">

                Estimated Discount

              </p>

              <p className="mt-1 text-2xl font-bold text-orange-600">

                {formatCurrency(
                  estimatedDiscount,
                )}

              </p>

              <p className="mt-1 text-xs text-muted-foreground">

                {discountPercent.toFixed(
                  2,
                )}
                %

              </p>

            </CardContent>

          </Card>

        </div>

        <Separator />

        <div className="space-y-2">

          <Label>

            Requested Grand Total

          </Label>

          <Input

            type="number"

            className="text-right"

            value={requestedAmount}

            onChange={(e) =>

              setRequestedAmount(

                Number(
                  e.target.value,
                ),

              )

            }

          />

        </div>

        <div className="space-y-2">

          <Label>

            Business Reason

          </Label>

          <Textarea

            rows={5}

            placeholder="Explain why this commercial discount should be approved..."

            value={reason}

            onChange={(e) =>

              setReason(
                e.target.value,
              )

            }

          />

        </div>

        <Card className="border-amber-300 bg-amber-50 dark:bg-amber-950/20">

          <CardContent className="flex gap-3 p-4">

            <TriangleAlert className="mt-0.5 h-5 w-5 text-amber-500" />

            <div>

              <p className="font-medium">

                Approval Required

              </p>

              <p className="text-sm text-muted-foreground">

                This request will be sent to
                your manager. The deal value
                will not change until it has
                been approved.

              </p>

            </div>

          </CardContent>

        </Card>

        <Button

          className="w-full"

          size="lg"

          disabled={mutation.isPending}

          onClick={handleSubmit}

        >

          {mutation.isPending ? (

            <>

              <Loader2 className="mr-2 h-4 w-4 animate-spin" />

              Submitting...

            </>

          ) : (

            "Submit Commercial Negotiation"

          )}

        </Button>

      </CardContent>

    </Card>

  );

}