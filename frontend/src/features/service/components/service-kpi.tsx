"use client";

import { useMemo } from "react";

import {
  BriefcaseBusiness,
  TrendingUp,
  Wallet,
} from "lucide-react";

import { useServices } from "@/hooks/use-service-management";

import { ServiceKpiCard } from "./service-kpi-card";
import { ServiceKPISkeleton } from "./service-kpi-skeleton";

export function ServiceKPICards() {
  const {
    data: services = [],
    isLoading,
    isError,
  } = useServices();

  const statistics = useMemo(() => {
    if (!services.length) {
      return {
        totalServices: 0,
        averagePrice: 0,
        totalValue: 0,
      };
    }

    const prices = services.map((service) =>
      Number(service.price)
    );

    const totalValue = prices.reduce(
      (total, price) => total + price,
      0
    );

    return {
      totalServices: services.length,
      averagePrice:
        totalValue / services.length,
      totalValue,
    };
  }, [services]);

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
    return <ServiceKPISkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6">
        <p className="text-sm font-medium text-destructive">
          Failed to load service statistics.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ServiceKpiCard
        title="Total Services"
        value={statistics.totalServices}
        description="Registered services"
        icon={
          <BriefcaseBusiness className="h-5 w-5" />
        }
      />

      <ServiceKpiCard
        title="Average Price"
        value={currencyFormatter.format(
          statistics.averagePrice
        )}
        description="Average service price"
        icon={<Wallet className="h-5 w-5" />}
      />

      <ServiceKpiCard
        title="Total Service Value"
        value={currencyFormatter.format(
          statistics.totalValue
        )}
        description="Combined value of all services"
        icon={
          <TrendingUp className="h-5 w-5" />
        }
      />
    </div>
  );
}