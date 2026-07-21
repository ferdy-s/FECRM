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

export function CompanyGeneral({
  company,
}: Props) {
  return (
    <Card>

      <CardHeader>
        <CardTitle>
          General Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <p className="text-sm text-muted-foreground">
            Company Name
          </p>
          <p>{company.companyName}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Email
          </p>
          <p>{company.email}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Phone
          </p>
          <p>{company.phone}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Website
          </p>
          <p>{company.website}</p>
        </div>

      </CardContent>

    </Card>
  );
}