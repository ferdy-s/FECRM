import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Progress }
from "@/components/ui/progress";

interface Props {
  value: number;
}

export function CollectionProgress({
  value,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6">

        <h3 className="font-semibold mb-4">
          Collection Performance
        </h3>

        <Progress value={value} />

        <p className="mt-3 text-sm">
          {value.toFixed(0)}%
          collected
        </p>

      </CardContent>
    </Card>
  );
}