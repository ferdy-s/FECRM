"use client";

import { format } from "date-fns";

import {
  Mail,
  MessageCircle,
  CalendarClock,
  ArrowRightLeft,
  CircleCheck,
  Hash,
  User,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Separator,
} from "@/components/ui/separator";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  CommunicationStatusBadge,
} from ".";

import type {
  CommunicationLog,
} from "@/types/communication";

interface CommunicationDetailSheetProps {
  open: boolean;

  communication: CommunicationLog | null;

  onOpenChange: (
    open: boolean
  ) => void;
}

export function CommunicationDetailSheet({
  open,
  communication,
  onOpenChange,
}: CommunicationDetailSheetProps) {
  if (!communication) {
    return null;
  }

  return (
  <Sheet
  open={open}
  onOpenChange={onOpenChange}
>
  <SheetContent
    side="right"
    className="w-full p-0 sm:max-w-2xl"
  >
    <SheetHeader className="border-b bg-muted/20 px-6 py-6">

      <div className="flex items-start justify-between gap-4">

        <div>

          <SheetTitle className="text-xl">
            Communication Detail
          </SheetTitle>

          <SheetDescription className="mt-1">
            Review complete communication information.
          </SheetDescription>

        </div>

        <CommunicationStatusBadge
          status={communication.status}
        />

      </div>

    </SheetHeader>

    <ScrollArea className="h-[calc(100vh-100px)]">

      <div className="space-y-6 p-6">

        <Card>

          <CardHeader className="pb-4">

            <CardTitle className="text-base">
              Overview
            </CardTitle>

            <CardDescription>
              General communication information.
            </CardDescription>

          </CardHeader>

          <CardContent>

            <div className="grid gap-6 md:grid-cols-2">

              <DetailItem
                icon={
                  communication.channel === "WA"
                    ? (
                        <MessageCircle className="h-4 w-4 text-green-600" />
                      )
                    : (
                        <Mail className="h-4 w-4 text-blue-600" />
                      )
                }
                label="Channel"
                value={
                  communication.channel === "WA"
                    ? "WhatsApp"
                    : "Email"
                }
              />

              <DetailItem
                icon={
                  <ArrowRightLeft className="h-4 w-4" />
                }
                label="Direction"
                value={
                  communication.direction === "OUTBOUND"
                    ? "Outbound"
                    : "Inbound"
                }
              />

              <DetailItem
                icon={
                  <CalendarClock className="h-4 w-4" />
                }
                label="Date"
                value={format(
                  new Date(
                    communication.createdAt
                  ),
                  "dd MMM yyyy"
                )}
              />

              <DetailItem
                icon={
                  <CalendarClock className="h-4 w-4" />
                }
                label="Time"
                value={format(
                  new Date(
                    communication.createdAt
                  ),
                  "HH:mm"
                )}
              />

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader className="pb-4">

            <CardTitle className="text-base">
              Message
            </CardTitle>

            <CardDescription>
              Communication content sent or received.
            </CardDescription>

          </CardHeader>

          <CardContent>

            <div className="
              rounded-xl
              border
              bg-muted/30
              p-5
            ">

              <p className="
                whitespace-pre-wrap
                break-words
                text-sm
                leading-7
              ">
                {communication.message}
              </p>

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader className="pb-4">

            <CardTitle className="text-base">
              System Information
            </CardTitle>

            <CardDescription>
              Internal identifiers and tracking data.
            </CardDescription>

          </CardHeader>

          <CardContent>

            <div className="grid gap-6 md:grid-cols-2">

              <DetailItem
                icon={
                  <Hash className="h-4 w-4" />
                }
                label="Communication ID"
                value={communication.id}
              />

              <DetailItem
                icon={
                  <Hash className="h-4 w-4" />
                }
                label="External ID"
                value={
                  communication.externalId ??
                  "-"
                }
              />

              <DetailItem
                icon={
                  <User className="h-4 w-4" />
                }
                label="User ID"
                value={
                  communication.userId
                }
              />

              <DetailItem
                icon={
                  <CalendarClock className="h-4 w-4" />
                }
                label="Created At"
                value={format(
                  new Date(
                    communication.createdAt
                  ),
                  "dd MMM yyyy HH:mm"
                )}
              />

            </div>

          </CardContent>

        </Card>

      </div>

    </ScrollArea>

  </SheetContent>

</Sheet>
  );
}

interface DetailItemProps {
  icon: React.ReactNode;

  label: string;

  value: React.ReactNode;
}

function DetailItem({
  icon,
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">
        {icon}
      </div>

      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 break-all text-sm">
          {value}
        </p>
      </div>
    </div>
  );
}