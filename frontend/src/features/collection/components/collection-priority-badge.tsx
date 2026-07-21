import { Badge } from "@/components/ui/badge";

import type {
  CollectionPriority,
} from "../types/collection";

interface Props {
  priority: CollectionPriority;
}

export function CollectionPriorityBadge({
  priority,
}: Props) {

  switch (priority) {

    case "CRITICAL":
      return (
        <Badge variant="destructive">
          CRITICAL
        </Badge>
      );

    case "HIGH":
      return (
        <Badge className="bg-orange-500 hover:bg-orange-600">
          HIGH
        </Badge>
      );

    case "MEDIUM":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black">
          MEDIUM
        </Badge>
      );

    case "LOW":
    default:
      return (
        <Badge
          variant="secondary"
        >
          LOW
        </Badge>
      );
  }
}