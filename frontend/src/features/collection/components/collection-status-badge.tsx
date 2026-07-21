import { Badge } from "@/components/ui/badge";

import type {
  CollectionStatus,
} from "../types/collection";

interface Props {
  status: CollectionStatus;
}

export function CollectionStatusBadge({
  status,
}: Props) {

  switch (status) {

    case "PARTIAL":
      return (
        <Badge variant="secondary">
          PARTIAL
        </Badge>
      );

    case "OVERDUE":
      return (
        <Badge variant="destructive">
          OVERDUE
        </Badge>
      );

    case "UNPAID":
    default:
      return (
        <Badge variant="outline">
          UNPAID
        </Badge>
      );
  }
}