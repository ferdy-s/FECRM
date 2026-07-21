"use client";

import { ColumnDef } from "@tanstack/react-table";

import { SourcePerformance } from "@/types/report";

export const sourcePerformanceColumns: ColumnDef<SourcePerformance>[] = [
    {
        accessorKey: "sourceName",
        header: "Source",
    },
    {
        accessorKey: "totalLead",
        header: "Total Lead",
    },
    {
        accessorKey: "totalWon",
        header: "Won",
    },
    {
        accessorKey: "conversionRate",
        header: "Conversion",

        cell: ({ row }) => (
            <span>
                {row.original.conversionRate}%
            </span>
        ),
    },
];