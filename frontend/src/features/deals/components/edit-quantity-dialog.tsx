"use client";

import { useMemo, useState } from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  useForm,
} from "react-hook-form";

import {
  Loader2,
  Minus,
  Plus,
  Pencil,
  Package,
   Lock,
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
  Badge,
} from "@/components/ui/badge";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
  useUpdateItem,
} from "@/hooks/use-update-item";

import type {
  TransactionItem,
} from "@/types/deal";
import { DealStatus } from "../types/deal.type";

const schema = z.object({

  quantity: z.coerce
    .number()
    .int()
    .min(
      1,
      "Minimum quantity is 1.",
    ),

});

type FormValues =
  z.output<typeof schema>;

interface Props {

  item: TransactionItem;

  dealStatus: DealStatus;

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

export function EditQuantityDialog({

  item,

  dealStatus,

  open,

  onOpenChange,

}: Props) {


  const mutation =
    useUpdateItem();

  const form =
    useForm<
      z.input<typeof schema>,
      unknown,
      FormValues
    >({

      resolver:
        zodResolver(schema),

      defaultValues: {

        quantity:
          item.quantity,

      },

    });

  const quantity =
    Number(
      form.watch(
        "quantity",
      ) ?? 1,
    );

  const unitPrice =
    Number(
      item.unitPrice ??
      item.price,
    );

  const totalPrice =
    useMemo(
      () =>
        quantity *
        unitPrice,
      [
        quantity,
        unitPrice,
      ],
    );
      function increase() {

    form.setValue(
      "quantity",
      quantity + 1,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );

  }

  function decrease() {

    if (
      quantity <= 1
    ) {
      return;
    }

    form.setValue(
      "quantity",
      quantity - 1,
      {
        shouldDirty: true,
        shouldValidate: true,
      },
    );

  }

  async function onSubmit(
    values: FormValues,
  ) {

    try {

      await mutation.mutateAsync({

        transactionItemId:
          item.id,

        quantity:
          values.quantity,

      });

      form.reset({

        quantity:
          values.quantity,

      });

      onOpenChange(false);

    } catch {

      // handled by hook

    }

  }

const isDealLocked =
  dealStatus === "WON" ||
  dealStatus === "LOST";

  return (

    <Dialog
  open={open}
  onOpenChange={onOpenChange}
>

  <DialogContent
    className="
      sm:max-w-xl
      lg:max-w-2xl
      p-0
      overflow-hidden
    "
  >

    <DialogHeader className="border-b px-6 py-5">

      <DialogTitle className="text-xl">

        Edit Transaction Item

      </DialogTitle>

      <DialogDescription>

        Update the transaction quantity.
        Commercial values will be recalculated
        automatically after saving.

      </DialogDescription>

    </DialogHeader>

    <Form {...form}>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-6"
      >

        {/* ===================================== */}
        {/* INFORMATION */}
        {/* ===================================== */}

        <div
          className="
            grid
            gap-4
            md:grid-cols-2
          "
        >

          <Card>

            <CardContent className="space-y-5 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs uppercase tracking-wide text-muted-foreground">

                    Item

                  </p>

                  <h3 className="mt-1 text-lg font-semibold">

                    {item.itemName}

                  </h3>

                </div>

                <Badge>

                  {item.type}

                </Badge>

              </div>

              <div className="border-t" />

              <div>

                <p className="text-xs uppercase tracking-wide text-muted-foreground">

                  Current Quantity

                </p>

                <p className="mt-2 text-2xl font-bold">

                  {item.quantity}

                </p>

              </div>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="space-y-4 p-6">

              <p className="text-xs uppercase tracking-wide text-muted-foreground">

                Unit Price

              </p>

              <h2 className="text-3xl font-bold text-primary">

                {currency(unitPrice)}

              </h2>

            </CardContent>

          </Card>

        </div>

        {/* ===================================== */}
        {/* QUANTITY */}
        {/* ===================================== */}

        <FormField

          control={form.control}

          name="quantity"

          render={({ field }) => (

            <FormItem>

              <FormLabel>

                Quantity

              </FormLabel>

              <FormControl>

                <div className="flex items-center gap-3">

                  <Button

                    type="button"

                    variant="outline"

                    size="icon"

                    disabled={
                      mutation.isPending ||
                      isDealLocked
                    }

                    onClick={decrease}

                  >

                    <Minus className="h-4 w-4" />

                  </Button>

                  <Input

                    type="number"

                    min={1}

                    value={Number(field.value ?? 1)}

                    disabled={
                      mutation.isPending ||
                      isDealLocked
                    }

                    onChange={(e) =>
                      field.onChange(
                        Number(e.target.value),
                      )
                    }

                    onBlur={field.onBlur}

                    name={field.name}

                    ref={field.ref}

                    className="text-center"

                  />

                  <Button

                    type="button"

                    variant="outline"

                    size="icon"

                    disabled={
                      mutation.isPending ||
                      isDealLocked
                    }

                    onClick={increase}

                  >

                    <Plus className="h-4 w-4" />

                  </Button>

                </div>

              </FormControl>

              <FormDescription>

                Minimum quantity is 1.

              </FormDescription>

              <FormMessage />

            </FormItem>

          )}

        />

        {/* ===================================== */}
        {/* LOCK WARNING */}
        {/* ===================================== */}

        {isDealLocked && (

          <Card className="border-destructive">

            <CardContent className="flex gap-3 p-5">

              <Lock className="mt-0.5 h-5 w-5 text-destructive" />

              <div>

                <p className="font-medium text-destructive">

                  Transaction Locked

                </p>

                <p className="mt-1 text-sm text-muted-foreground">

                  This deal has reached a final status
                  (WON or LOST). Transaction items can
                  no longer be edited.

                </p>

              </div>

            </CardContent>

          </Card>

        )}

        {/* ===================================== */}
        {/* TOTAL */}
        {/* ===================================== */}

        <Card>

          <CardContent className="space-y-5 p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs uppercase tracking-wide text-muted-foreground">

                  Estimated Total

                </p>

                <h2 className="mt-2 text-3xl font-bold text-primary">

                  {currency(totalPrice)}

                </h2>

              </div>

              <Badge variant="secondary">

                Auto Calculated

              </Badge>

            </div>

          </CardContent>

        </Card>

        {/* ===================================== */}
        {/* FOOTER */}
        {/* ===================================== */}

        <div
          className="
            flex
            flex-col-reverse
            gap-3
            border-t
            pt-6
            sm:flex-row
            sm:justify-end
          "
        >

          <Button

            type="button"

            variant="outline"

            disabled={mutation.isPending}

            onClick={() => {

              form.reset({

                quantity:
                  item.quantity,

              });

              onOpenChange(false);

            }}

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

                <Loader2
                  className="mr-2 h-4 w-4 animate-spin"
                />

                Saving...

              </>

            ) : isDealLocked ? (

              <>

                <Lock
                  className="mr-2 h-4 w-4"
                />

                Transaction Locked

              </>

            ) : (

              <>

                <Pencil
                  className="mr-2 h-4 w-4"
                />

                Save Changes

              </>

            )}

          </Button>

        </div>

      </form>

    </Form>

  </DialogContent>

</Dialog>

  );

}

         

          