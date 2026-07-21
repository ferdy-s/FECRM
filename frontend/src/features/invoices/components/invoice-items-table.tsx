"use client";

import {
  Package,
  Wrench,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type {
  InvoiceItem,
} from "@/types/invoice";

interface Props {

  items?: InvoiceItem[];

}

function formatCurrency(
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

function calculateGrandTotal(
  items: InvoiceItem[],
) {

  return items.reduce(

    (
      total,
      item,
    ) =>

      total +
    Number(
  item.totalPrice ?? 0,
),

    0,

  );

}

interface ItemTypeBadgeProps {

  type:
    | "PRODUCT"
    | "SERVICE";

}

function ItemTypeBadge({

  type,

}: ItemTypeBadgeProps) {

  if (
    type === "PRODUCT"
  ) {

    return (

<Badge
  variant="secondary"
  className="
  gap-1
    "
      >

        <Package
          className="
            h-3
            w-3
          "
        />

        Product

      </Badge>

    );

  }

  return (

    <Badge
      className="
        gap-1
      "
    >

      <Wrench
        className="
          h-3
          w-3
        "
      />

      Service

    </Badge>

  );

}

export function InvoiceItemsTable({
  items = [],
}: Props) {

  const grandTotal =
    calculateGrandTotal(
      items,
    );

  return (

    <Card className="border-border/60 shadow-sm">

      <CardHeader
        className="
          flex
          flex-col
          gap-4

          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div>

          <CardTitle>

            Invoice Items

          </CardTitle>

         <CardDescription>

  Daftar seluruh product maupun service
  yang termasuk dalam invoice ini.

        </CardDescription>

        </div>

        <Badge
          variant="outline"
          className="
            w-fit
            rounded-full
          "
        >

          Total Item

          {" "}

          {items.length}

        </Badge>

      </CardHeader>

      <CardContent>

        {items.length === 0 ? (

          <div
            className="
              flex
              h-48
              items-center
              justify-center
              rounded-xl
              border
              border-dashed
              text-sm
              text-muted-foreground
            "
          >

            Belum terdapat item
            pada invoice ini.

          </div>

        ) : (

          <div
            className="
              overflow-x-auto
              rounded-xl
              border
            "
          >

            <Table>

              <TableHeader>

                <TableRow>

                  <TableHead
                    className="
                      w-[70px]
                    "
                  >

                    No

                  </TableHead>

                  <TableHead>

                    Item

                  </TableHead>

                  <TableHead>

                    Type

                  </TableHead>

                  <TableHead
                    className="
                      text-center
                    "
                  >

                    Qty

                  </TableHead>

                  <TableHead
                    className="
                      text-right
                    "
                  >

                    Unit Price

                  </TableHead>

                  <TableHead
                    className="
                      text-right
                    "
                  >

                    Total

                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>

{/* TABLE BODY */}

                {items.map(

                  (
                    item,
                    index,
                  ) => (

                    <TableRow
                      key={item.id}
                    >

                      <TableCell
                        className="
                          font-medium
                        "
                      >

                        {index + 1}

                      </TableCell>

                      <TableCell>

                        <div
                          className="
                            flex
                            flex-col
                          "
                        >

                          <span
                            className="
                              font-medium
                            "
                          >

                            {item.itemName}

                          </span>

                          <span
                            className="
                              text-xs
                              text-muted-foreground
                            "
                          >

                            ID :
                            {" "}
                            {item.id}

                          </span>

                        </div>

                      </TableCell>

                      <TableCell>

                        <ItemTypeBadge
                          type={
                            item.itemType
                          }
                        />

                      </TableCell>

                      <TableCell
                        className="
                          text-center
                          font-medium
                        "
                      >

                        {item.quantity}

                      </TableCell>

                      <TableCell
                        className="
                          text-right
                          font-medium
                        "
                      >

                        {formatCurrency(
                          Number(
                            item.unitPrice,
                          ),
                        )}

                      </TableCell>

                      <TableCell
                        className="
                          text-right
                          font-semibold
                        "
                      >

                        {formatCurrency(
                          Number(
                            item.totalPrice,
                          ),
                        )}

                      </TableCell>

                    </TableRow>

                  ),

                )}

              </TableBody>

            </Table>

          </div>

        )}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-4

            border-t
            pt-6

            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          <div>

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >

              Total Invoice Items

            </p>

            <p
              className="
                mt-1
                text-lg
                font-semibold
              "
            >

              {items.length}
              {" "}
              Item

            </p>

          </div>

          <div
            className="
              text-left

              md:text-right
            "
          >

            <p
              className="
                text-sm
                text-muted-foreground
              "
            >

              Grand Total

            </p>

            <p
              className="
                mt-1
                text-2xl
                font-bold
                tracking-tight
              "
            >

              {formatCurrency(
                grandTotal,
              )}

            </p>

          </div>

        </div>

      </CardContent>

    </Card>

  );

}