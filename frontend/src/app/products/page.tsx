import { Role } from "@/constants/roles";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { CreateProductButton } from "@/features/product/components/create-product-button";
import { ProductKPICards } from "@/features/product/components/product-kpi-cards";
import { ProductTable } from "@/features/product/components/product-table";

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Product Management
            </h1>

            <p className="text-muted-foreground">
              Enterprise Product Management Center
            </p>
          </div>

          <CreateProductButton />
        </div>

        <ProductKPICards />

        <ProductTable />
      </div>
    </DashboardLayout>
  );
}