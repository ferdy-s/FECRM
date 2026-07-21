"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Card } from "@/components/ui/card";
import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Activity } from "@/types/activity";

import { activityColumns } from "../columns/activity-columns";

interface ActivityTableProps {
  activities: Activity[];
}

export function ActivityTable({
  activities,
}: ActivityTableProps) {
  const table = useReactTable({
    data: activities,
    columns: activityColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="border-b px-6 py-5">
        <h2 className="text-lg font-semibold">
          Activity Table
        </h2>

        <p className="text-sm text-muted-foreground">
          CRM activity records
        </p>
      </div>

      {/* Scroll */}
      <ScrollArea className="h-[calc(100vh-320px)] min-h-[500px]">
        <div className="min-w-[1000px]">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-background">
              {table
                .getHeaderGroups()
                .map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map(
                      (header) => (
                        <TableHead
                          key={header.id}
                          className="whitespace-nowrap"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column
                                  .columnDef
                                  .header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                ))}
            </TableHeader>

            <TableBody>
              {table
                .getRowModel()
                .rows.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <TableRow
                      key={row.id}
                    >
                      {row
                        .getVisibleCells()
                        .map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="align-top"
                          >
                            {flexRender(
                              cell.column
                                .columnDef
                                .cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      activityColumns.length
                    }
                    className="h-32 text-center text-muted-foreground"
                  >
                    No activity found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Horizontal Scroll */}
        <ScrollBar orientation="horizontal" />

        {/* Vertical Scroll */}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </Card>
  );
}