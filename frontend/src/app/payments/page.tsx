import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { PaymentTable } from "@/features/payment/components/payment-table";

//////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Payment Management
          </h1>

          <p className="text-muted-foreground">
            Upload, verify and monitor customer payments.
          </p>

        </div>

        <PaymentTable />

      </div>
    </DashboardLayout>
  );
}