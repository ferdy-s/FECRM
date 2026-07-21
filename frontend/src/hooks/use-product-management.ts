"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { productManagementService } from "@/services/product-management.service";

import type {
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types/product";

const QUERY_KEY = ["products"];

export function useProducts() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () =>
      productManagementService.getProducts(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () =>
      productManagementService.getProduct(id),
    enabled: Boolean(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateProductRequest
    ) =>
      productManagementService.createProduct(
        payload
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProductRequest;
    }) =>
      productManagementService.updateProduct(
        id,
        payload
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      productManagementService.deleteProduct(
        id
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY,
      });
    },
  });
}