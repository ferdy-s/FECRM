"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

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
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type {
  Deal,
} from "@/types/deal";

import {
  DealStatusBadge,
} from "./deal-status-badge";

import {
  CollectionStatusBadge,
} from "./collection-status-badge";

interface Props {

  deals: Deal[];

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

function formatDate(
  value: string,
) {

  return new Date(value).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

}

export function DealTable({

  deals,

}: Props) {

  //////////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////////

  const [

    keyword,

    setKeyword,

  ] = useState("");

  //////////////////////////////////////////////////////
  // STATUS FILTER
  //////////////////////////////////////////////////////

  const [

    status,

    setStatus,

  ] = useState("ALL");

  //////////////////////////////////////////////////////
  // PAGINATION
  //////////////////////////////////////////////////////

  const pageSize = 10;

  const [

    page,

    setPage,

  ] = useState(1);

  //////////////////////////////////////////////////////
  // FILTER
  //////////////////////////////////////////////////////

  const filteredDeals =
    useMemo(() => {

      return deals.filter((deal) => {

        const matchesKeyword =

          deal.lead?.company
            ?.toLowerCase()
            .includes(
              keyword.toLowerCase(),
            )

          ||

          deal.lead?.name
            ?.toLowerCase()
            .includes(
              keyword.toLowerCase(),
            )

          ||

          deal.assignee?.name
            ?.toLowerCase()
            .includes(
              keyword.toLowerCase(),
            );

        const matchesStatus =

          status === "ALL"

          ||

          deal.status === status;

        return (

          matchesKeyword

          &&

          matchesStatus

        );

      });

    }, [

      deals,

      keyword,

      status,

    ]);

  //////////////////////////////////////////////////////
  // PAGINATION
  //////////////////////////////////////////////////////

  const totalPages =
    Math.max(

      1,

      Math.ceil(

        filteredDeals.length /

        pageSize,

      ),

    );

  const paginatedDeals =
    filteredDeals.slice(

      (page - 1) * pageSize,

      page * pageSize,

    );

  //////////////////////////////////////////////////////
  // EMPTY
  //////////////////////////////////////////////////////

  if (
    deals.length === 0
  ) {

    return (

      <Card>

        <CardContent
          className="
            flex
            h-56
            items-center
            justify-center
          "
        >

          No deals found.

        </CardContent>

      </Card>

    );

  }

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  return (

    <>
  <Card>

    <CardHeader
      className="
        space-y-6
      "
    >

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-start
          lg:justify-between
        "
      >

        <div>

          <CardTitle
            className="
              text-2xl
              font-semibold
              tracking-tight
            "
          >

            Deal Management

          </CardTitle>

          <CardDescription
            className="
              mt-1
            "
          >

            Monitor every active deal, pipeline value,
            sales owner, and collection status across
            your organization.

          </CardDescription>

        </div>

      </div>

      {/* ====================================================== */}
      {/* TOOLBAR */}
      {/* ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >

        {/* SEARCH */}

        <div
          className="
            relative
            w-full
            xl:max-w-md
          "
        >

          <Search
            className="
              absolute
              left-3
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input

            value={keyword}

            placeholder="
              Search company, PIC or sales...
            "

            className="
              pl-10
            "

            onChange={(e) => {

              setKeyword(
                e.target.value,
              );

              setPage(1);

            }}

          />

        </div>

        {/* STATUS */}

        <Tabs

          value={status}

          onValueChange={(value) => {

            setStatus(value);

            setPage(1);

          }}

        >

          <TabsList>

            <TabsTrigger
              value="ALL"
            >

              All

            </TabsTrigger>

            <TabsTrigger
              value="OPEN"
            >

              Open

            </TabsTrigger>

            <TabsTrigger
              value="NEGOTIATION"
            >

              Negotiation

            </TabsTrigger>

            <TabsTrigger
              value="WON"
            >

              Won

            </TabsTrigger>

            <TabsTrigger
              value="LOST"
            >

              Lost

            </TabsTrigger>

          </TabsList>

        </Tabs>

      </div>

    </CardHeader>

    <CardContent
      className="
        space-y-6
      "
    >

      <div
        className="
          rounded-xl
          border
          bg-background
        "
      >

        <div
          className="
            overflow-x-auto
          "
        >

         <Table>

  <TableHeader>

    <TableRow>

      <TableHead className="min-w-[260px]">
        Company
      </TableHead>

      <TableHead className="min-w-[180px]">
        PIC
      </TableHead>

      <TableHead className="min-w-[160px] text-right">
        Pipeline
      </TableHead>

      <TableHead className="min-w-[160px]">
        Deal Status
      </TableHead>

      <TableHead className="min-w-[170px]">
        Collection
      </TableHead>

      <TableHead className="min-w-[140px]">
        Created
      </TableHead>

      <TableHead
        className="
          w-[80px]
          text-right
        "
      >
        Action
      </TableHead>

    </TableRow>

  </TableHeader>

  <TableBody>

    {

      paginatedDeals.length === 0 ? (

        <TableRow>

          <TableCell

            colSpan={8}

            className="
              h-56
              text-center
            "

          >

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-2
              "
            >

              <p
                className="
                  text-lg
                  font-medium
                "
              >

                No deals found

              </p>

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >

                Try changing your search
                keyword or status filter.

              </p>

            </div>

          </TableCell>

        </TableRow>

      ) : (

        paginatedDeals.map((deal) => (

          <TableRow

            key={deal.id}

            className="
              hover:bg-muted/40
              transition-colors
            "

          >

            {/* COMPANY */}

            <TableCell>

              <div
                className="
                  space-y-1
                "
              >

                <p
                  className="
                    font-medium
                  "
                >

                  {

                    deal.lead?.company

                    ??

                    "-"

                  }

                </p>

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >

                  Deal ID

                  {" • "}

                  {deal.id.slice(0, 8)}

                </p>

              </div>

            </TableCell>

            {/* PIC */}

            <TableCell>

              <div
                className="
                  space-y-1
                "
              >

                <p>

                  {

                    deal.lead?.name

                    ??

                    "-"

                  }

                </p>

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >

                  {

                    deal.lead?.email

                    ??

                    "-"

                  }

                </p>

              </div>

            </TableCell>

            {/* PIPELINE */}

            <TableCell
              className="
                text-right
              "
            >

              <div
                className="
                  space-y-1
                "
              >

                <p
                  className="
                    font-medium
                  "
                >

                  {

                    formatCurrency(

                      Number(

                        deal.value,

                      ),

                    )

                  }

                </p>

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >

                  {

                    deal.items?.length

                    ??

                    0

                  }

                  {" "}Item(s)

                </p>

              </div>

            </TableCell>

            {/* STATUS */}

            <TableCell>

              <DealStatusBadge

                status={deal.status}

              />

            </TableCell>

            {/* COLLECTION */}

            <TableCell>

              <div
                className="
                  space-y-2
                "
              >

                <CollectionStatusBadge

                  status={

                    deal.collectionStatus

                  }

                />

                <p
                  className="
                    text-xs
                    text-muted-foreground
                  "
                >

                  {

                    deal.invoices?.length

                    ??

                    0

                  }

                  {" "}Invoice(s)

                </p>

              </div>

            </TableCell>

            {/* CREATED */}

            <TableCell>

              {

                formatDate(

                  deal.createdAt,

                )

              }

            </TableCell>

            {/* ACTION */}

            <TableCell
              className="
                text-right
              "
            >

              <Button

                asChild

                size="icon"

                variant="ghost"

              >

                <Link
                  href={`/deals/${deal.id}`}
                >

                  <Eye
                    className="
                      h-4
                      w-4
                    "
                  />

                </Link>

              </Button>

            </TableCell>

          </TableRow>

        ))

      )

    }

  </TableBody>

</Table>

        </div>

      </div>

            {/* ====================================================== */}
      {/* FOOTER */}
      {/* ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          border-t
          pt-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* RESULT */}

        <div
          className="
            text-sm
            text-muted-foreground
          "
        >

          Showing{" "}

          <span
            className="
              font-medium
            "
          >

            {

              filteredDeals.length === 0

                ? 0

                : (page - 1) * pageSize + 1

            }

          </span>

          {" - "}

          <span
            className="
              font-medium
            "
          >

            {

              Math.min(

                page * pageSize,

                filteredDeals.length,

              )

            }

          </span>

          {" of "}

          <span
            className="
              font-medium
            "
          >

            {filteredDeals.length}

          </span>

          {" "}deal(s)

        </div>

        {/* PAGINATION */}

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <Button

            variant="outline"

            size="sm"

            disabled={

              page === 1

            }

            onClick={() =>

              setPage(

                (previous) =>

                  previous - 1,

              )

            }

          >

            <ChevronLeft
              className="
                mr-2
                h-4
                w-4
              "
            />

            Previous

          </Button>

          <div
            className="
              rounded-md
              border
              px-4
              py-2
              text-sm
              font-medium
            "
          >

            Page {page} of {totalPages}

          </div>

          <Button

            variant="outline"

            size="sm"

            disabled={

              page >= totalPages

            }

            onClick={() =>

              setPage(

                (previous) =>

                  previous + 1,

              )

            }

          >

            Next

            <ChevronRight
              className="
                ml-2
                h-4
                w-4
              "
            />

          </Button>

        </div>

      </div>

    </CardContent>

  </Card>

</>

  );

}