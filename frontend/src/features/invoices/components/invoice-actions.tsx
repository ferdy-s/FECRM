import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export function InvoiceActions() {
  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Actions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">

        <Button
          className="w-full"
          variant="default"
        >
          Generate QRIS
        </Button>

        <Button
          className="w-full"
          variant="outline"
        >
          View QRIS
        </Button>

        <Button
          className="w-full"
          variant="outline"
        >
          Download PDF
        </Button>

        <Link href="/deals/1">
          <Button
            className="w-full"
            variant="outline"
          >
            Open Deal
          </Button>
        </Link>

        <Link href="/leads/1">
          <Button
            className="w-full"
            variant="outline"
          >
            Open Customer
          </Button>
        </Link>

      </CardContent>

    </Card>
  );
}