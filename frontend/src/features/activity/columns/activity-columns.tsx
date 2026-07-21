"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";

import type { Activity } from "@/types/activity";

import { getActivityBadgeClass } from "../utils/activity-color";
import { getActivityIcon } from "../utils/activity-icon";
import { formatActivityDate } from "../utils/activity-format";

export const activityColumns: ColumnDef<Activity>[] = [
  {
    accessorKey: "type",

    header: "Type",

    cell: ({ row }) => {
      const activity = row.original;

      const Icon = getActivityIcon(activity.type);

      return (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />

          <Badge
            className={getActivityBadgeClass(
              activity.type
            )}
          >
            {activity.type}
          </Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "description",

    header: "Description",

    cell: ({ row }) => (
      <div className="max-w-md truncate">
        {row.original.description}
      </div>
    ),
  },

  {
    accessorKey: "lead",

    header: "Lead",

    cell: ({ row }) => (
      <div>
        <div className="font-medium">
          {row.original.lead.name}
        </div>

        <div className="text-xs text-muted-foreground">
          {row.original.lead.company}
        </div>
      </div>
    ),
  },

  {
    accessorKey: "user",

    header: "User",

    cell: ({ row }) => (
      <div>
        <div className="font-medium">
          {row.original.user.name}
        </div>

        <div className="text-xs text-muted-foreground">
          {row.original.user.role}
        </div>
      </div>
    ),
  },

  {
    accessorKey: "createdAt",

    header: "Created",

    cell: ({ row }) =>
      formatActivityDate(
        row.original.createdAt
      ),
  },
];