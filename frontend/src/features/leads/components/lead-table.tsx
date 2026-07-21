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
  Role,
} from "@/constants/roles";

import {
  usePermission,
} from "@/hooks/use-permission";

import {
  useLeads,
} from "@/hooks/use-leads";

import {
  CreateLeadDrawer,
} from "./create-lead-drawer";

import {
  LeadStatusBadge,
} from "./lead-status-badge";

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
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

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

interface LeadTableProps {

  role: Role;

}

export function LeadTable({

  role,

}: LeadTableProps) {

  //////////////////////////////////////////////////////
  // PERMISSION
  //////////////////////////////////////////////////////

  const permission =
    usePermission(role);

  //////////////////////////////////////////////////////
  // QUERY
  //////////////////////////////////////////////////////

  const {

    data: leads = [],

    isLoading,

  } = useLeads();

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
  // FILTERED DATA
  //////////////////////////////////////////////////////

  const filteredLeads =
    useMemo(() => {

      return leads.filter((lead) => {

        const matchesKeyword =

          lead.company
            ?.toLowerCase()
            .includes(
              keyword.toLowerCase(),
            )

          ||

          lead.name
            ?.toLowerCase()
            .includes(
              keyword.toLowerCase(),
            )

          ||

          lead.email
            ?.toLowerCase()
            .includes(
              keyword.toLowerCase(),
            );

        const matchesStatus =

          status === "ALL"

            ||

          lead.status === status;

        return (

          matchesKeyword

          &&

          matchesStatus

        );

      });

    }, [

      leads,

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

        filteredLeads.length /

        pageSize,

      ),

    );

  const paginatedLeads =
    filteredLeads.slice(

      (page - 1) * pageSize,

      page * pageSize,

    );

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (isLoading) {

    return (

      <Card>

        <CardContent
          className="
            flex
            h-64
            items-center
            justify-center
          "
        >

          Loading leads...

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

      {/* =========================================== */}
      {/* HEADER */}
      {/* =========================================== */}

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

            Lead Management

          </CardTitle>

          <CardDescription
            className="
              mt-1
            "
          >

            Manage, monitor and assign customer
            leads across your sales pipeline.

          </CardDescription>

        </div>

        {

          permission.canCreateLead && (

            <CreateLeadDrawer />

          )

        }

      </div>

      {/* =========================================== */}
      {/* TOOLBAR */}
      {/* =========================================== */}

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
              Search company, contact or email...
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
              value="NEW"
            >
              New
            </TabsTrigger>

            <TabsTrigger
              value="CONTACTED"
            >
              Contacted
            </TabsTrigger>

            <TabsTrigger
              value="QUALIFIED"
            >
              Qualified
            </TabsTrigger>

            <TabsTrigger
              value="PROPOSAL"
            >
              Proposal
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

      <TableHead
        className="min-w-[220px]"
      >
        Company
      </TableHead>

      <TableHead
        className="min-w-[180px]"
      >
        Contact Person
      </TableHead>

      <TableHead
        className="min-w-[160px]"
      >
        Source
      </TableHead>

      <TableHead
        className="min-w-[140px]"
      >
        Status
      </TableHead>

      <TableHead
        className="min-w-[200px]"
      >
        Assigned To
      </TableHead>

      <TableHead
        className="min-w-[140px]"
      >
        Created
      </TableHead>

      <TableHead
        className="
          w-[90px]
          text-right
        "
      >
        Action
      </TableHead>

    </TableRow>

  </TableHeader>

  <TableBody>

    {

      paginatedLeads.length === 0 ? (

        <TableRow>

          <TableCell

            colSpan={7}

            className="
              h-52
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

                No leads found

              </p>

              <p
                className="
                  text-sm
                  text-muted-foreground
                "
              >

                Try changing the search keyword
                or filter.

              </p>

            </div>

          </TableCell>

        </TableRow>

      ) : (

        paginatedLeads.map(

          (lead) => (

            <TableRow

              key={lead.id}

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

                    {lead.company}

                  </p>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >

                    {lead.email ?? "-"}

                  </p>

                </div>

              </TableCell>

              {/* CONTACT */}

              <TableCell>

                <div
                  className="
                    space-y-1
                  "
                >

                  <p>

                    {lead.name}

                  </p>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >

                    {lead.phone ?? "-"}

                  </p>

                </div>

              </TableCell>

              {/* SOURCE */}

              <TableCell>

                {lead.source?.name ?? "-"}

              </TableCell>

              {/* STATUS */}

              <TableCell>

                <LeadStatusBadge

                  status={lead.status}

                />

              </TableCell>

              {/* ASSIGNEE */}

              <TableCell>

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <Avatar
                    className="
                      h-9
                      w-9
                    "
                  >

                    <AvatarFallback>

                      {

                        lead.assignee?.name?.charAt(0)

                        ??

                        "?"

                      }

                    </AvatarFallback>

                  </Avatar>

                  <div>

                    <p
                      className="
                        font-medium
                      "
                    >

                      {lead.assignee?.name ?? "-"}

                    </p>

                  </div>

                </div>

              </TableCell>

              {/* CREATED */}

              <TableCell>

                {

                  new Date(

                    lead.createdAt,

                  ).toLocaleDateString(

                    "id-ID",

                    {

                      day: "2-digit",

                      month: "short",

                      year: "numeric",

                    },

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
                    href={`/leads/${lead.id}`}
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

          ),

        )

      )

    }

  </TableBody>

</Table>

        </div>

      </div>

            {/* ========================================== */}
      {/* FOOTER */}
      {/* ========================================== */}

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

        <div
          className="
            text-sm
            text-muted-foreground
          "
        >

          Showing{" "}

          <span className="font-medium">

            {

              filteredLeads.length === 0

                ? 0

                : (page - 1) * pageSize + 1

            }

          </span>

          {" - "}

          <span className="font-medium">

            {

              Math.min(

                page * pageSize,

                filteredLeads.length,

              )

            }

          </span>

          {" of "}

          <span className="font-medium">

            {filteredLeads.length}

          </span>

          {" "}lead(s)

        </div>

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

            disabled={page === 1}

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