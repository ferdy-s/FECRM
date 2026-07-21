import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Skeleton,
} from "@/components/ui/skeleton";

interface Props {
  rows?: number;
}

export function CommunicationLoading({
  rows = 8,
}: Props) {
  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        {Array.from({
          length: rows,
        }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4"
          >
            <Skeleton className="h-10 w-10 rounded-full" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />

              <Skeleton className="h-4 w-full" />
            </div>

            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}