"use client";

import { format } from "date-fns";
import {
  ChevronRight,
  Mail,
  MessageCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Separator,
} from "@/components/ui/separator";

import {
  CommunicationStatusBadge,
} from ".";

import type {
  CommunicationLog,
} from "@/types/communication";

interface CommunicationHistoryMobileCardProps {
  communication: CommunicationLog;

  onSelect?: (
    communication: CommunicationLog
  ) => void;
}

export function CommunicationHistoryMobileCard({
  communication,
  onSelect,
}: CommunicationHistoryMobileCardProps) {
  return (
    <Card
      className="cursor-pointer transition-colors hover:bg-muted/30"
      onClick={() =>
        onSelect?.(communication)
      }
    >
      <CardContent className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="gap-2"
            >
              {communication.channel ===
              "WA" ? (
                <MessageCircle className="h-3.5 w-3.5 text-green-600" />
              ) : (
                <Mail className="h-3.5 w-3.5 text-blue-600" />
              )}

              {communication.channel}
            </Badge>

            <Badge
              variant={
                communication.direction ===
                "OUTBOUND"
                  ? "default"
                  : "secondary"
              }
            >
              {communication.direction}
            </Badge>
          </div>

          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="line-clamp-3 break-words text-sm">
            {communication.message}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <CommunicationStatusBadge
            status={communication.status}
          />

          <span className="text-xs text-muted-foreground">
            {format(
              new Date(
                communication.createdAt
              ),
              "dd MMM yyyy HH:mm"
            )}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}