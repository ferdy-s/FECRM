"use client";

import Link from "next/link";

import {
  Building2,
  Calendar,
  Eye,
} from "lucide-react";

import { useLeads } from "@/hooks/use-leads";

import type {
  Lead,
} from "@/types/lead";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

//////////////////////////////////////////////////////
// COLUMN
//////////////////////////////////////////////////////

const columns = [
  {
    key: "NEW",
    title: "New",
  },
  {
    key: "CONTACTED",
    title: "Contacted",
  },
  {
    key: "QUALIFIED",
    title: "Qualified",
  },
  {
    key: "PROPOSAL",
    title: "Proposal",
  },
  {
    key: "NEGOTIATION",
    title: "Negotiation",
  },
  {
    key: "WON",
    title: "Won",
  },
  {
    key: "LOST",
    title: "Lost",
  },
] as const;

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export function LeadKanban() {

  const {
    data: leads = [],
    isLoading,
  } = useLeads();

  if (isLoading) {
    return (
      <div
        className="
          flex
          h-80
          items-center
          justify-center
          text-muted-foreground
        "
      >
        Loading leads...
      </div>
    );
  }

  return (

    <div
      className="
        grid
        gap-5
        xl:grid-cols-7
        lg:grid-cols-4
        md:grid-cols-2
      "
    >

      {columns.map((column) => {

        const columnLeads =
          leads.filter(
            (lead: Lead) =>
              lead.status ===
              column.key,
          );

        return (

          <div
            key={column.key}
            className="
              rounded-xl
              border
              bg-muted/20
              p-3
            "
          >

            <div
              className="
                mb-4
                flex
                items-center
                justify-between
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <div
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-primary
                  "
                />

                <h3
                  className="
                    text-sm
                    font-semibold
                  "
                >
                  {column.title}
                </h3>

              </div>

              <span
                className="
                  rounded-full
                  bg-background
                  px-2.5
                  py-1
                  text-xs
                  font-semibold
                "
              >
                {columnLeads.length}
              </span>

            </div>

            <div className="space-y-3">

                          {columnLeads.map(
                (lead) => (

                  <Card
                    key={lead.id}
                    className="
                      border
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:border-primary/40
                      hover:shadow-lg
                    "
                  >

                    <CardContent
                      className="p-4"
                    >

                      <div className="space-y-4">

                        {/* COMPANY */}

                        <div
                          className="
                            flex
                            items-start
                            gap-3
                          "
                        >

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-lg
                              bg-muted
                            "
                          >

                            <Building2
                              className="
                                h-5
                                w-5
                              "
                            />

                          </div>

                          <div
                            className="
                              min-w-0
                              flex-1
                            "
                          >

                            <h4
                              className="
                                truncate
                                font-semibold
                              "
                            >
                              {lead.company}
                            </h4>

                            <p
                              className="
                                truncate
                                text-xs
                                text-muted-foreground
                              "
                            >
                              {lead.name}
                            </p>

                          </div>

                        </div>

                        {/* CONTACT */}

                        <div
                          className="
                            space-y-1
                            text-xs
                          "
                        >

                          <div>

                            <span
                              className="
                                text-muted-foreground
                              "
                            >
                              Email
                            </span>

                            <p
                              className="
                                truncate
                              "
                            >
                              {lead.email ??
                                "-"}
                            </p>

                          </div>

                          <div>

                            <span
                              className="
                                text-muted-foreground
                              "
                            >
                              Phone
                            </span>

                            <p>
                              {lead.phone ??
                                "-"}
                            </p>

                          </div>

                        </div>

                        {/* ASSIGNEE */}

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >

                            <Avatar
                              className="
                                h-8
                                w-8
                              "
                            >

                              <AvatarFallback>

                                {lead.assignee?.name
                                  ?.charAt(
                                    0,
                                  ) ??
                                  "-"}

                              </AvatarFallback>

                            </Avatar>

                            <div>

                              <p
                                className="
                                  text-xs
                                  font-medium
                                "
                              >

                                {lead.assignee
                                  ?.name ??
                                  "-"}

                              </p>

                              <p
                                className="
                                  text-[11px]
                                  text-muted-foreground
                                "
                              >

                                {lead.source
                                  ?.name ??
                                  "-"}

                              </p>

                            </div>

                          </div>

                          <Button
                            asChild
                            size="icon"
                            variant="ghost"
                            className="
                              h-8
                              w-8
                            "
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

                        </div>

                        {/* DATE */}

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-muted-foreground
                          "
                        >

                          <Calendar
                            className="
                              h-3
                              w-3
                            "
                          />

                          {new Date(
                            lead.createdAt,
                          ).toLocaleDateString(
                            "id-ID",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}

                        </div>

                      </div>

                    </CardContent>

                  </Card>

                ),
              )}

                            {columnLeads.length === 0 && (

                <div
                  className="
                    rounded-lg
                    border
                    border-dashed
                    bg-background
                    px-4
                    py-8
                    text-center
                  "
                >

                  <p
                    className="
                      text-sm
                      font-medium
                      text-muted-foreground
                    "
                  >
                    No Leads
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-muted-foreground
                    "
                  >
                    There are no leads in this stage.
                  </p>

                </div>

              )}

            </div>

          </div>

        );

      })}

    </div>

  );

}

export default LeadKanban;