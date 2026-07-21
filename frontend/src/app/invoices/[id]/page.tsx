"use client";

import { useParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

import { useInvoice } from "@/hooks/use-invoice";

import { InvoiceHeaderCard } from "@/features/invoices/components/invoice-header-card";
import { InvoiceCustomerCard } from "@/features/invoices/components/invoice-customer-card";
import { InvoiceDealCard } from "@/features/invoices/components/invoice-deal-card";
import { InvoiceFinancialSummary } from "@/features/invoices/components/invoice-financial-summary";
import { InvoicePaymentProgress } from "@/features/invoices/components/invoice-payment-progress";
import { InvoiceItemsTable } from "@/features/invoices/components/invoice-items-table";
import { InvoiceTermsTable } from "@/features/invoices/components/invoice-terms-table";

export default function InvoiceDetailPage() {
  const params = useParams();

  const invoiceId = params.id as string;

  const {
    data: invoice,
    isPending,
    isError,
  } = useInvoice(invoiceId);

  if (isPending) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-80 w-full rounded-xl" />
          <Skeleton className="h-[420px] w-full rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !invoice) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />

          <AlertTitle>
            Invoice not found
          </AlertTitle>

          <AlertDescription>
            Failed to load invoice detail.
          </AlertDescription>
        </Alert>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <InvoiceHeaderCard
          invoice={invoice}
        />

        {/* Customer + Deal */}
        <div className="grid gap-6 xl:grid-cols-2">
          <InvoiceCustomerCard
            invoice={invoice}
          />

          <InvoiceDealCard
            invoice={invoice}
          />
        </div>

        {/* Financial */}
        <InvoiceFinancialSummary
          invoice={invoice}
        />

        {/* Payment Progress */}
        <InvoicePaymentProgress
          invoice={invoice}
        />

        {/* Items */}
        <InvoiceItemsTable
          items={invoice.items ?? []}
        />

        {/* Terms */}
        <InvoiceTermsTable
          invoiceId={invoice.id}
        />
      </div>
    </DashboardLayout>
  );
}