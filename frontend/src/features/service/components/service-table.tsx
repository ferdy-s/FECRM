"use client";

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

import { useServices } from "@/hooks/use-service-management";

import { serviceColumns } from "./service-columns";
import { ServiceEmpty } from "./service-empty";
import { ServiceLoading } from "./service-loading";

export function ServiceTable() {
  const {
    data,
    isLoading,
    isError,
  } = useServices();

  const services = data ?? [];

  const table = useReactTable({
    data: services,
    columns: serviceColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <ServiceLoading />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive p-6 text-center">
        Failed to load services.
      </div>
    );
  }

  if (services.length === 0) {
    return <ServiceEmpty />;
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}