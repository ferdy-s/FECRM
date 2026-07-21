"use client";

import Link from "next/link";

import {
  Receipt,
  Package,
  Wrench,
  Wallet,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import type {
  Deal,
} from "@/types/deal";

interface Props {
  deal: Deal;
}

export function QuickActions({
  deal,
}: Props) {

  return (

    <Card>

      <CardHeader>

        <CardTitle>

          Quick Actions

        </CardTitle>

      </CardHeader>

      <CardContent className="space-y-3">

        <Button
          className="w-full justify-between"
          asChild
        >

          <Link
            href={`/invoices/create?dealId=${deal.id}`}
          >

            <span className="flex items-center">

              <Receipt className="mr-2 h-4 w-4" />

              Generate Invoice

            </span>

            <ArrowRight className="h-4 w-4" />

          </Link>

        </Button>

        <Button
          variant="outline"
          className="w-full justify-between"
        >

          <span className="flex items-center">

            <Package className="mr-2 h-4 w-4" />

            Attach Product

          </span>

        </Button>

        <Button
          variant="outline"
          className="w-full justify-between"
        >

          <span className="flex items-center">

            <Wrench className="mr-2 h-4 w-4" />

            Attach Service

          </span>

        </Button>

        <Button
          asChild
          variant="secondary"
          className="w-full justify-between"
        >

          <Link
            href={`/payments?dealId=${deal.id}`}
          >

            <span className="flex items-center">

              <Wallet className="mr-2 h-4 w-4" />

              View Payments

            </span>

            <ArrowRight className="h-4 w-4" />

          </Link>

        </Button>

      </CardContent>

    </Card>

  );

}