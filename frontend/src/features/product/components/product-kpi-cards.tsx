"use client";

import { useMemo } from "react";

import {
  Package,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { useProducts } from "@/hooks/use-product-management";

import { ProductKpiCard } from "./product-kpi-card";
import { ProductKPISkeleton } from "./product-kpi-skeleton";

export function ProductKPICards() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useProducts();

  const statistics = useMemo(() => {
    if (!products.length) {
      return {
        totalProducts: 0,
        averagePrice: 0,
        highestPrice: 0,
      };
    }

    // Pastikan seluruh harga bertipe number
    const prices = products.map((product) =>
      Number(product.price ?? 0)
    );

    const totalPrice = prices.reduce(
      (total, price) => total + price,
      0
    );

    const highestPrice = Math.max(...prices);

    return {
      totalProducts: products.length,
      averagePrice: totalPrice / products.length,
      highestPrice,
    };
  }, [products]);

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }),
    []
  );

  if (isLoading) {
    return <ProductKPISkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
        <p className="text-sm font-medium text-destructive">
          Failed to load product statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ProductKpiCard
        title="Total Products"
        value={statistics.totalProducts}
        description="Registered products"
        icon={<Package className="h-5 w-5" />}
      />

      <ProductKpiCard
        title="Average Price"
        value={currencyFormatter.format(
          statistics.averagePrice
        )}
        description="Average selling price"
        icon={<Wallet className="h-5 w-5" />}
      />

      <ProductKpiCard
        title="Highest Price"
        value={currencyFormatter.format(
          statistics.highestPrice
        )}
        description="Highest product price"
        icon={<TrendingUp className="h-5 w-5" />}
      />
    </div>
  );
}