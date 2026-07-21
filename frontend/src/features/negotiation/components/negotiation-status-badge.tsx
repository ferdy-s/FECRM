"use client";

import {
  Badge,
} from "@/components/ui/badge";

import type {
  NegotiationStatus,
} from "@/types/negotiation";

interface Props {

  status: NegotiationStatus;

}

export function NegotiationStatusBadge({

  status,

}: Props) {

  switch (status) {

    case "PENDING":

      return (

        <Badge
          variant="secondary"
        >

          Pending

        </Badge>

      );

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

      return null;

  }

}