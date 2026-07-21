import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { CreateServiceButton } from "@/features/service/components/create-service-button";
import { ServiceKPICards } from "@/features/service/components/service-kpi";
import { ServiceTable } from "@/features/service/components/service-table";

export default function ServicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Service Management
            </h1>

            <p className="text-muted-foreground">
              Enterprise Service Management Center
            </p>
          </div>

          <CreateServiceButton />
        </div>

        <ServiceKPICards />

        <ServiceTable />
      </div>
    </DashboardLayout>
  );
}