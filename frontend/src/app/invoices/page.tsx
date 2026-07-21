import {
  DashboardLayout,
} from "@/components/layout/dashboard-layout";

import {
  InvoiceKPICards,
} from "@/features/invoices/components/invoice-kpi-cards";


import {
  InvoiceTable,
} from "@/features/invoices/components/invoice-table";

import { CreateInvoiceButton } from "@/features/invoices/components/create-invoice-button";

export default function InvoicesPage() {

  return (

    <DashboardLayout>

      <div className="space-y-6">

        <InvoiceKPICards />

        <InvoiceTable />

      </div>

    </DashboardLayout>

  );

}