import { Badge }
from "@/components/ui/badge";

import {
  NegotiationStatus,
} from "../types/negotiation.type";

interface Props {
  status: NegotiationStatus;
}

export function NegotiationStatusBadge({
  status,
}: Props) {
  switch (status) {
    case "APPROVED":
      return (
        <Badge
          className="
            bg-green-600
            text-white
          "
        >
          Approved
        </Badge>
      );

    case "REJECTED":
      return (
        <Badge
          variant="destructive"
        >
          Rejected
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary">
          Pending
        </Badge>
      );
  }
}