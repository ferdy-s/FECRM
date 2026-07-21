"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Mail,
  MessageCircle,
  MessagesSquare,
} from "lucide-react";

interface CommunicationStatsProps {
  total: number;

  whatsapp: number;

  email: number;
}

export function CommunicationStats({
  total,
  whatsapp,
  email,
}: CommunicationStatsProps) {
  return (
   <div className="grid gap-5 lg:grid-cols-3">

  <Card className="group overflow-hidden rounded-xl border transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">

    <CardContent className="relative p-6">

      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

      <div className="flex items-start justify-between">

        <div className="space-y-2">

          <p className="text-sm font-medium text-muted-foreground">
            Total Communications
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            {total}
          </h2>

          <p className="text-xs text-muted-foreground">
            All communication activities
          </p>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">

          <MessagesSquare className="h-7 w-7 text-primary" />

        </div>

      </div>

    </CardContent>

  </Card>

  <Card className="group overflow-hidden rounded-xl border transition-all hover:-translate-y-1 hover:border-green-500/40 hover:shadow-lg">

    <CardContent className="relative p-6">

      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-green-500/5 blur-2xl" />

      <div className="flex items-start justify-between">

        <div className="space-y-2">

          <p className="text-sm font-medium text-muted-foreground">
            WhatsApp
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            {whatsapp}
          </h2>

          <p className="text-xs text-muted-foreground">
            Messages sent & received
          </p>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-500/10">

          <MessageCircle className="h-7 w-7 text-green-600" />

        </div>

      </div>

    </CardContent>

  </Card>

  <Card className="group overflow-hidden rounded-xl border transition-all hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg">

    <CardContent className="relative p-6">

      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl" />

      <div className="flex items-start justify-between">

        <div className="space-y-2">

          <p className="text-sm font-medium text-muted-foreground">
            Email
          </p>

          <h2 className="text-4xl font-bold tracking-tight">
            {email}
          </h2>

          <p className="text-xs text-muted-foreground">
            Email communications
          </p>

        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10">

          <Mail className="h-7 w-7 text-blue-600" />

        </div>

      </div>

    </CardContent>

  </Card>

</div>
  );
}