"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";

import { CreateInvoiceForm } from "./create-invoice-form";

interface CreateInvoiceSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateInvoiceSheet({
  open,
  onOpenChange,
}: CreateInvoiceSheetProps) {
  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >
     <SheetContent
    side="bottom"
   className="
h-[92vh]
w-full
rounded-t-2xl
p-0
overflow-hidden
"
>
        <SheetHeader className="
        px-8
        py-6
        border-b
        bg-background
    ">
          <SheetTitle>
            Create Invoice
          </SheetTitle>

          <SheetDescription>
            Create a new invoice for an existing
            deal.
          </SheetDescription>
        </SheetHeader>

        <Separator />

<ScrollArea
    className="
        h-[calc(72vh-50px)]
    "
>
          <div className="p-6">
            <CreateInvoiceForm
              onSuccess={() =>
                onOpenChange(false)
              }
            />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

export default CreateInvoiceSheet;