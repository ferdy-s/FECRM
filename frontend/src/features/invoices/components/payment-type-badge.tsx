"use client";

import {
  CreditCard,
  Landmark,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import type {
  PaymentType,
} from "@/types/invoice";

interface Props {

  type: PaymentType;

}

export function PaymentTypeBadge({

  type,

}: Props) {

  switch (type) {

    case "FULL":

      return (

        <Badge
          variant="default"
          className="
            gap-1.5
            whitespace-nowrap
          "
        >

          <CreditCard
            className="
              h-3.5
              w-3.5
            "
          />

          Full Payment

        </Badge>

      );

    case "TERMIN":

      return (

        <Badge
          variant="secondary"
          className="
            gap-1.5
            whitespace-nowrap
          "
        >

          <Landmark
            className="
              h-3.5
              w-3.5
            "
          />

          Termin

        </Badge>

      );

    default:

      return (

        <Badge
          variant="outline"
        >

          Unknown

        </Badge>

      );

  }

}