"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { DashboardSummary } from "@/features/report/components/DashboardSummary";
import { RefreshOverdueButton } from "@/features/report/components/RefreshOverdueButton";
import { ExportReportDialog } from "@/features/report/components/ExportReportDialog";

export default function ReportsPage() {

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <div
                    className="
                        flex
                        flex-col
                        gap-6
                        lg:flex-row
                        lg:items-start
                        lg:justify-between
                    "
                >

                    <div className="space-y-2">

                        <h1
                            className="
                                text-4xl
                                font-bold
                                tracking-tight
                            "
                        >
                            Reports
                        </h1>

                        <p
                            className="
                                max-w-2xl
                                text-muted-foreground
                            "
                        >
                            Analyze operational, financial, collection, and sales performance across your organization.
                        </p>

                    </div>

                    <div
                        className="
                            flex
                            w-full
                            flex-col
                            gap-2
                            sm:w-auto
                            sm:flex-row
                        "
                    >

                        <ExportReportDialog />

                        <RefreshOverdueButton />

                    </div>

                </div>

                <DashboardSummary />

            </div>

        </DashboardLayout>

    );

}