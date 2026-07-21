import { DashboardLayout }
from "@/components/layout/dashboard-layout";

import { Role }
from "@/constants/roles";

import { company }
from "@/features/company/constants/company.mock";

import { CompanyHeader }
from "@/features/company/components/company-header";

import { CompanyGeneral }
from "@/features/company/components/company-general";

import { CompanyLegal }
from "@/features/company/components/company-legal";

import { CompanyBank }
from "@/features/company/components/company-bank";

import { CompanyInvoice }
from "@/features/company/components/company-invoice";

export default function CompanyPage() {
  return (
    <DashboardLayout
    >
      <div className="space-y-6">

        <CompanyHeader />

        <div className="grid gap-6 lg:grid-cols-2">

          <CompanyGeneral
            company={company}
          />

          <CompanyLegal
            company={company}
          />

          <CompanyBank
            company={company}
          />

          <CompanyInvoice
            company={company}
          />

        </div>

      </div>
    </DashboardLayout>
  );
}