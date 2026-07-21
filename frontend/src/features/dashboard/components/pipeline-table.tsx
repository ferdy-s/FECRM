"use client";

import { useState } from "react";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";

import {
  Eye,
  RefreshCw,
} from "lucide-react";

import { useLeads } from "@/hooks/use-leads";

import type {
  Lead,
} from "@/types/lead";

function stageClass(
  status: string
) {
  switch (status) {

    case "NEW":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "CONTACTED":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";

    case "NEGOTIATION":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "WON":
      return "bg-green-50 text-green-700 border-green-200";

    case "LOST":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-muted";
  }
}

export function PipelineTable() {

  const {

    data: pipelineLeads = [],

    isLoading,

    isError,

    refetch,

  } = useLeads();

  const ITEMS_PER_PAGE = 5;

const [page, setPage] = useState(1);

const totalPages = Math.max(
  1,
  Math.ceil(
    pipelineLeads.length /
      ITEMS_PER_PAGE
  )
);

const paginatedLeads =
  pipelineLeads.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {

    return (

      <Card>

        <CardContent className="py-10">

          <p className="text-center text-muted-foreground">

            Loading pipeline...

          </p>

        </CardContent>

      </Card>

    );

  }

  if (isError) {

    return (

      <Card>

        <CardContent className="py-10">

          <div className="flex flex-col items-center gap-4">

            <p className="text-destructive">

              Failed to load pipeline.

            </p>

            <Button
              variant="outline"
              onClick={() => void refetch()}
            >
              <RefreshCw className="mr-2 h-4 w-4" />

              Retry

            </Button>

          </div>

        </CardContent>

      </Card>

    );

  }

  return (

    <Card className="h-full">

    <CardHeader
  className="
    flex
    flex-col
    gap-5
    border-b
    pb-5
    md:flex-row
    md:items-center
    md:justify-between
  "
>

  <div className="space-y-1">

    <CardTitle
      className="
        text-2xl
        font-bold
        tracking-tight
      "
    >
      Pipeline Leads
    </CardTitle>

    <CardDescription>

      Monitor active marketing leads.

    </CardDescription>

  </div>

  <Badge
    variant="secondary"
    className="
      w-fit
      rounded-full
      px-4
      py-1
      text-sm
      font-medium
    "
  >

    {pipelineLeads.length} Leads

  </Badge>

</CardHeader>

      <CardContent>

       <div
  className="
    w-full
    overflow-x-auto
    rounded-xl
    border
  "
>
<ScrollArea className="w-full">
          <Table className="min-w-[850px]">

            <TableHeader>

              <TableRow>

                <TableHead>

                  Lead

                </TableHead>

                <TableHead>

                  Company

                </TableHead>

                <TableHead>

                  Status

                </TableHead>

                <TableHead>

                  Assignee

                </TableHead>

                <TableHead>

                  Last Activity

                </TableHead>

                <TableHead
                  className="
                    text-center
                  "
                >

                  Action

                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>
                            {pipelineLeads.length === 0 ? (

                <TableRow>

                  <TableCell
                    colSpan={6}
                    className="
                      h-40
                      text-center
                      text-muted-foreground
                    "
                  >

                    No leads found.

                  </TableCell>

                </TableRow>

              ) : (

              paginatedLeads.map(
                  (lead: Lead) => (

                    <TableRow
                      key={lead.id}
                      className="h-16"
                    >

                      <TableCell>

                        <div
                          className="
                            flex
                            flex-col
                          "
                        >

                          <span className="font-medium">

                            {lead.name}

                          </span>

                          {lead.email && (

                           <span
className="
text-xs
truncate
max-w-[180px]
text-muted-foreground
"
>

                              {lead.email}

                            </span>

                          )}

                        </div>

                      </TableCell>

                      <TableCell>

                        <span
className="
truncate
block
max-w-[180px]
text-muted-foreground
"
>

                          {lead.company}

                        </span>

                      </TableCell>

                      <TableCell>

                        <Badge
                          variant="outline"
                          className={stageClass(
                            lead.status
                          )}
                        >

                          {lead.status}

                        </Badge>

                      </TableCell>

                      <TableCell>

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <Avatar
                            className="
                              h-7
                              w-7
                            "
                          >

                            <AvatarFallback>

                              {lead.assignee?.name
                                ?.charAt(0)
                                .toUpperCase() ??
                                "U"}

                            </AvatarFallback>

                          </Avatar>

                         <span
className="
truncate
max-w-[120px]
"
>

                            {lead.assignee?.name ??
                              "Unassigned"}

                          </span>

                        </div>

                      </TableCell>

                      <TableCell>

                        <span
                          className="
                            text-sm
                            text-muted-foreground
                          "
                        >

                          {lead.lastActivityAt
                            ? new Date(
                                lead.lastActivityAt
                              ).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "-"}

                        </span>

                      </TableCell>

                      <TableCell
                        className="
                          text-center
                        "
                      >

                        <Button
                          size="sm"
                          variant="outline"
                          className="
                            h-8
                            rounded-lg
                          "
                        >

                          <Eye
                            className="
                              mr-2
                              h-3.5
                              w-3.5
                            "
                          />

                          View

                        </Button>

                      </TableCell>

                    </TableRow>

                  )
                )

              )}

            </TableBody>

          </Table>
  <ScrollBar orientation="horizontal" />
</ScrollArea>

        </div>
              <div
  className="
    mt-5
    flex
    flex-col
    gap-4
    border-t
    pt-4
    sm:flex-row
    sm:items-center
    sm:justify-between
  "
>

  <p
    className="
      text-sm
      text-muted-foreground
    "
  >
    Showing{" "}

    {(page - 1) * ITEMS_PER_PAGE + 1}

    -

    {Math.min(
      page * ITEMS_PER_PAGE,
      pipelineLeads.length
    )}

    {" "}of{" "}

    {pipelineLeads.length}

    {" "}leads
  </p>

  <div
  className="
    flex
    flex-wrap
    items-center
    gap-2
  "
>

    <Button
      size="sm"
      className="
        min-w-[90px]
    "
      variant="outline"
      disabled={page === 1}
      onClick={() =>
        setPage(page - 1)
      }
    >
      Previous
    </Button>

    <span
      className="
        text-sm
        text-muted-foreground
      "
    >
      Page {page} of {totalPages}
    </span>

    <Button
      size="sm"
      className="
        min-w-[90px]
    "
      variant="outline"
      disabled={
        page === totalPages
      }
      onClick={() =>
        setPage(page + 1)
      }
    >
      Next
    </Button>

  </div>

</div>

      </CardContent>

    </Card>

  );

}