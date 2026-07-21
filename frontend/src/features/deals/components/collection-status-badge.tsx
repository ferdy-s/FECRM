"use client";

import { Badge } from "@/components/ui/badge";

import type {
  CollectionStatus,
} from "@/types/deal";

interface Props {
  status: CollectionStatus;
}

const styles = {

  UNPAID:
    "bg-red-100 text-red-700",

  PARTIAL:
    "bg-orange-100 text-orange-700",

  PAID:
    "bg-green-100 text-green-700",

};

export function CollectionStatusBadge({
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