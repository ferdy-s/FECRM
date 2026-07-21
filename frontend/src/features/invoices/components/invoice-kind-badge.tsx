"use client";

import {
  FileText,
  Layers3,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import type {
  InvoiceKind,
} from "@/types/invoice";

interface Props {

  kind: InvoiceKind;

}

export function InvoiceKindBadge({

  kind,

}: Props) {

  switch (kind) {

    case "MASTER":

      return (

        <Badge
          variant="default"
          className="
            gap-1
            px-2.5
            py-1
          "
        >

          <Layers3
            className="
              h-3.5
              w-3.5
            "
          />

          Master

        </Badge>

      );

    case "TERMIN":

      return (

        <Badge
          variant="secondary"
          className="
            gap-1
            px-2.5
            py-1
          "
        >

          <FileText
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