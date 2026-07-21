"use client";

import {
    AlertCircle,
    BadgeDollarSign,
    CreditCard,
    Wallet,
    TrendingUp,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ReportSkeleton } from "./ReportSkeleton";
import { ReportError } from "./ReportError";

import { useCollectionDashboard } from "@/hooks/use-report";
import { formatCurrency } from "@/lib/format";

export function CollectionDashboardCards() {

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useCollectionDashboard();

    ////////////////////////////////////////////////////////

    if (isLoading) {
        return <ReportSkeleton cards={5} />;
    }

    ////////////////////////////////////////////////////////

    if (isError) {
        return (
            <ReportError
                title="Unable to load collection overview"
                description="Failed to retrieve collection performance."
                onRetry={refetch}
            />
        );
    }

    ////////////////////////////////////////////////////////

    if (!data) return null;

    ////////////////////////////////////////////////////////

    const collectionRate =
        data.receivable === 0
            ? 0
            : (
                (data.collected / data.receivable) *
                100
            ).toFixed(2);

    const metrics = [
        {
            title: "Receivable",
            value: formatCurrency(data.receivable),
            description: "Total Accounts Receivable",
            icon: Wallet,
            color: "text-blue-600",
        },
        {
            title: "Collected",
            value: formatCurrency(data.collected),
            description: "Payments Successfully Collected",
            icon: CreditCard,
            color: "text-emerald-600",
        },
        {
            title: "Outstanding",
            value: formatCurrency(data.outstanding),
            description: "Remaining Balance",
            icon: BadgeDollarSign,
            color: "text-orange-600",
        },
        {
            title: "Overdue",
            value: formatCurrency(data.overdue),
            description: `${data.overdueInvoices} Invoice • ${data.overdueDeals} Deal`,
            icon: AlertCircle,
            color: "text-red-600",
        },
        {
            title: "Collection Rate",
            value: `${collectionRate}%`,
            description: "Overall Collection Performance",
            icon: TrendingUp,
            color: "text-violet-600",
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

      • Collection Overview

    </CardTitle>

    <p
        className="
            max-w-mt
            text-sm
            text-muted-foreground
            lg:text-right
        "
    >

        Monitor receivables, payments, outstanding balances, and collection performance.

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
                            xl:grid-cols-5
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