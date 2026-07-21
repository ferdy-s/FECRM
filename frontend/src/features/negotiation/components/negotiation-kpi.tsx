"use client";

import {

  CheckCircle2,

  Clock3,

  FileText,

  Percent,

  TrendingDown,

  XCircle,

} from "lucide-react";

import {

  Card,

  CardContent,

  CardHeader,

  CardTitle,

} from "@/components/ui/card";

import type {

  NegotiationDashboard,

} from "@/types/negotiation-dashboard";

interface Props {

  dashboard: NegotiationDashboard;

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

export function NegotiationKPI({

  dashboard,

}: Props) {

  const cards = [

    {

      title:
        "Total Requests",

      value:
        dashboard.total,

      icon:
        FileText,

      color:
        "text-primary",

    },

    {

      title:
        "Approved",

      value:
        dashboard.approved,

      icon:
        CheckCircle2,

      color:
        "text-green-600",

    },

    {

      title:
        "Pending",

      value:
        dashboard.pending,

      icon:
        Clock3,

      color:
        "text-yellow-600",

    },

    {

      title:
        "Rejected",

      value:
        dashboard.rejected,

      icon:
        XCircle,

      color:
        "text-red-600",

    },

  ];

  return (

    <>

      <div
        className="
          grid
          gap-4
          xl:grid-cols-4
          md:grid-cols-2
        "
      >

        {cards.map(

          (

            card,

          ) => {

            const Icon =
              card.icon;

            return (

              <Card
                key={
                  card.title
                }
              >

                <CardHeader
                  className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    pb-2
                  "
                >

                  <CardTitle
                    className="
                      text-sm
                      text-muted-foreground
                    "
                  >

                    {card.title}

                  </CardTitle>

                  <Icon
                    className={`h-5 w-5 ${card.color}`}
                  />

                </CardHeader>

                <CardContent>

                  <div
                    className="
                      text-3xl
                      font-bold
                    "
                  >

                    {card.value}

                  </div>

                </CardContent>

              </Card>

            );

          },

        )}

      </div>

      <div
        className="
          mt-4
          grid
          gap-4
          md:grid-cols-2
        "
      >

        {/* <Card>

          <CardHeader
            className="
              flex
              flex-row
              items-center
              justify-between
            "
          >

            <CardTitle
              className="
                text-sm
              "
            >

              Approval Rate

            </CardTitle>

            <Percent
              className="
                h-5
                w-5
                text-green-600
              "
            />

          </CardHeader>

          <CardContent>

            <div
              className="
                text-3xl
                font-bold
              "
            >

              {dashboard.approvalRate}%

            </div>

          </CardContent>

        </Card> */}

        {/* <Card>

          <CardHeader
            className="
              flex
              flex-row
              items-center
              justify-between
            "
          >

            <CardTitle
              className="
                text-sm
              "
            >

              Average Discount

            </CardTitle>

            <TrendingDown
              className="
                h-5
                w-5
                text-orange-500
              "
            />

          </CardHeader>

          <CardContent>

            <div
              className="
                text-3xl
                font-bold
              "
            >

              {currency(
                dashboard.avgDiscount,
              )}

            </div>

          </CardContent>

        </Card> */}

      </div>

    </>

  );

}