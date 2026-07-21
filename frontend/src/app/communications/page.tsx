"use client";

import { useState } from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import {
  CommunicationHistoryTable,
  LeadSelector,
} from "@/features/communication/components";

import {
  useCommunicationHistory,
} from "@/hooks/use-communication-log";

export default function CommunicationsPage() {
  const [
    selectedLeadId,
    setSelectedLeadId,
  ] = useState("");

  const query =
    useCommunicationHistory({
      leadId: selectedLeadId,
    });

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Communication History
          </h1>

          <p className="text-muted-foreground">
            View and monitor communication history for every lead.
          </p>
        </div>

        <LeadSelector
          value={selectedLeadId}
          onChange={setSelectedLeadId}
        />

        <CommunicationHistoryTable
          data={query.data ?? []}
          isLoading={query.isLoading}
          isFetching={query.isFetching}
          isError={query.isError}
          refetch={query.refetch}
        />

      </div>
    </DashboardLayout>
  );
}