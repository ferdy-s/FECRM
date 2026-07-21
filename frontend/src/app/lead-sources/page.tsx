import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { LeadSourceHeader } from "@/features/lead-source/components/LeadSourceHeader";
import { CreateLeadSourceDialog } from "@/features/lead-source/dialogs/CreateLeadSourceDialog";
import { LeadSourceTable } from "@/features/lead-source/table/LeadSourceTable";

export default function LeadSourcesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <LeadSourceHeader />

          <CreateLeadSourceDialog />
        </div>

        <LeadSourceTable />
      </div>
    </DashboardLayout>
  );
}