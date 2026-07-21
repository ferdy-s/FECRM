import { Building2 } from "lucide-react";

export function CompanyHeader() {
  return (
    <div className="flex items-center gap-3">

      <Building2 className="h-8 w-8" />

      <div>
        <h1 className="text-3xl font-bold">
          Company Profile
        </h1>

        <p className="text-muted-foreground">
          Enterprise Company Configuration
        </p>
      </div>

    </div>
  );
}