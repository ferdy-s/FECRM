import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductKPISkeletonProps {
  count?: number;
}

export function ProductKPISkeleton({
  count = 3,
}: ProductKPISkeletonProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <Skeleton className="h-4 w-28" />

            <Skeleton className="h-10 w-10 rounded-lg" />
          </CardHeader>

          <CardContent className="space-y-3">
            <Skeleton className="h-8 w-24" />

            <Skeleton className="h-4 w-40" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}