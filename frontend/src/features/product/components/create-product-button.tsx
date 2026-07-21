"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ProductDialog } from "./product-dialog";

export function CreateProductButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <Plus className="h-4 w-4" />

        Create Product
      </Button>

      <ProductDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}