"use client";

import type {
    ColumnDef,
    CellContext,
} from "@tanstack/react-table";

import {
  Eye,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import type {
  Negotiation,
} from "@/types/negotiation";

function currency(
  value: number,
) {

  return new Intl.NumberFormat(

    "id-ID",

    {

      style: "currency",

      currency: "IDR",

      maximumFractionDigits: 0,

    },

  ).format(value);

}

interface ColumnProps {

  onView: (
    negotiation: Negotiation,
  ) => void;

}

export function negotiationHistoryColumns({

  onView,

}: ColumnProps): ColumnDef<Negotiation>[] {

  return [

    ////////////////////////////////////////////////////////////
    // SALES
    ////////////////////////////////////////////////////////////

    {

      accessorKey: "requester",

      header: "Sales",

      cell: ({ row }) => {

        const negotiation =
          row.original;

        return (

          <div>

            <div className="font-medium">

              {

                negotiation.requester.name

              }

            </div>

            <div
              className="
                text-xs
                text-muted-foreground
              "
            >

              {

                negotiation.requester.email

              }

            </div>

          </div>

        );

      },

    },

    ////////////////////////////////////////////////////////////
    // ITEM
    ////////////////////////////////////////////////////////////

    {

      accessorKey: "item",

      header: "Item",

      cell: ({ row }) => {

        const item = row.original.item;

if (!item) {
  return (
    <span className="text-muted-foreground">
      Total Negotiation
    </span>
  );
}

return (
  <div>
    <div className="font-medium">
      {item.itemName}
    </div>

    <div className="text-xs text-muted-foreground">
      Qty : {item.quantity}
    </div>
  </div>
);

      },

    },

    ////////////////////////////////////////////////////////////
    // OLD PRICE
    ////////////////////////////////////////////////////////////

    {

      accessorKey: "oldAmount",

      header: "Current",

      cell: ({ row }) =>

        currency(

          Number(

            row.original.oldAmount,

          ),

        ),

    },

    ////////////////////////////////////////////////////////////
    // FINAL PRICE
    ////////////////////////////////////////////////////////////

    {

      accessorKey: "approvedAmount",

      header: "Final",

      cell: ({ row }) => {

        const negotiation =
          row.original;

        return currency(

          Number(

           negotiation.approvedAmount ??
negotiation.requestedAmount

          ),

        );

      },

    },

    ////////////////////////////////////////////////////////////
    // DISCOUNT
    ////////////////////////////////////////////////////////////

    {

      id: "discount",

      header: "Discount",

      cell: ({ row }) => {

        const negotiation =
          row.original;

        const discount =

          Number(

            negotiation.oldAmount,

          ) -

          Number(

            negotiation.requestedAmount,

          );

        return (

          <span
            className="
              font-medium
              text-orange-600
            "
          >

            {

              currency(

                discount,

              )

            }

          </span>

        );

      },

    },

    ////////////////////////////////////////////////////////////
    // STATUS
    ////////////////////////////////////////////////////////////

    {

      accessorKey: "status",

      header: "Status",

      cell: ({ row }) => {

        const status =
          row.original.status;

        return status ===
          "APPROVED" ? (

          <Badge>

            Approved

          </Badge>

        ) : (

          <Badge
            variant="destructive"
          >

            Rejected

          </Badge>

        );

      },

    },

    ////////////////////////////////////////////////////////////
    // REVIEWED
    ////////////////////////////////////////////////////////////

    {

      accessorKey: "reviewedAt",

      header: "Reviewed",

      cell: ({ row }) => {

        const reviewed =
          row.original.reviewedAt;

        if (!reviewed) {

          return "-";

        }

        return new Date(

          reviewed,

        ).toLocaleString(

          "id-ID",

        );

      },

    },

    ////////////////////////////////////////////////////////////
    // ACTION
    ////////////////////////////////////////////////////////////

    {

      id: "action",

      header: "",

      enableSorting: false,

      cell: ({ row }) => (

        <Button

          size="icon"

          variant="ghost"

          onClick={() =>

            onView(

              row.original,

            )

          }

        >

          <Eye className="h-4 w-4" />

        </Button>

      ),

    },

  ];

}