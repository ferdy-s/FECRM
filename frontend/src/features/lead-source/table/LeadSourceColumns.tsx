"use client";

import type { ColumnDef } from "@tanstack/react-table";

import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type {
  LeadSource,
} from "@/types/lead-source";

interface LeadSourceColumnsProps {
  onEdit: (
    source: LeadSource
  ) => void;

  onDelete: (
    source: LeadSource
  ) => void;
}

export function getLeadSourceColumns({
  onEdit,
  onDelete,
}: LeadSourceColumnsProps): ColumnDef<LeadSource>[] {
  return [
  {
    accessorKey: "name",

    header: "Source",

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.name}
      </span>
    ),
  },

  {
    id: "actions",

    enableSorting: false,

    enableHiding: false,

    cell: ({ row }) => {
      const source = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                onEdit(source)
              }
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-destructive"
              onClick={() =>
                onDelete(source)
              }
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
}