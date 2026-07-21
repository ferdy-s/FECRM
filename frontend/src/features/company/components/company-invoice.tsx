import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Company }
from "../types/company.type";

interface Props {
  company: Company;
}

export function CompanyInvoice({
  company,
}: Props) {
  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Invoice Configuration
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <p className="text-sm text-muted-foreground">
            Invoice Prefix
          </p>

          <p>
            {company.invoicePrefix}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Invoice Footer
          </p>

          <p>
            {company.invoiceFooter}
          </p>
        </div>

      </CardContent>

    </Card>
  );
}