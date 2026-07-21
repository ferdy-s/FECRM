import {
  DashboardLayout,
} from "@/components/layout/dashboard-layout";

import {
  LeadViewSwitcher,
} from "@/features/leads/components/lead-view-switcher";

export default function LeadsPage() {
  return (
    <DashboardLayout>
      <LeadViewSwitcher />
    </DashboardLayout>
  );
}