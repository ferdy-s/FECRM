"use client";

import { ChevronRight, Mail, MessageCircle } from "lucide-react";

import { format } from "date-fns";

import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

import {
  Badge,
} from "@/components/ui/badge";

import {
  CommunicationStatusBadge,
} from ".";

import type {
  CommunicationLog,
} from "@/types/communication";

interface CommunicationHistoryRowProps {
  communication: CommunicationLog;

  onSelect?: (
    communication: CommunicationLog
  ) => void;
}

export function CommunicationHistoryRow({
  communication,
  onSelect,
}: CommunicationHistoryRowProps) {
  return (
    <TableRow
  className="
    cursor-pointer
    border-b
    transition-colors
    hover:bg-muted/40
  "
  onClick={() => onSelect?.(communication)}
>
  <TableCell className="py-4">

    <Badge
      variant="outline"
      className="gap-2 rounded-md px-3 py-1 font-medium"
    >
      {communication.channel === "WA" ? (
        <MessageCircle className="h-4 w-4 text-green-600" />
      ) : (
        <Mail className="h-4 w-4 text-blue-600" />
      )}

      {communication.channel === "WA"
        ? "WhatsApp"
        : "Email"}
    </Badge>

  </TableCell>

  <TableCell className="py-4">

    <Badge
      variant={
        communication.direction === "OUTBOUND"
          ? "default"
          : "secondary"
      }
      className="rounded-md px-3 py-1"
    >
      {communication.direction === "OUTBOUND"
        ? "Outbound"
        : "Inbound"}
    </Badge>

  </TableCell>

  <TableCell className="max-w-lg py-4">

    <div className="space-y-2">

      <p className="line-clamp-2 break-words text-sm leading-6 font-medium">
        {communication.message}
      </p>

      <p className="text-xs text-muted-foreground">
        ID:
        <span className="ml-1 font-mono">
          {communication.id.slice(0, 8)}
        </span>
      </p>

    </div>

  </TableCell>

  <TableCell className="py-4">

    <CommunicationStatusBadge
      status={communication.status}
    />

  </TableCell>

  <TableCell className="py-4">

    <div className="space-y-1">

      <p className="font-medium">
        {format(
          new Date(communication.createdAt),
          "dd MMM yyyy"
        )}
      </p>

      <p className="text-xs text-muted-foreground">
        {format(
          new Date(communication.createdAt),
          "HH:mm"
        )}
      </p>

    </div>

  </TableCell>

  <TableCell className="py-4 text-right">

    <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background transition-colors hover:bg-muted">

      <ChevronRight className="h-4 w-4 text-muted-foreground" />

    </div>

  </TableCell>

</TableRow>
  );
}