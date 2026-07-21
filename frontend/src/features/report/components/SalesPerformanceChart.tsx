"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    LabelList,
    XAxis,
    YAxis,
} from "recharts";

import {
    Award,
    DollarSign,
    FolderKanban,
    Handshake,
} from "lucide-react";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart";

import { SalesPerformance } from "@/types/report";

interface SalesPerformanceChartProps {
    data: SalesPerformance[];
}

const chartConfig = {
    collected: {
        label: "Collected Revenue",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

function formatCurrency(value: number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }
    ).format(value);

}

function formatCompact(value: number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: 1,
        }
    ).format(value);

}

export function SalesPerformanceChart({

    data,

}: SalesPerformanceChartProps) {

    ////////////////////////////////////////////////////////

    /**
     * Enterprise Ranking
     *
     * Priority:
     *
     * 1. Collected Revenue
     * 2. Pipeline Value
     * 3. Total Deals
     */

    const chartData = [...data]

        .sort((a, b) => {

            if (
                b.collectedRevenue !==
                a.collectedRevenue
            ) {

                return (
                    b.collectedRevenue -
                    a.collectedRevenue
                );

            }

            if (
                b.pipelineValue !==
                a.pipelineValue
            ) {

                return (
                    b.pipelineValue -
                    a.pipelineValue
                );

            }

            return (
                b.totalDeals -
                a.totalDeals
            );

        })

        .slice(0, 3)

        .map((sales, index) => ({

            rank: index + 1,

            sales: sales.salesName,

            deals: sales.totalDeals,

            pipeline:
                sales.pipelineValue,

            collected:
                sales.collectedRevenue,

            outstanding:
                sales.outstandingRevenue,

        }));

    ////////////////////////////////////////////////////////

    return (

        <div className="space-y-6">

            <div>

                <h3 className="text-base font-semibold">

                    Top 3 Sales Performance

                </h3>

                <p className="text-sm text-muted-foreground">

                    Ranking is calculated by collected revenue.
                    If two sales representatives have the same collected revenue,
                    the ranking is determined by pipeline value,
                    then by the total number of deals.

                </p>

            </div>

            <ChartContainer
                config={chartConfig}
                className="min-h-80 w-full"
            >

                <BarChart
                    accessibilityLayer
                    data={chartData}
                    layout="vertical"
                    margin={{
                        left: 10,
                        right: 40,
                    }}
                >

                    <CartesianGrid
                        horizontal={false}
                    />

                    <XAxis
                        hide
                        type="number"
                    />

                    <YAxis
                        width={120}
                        type="category"
                        dataKey="sales"
                        tickLine={false}
                        axisLine={false}
                    />

                    <ChartTooltip

                        cursor={false}

                        content={({ active, payload }) => {

                            if (
                                !active ||
                                !payload?.length
                            ) {

                                return null;

                            }

                            const row =
                                payload[0]
                                    .payload;

                            return (

                                <div
                                    className="
                                        rounded-lg
                                        border
                                        bg-background
                                        p-4
                                        shadow-lg
                                        min-w-[280px]
                                    "
                                >

                                    <div className="mb-4 flex items-center gap-2">

                                        <Award className="h-5 w-5 text-yellow-500" />

                                        <div>

                                            <div className="font-semibold">

                                                #{row.rank}

                                                {" "}

                                                {row.sales}

                                            </div>

                                            <div className="text-xs text-muted-foreground">

                                                Sales Representative

                                            </div>

                                        </div>

                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-2 text-sm">

                                                <DollarSign className="h-4 w-4 text-emerald-600" />

                                                Collected Revenue

                                            </div>

                                            <span className="font-semibold">

                                                {formatCurrency(
                                                    row.collected
                                                )}

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-2 text-sm">

                                                <FolderKanban className="h-4 w-4 text-blue-600" />

                                                Pipeline Value

                                            </div>

                                            <span className="font-semibold">

                                                {formatCurrency(
                                                    row.pipeline
                                                )}

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-2 text-sm">

                                                <Handshake className="h-4 w-4 text-orange-500" />

                                                Total Deals

                                            </div>

                                            <span className="font-semibold">

                                                {row.deals}

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between">

                                            <div className="flex items-center gap-2 text-sm">

                                                <DollarSign className="h-4 w-4 text-red-500" />

                                                Outstanding

                                            </div>

                                            <span className="font-semibold">

                                                {formatCurrency(
                                                    row.outstanding
                                                )}

                                            </span>

                                        </div>

                                    </div>

                                </div>

                            );

                        }}

                    />

                    <Bar
                        dataKey="collected"
                        radius={8}
                        fill="var(--color-collected)"
                    >

                        <LabelList
                            dataKey="collected"
                            position="right"
                            formatter={(value) =>
                                formatCompact(
                                    Number(value)
                                )
                            }
                            className="fill-foreground text-xs font-semibold"
                        />

                    </Bar>

                </BarChart>

            </ChartContainer>

        </div>

    );

}
                                