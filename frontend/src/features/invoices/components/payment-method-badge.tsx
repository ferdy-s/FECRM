"use client";

import {
  Landmark,
  QrCode,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import type {
  PaymentMethod,
} from "@/types/invoice";

interface Props {

  method: PaymentMethod;

}

export function PaymentMethodBadge({

  method,

}: Props) {

  switch (method) {

    //////////////////////////////////////////////////////
    // MANUAL TRANSFER
    //////////////////////////////////////////////////////

    case "MANUAL_TRANSFER":

      return (

        <Badge
          variant="secondary"
          className="
            inline-flex
            items-center
            gap-1.5
          "
        >

          <Landmark
            className="
              h-3.5
              w-3.5
            "
          />

          Manual Transfer

        </Badge>

      );

    //////////////////////////////////////////////////////
    // QRIS
    //////////////////////////////////////////////////////

    case "QRIS_MIDTRANS":

      return (

        <Badge
          className="
            inline-flex
            items-center
            gap-1.5
            bg-emerald-600
            hover:bg-emerald-600
          "
        >

          <QrCode
            className="
              h-3.5
              w-3.5
            "
          />

          QRIS Midtrans

        </Badge>

      );

    //////////////////////////////////////////////////////
    // DEFAULT
    //////////////////////////////////////////////////////

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