"use client";

import {

  useMemo,

  useState,

} from "react";

import {

  Eye,

  Search,

  ChevronLeft,

  ChevronRight,

} from "lucide-react";

import {

  Card,

  CardContent,

  CardDescription,

  CardHeader,

  CardTitle,

} from "@/components/ui/card";

import {

  Button,

} from "@/components/ui/button";

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

  Negotiation,

} from "@/types/negotiation";

import {

  NegotiationDetailSheet,

} from "./negotiation-detail-sheet";

import {

  NegotiationStatusBadge,

} from "./negotiation-status-badge";

interface Props {

  negotiations: Negotiation[];

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

export function NegotiationHistoryTable({

  negotiations,

}: Props) {

  //////////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////////

  const [

    keyword,

    setKeyword,

  ] = useState("");

  //////////////////////////////////////////////////////
  // FILTER STATUS
  //////////////////////////////////////////////////////

  const [

    status,

    setStatus,

  ] = useState<

    "ALL"

    | "APPROVED"

    | "REJECTED"

  >("ALL");

  //////////////////////////////////////////////////////
  // DETAIL
  //////////////////////////////////////////////////////

  const [

    selected,

    setSelected,

  ] = useState<

    Negotiation | null

  >(null);

  const [

    openDetail,

    setOpenDetail,

  ] = useState(false);

  //////////////////////////////////////////////////////
  // PAGINATION
  //////////////////////////////////////////////////////

  const [

    page,

    setPage,

  ] = useState(1);

  const [

    pageSize,

    setPageSize,

  ] = useState(10);

  //////////////////////////////////////////////////////
  // RESET PAGE
  //////////////////////////////////////////////////////

  //////////////////////////////////////////////////////
  // COUNTER
  //////////////////////////////////////////////////////

  const totalCount =

    negotiations.length;

  const approvedCount =

    negotiations.filter(

      (

        item,

      ) =>

        item.status ===

        "APPROVED",

    ).length;

  const rejectedCount =

    negotiations.filter(

      (

        item,

      ) =>

        item.status ===

        "REJECTED",

    ).length;

  //////////////////////////////////////////////////////
  // FILTER DATA
  //////////////////////////////////////////////////////

  const filteredNegotiations =

    useMemo(() => {

      let rows = [

        ...negotiations,

      ];

      if (

        status !== "ALL"

      ) {

        rows = rows.filter(

          (

            item,

          ) =>

            item.status ===

            status,

        );

      }

      if (

        keyword.trim()

      ) {

        const search =

          keyword.toLowerCase();

        rows = rows.filter(

          (

            item,

          ) =>

            item.requester.name
              .toLowerCase()
              .includes(search)

            ||

            item.requester.email
              .toLowerCase()
              .includes(search)

            ||

           (item.item?.itemName ?? "")
  .toLowerCase()
  .includes(search)

        );

      }

      rows.sort(

        (

          a,

          b,

        ) =>

          new Date(

            b.reviewedAt ??

            b.createdAt,

          ).getTime()

          -

          new Date(

            a.reviewedAt ??

            a.createdAt,

          ).getTime(),

      );

      return rows;

    }, [

      negotiations,

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

        filteredNegotiations.length /

        pageSize,

      ),

    );

  const paginatedNegotiations =

    filteredNegotiations.slice(

      (

        page - 1

      ) * pageSize,

      page * pageSize,

    );

  //////////////////////////////////////////////////////
  // JSX
  //////////////////////////////////////////////////////

  return (

    <>

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

            Review approved and rejected
            negotiation requests.

          </CardDescription>

        </div>

        <div
          className="
            relative
            w-full
            lg:w-80
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
  value={keyword}
  onChange={(e) => {

    setKeyword(e.target.value);

    setPage(1);

  }}

            placeholder="Search negotiation..."

            className="pl-9"

          />

        </div>

      </div>

      <Tabs

  value={status}

  onValueChange={(value) => {

    setStatus(

      value as
        | "ALL"
        | "APPROVED"
        | "REJECTED",

    );

    setPage(1);

  }}

>

        <TabsList>

          <TabsTrigger value="ALL">

            All ({totalCount})

          </TabsTrigger>

          <TabsTrigger value="APPROVED">

            Approved ({approvedCount})

          </TabsTrigger>

          <TabsTrigger value="REJECTED">

            Rejected ({rejectedCount})

          </TabsTrigger>

        </TabsList>

      </Tabs>

    </CardHeader>

    <CardContent>

      <div
        className="
          overflow-hidden
          rounded-xl
          border
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

                <TableHead>

                  Sales

                </TableHead>

                <TableHead>

                  Item

                </TableHead>

                <TableHead>

                  Qty

                </TableHead>

                <TableHead className="text-right">

                  Current

                </TableHead>

                <TableHead className="text-right">

                  Final

                </TableHead>

                <TableHead className="text-right">

                  Discount

                </TableHead>

                <TableHead>

                  Status

                </TableHead>

                <TableHead>

                  Reviewed

                </TableHead>

                <TableHead className="text-right">

                  Action

                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {paginatedNegotiations.length === 0 ? (

                <TableRow>

                  <TableCell

                    colSpan={9}

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
                        gap-3
                      "
                    >

                      <Search
                        className="
                          h-10
                          w-10
                          text-muted-foreground
                        "
                      />

                      <div>

                        <p className="font-semibold">

                          No negotiation history

                        </p>

                        <p
                          className="
                            text-sm
                            text-muted-foreground
                          "
                        >

                          No approved or rejected
                          negotiation requests found.

                        </p>

                      </div>

                    </div>

                  </TableCell>

                </TableRow>

              ) : (

                 paginatedNegotiations.map(

  (

    negotiation: Negotiation,

  ) => {

    const currentPrice =

      Number(
        negotiation.oldAmount,
      );

    const finalPrice =

      Number(

        negotiation.approvedAmount??

        negotiation.requestedAmount,

      );

    const discount =

      currentPrice -

      finalPrice;

    return (

      <TableRow
        key={negotiation.id}
      >

        {/* SALES */}

        <TableCell>

          <div>

            <div
              className="
                font-medium
              "
            >

              {negotiation.requester.name}

            </div>

            <div
              className="
                text-xs
                text-muted-foreground
              "
            >

              {negotiation.requester.email}

            </div>

          </div>

        </TableCell>

        {/* ITEM */}

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

     {negotiation.item?.itemName ?? "TOTAL NEGOTIATION"}

    </p>

    <p
      className="
        text-sm
        text-muted-foreground
      "
    >

     {
  negotiation.scope === "TOTAL"
    ? "Entire Deal"
    : negotiation.item?.deal?.lead?.company ?? "-"
}

    </p>

  </div>

</TableCell>

        {/* QTY */}

        <TableCell>

         {
    negotiation.item
        ? negotiation.item.quantity
        : "-"
}
        </TableCell>

        {/* CURRENT */}

        <TableCell
          className="
            text-right
          "
        >

          {currency(
            currentPrice,
          )}

        </TableCell>

        {/* FINAL */}

        <TableCell
          className="
            text-right
          "
        >

          {currency(
            finalPrice,
          )}

        </TableCell>

        {/* DISCOUNT */}

        <TableCell
          className="
            text-right
            font-medium
            text-orange-600
          "
        >

          {currency(
            discount,
          )}

        </TableCell>

        {/* STATUS */}

        <TableCell>

          <NegotiationStatusBadge

            status={
              negotiation.status
            }

          />

        </TableCell>

        {/* REVIEWED */}

        <TableCell>

          {negotiation.reviewedAt

            ? new Date(

                negotiation.reviewedAt,

              ).toLocaleDateString(

                "id-ID",

              )

            : "-"}

        </TableCell>

        {/* ACTION */}

        <TableCell
          className="
            text-right
          "
        >

          <Button

            variant="ghost"

            size="icon"

            onClick={() => {

              setSelected(
                negotiation,
              );

              setOpenDetail(
                true,
              );

            }}

          >

            <Eye
              className="
                h-4
                w-4
              "
            />

          </Button>

        </TableCell>

      </TableRow>

    );

  },

)

                          )}

            </TableBody>

          </Table>

        </div>

      </div>

      {/* ============================================== */}
      {/* Pagination */}
      {/* ============================================== */}

      <div
        className="
          mt-6
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

        <div
          className="
            text-sm
            text-muted-foreground
          "
        >

          Showing{" "}

          <strong>

            {filteredNegotiations.length === 0
              ? 0
              : (page - 1) * pageSize + 1}

          </strong>

          -

          <strong>

            {Math.min(
              page * pageSize,
              filteredNegotiations.length,
            )}

          </strong>

          {" "}of{" "}

          <strong>

            {filteredNegotiations.length}

          </strong>

        </div>

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <select

            value={pageSize}

            onChange={(e) => {

              setPageSize(
                Number(
                  e.target.value,
                ),
              );

              setPage(1);

            }}

            className="
              rounded-md
              border
              bg-background
              px-3
              py-2
              text-sm
            "

          >

            <option value={10}>10</option>

            <option value={25}>25</option>

            <option value={50}>50</option>

          </select>

          <Button

            variant="outline"

            size="icon"

            disabled={page === 1}

            onClick={() =>

              setPage(

                page - 1,

              )

            }

          >

            <ChevronLeft className="h-4 w-4" />

          </Button>

          <span
            className="
              min-w-24
              text-center
              text-sm
              font-medium
            "
          >

            Page {page} / {totalPages}

          </span>

          <Button

            variant="outline"

            size="icon"

            disabled={
              page >= totalPages
            }

            onClick={() =>

              setPage(

                page + 1,

              )

            }

          >

            <ChevronRight className="h-4 w-4" />

          </Button>

        </div>

      </div>

        </CardContent>

  </Card>

  {selected ? (

    <NegotiationDetailSheet

      negotiation={selected}

      open={openDetail}

      onOpenChange={setOpenDetail}

    />

  ) : null}

</>

  );

}