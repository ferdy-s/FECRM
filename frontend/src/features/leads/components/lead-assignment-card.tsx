"use client";

import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AssignUserDialog,
} from "./assign-user-dialog";

import {
  useAssignLead,
} from "@/hooks/use-assign-lead";

import {
  useRole,
} from "@/hooks/use-role";

import {
  usePermission,
} from "@/hooks/use-permission";

import type {
  LeadDetail,
} from "@/types/lead";

import {
  Role,
} from "@/constants/roles";

interface Props {
  lead: LeadDetail;
}

export function LeadAssignmentCard({
  lead,
}: Props) {

  const role = useRole();

  const permission =
  usePermission(
    role ?? Role.MARKETING
  );

  const assignMutation =
    useAssignLead();

  if (!role) {
    return null;
  }

  const canAssign =
    permission.canAssignLead &&
    lead.deals.length === 0;

  const handleAssign = async (
    userId: string
  ) => {

    try {

      await assignMutation.mutateAsync({

        leadId: lead.id,

        assignedTo: userId,

      });

      toast.success(
        "Lead assigned successfully"
      );

    } catch {

      toast.error(
        "Failed to assign lead"
      );

    }

  };

  return (
    <Card>

      <CardHeader
        className="
          flex
          flex-row
          items-center
          justify-between
          space-y-0
        "
      >

        <CardTitle>
          Assignment
        </CardTitle>

        {canAssign ? (

          <AssignUserDialog
            onAssign={
              handleAssign
            }
          />

        ) : (

          <Badge
            variant="secondary"
          >
            Assignment Locked
          </Badge>

        )}

      </CardHeader>

      <CardContent>

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Avatar>

            <AvatarFallback>
              {
                lead.assignee?.name?.charAt(
                  0
                ) ?? "U"
              }
            </AvatarFallback>

          </Avatar>

          <div>

            <p className="font-medium">
              {
                lead.assignee?.name
                ?? "-"
              }
            </p>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >
              {
                lead.assignee?.role
                ?? "-"
              }
            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}