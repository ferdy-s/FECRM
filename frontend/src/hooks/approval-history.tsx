"use client";

import { useMemo, useState } from "react";

import {
  Search,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type {
  Negotiation,
} from "@/types/negotiation";

interface Props {

  data: Negotiation[];

}

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

export function ApprovalHistory({

  data,

}: Props) {

  const [

    keyword,

    setKeyword,

  ] = useState("");

  const [

    tab,

    setTab,

  ] = useState("ALL");

  const filtered =
    useMemo(() => {

      let rows =
        [...data];

      if (

        tab !== "ALL"

      ) {

        rows =
          rows.filter(

            (

              item,

            ) =>

              item.status ===

              tab,

          );

      }

      if (

        keyword.trim()

      ) {

        const search =
          keyword.toLowerCase();

        rows =
          rows.filter(

            (

              item,

            ) => {

              return (

                item.requester.name

                  .toLowerCase()

                  .includes(search) ||

                item.item?.itemName

                  .toLowerCase()

                  .includes(search)

              );

            },

          );

      }

      return rows;

    }, [

      data,

      keyword,

      tab,

    ]);

  return (

    <Card>

      <CardHeader>

        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          <div>

            <CardTitle>

              Negotiation History

            </CardTitle>

            <CardDescription>

              Review approved and rejected negotiations.

            </CardDescription>

          </div>

          <div
            className="
              flex
              flex-col
              gap-3
              lg:flex-row
            "
          >

            <Tabs

              value={tab}

              onValueChange={
                setTab
              }

            >

              <TabsList>

                <TabsTrigger value="ALL">

                  All

                </TabsTrigger>

                <TabsTrigger value="APPROVED">

                  Approved

                </TabsTrigger>

                <TabsTrigger value="REJECTED">

                  Rejected

                </TabsTrigger>

              </TabsList>

            </Tabs>

            <div
              className="
                relative
                w-72
              "
            >

              <Search
                className="
                  absolute
                  left-3
                  top-3
                  h-4
                  w-4
                  text-muted-foreground
                "
              />

              <Input

                placeholder="Search..."

                className="pl-9"

                value={keyword}

                onChange={(e) =>

                  setKeyword(

                    e.target.value,

                  )

                }

              />

            </div>

          </div>

        </div>

      </CardHeader>

      <CardContent>

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>

                Sales

              </TableHead>

              <TableHead>

                Item

              </TableHead>

              <TableHead>

                Old Price

              </TableHead>

              <TableHead>

                Final Price

              </TableHead>

              <TableHead>

                Status

              </TableHead>

              <TableHead>

                Reviewed

              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {filtered.length === 0 ? (

              <TableRow>

                <TableCell

                  colSpan={6}

                  className="
                    h-40
                    text-center
                    text-muted-foreground
                  "

                >

                  No negotiation history.

                </TableCell>

              </TableRow>

            ) : (

              filtered.map(

                (

                  item,

                ) => (

                  <TableRow

                    key={item.id}

                  >

                    <TableCell>

                      <div>

                        <div className="font-medium">

                          {

                            item.requester.name

                          }

                        </div>

                        <div
                          className="
                            text-xs
                            text-muted-foreground
                          "
                        >

                          {

                            item.requester.email

                          }

                        </div>

                      </div>

                    </TableCell>

                    <TableCell>

                      {

                        item.item?.itemName

                      }

                    </TableCell>

                    <TableCell>

                      {

                        currency(

                          Number(

                            item.oldAmount,

                          ),

                        )

                      }

                    </TableCell>

                    <TableCell>

                      {

                        currency(

                          Number(

                            item.approvedAmount ??

                            item.requestedAmount,

                          ),

                        )

                      }

                    </TableCell>

                    <TableCell>

                      {item.status ===
                      "APPROVED" ? (

                        <Badge
                          className="
                            gap-1
                          "
                        >

                          <CheckCircle2 className="h-3 w-3" />

                          Approved

                        </Badge>

                      ) : (

                        <Badge

                          variant="destructive"

                          className="gap-1"

                        >

                          <XCircle className="h-3 w-3" />

                          Rejected

                        </Badge>

                      )}

                    </TableCell>

                    <TableCell>

                      {item.reviewedAt

                        ? new Date(

                            item.reviewedAt,

                          ).toLocaleString(

                            "id-ID",

                          )

                        : "-"}

                    </TableCell>

                  </TableRow>

                ),

              )

            )}

          </TableBody>

        </Table>

      </CardContent>

    </Card>

  );

}