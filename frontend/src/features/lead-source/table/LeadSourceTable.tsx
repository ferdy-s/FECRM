"use client";

import { useMemo, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { LeadSourceSkeleton } from "../components/LeadSourceSkeleton";
import { LeadSourceEmpty } from "../components/LeadSourceEmpty";

import { EditLeadSourceDialog } from "../dialogs/EditLeadSourceDialog";
import { DeleteLeadSourceDialog } from "../dialogs/DeleteLeadSourceDialog";

import { getLeadSourceColumns } from "./LeadSourceColumns";

import { useLeadSources } from "@/hooks/use-lead-source";

import type { LeadSource } from "@/types/lead-source";

export function LeadSourceTable() {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useLeadSources();

  const [selectedSource, setSelectedSource] =
    useState<LeadSource | null>(null);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const columns = useMemo(
    () =>
      getLeadSourceColumns({
        onEdit: (source) => {
          setSelectedSource(source);
          setEditOpen(true);
        },

        onDelete: (source) => {
          setSelectedSource(source);
          setDeleteOpen(true);
        },
      }),
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <LeadSourceSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-destructive">
          Failed to load lead sources.
        </p>

        <Button
          variant="outline"
          className="mt-4"
          onClick={() => void refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (data.length === 0) {
    return <LeadSourceEmpty />;
  }

  return (
    <>
      <div className="rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    (header) => (
                      <TableHead
                        key={header.id}
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
              .rows.map((row) => (
                <TableRow key={row.id}>
                  {row
                    .getVisibleCells()
                    .map((cell) => (
                      <TableCell
                        key={cell.id}
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
              ))}
          </TableBody>
        </Table>
      </div>

      <EditLeadSourceDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        leadSource={selectedSource}
      />

      <DeleteLeadSourceDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        leadSource={selectedSource}
      />
    </>
  );
}