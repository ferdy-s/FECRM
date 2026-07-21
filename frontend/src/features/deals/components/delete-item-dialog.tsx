"use client";

import {
  Loader2,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  useDeleteItem,
} from "@/hooks/use-delete-item";

import type {
  TransactionItem,
} from "@/types/deal";

interface Props {

  item: TransactionItem;

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

export function DeleteItemDialog({

  item,

  open,

  onOpenChange,

}: Props) {

  const mutation =
    useDeleteItem();

    async function handleDelete() {

  try {

    await mutation.mutateAsync(
      item.id,
    );

    onOpenChange(false);

  } catch {

    // handled by hook

  }

}

return (

<AlertDialog

  open={open}

  onOpenChange={onOpenChange}

>

<AlertDialogContent>

<AlertDialogHeader>

<AlertDialogTitle>

Delete Transaction Item

</AlertDialogTitle>

<AlertDialogDescription>

This action cannot be undone.

</AlertDialogDescription>

</AlertDialogHeader>

<Card>

<CardContent className="space-y-3 p-5">

<div>

<p className="text-sm text-muted-foreground">

Item

</p>

<p className="font-semibold">

{item.itemName}

</p>

</div>

<div className="flex gap-2">

<Badge>

{item.type}

</Badge>

<Badge variant="secondary">

Qty {item.quantity}

</Badge>

</div>

<div>

<p className="text-sm text-muted-foreground">

Total

</p>

<p className="text-lg font-bold">

{currency(

Number(

item.totalPrice ??

item.price,

),

)}

</p>

</div>

</CardContent>

</Card>

<div
  className="
    mt-4
    flex
    gap-2
    rounded-lg
    border
    border-destructive/20
    bg-destructive/5
    p-4
  "
>

  <AlertTriangle
    className="
      mt-0.5
      h-5
      w-5
      text-destructive
    "
  />

  <div>

    <p className="font-medium">

      Warning

    </p>

    <p
      className="
        text-sm
        text-muted-foreground
      "
    >

      Deleting this item
      will recalculate the
      deal value automatically.

    </p>

  </div>

</div>

<AlertDialogFooter>

  <AlertDialogCancel
    disabled={
      mutation.isPending
    }
  >

    Cancel

  </AlertDialogCancel>

  <AlertDialogAction
    asChild
  >

    <Button

      variant="destructive"

      disabled={
        mutation.isPending
      }

      onClick={
        handleDelete
      }

    >

      {mutation.isPending ? (

        <>

          <Loader2
            className="
              mr-2
              h-4
              w-4
              animate-spin
            "
          />

          Deleting...

        </>

      ) : (

        <>

          <Trash2
            className="
              mr-2
              h-4
              w-4
            "
          />

          Delete Item

        </>

      )}

    </Button>

  </AlertDialogAction>

</AlertDialogFooter>

</AlertDialogContent>

</AlertDialog>

);

}