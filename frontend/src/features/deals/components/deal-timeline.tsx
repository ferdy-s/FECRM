import {
  CheckCircle2,
  Package,
  Wrench,
  Handshake,
  BadgeDollarSign,
  FileText,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { dealTimeline } from "../constants/deal-timeline.mock";

function getIcon(title: string) {
  if (title.includes("Product"))
    return <Package className="h-4 w-4" />;

  if (title.includes("Service"))
    return <Wrench className="h-4 w-4" />;

  if (title.includes("Negotiation"))
    return <Handshake className="h-4 w-4" />;

  if (title.includes("Offer"))
    return (
      <BadgeDollarSign className="h-4 w-4" />
    );

  if (title.includes("Invoice"))
    return <FileText className="h-4 w-4" />;

  return <CheckCircle2 className="h-4 w-4" />;
}

export function DealTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Deal Timeline
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {dealTimeline.map((item) => (
            <div
              key={item.id}
              className="flex gap-4"
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                "
              >
                {getIcon(item.title)}
              </div>

              <div>
                <h4 className="font-medium">
                  {item.title}
                </h4>

                <p
                  className="
                    text-sm
                    text-muted-foreground
                  "
                >
                  {item.description}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-muted-foreground
                  "
                >
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}