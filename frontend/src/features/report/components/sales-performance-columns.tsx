"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SalesPerformance } from "@/types/report";

import { formatCurrency } from "@/lib/format";

export const salesPerformanceColumns: ColumnDef<SalesPerformance>[] = [
    {
        accessorKey: "salesName",
        header: "Sales",
    },
    {
        accessorKey: "totalDeals",
        header: "Deals",
    },
    {
        accessorKey: "pipelineValue",
        header: "Pipeline",

        cell: ({ row }) =>
            formatCurrency(row.original.pipelineValue),
    },
    {
        accessorKey: "collectedRevenue",
        header: "Collected",

        cell: ({ row }) =>
            formatCurrency(row.original.collectedRevenue),
    },
    {
        accessorKey: "outstandingRevenue",
        header: "Outstanding",

        cell: ({ row }) =>
            formatCurrency(
                row.original.outstandingRevenue
            ),
    },
];