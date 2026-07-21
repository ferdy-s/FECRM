import { api } from "@/services/api";

import type {
  Product,
  ProductsResponse,
  ProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types/product";

class ProductManagementService {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get<ProductsResponse>("/products");
    return data.data;
  }

  async getProduct(id: string): Promise<Product> {
    const { data } = await api.get<ProductResponse>(`/products/${id}`);
    return data.data;
  }

  async createProduct(
    payload: CreateProductRequest
  ): Promise<Product> {
    const { data } = await api.post<ProductResponse>(
      "/products",
      payload
    );

    return data.data;
  }

  async updateProduct(
    id: string,
    payload: UpdateProductRequest
  ): Promise<Product> {
    const { data } = await api.patch<ProductResponse>(
      `/products/${id}`,
      payload
    );

    return data.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }
}

export const productManagementService =
  new ProductManagementService();