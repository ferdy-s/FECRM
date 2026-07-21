import {
  Inbox,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Props {
  title?: string;

  description?: string;
}

export function CommunicationEmpty({
  title = "No communication found",
  description = "There is no communication history for this lead.",
}: Props) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-20 text-center">
        <Inbox className="mb-5 h-12 w-12 text-muted-foreground" />

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}