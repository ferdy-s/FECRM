"use client";

import {
    CalendarClock,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ReportSkeleton } from "./ReportSkeleton";
import { ReportError } from "./ReportError";

import { useAging } from "@/hooks/use-report";

export function AgingCards() {

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useAging();

    ////////////////////////////////////////////////////////

    if (isLoading) {
        return <ReportSkeleton cards={4} />;
    }

    ////////////////////////////////////////////////////////

    if (isError) {
        return (
            <ReportError
                title="Unable to load receivable aging"
                description="Failed to retrieve receivable aging information."
                onRetry={refetch}
            />
        );
    }

    ////////////////////////////////////////////////////////

    if (!data) return null;

    ////////////////////////////////////////////////////////

    const metrics = [
        {
            title: "0 - 30 Days",
            value: data.bucket0to30,
            description: "Current Receivables",
            color: "text-emerald-600",
        },
        {
            title: "31 - 60 Days",
            value: data.bucket31to60,
            description: "Early Overdue",
            color: "text-amber-600",
        },
        {
            title: "61 - 90 Days",
            value: data.bucket61to90,
            description: "Medium Risk",
            color: "text-orange-600",
        },
        {
            title: "90+ Days",
            value: data.bucket90plus,
            description: "Critical Outstanding",
            color: "text-red-600",
        },
    ];

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

                        • Receivable Aging

                    </CardTitle>

                    <p
                        className="
                            max-w-mt
                            text-sm
                            text-muted-foreground
                            lg:text-right
                        "
                    >

                        Outstanding receivables categorized by aging period to identify collection priorities.

                    </p>

                </CardHeader>

                <CardContent className="p-0">

                    <div
                        className="
                            grid
                            grid-cols-1
                            divide-y
                            md:grid-cols-2
                            md:divide-y-0
                            md:divide-x
                            xl:grid-cols-4
                        "
                    >

                        {metrics.map((metric) => (

                            <div
                                key={metric.title}
                                className="
                                    p-6
                                    transition-colors
                                    hover:bg-muted/40
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <span
                                        className="
                                            text-sm
                                            font-medium
                                            text-muted-foreground
                                        "
                                    >

                                        {metric.title}

                                    </span>

                                    <CalendarClock
                                        className={`h-5 w-5 ${metric.color}`}
                                    />

                                </div>

                                <div
                                    className="
                                        mt-4
                                        text-3xl
                                        font-bold
                                        tracking-tight
                                    "
                                >

                                    {metric.value}

                                </div>

                                <p
                                    className="
                                        mt-2
                                        text-xs
                                        text-muted-foreground
                                    "
                                >

                                    {metric.description}

                                </p>

                            </div>

                        ))}

                    </div>

                </CardContent>

            </Card>

        </section>

    );

}