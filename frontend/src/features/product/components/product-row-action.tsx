"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import type { Product } from "@/types/product";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProductDialog } from "./product-dialog";
import { ProductDeleteDialog } from "./product-delete-dialog";

interface ProductRowActionProps {
  product: Product;
}

export function ProductRowAction({
  product,
}: ProductRowActionProps) {
  const [openEdit, setOpenEdit] =
    useState(false);

  const [openDelete, setOpenDelete] =
    useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />

            <span className="sr-only">
              Open menu
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-44"
        >
          <DropdownMenuItem
            onClick={() =>
              setOpenEdit(true)
            }
          >
            <Pencil className="mr-2 h-4 w-4" />

            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() =>
              setOpenDelete(true)
            }
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />

            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ProductDialog
        open={openEdit}
        onOpenChange={setOpenEdit}
        product={product}
      />

      <ProductDeleteDialog
        id={product.id}
        open={openDelete}
        onOpenChange={setOpenDelete}
      />
    </>
  );
}