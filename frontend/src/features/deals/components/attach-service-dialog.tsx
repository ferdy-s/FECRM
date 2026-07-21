"use client";

import {
  useState,
} from "react";

import {
  Wrench,
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
  useServices,
} from "@/hooks/use-services";

import {
  useAttachService,
} from "@/hooks/use-attach-service";

interface Props {

  dealId: string;

}

export function AttachServiceDialog({

  dealId,

}: Props) {

  const [open, setOpen] =
    useState(false);

  const [quantity, setQuantity] =
    useState(1);

  const [selected, setSelected] =
    useState<string[]>([]);

  const {

    data: services = [],

    isLoading,

  } = useServices();

  const attachMutation =
    useAttachService();

  function toggle(id: string) {

    setSelected((prev) =>

      prev.includes(id)

        ? prev.filter(
            (item) =>
              item !== id,
          )

        : [...prev, id],

    );

  }

  function submit() {

    if (
      selected.length === 0
    ) {
      return;
    }

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

        <Button
          variant="outline"
        >

          <Wrench
            className="
              mr-2
              h-4
              w-4
            "
          />

          Attach Service

        </Button>

      </DialogTrigger>

      <DialogContent
        className="
          max-w-xl
        "
      >

        <DialogHeader>

          <DialogTitle>

            Attach Service

          </DialogTitle>

        </DialogHeader>

        <div
          className="
            space-y-5
          "
        >

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

              Available Services

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

                <div
                  className="
                    p-4
                    text-sm
                    text-muted-foreground
                  "
                >

                  Loading services...

                </div>

              ) : (

                services.map(
                  (service) => (

                    <label
                      key={service.id}
                      className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        border-b
                        p-4
                        transition-colors
                        hover:bg-muted
                      "
                    >

                      <Checkbox
                        checked={selected.includes(
                          service.id,
                        )}
                        onCheckedChange={() =>
                          toggle(
                            service.id,
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

                          {service.name}

                        </p>

                        <p
                          className="
                            text-xs
                            text-muted-foreground
                          "
                        >

                          Rp{" "}

                          {Number(
                            service.price,
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

              : "Attach Service"}

          </Button>

        </div>

      </DialogContent>

    </Dialog>

  );

}