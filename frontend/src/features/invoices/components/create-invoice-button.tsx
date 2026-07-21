"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CreateInvoiceSheet } from "./create-invoice-sheet";

export function CreateInvoiceButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="default"
        onClick={() => setOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Create Invoice
      </Button>

      <CreateInvoiceSheet
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

export default CreateInvoiceButton;