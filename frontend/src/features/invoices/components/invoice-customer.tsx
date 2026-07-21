"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface InvoiceCustomerProps {
  customer: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
}

export function InvoiceCustomer({
  customer,
}: InvoiceCustomerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Customer Information
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">

        <div>
          <p className="text-sm text-muted-foreground">
            Customer Name
          </p>

          <p className="font-medium">
            {customer.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Company
          </p>

          <p className="font-medium">
            {customer.company}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Email
          </p>

          <p className="font-medium">
            {customer.email}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Phone Number
          </p>

          <p className="font-medium">
            {customer.phone}
          </p>
        </div>

      </CardContent>
    </Card>
  );
}