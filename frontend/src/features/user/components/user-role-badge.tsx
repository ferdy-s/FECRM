"use client";

import { Badge } from "@/components/ui/badge";

import {
  UserRole,
} from "@/types/user";

interface UserRoleBadgeProps {
  role: UserRole;
}

const roleConfig: Record<
  UserRole,
  {
    label: string;
    className: string;
  }
> = {
  [UserRole.ADMIN]: {
    label: "Admin",
    className:
      "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
  },

  [UserRole.MANAGER]: {
    label: "Manager",
    className:
      "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100",
  },

  [UserRole.SALES]: {
    label: "Sales",
    className:
      "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",
  },

  [UserRole.MARKETING]: {
    label: "Marketing",
    className:
      "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
  },

  [UserRole.FINANCE]: {
    label: "Finance",
    className:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
  },
};

export function UserRoleBadge({
  role,
}: UserRoleBadgeProps) {

  const config =
    roleConfig[role];

  return (
    <Badge
      variant="outline"
      className={config.className}
    >
      {config.label}
    </Badge>
  );
}