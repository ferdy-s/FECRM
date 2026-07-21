"use client";

import {

  CheckCircle2,

} from "lucide-react";

import {

  Card,

  CardContent,

  CardHeader,

  CardTitle,

} from "@/components/ui/card";

import {

  Separator,

} from "@/components/ui/separator";

import type {

  Negotiation,

} from "@/types/negotiation";

interface Props {

  negotiations: Negotiation[];

}

function currency(
  value: number | null,
) {

  if (
    value === null
  ) {

    return "-";

  }

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

  negotiations,

}: Props) {

  const approved =

    negotiations.filter(

      (item) =>

        item.status ===
        "APPROVED",

    );

  return (

    <Card>

      <CardHeader>

       <CardTitle>

      Negotiation History

    </CardTitle>
      Review all approved and rejected negotiations.
      </CardHeader>

      <CardContent>

        {approved.length === 0 ? (

          <div
            className="
              py-10
              text-center
              text-muted-foreground
            "
          >

            No approved negotiations yet.

          </div>

        ) : (

          <div
            className="
              space-y-5
            "
          >

            {approved.map(

              (

                item,

              ) => (

                <div
                  key={item.id}
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                    "
                  >

                    <div>

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <CheckCircle2
                          className="
                            h-4
                            w-4
                            text-green-600
                          "
                        />

                        <p
                          className="
                            font-semibold
                          "
                        >

                          {
  item.scope === "ITEM"
    ? item.item?.itemName
    : "Commercial Negotiation"
}

                        </p>

                      </div>

                      <p
                        className="
                          mt-1
                          text-sm
                          text-muted-foreground
                        "
                      >

                        Requested by{" "}

                        <strong>

                          {item.requester.name}

                        </strong>

                      </p>

                      <p
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >

                        Reviewed at{" "}

                        {item.reviewedAt
                          ? new Date(
                              item.reviewedAt,
                            ).toLocaleString(
                              "id-ID",
                            )
                          : "-"}

                      </p>

                    </div>

                    <div
                      className="
                        text-right
                      "
                    >

                      <div
                        className="
                          text-sm
                          text-muted-foreground
                        "
                      >

                        Old Price

                      </div>

                      <div>

                        {currency(
                          Number(
                            item.oldAmount
                          ),
                        )}

                      </div>

                      <div
                        className="
                          mt-2
                          text-sm
                          text-muted-foreground
                        "
                      >

                        Approved Price

                      </div>

                      <div
                        className="
                          font-semibold
                          text-green-600
                        "
                      >

                        {currency(

                          item.approvedAmount
                            ? Number(
                                item.approvedAmount,
                              )
                            : Number(
                                item.approvedAmount,
                              ),

                        )}

                      </div>

                    </div>

                  </div>

                  <Separator
                    className="
                      mt-5
                    "
                  />

                </div>

              ),

            )}

          </div>

        )}

      </CardContent>

    </Card>

  );

}