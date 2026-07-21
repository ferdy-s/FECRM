"use client";

import { useState } from "react";

import {

  Eye,

  CheckCircle2,

  XCircle,

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

  Table,

  TableBody,

  TableCell,

  TableHead,

  TableHeader,

  TableRow,

} from "@/components/ui/table";

import {

  NegotiationStatusBadge,

} from "./negotiation-status-badge";

import {

  NegotiationDetailSheet,

} from "./negotiation-detail-sheet";

import {

  ApproveNegotiationDialog,

} from "./approve-negotiation-dialog";

import {

  RejectNegotiationDialog,

} from "./reject-negotiation-dialog";

import type {

  Negotiation,

} from "@/types/negotiation";

interface Props {

  negotiations?: Negotiation[];

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

export function NegotiationTable({

  negotiations = [],

}: Props) {

  const [

    selected,

    setSelected,

  ] = useState<Negotiation | null>(null);

  const [

    openDetail,

    setOpenDetail,

  ] = useState(false);

  const [

    openApprove,

    setOpenApprove,

  ] = useState(false);

  const [

    openReject,

    setOpenReject,

  ] = useState(false);

  return (

    <>

      <Card>

        <CardHeader>

          <CardTitle>

            Negotiation Requests Pending

          </CardTitle>

          <CardDescription>

            Review, approve, or reject customer
            price negotiation requests pending.

          </CardDescription>

        </CardHeader>

        <CardContent>

          {negotiations.length === 0 ? (

            <div
              className="
                flex
                h-56
                items-center
                justify-center
                rounded-lg
                border
                text-muted-foreground
              "
            >

              No pending negotiations.

            </div>

          ) : (

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

                    Requested

                  </TableHead>

                  <TableHead className="text-right">

                    Discount

                  </TableHead>

                  <TableHead>

                    Status

                  </TableHead>

                  <TableHead>

                    Created

                  </TableHead>

                  <TableHead className="text-right">

                    Action

                  </TableHead>

                </TableRow>

              </TableHeader>

              <TableBody>
          {negotiations.map((negotiation) => {

  const current =
  Number(
    negotiation.oldAmount,
  );

const requested =
  Number(
    negotiation.requestedAmount,
  );

const discount =
  current -
  requested;

const item =
  negotiation.item;

const isTotalNegotiation =
  item === null;

  return (

    <TableRow
      key={negotiation.id}
    >

      <TableCell>

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

      </TableCell>

     <TableCell>

  {isTotalNegotiation ? (

    <div>

      <div className="font-medium">

        Total Negotiation

      </div>

      <div className="text-xs text-muted-foreground">

        Entire Deal

      </div>

    </div>

  ) : (

    <div>

      <div className="font-medium">

        {item.itemName}

      </div>

      <div className="text-xs text-muted-foreground">

        {item.type}

      </div>

    </div>

  )}

</TableCell>

      <TableCell>

        {isTotalNegotiation
    ? "-"
    : item.quantity}

      </TableCell>

      <TableCell
        className="
          text-right
        "
      >

        {currency(current)}

      </TableCell>

      <TableCell
        className="
          text-right
          font-medium
          text-primary
        "
      >

        {currency(requested)}

      </TableCell>

      <TableCell
        className="
          text-right
          font-medium
          text-amber-600
        "
      >

        {currency(discount)}

      </TableCell>

      <TableCell>

        <NegotiationStatusBadge
          status={
            negotiation.status
          }
        />

      </TableCell>

      <TableCell>

        {new Date(
          negotiation.createdAt,
        ).toLocaleDateString(
          "id-ID",
        )}

      </TableCell>

      <TableCell
        className="
          text-right
        "
      >

        <div
          className="
            flex
            justify-end
            gap-2
          "
        >

          <Button

            size="icon"

            variant="ghost"

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

          {negotiation.status ===
            "PENDING" && (

            <>

              <Button

                size="icon"

                variant="ghost"

                className="
                  text-green-600
                "

                onClick={() => {

                  setSelected(
                    negotiation,
                  );

                  setOpenApprove(
                    true,
                  );

                }}

              >

                <CheckCircle2
                  className="
                    h-4
                    w-4
                  "
                />

              </Button>

              <Button

                size="icon"

                variant="ghost"

                className="
                  text-red-600
                "

                onClick={() => {

                  setSelected(
                    negotiation,
                  );

                  setOpenReject(
                    true,
                  );

                }}

              >

                <XCircle
                  className="
                    h-4
                    w-4
                  "
                />

              </Button>

            </>

          )}

        </div>

      </TableCell>

    </TableRow>

  );

})}

              </TableBody>

            </Table>

          )}

        </CardContent>

      </Card>

      {selected && (

        <NegotiationDetailSheet

          negotiation={selected}

          open={openDetail}

          onOpenChange={setOpenDetail}

        />

      )}

      {selected && (

        <ApproveNegotiationDialog

          negotiation={selected}

          open={openApprove}

          onOpenChange={setOpenApprove}

        />

      )}

      {selected && (

        <RejectNegotiationDialog

          negotiation={selected}

          open={openReject}

          onOpenChange={setOpenReject}

        />

      )}

    </>

  );

}