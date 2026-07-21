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

export function CompanyLegal({
  company,
}: Props) {
  return (
    <Card>

      <CardHeader>
        <CardTitle>
          Legal Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <p className="text-sm text-muted-foreground">
            NPWP
          </p>
          <p>{company.npwp}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Address
          </p>
          <p>{company.address}</p>
        </div>

      </CardContent>

    </Card>
  );
}