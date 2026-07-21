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

export function CompanyBank({
  company,
}: Props) {
  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Bank Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <p className="text-sm text-muted-foreground">
            Bank Name
          </p>
          <p>{company.bankName}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Account Number
          </p>
          <p>{company.accountNumber}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Account Holder
          </p>
          <p>{company.accountHolder}</p>
        </div>

      </CardContent>

    </Card>
  );
}