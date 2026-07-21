"use client";

import { useParams } from "next/navigation";

import { useRole } from "@/hooks/use-role";

import { useLeadDetail }
from "@/hooks/use-lead-detail";

import {
  DashboardLayout,
} from "@/components/layout/dashboard-layout";

import {
  LeadDetailHeader,
} from "@/features/leads/components/lead-detail-header";

import {
  LeadInformation,
} from "@/features/leads/components/lead-information";

import {
  LeadTimeline,
} from "@/features/leads/components/lead-timeline";

import {
  LeadNotes,
} from "@/features/leads/components/lead-notes";

import {
  LeadAssignmentCard,
} from "@/features/leads/components/lead-assignment-card";

import {
  LeadConvertCard,
} from "@/features/leads/components/lead-convert-card";

export default function LeadDetailPage() {

  const params =
    useParams();

  const role =
    useRole();

  const leadId =
    params.id as string;

  const {
    data,
    isLoading,
    error,
  } = useLeadDetail(
    leadId
  );

  if (!role) {
    return null;
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout>
        Failed to load lead
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-2">
        
        <LeadDetailHeader
          role={role}
          lead={data}
        />

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >
          <div
            
          >
            <LeadTimeline
              leadId={data.id}
            />
          </div>

          <div className="space-y-6">

            <LeadInformation
              lead={data}
            />

           

      <LeadConvertCard
  role={role}
  leadId={data.id}
  isConverted={
    data.deals.length > 0
  }
/>

          </div>

        </div>

        <div
          className="
            grid
            gap-6
            lg:grid-cols-2
          "
        >
    

        </div>

      </div>

    </DashboardLayout>
  );
}