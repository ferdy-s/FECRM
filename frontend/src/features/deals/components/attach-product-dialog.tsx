"use client";

import { useState } from "react";

import {
  Plus,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Label,
} from "@/components/ui/label";

import {
  Input,
} from "@/components/ui/input";

import {
  Checkbox,
} from "@/components/ui/checkbox";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  useProducts,
} from "@/hooks/use-products";

import {
  useAttachProduct,
} from "@/hooks/use-attach-product";

interface Props {

  dealId: string;

}

export function AttachProductDialog({

  dealId,

}: Props) {

  const [open, setOpen] =
    useState(false);

  const [quantity, setQuantity] =
    useState(1);

  const [selected, setSelected] =
    useState<string[]>([]);

  const {

    data: products = [],

    isLoading,

  } = useProducts();

  const attachMutation =
    useAttachProduct();

  function toggle(id: string) {

    setSelected((prev) =>

      prev.includes(id)

        ? prev.filter(
            (x) => x !== id,
          )

        : [...prev, id],

    );

  }

  function submit() {

    if (
      selected.length === 0
    )
      return;

    attachMutation.mutate(

      {

        dealId,

        refIds: selected,

        quantity,

      },

      {

        onSuccess() {

          setOpen(false);

          setSelected([]);

          setQuantity(1);

        },

      },

    );

  }

  return (

    <Dialog
      open={open}
      onOpenChange={setOpen}
    >

      <DialogTrigger asChild>

        <Button>

          <Plus className="mr-2 h-4 w-4" />

          Attach Product

        </Button>

      </DialogTrigger>

      <DialogContent
        className="
          max-w-xl
        "
      >

        <DialogHeader>

          <DialogTitle>

            Attach Product

          </DialogTitle>

        </DialogHeader>

        <div className="space-y-5">

          <div>

            <Label>

              Quantity

            </Label>

            <Input
              className="mt-2"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Number(
                    e.target.value,
                  ),
                )
              }
            />

          </div>

          <div>

            <Label>

              Product

            </Label>

            <ScrollArea
              className="
                mt-2
                h-72
                rounded-lg
                border
              "
            >

              {isLoading ? (

                <div className="p-4">

                  Loading...

                </div>

              ) : (

                products.map(
                  (product) => (

                    <label
                      key={product.id}
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        border-b
                        p-4
                        hover:bg-muted
                      "
                    >

                      <Checkbox
                        checked={selected.includes(
                          product.id,
                        )}
                        onCheckedChange={() =>
                          toggle(
                            product.id,
                          )
                        }
                      />

                      <div
                        className="
                          flex-1
                        "
                      >

                        <p
                          className="
                            font-medium
                          "
                        >

                          {product.name}

                        </p>

                        <p
                          className="
                            text-xs
                            text-muted-foreground
                          "
                        >

                          Rp{" "}

                          {Number(
                            product.price,
                          ).toLocaleString(
                            "id-ID",
                          )}

                        </p>

                      </div>

                    </label>

                  ),

                )

              )}

            </ScrollArea>

          </div>

          <Button
            className="w-full"
            disabled={
              attachMutation.isPending
            }
            onClick={submit}
          >

            {attachMutation.isPending
              ? "Saving..."
              : "Attach Product"}

          </Button>

        </div>

      </DialogContent>

    </Dialog>

  );

}