import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nama produk minimal 3 karakter")
    .max(100, "Nama produk maksimal 100 karakter"),

  price: z
    .number({
      error: "Harga wajib diisi",
    })
    .positive("Harga harus lebih dari 0"),
});

export type ProductSchema = z.infer<typeof productSchema>;