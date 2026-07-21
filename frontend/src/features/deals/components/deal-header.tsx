"use client";

import {
  Calendar,
  Building2,
  User,
  CircleDollarSign,
  UserCog,
} from "lucide-react";

import {
  Wallet,
} from "lucide-react";

import type {
  Deal,
} from "@/types/deal";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  toast,
} from "sonner";

import {
  useUpdateDealStatus,
} from "@/hooks/use-update-deal-status";

import type {
  DealStatus,
} from "@/types/deal";

import {
  AttachProductDialog,
} from "./attach-product-dialog";

import {
  AttachServiceDialog,
} from "./attach-service-dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  DealStatusBadge,
} from "./deal-status-badge";

import {
  CollectionStatusBadge,
} from "./collection-status-badge";
import { StatusBadge } from "@/components/common/status-badge";

interface Props {
  deal: Deal;
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
      month: "long",
      year: "numeric",
    },
  );
}

export function DealHeader({
  deal,
}: Props) {

  const isDealLocked =
  deal.status === "WON" ||
  deal.status === "LOST";

    const updateStatusMutation =
  useUpdateDealStatus();

  const hasItems =
  (deal.items?.length ?? 0) > 0;

const canMoveToWon =
  hasItems &&
  deal.status === "NEGOTIATION";

const canMoveToNegotiation =
  deal.status === "OPEN";

const canMoveToLost =
  deal.status === "OPEN" ||
  deal.status === "NEGOTIATION";

  function changeStatus(
  status: DealStatus,
) {

  if (
    status === deal.status
  ) {
    return;
  }

  updateStatusMutation.mutate(

    {

      dealId: deal.id,

      status,

    },

    {

      onSuccess() {

        toast.success(
          "Deal status updated",
        );

      },

      onError(error: Error) {

        toast.error(
          error.message,
        );

      },

    },

  );

}

  return (


      <CardContent
        className="
          p-6
        "
      >

        <div
          className="
            flex
            flex-col
            gap-6
            xl:flex-row
            xl:items-start
            xl:justify-between
          "
        >

          {/* LEFT */}

          <div
            className="
              space-y-5
            "
          >

            <div>

              <h1
                className="
                  text-3xl
                  font-bold
                "
              >
                {deal.lead?.company}
              </h1>

              <p
                className="
                  mt-1
                  text-muted-foreground
                "
              >
                Deal Detail
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div
  className="
    flex
    flex-wrap
    items-center
    gap-3
  "
>

  {isDealLocked ? (

    <>
      <Button
        variant="outline"
        onClick={() =>
          toast.info(
            "This deal has been finalized. Products can no longer be attached."
          )
        }
      >
        + Attach Product
      </Button>

      <Button
        variant="outline"
        onClick={() =>
          toast.info(
            "This deal has been finalized. Services can no longer be attached."
          )
        }
      >
        + Attach Service
      </Button>
    </>

  ) : (

    <>
      <AttachProductDialog
        dealId={deal.id}
      />

      <AttachServiceDialog
        dealId={deal.id}
      />
    </>

  )}

</div>

        </div>

        <div
          className="
            mt-8
            grid
            gap-5
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          <InfoItem
            icon={
              <Building2
                className="h-5 w-5"
              />
            }
            title="Company"
            value={
              deal.lead?.company ??
              "-"
            }
          />

          <InfoItem
            icon={
              <User
                className="h-5 w-5"
              />
            }
            title="PIC Name"
            value={
              deal.lead?.name ??
              "-"
            }
          />

          <InfoItem
            icon={
              <UserCog
                className="h-5 w-5"
              />
            }
            title="Assigned Sales"
            value={
              deal.assignee?.name ??
              "-"
            }
          />

      

          <InfoItem
            icon={
              <Calendar
                className="h-5 w-5"
              />
            }
            title="Created"
            value={formatDate(
              deal.createdAt,
            )}
          />

             <InfoItem
  icon={
    <Wallet
      className="h-5 w-5"
    />
  }
  title="Collection Status"
  value={
    <div className="pt-1">
      <CollectionStatusBadge
        status={deal.collectionStatus}
      />
    </div>
  }
/>

         <InfoItem
  icon={
    <User className="h-5 w-5" />
  }
  title="Deal Status"
  value={
   <Select
  value={deal.status}
  onValueChange={(value) =>
    changeStatus(value as DealStatus)
  }
  disabled={
    updateStatusMutation.isPending ||
    deal.status === "WON" ||
    deal.status === "LOST"
  }
>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>

    <SelectContent>

<SelectItem
value="OPEN"
disabled
>

OPEN

</SelectItem>

<SelectItem
value="NEGOTIATION"
disabled={!canMoveToNegotiation}
>

NEGOTIATION

</SelectItem>

<SelectItem
value="WON"
disabled={!canMoveToWon}
>

WON

</SelectItem>

<SelectItem
value="LOST"
disabled={!canMoveToLost}
>

LOST

</SelectItem>

</SelectContent>
    </Select>
  }
/>

          <InfoItem
            icon={
              <User
                className="h-5 w-5"
              />
            }
            title="Email"
            value={
              deal.lead?.email ??
              "-"
            }
          />

          <InfoItem
            icon={
              <User
                className="h-5 w-5"
              />
            }
            title="Phone"
            value={
              deal.lead?.phone ??
              "-"
            }
          />

        </div>

      </CardContent>

  );

}

interface InfoItemProps {

  icon: React.ReactNode;

  title: string;

  value: React.ReactNode;

}

function InfoItem({

  icon,

  title,

  value,

}: InfoItemProps) {
  

  return (

    <div
      className="
        rounded-xl
        border
        p-4
      "
    >

      <div
        className="
          mb-3
          text-primary
        "
      >
        {icon}
      </div>

      <p
        className="
          text-xs
          uppercase
          tracking-wide
          text-muted-foreground
        "
      >
        {title}
      </p>

      <div
        className="
          mt-1
          font-semibold
        "
      >
        {value}
      </div>

    </div>

  );

}