"use client";

import {
    Handshake,
    Trophy,
    Users,
    XCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ReportSkeleton } from "./ReportSkeleton";
import { ReportError } from "./ReportError";

import { usePipeline } from "@/hooks/use-report";

export function PipelineCards() {

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = usePipeline();

    ////////////////////////////////////////////////////////

    if (isLoading) {
        return <ReportSkeleton cards={4} />;
    }

    ////////////////////////////////////////////////////////

    if (isError) {
        return (
            <ReportError
                title="Unable to load sales pipeline"
                description="Failed to retrieve sales pipeline performance."
                onRetry={refetch}
            />
        );
    }

    ////////////////////////////////////////////////////////

    if (!data) return null;

    ////////////////////////////////////////////////////////

    const metrics = [
        {
            title: "Leads",
            value: data.totalLead,
            description: "Total Leads",
            icon: Users,
            color: "text-blue-600",
        },
        {
            title: "Negotiation",
            value: data.totalNegotiation,
            description: "Deals in Negotiation Stage",
            icon: Handshake,
            color: "text-amber-600",
        },
        {
            title: "Won",
            value: data.totalWon,
            description: "Successfully Closed Deals",
            icon: Trophy,
            color: "text-emerald-600",
        },
        {
            title: "Lost",
            value: data.totalLost,
            description: "Lost Opportunities",
            icon: XCircle,
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

                       • Sales Pipeline

                    </CardTitle>

                    <p
                        className="
                            max-w-mt
                            text-sm
                            text-muted-foreground
                            lg:text-right
                        "
                    >

                        Monitor lead movement, negotiation progress, and overall sales conversion.

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

                        {metrics.map((metric) => {

                            const Icon = metric.icon;

                            return (

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

                                        <Icon
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

                            );

                        })}

                    </div>

                </CardContent>

            </Card>

        </section>

    );

}