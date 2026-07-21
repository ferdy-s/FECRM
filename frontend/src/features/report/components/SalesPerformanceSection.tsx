"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ReportSkeleton } from "./ReportSkeleton";
import { ReportError } from "./ReportError";
import { SalesPerformanceChart } from "./SalesPerformanceChart";
import { SalesPerformanceTable } from "./SalesPerformanceTable";

import { useSalesPerformance } from "@/hooks/use-report";

export function SalesPerformanceSection() {

    const {
        data = [],
        isLoading,
        isError,
        refetch,
    } = useSalesPerformance();

    ////////////////////////////////////////////////////////

    if (isLoading) {
        return <ReportSkeleton cards={2} />;
    }

    ////////////////////////////////////////////////////////

    if (isError) {
        return (
            <ReportError
                title="Unable to load sales performance"
                description="Failed to retrieve sales analytics."
                onRetry={refetch}
            />
        );
    }

    ////////////////////////////////////////////////////////

    if (data.length === 0) {
        return (
            <ReportError
                title="No Sales Performance"
                description="Sales performance data is not available."
            />
        );
    }

    ////////////////////////////////////////////////////////

    return (

        <section className="space-y-4">

            <Card className="overflow-hidden">

                <CardHeader
                    className="
                        border-b
                        bg-muted/30
                        flex
                        flex-col
                        gap-2
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <CardTitle className="text-lg">

                        • Sales Analytics

                    </CardTitle>

                    <p
                        className="
                            max-w-xl
                            text-sm
                            text-muted-foreground
                            lg:text-right
                        "
                    >

                        Compare pipeline value, collections, and outstanding revenue across your sales team.

                    </p>

                </CardHeader>

                <CardContent className="p-6">

                    <div
                        className="
                            grid
                            gap-6
                            xl:grid-cols-5
                        "
                    >

                        <div
                            className="
                                min-w-0
                                xl:col-span-2
                            "
                        >

                            <SalesPerformanceChart
                                data={data}
                            />

                        </div>

                        <div
                            className="
                                min-w-0
                                xl:col-span-3
                            "
                        >

                            <SalesPerformanceTable
                                data={data}
                            />

                        </div>

                    </div>

                </CardContent>

            </Card>

        </section>

    );

}