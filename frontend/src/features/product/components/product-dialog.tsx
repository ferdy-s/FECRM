"use client";

import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ProductForm } from "./product-form";

import {
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/use-product-management";

import type { Product } from "@/types/product";
import type { ProductSchema } from "@/schemas/product.schema";

interface ProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product;
}

export function ProductDialog({
  open,
  onOpenChange,
  product,
}: ProductDialogProps) {
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const isEdit = Boolean(product);

  useEffect(() => {
    if (!open) {
      createProduct.reset();
      updateProduct.reset();
    }
  }, [open, createProduct, updateProduct]);

  const handleSubmit = async (
    values: ProductSchema
  ) => {
    try {
      if (isEdit && product) {
        await updateProduct.mutateAsync({
          id: product.id,
          payload: values,
        });
      } else {
        await createProduct.mutateAsync(values);
      }

      onOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit
              ? "Edit Product"
              : "Create Product"}
          </DialogTitle>

          <DialogDescription>
            {isEdit
              ? "Update the selected product information."
              : "Create a new product that can be used in deals and transactions."}
          </DialogDescription>
        </DialogHeader>

        <ProductForm
          defaultValues={
            product
              ? {
                  name: product.name,
                  price: product.price,
                }
              : undefined
          }
          loading={
            createProduct.isPending ||
            updateProduct.isPending
          }
          submitLabel={
            isEdit
              ? "Update Product"
              : "Create Product"
          }
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}