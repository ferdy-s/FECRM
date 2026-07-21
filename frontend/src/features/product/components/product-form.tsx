"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  productSchema,
  type ProductSchema,
} from "@/schemas/product.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  defaultValues?: Partial<ProductSchema>;
  loading?: boolean;
  submitLabel?: string;
  onSubmit: (values: ProductSchema) => void | Promise<void>;
}

export function ProductForm({
  defaultValues,
  loading = false,
  submitLabel = "Simpan",
  onSubmit,
}: ProductFormProps) {
  const form = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (!defaultValues) return;

    form.reset({
      name: defaultValues.name ?? "",
      price: defaultValues.price ?? 0,
    });
  }, [defaultValues, form]);

  const handleSubmit = async (
    values: ProductSchema
  ) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nama Produk
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Masukkan nama produk"
                  disabled={loading}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Harga
              </FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="0"
                  disabled={loading}
                  value={field.value}
                  onChange={(event) =>
                    field.onChange(
                      Number(event.target.value)
                    )
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Menyimpan..."
              : submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}