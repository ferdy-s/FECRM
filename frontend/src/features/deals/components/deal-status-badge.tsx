"use client";

import { Badge } from "@/components/ui/badge";

import type {
  DealStatus,
} from "@/types/deal";

interface Props {
  status: DealStatus;
}

const styles: Record<
  DealStatus,
  string
> = {
  OPEN:
    "bg-blue-100 text-blue-700",

  NEGOTIATION:
    "bg-orange-100 text-orange-700",

  WON:
    "bg-green-100 text-green-700",

  LOST:
    "bg-red-100 text-red-700",
};

export function DealStatusBadge({
  status,
}: Props) {

  return (

    <Badge
      className={
        styles[status]
      }
    >
      {status}
    </Badge>

  );

}