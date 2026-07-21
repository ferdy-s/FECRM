"use client";

import {
  useState,
} from "react";

import { MessageSquareText } from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  ApproveNegotiationDialog,
} from "./approve-negotiation-dialog";

import {
  RejectNegotiationDialog,
} from "./reject-negotiation-dialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Separator,
} from "@/components/ui/separator";

import {
  User,
  Package,
  BadgeDollarSign,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

import type {
  Negotiation,
} from "@/types/negotiation";

interface Props {

  negotiation: Negotiation;

  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

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

export function NegotiationDetailSheet({

  negotiation,

  open,

  onOpenChange,

}: Props) {

  const currentPrice =
    Number(
      negotiation.oldAmount,
    );

  const requestedPrice =
    Number(
      negotiation.requestedAmount,
    );

  const discount =
    currentPrice -
    requestedPrice;

  const discountPercent =
    currentPrice === 0
      ? 0
      : (
          discount /
          currentPrice
        ) * 100;

const [

  openApprove,

  setOpenApprove,

] = useState(false);

const [

  openReject,

  setOpenReject,

] = useState(false);

      return (

    <Sheet

      open={open}

      onOpenChange={onOpenChange}

    >

      <SheetContent
        className="
          w-full
          sm:max-w-2xl
          overflow-y-auto
        "
      >

        <SheetHeader>

          <SheetTitle>

            Negotiation Detail

          </SheetTitle>

          <SheetDescription>

            Review complete information about this
            negotiation request before making a decision.

          </SheetDescription>

        </SheetHeader>
            <CardContent
              className="
                space-y-5
                p-5
              "
            >

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

                  <User
                    className="
                      h-5
                      w-5
                    "
                  />

                  <span
                    className="
                      font-semibold
                    "
                  >

                    Sales Information

                  </span>

                </div>

                <Badge>

                  {negotiation.status}

                </Badge>

              </div>

              <Separator />

              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >

                    Sales

                  </p>

                  <p
                    className="
                      font-medium
                    "
                  >

                    {negotiation.requester.name}

                  </p>

                </div>

                <div>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >

                    Email

                  </p>

                  <p
                    className="
                      font-medium
                    "
                  >

                    {negotiation.requester.email}

                  </p>

                </div>

              </div>

            </CardContent>

            <CardContent
              className="
                space-y-5
                p-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Package
                  className="
                    h-5
                    w-5
                  "
                />

                <span
                  className="
                    font-semibold
                  "
                >

                  Transaction Item

                </span>

              </div>

              <Separator />

              <div
                className="
                  grid
                  gap-4
                  md:grid-cols-2
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >

                    Item Name

                  </p>

                  <p
                    className="
                      font-medium
                    "
                  >

                    {
 negotiation.scope === "ITEM"
   ? negotiation.item?.itemName
   : "Commercial Negotiation"
}

                  </p>

                </div>

                <div>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >

                    Type Item

                  </p>

                  <Badge
                    variant="secondary"
                  >

                    {
 negotiation.scope === "ITEM"
   ? negotiation.item?.itemName
   : "Commercial Negotiation"
}

                  </Badge>

                </div>

                <div>

                  <p
                    className="
                      text-xs
                      text-muted-foreground
                    "
                  >

                    Quantity

                  </p>

                  <p
                    className="
                      font-medium
                    "
                  >

                    {
 negotiation.scope === "ITEM"
   ? negotiation.item?.itemName
   : "Commercial Negotiation"
}

                  </p>

                </div>

              </div>

            </CardContent>


            <CardContent
              className="
                space-y-5
                p-5
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <BadgeDollarSign
                  className="
                    h-5
                    w-5
                  "
                />

                <span
                  className="
                    font-semibold
                  "
                >

                  Price Summary

                </span>

              </div>

              <Separator />

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span>

                  Current Price

                </span>

                <strong>

                  {currency(
                    currentPrice,
                  )}

                </strong>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span>

                  Requested Price

                </span>

                <strong
                  className="
                    text-primary
                  "
                >

                  {currency(
                    requestedPrice,
                  )}

                </strong>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span>

                  Discount

                </span>

                <strong
                  className="
                    text-amber-600
                  "
                >

                  {currency(
                    discount,
                  )}

                </strong>

              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <span>

                  Discount %

                </span>

                <strong
                  className="
                    text-green-600
                  "
                >

                  {discountPercent.toFixed(
                    2,
                  )}%

                </strong>

              </div>

            </CardContent>

  <CardContent
    className="
      space-y-3
      p-5
    "
  >

    <div
      className="
        flex
        items-center
        gap-2
      "
    >

      <MessageSquareText
        className="
          h-5
          w-5
          text-primary
        "
      />

      <span
        className="
          font-medium
        "
      >

        Negotiation Reason

      </span>

    </div>

    <Separator />

    <div
      className="
        rounded-lg
        border
        bg-muted/40
        p-4
        leading-7
        whitespace-pre-wrap
      "
    >

      {negotiation.reason}

    </div>

  </CardContent>

          

          <div

  className="
    flex
    justify-end
    gap-3
    border-t
    pt-6
  "

>

  <Button

    variant="outline"

    onClick={() =>
      onOpenChange(false)
    }

  >

    Close

  </Button>

  {negotiation.status ===
    "PENDING" && (

    <>

      <Button

        variant="destructive"

        onClick={() =>
          setOpenReject(true)
        }

      >

        <XCircle
          className="
            mr-2
            h-4
            w-4
          "
        />

        Reject

      </Button>

      <Button

        onClick={() =>
          setOpenApprove(true)
        }

      >

        <CheckCircle2
          className="
            mr-2
            h-4
            w-4
          "
        />

        Approve

      </Button>

    </>

  )}

</div>

</SheetContent>
<ApproveNegotiationDialog

  negotiation={negotiation}

  open={openApprove}

  onOpenChange={
    setOpenApprove
  }

/>

<RejectNegotiationDialog

  negotiation={negotiation}

  open={openReject}

  onOpenChange={
    setOpenReject
  }

/>
    </Sheet>

    

  );
}

