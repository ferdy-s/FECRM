import {
  FileText,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  amount: number;
  dueDate: string;
  invoiceType: string;
}

function currency(
  value: number
) {
  return new Intl.NumberFormat(
    "id-ID",
    {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

export function InvoicePreviewCard({
  amount,
  dueDate,
  invoiceType,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="
            flex
            items-center
            gap-2
          "
        >
          <FileText
            className="
              h-4
              w-4
            "
          />

          Invoice Preview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Invoice Type
          </p>

          <p className="font-medium">
            {invoiceType}
          </p>
        </div>

        <div>
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Amount
          </p>

          <h3
            className="
              text-2xl
              font-bold
            "
          >
            {currency(amount)}
          </h3>
        </div>

        <div>
          <p
            className="
              text-sm
              text-muted-foreground
            "
          >
            Due Date
          </p>

          <p>{dueDate}</p>
        </div>
      </CardContent>
    </Card>
  );
}