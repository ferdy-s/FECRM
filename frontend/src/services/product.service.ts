import { api } from "./api";

import type {
  Product,
} from "@/features/product/types/product";

export const productService = {

  async list(): Promise<Product[]> {

    const response =
      await api.get("/products");

    return response.data.data;

  },

};