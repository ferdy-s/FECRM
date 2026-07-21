"use client";

import { useMemo } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  useForm,
} from "react-hook-form";

import {
  Percent,
  BadgeDollarSign,
  HandCoins,
  Loader2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Textarea,
} from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  useRequestNegotiation,
} from "@/hooks/use-request-negotiation";

import type {
  Deal,
  TransactionItem,
} from "@/types/deal";

const schema = z.object({

  requestedPrice:
    z.coerce
      .number()
      .positive(
        "Price must be greater than zero",
      ),

  reason:
    z
      .string()
      .trim()
      .min(
        10,
        "Reason must be at least 10 characters.",
      )
      .max(
        500,
        "Maximum 500 characters.",
      ),

});

type FormValues =
  z.output<typeof schema>;

interface Props {

  scope: "ITEM" | "TOTAL";

  deal: Deal;

  item?: TransactionItem;

  dealStatus:
    | "OPEN"
    | "NEGOTIATION"
    | "WON"
    | "LOST";

  open: boolean;

  onOpenChange: (open: boolean) => void;

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

export function RequestNegotiationDialog({

  scope,

  deal,

  item,

  dealStatus,

  open,

  onOpenChange,

}: Props) {

  const mutation =
  useRequestNegotiation();

const form =
  useForm<
    z.input<typeof schema>,
    unknown,
    FormValues
  >({

    resolver:
      zodResolver(schema),

    defaultValues: {

      requestedPrice:
  scope === "ITEM"
    ? Number(
        item?.unitPrice ??
        item?.price ??
        0,
      )
    : Number(
        deal.grandTotal,
      ),

      reason: "",

    },

  });

  const requestedPrice =
Number(
  form.watch(
    "requestedPrice",
  ) ?? 0,
);

const currentPrice =
  scope === "ITEM"
    ? Number(
        item?.unitPrice ??
        item?.price ??
        0,
      )
    : Number(
        deal.grandTotal,
      );

  const isDealLocked =
  dealStatus === "WON" ||
  dealStatus === "LOST";

  const discountNominal =
    useMemo(() => {

      if (
        requestedPrice >=
        currentPrice
      ) {

        return 0;

      }

      return (
        currentPrice -
        requestedPrice
      );

    }, [

      currentPrice,

      requestedPrice,

    ]);

  const discountPercent =
    useMemo(() => {

      if (
        currentPrice <= 0
      ) {

        return 0;

      }

      return Number(
        (
          discountNominal /
          currentPrice
        ) * 100,
      );

    }, [

      currentPrice,

      discountNominal,

    ]);

  async function onSubmit(
  values: FormValues,
) { if (isDealLocked) {
  return;
}

  if (
    values.requestedPrice >=
    currentPrice
  ) {

    form.setError(
      "requestedPrice",
      {
        type: "manual",
        message:
          "Requested price must be lower than current price.",
      },
    );

    return;

  }

  try {

   await mutation.mutateAsync({

  scope,

  dealId: deal.id,

  transactionItemId:
    scope === "ITEM"
      ? item!.id
      : undefined,

  requestedAmount:
    values.requestedPrice,

  reason:
    values.reason,

});

    form.reset({

      requestedPrice:
        currentPrice,

      reason: "",

    });

   onOpenChange(false);

  } catch {

    // handled by hook

  }

}

  return (

    <Dialog
  open={open}
  onOpenChange={onOpenChange}
>


      <DialogContent
  className="
    w-[95vw]
    max-w-4xl
    overflow-hidden
    rounded-xl
    p-0
  "
>

        <DialogHeader className="border-b px-6 py-7">

    <DialogTitle className="text-xl font-semibold">

        {scope === "ITEM"
            ? "Request Item Negotiation"
            : "Request Commercial Negotiation"}

    </DialogTitle>

    <DialogDescription>

        Submit a negotiation request for manager approval.

    </DialogDescription>

</DialogHeader>
          <div
    className="
        max-h-[50vh]
        overflow-y-auto
        px-6
        pb-5
    "
>
        <Form {...form}>

          <form
            onSubmit={form.handleSubmit(
              onSubmit,
            )}
            className="space-y-6"
          >
            <div
              className="
                grid
                gap-2
                md:grid-cols-1
              "
            >

              <Card>

                <CardContent className="p-4">

                  <div className="flex items-center gap-1">

                    <BadgeDollarSign className="h-5 w-5 text-primary" />

                    <span className="text-sm text-muted-foreground">

                      {
  scope === "ITEM"
    ? "Current Price"
    : "Current Grand Total"
}

                    </span>

                  </div>

                  <p className="mt-3 text-2xl font-bold">

                    {currency(currentPrice)}

                  </p>

                </CardContent>

              </Card>

              <Card>

                <CardContent className="p-4">

                  <div className="flex items-center gap-2">

                    <BadgeDollarSign className="h-5 w-5 text-amber-500" />

                    <span className="text-sm text-muted-foreground">

                      Discount

                    </span>

                  </div>

                  <p className="mt-3 text-2xl font-bold text-amber-600">

                    {currency(discountNominal)}

                  </p>

                </CardContent>

              </Card>

              <Card>

                <CardContent className="p-4">

                  <div className="flex items-center gap-2">

                    <Percent className="h-5 w-5 text-green-600" />

                    <span className="text-sm text-muted-foreground">

                      Discount %

                    </span>

                  </div>

                  <p className="mt-3 text-2xl font-bold text-green-600">

                    {discountPercent.toFixed(2)}%

                  </p>

                </CardContent>

              </Card>

            </div>

            <FormField
              control={form.control}
              name="requestedPrice"
              render={({ field }) => (

                <FormItem>

                  <FormLabel>

                    {
  scope === "ITEM"
    ? "Requested Price"
    : "Requested Grand Total"
}

                  </FormLabel>

                  <FormControl>

                   <Input
  type="number"
  min={1}
  placeholder={
  scope === "ITEM"

    ? "Input requested item price"

    : "Input requested grand total"

}
  value={Number(field.value ?? 0)}
  onChange={(e) =>
    field.onChange(
      Number(e.target.value),
    )
  }
  onBlur={field.onBlur}
  name={field.name}
  ref={field.ref}
/>
                  </FormControl>

                  <FormDescription>

                    {
  scope === "ITEM"

    ? "Requested price must be lower than current price."

    : "Requested Grand Total must be lower than current Grand Total."

}

                  </FormDescription>

                  <FormMessage />

                </FormItem>

              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (

                <FormItem>

                  <FormLabel>

                    Negotiation Reason

                  </FormLabel>

                  <FormControl>

                    <Textarea
                      rows={5}
                      placeholder={
  scope === "ITEM"

    ? "Explain why this item deserves discount..."

    : "Explain why the customer deserves a commercial discount..."

}
                      {...field}
                    />

                  </FormControl>

                  <FormDescription>

                    This note will be reviewed by your manager.

                  </FormDescription>

                  <FormMessage />

                </FormItem>

              )}
            />
            {isDealLocked && (

  <Card className="border-destructive">

    <CardContent>

      <p className="text-sm text-destructive font-medium">
        This deal has reached a final status
        (WON / LOST). Price negotiation can no
        longer be submitted.

      </p>

    </CardContent>

  </Card>

)}   

 <div
      className="
        sticky
        bottom-0
        z-10
        flex
        items-center
        justify-end
        gap-3
        border-t
        bg-background
        px-6
        py-4
      "
    >
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          form.reset();
          onOpenChange(false);
        }}
        disabled={mutation.isPending}
      >
        Cancel
      </Button>

      <Button
        type="submit"
        disabled={
          mutation.isPending ||
          isDealLocked
        }
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <HandCoins className="mr-2 h-4 w-4" />

            {scope === "ITEM"
              ? "Submit Item Negotiation"
              : "Submit Commercial Negotiation"}
          </>
        )}
      </Button>
    </div>
          </form>

        </Form>
        </div>
      </DialogContent>

    </Dialog>
  )
};
