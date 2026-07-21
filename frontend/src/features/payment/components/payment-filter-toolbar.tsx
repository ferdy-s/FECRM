"use client";

import * as React from "react";

import {
  RotateCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  paymentColumns,
} from "./payment-columns";

import type {
  VisibleColumns,
} from "./payment-column-types";

import {
  Button,
} from "@/components/ui/button";

import {
  CardContent,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////

interface Props {
  keyword: string;

  onKeywordChange: (
    value: string,
  ) => void;

  status: string;

  onStatusChange: (
    value: string,
  ) => void;

  paymentMethod: string;

  onPaymentMethodChange: (
    value: string,
  ) => void;

  uploader: string;

  onUploaderChange: (
    value: string,
  ) => void;

  verifier: string;

  onVerifierChange: (
    value: string,
  ) => void;

  visibleColumns: VisibleColumns;

  setVisibleColumns: React.Dispatch<
    React.SetStateAction<
      VisibleColumns
    >
  >;

  onRefresh: () => void;
}

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export function PaymentFilterToolbar({
  keyword,

  onKeywordChange,

  status,

  onStatusChange,

  paymentMethod,

  onPaymentMethodChange,

  uploader,

  onUploaderChange,

  verifier,

  onVerifierChange,

  visibleColumns,

  setVisibleColumns,

  onRefresh,
}: Props) {
  return (
    <CardContent className="space-y-6 pt-6 pb-5">
      <div className="space-y-9">

        {/* ====================================================== */}
        {/* TOP TOOLBAR */}
        {/* ====================================================== */}

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
          {/* SEARCH */}

          <div
            className="
              relative
              w-full
              lg:max-w-md
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
              placeholder="Search invoice number, reference number or uploader..."
              className="pl-9"
              onChange={(e) =>
                onKeywordChange(
                  e.target.value,
                )
              }
            />
          </div>

          {/* ACTIONS */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            {/* REFRESH */}

            <Button
              variant="outline"
              onClick={onRefresh}
            >
              <RotateCw
                className="
                  mr-2
                  h-4
                  w-4
                "
              />

              Refresh
            </Button>

            {/* COLUMN VISIBILITY */}

            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
              >
                <Button
                  size="sm"
                  variant="outline"
                >
                  <SlidersHorizontal
                    className="
                      mr-2
                      h-4
                      w-4
                    "
                  />

                  Columns
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64"
              >
                {paymentColumns.map(
                  (column) => (
                    <DropdownMenuCheckboxItem
                      key={column.key}
                      checked={
                        visibleColumns[
                          column.key as keyof VisibleColumns
                        ]
                      }
                      onCheckedChange={(
                        checked,
                      ) =>
                        setVisibleColumns(
                         (prev: VisibleColumns)=>({
                            ...prev,
                            [
                              column.key
                            ]: !!checked,
                          }),
                        )
                      }
                    >
                      <div className="flex items-center gap-2">
                        {column.icon && (
                          <column.icon className="h-4 w-4" />
                        )}

                        <span>
                          {column.label}
                        </span>
                      </div>
                    </DropdownMenuCheckboxItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ====================================================== */}
        {/* FILTER SECTION */}
        {/* ====================================================== */}

        <div
className="
grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
"
>
        {/* Status */}
        <div>
          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Status
          </Label>

          <Select
            value={status}
            onValueChange={onStatusChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Status
              </SelectItem>

              <SelectItem value="PENDING">
                Pending
              </SelectItem>

              <SelectItem value="VERIFIED">
                Verified
              </SelectItem>

              <SelectItem value="REJECTED">
                Rejected
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method */}
        <div>
          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Payment Method
          </Label>

          <Select
            value={paymentMethod}
            onValueChange={onPaymentMethodChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">
                All Methods
              </SelectItem>

              <SelectItem value="MANUAL_TRANSFER">
                Manual Transfer
              </SelectItem>

              <SelectItem value="QRIS_MIDTRANS">
                QRIS Midtrans
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Uploader */}
        <div>
          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Uploaded By
          </Label>

          <Input
            value={uploader}
            placeholder="Search uploader..."
            onChange={(e) =>
              onUploaderChange(
                e.target.value,
              )
            }
          />
        </div>

        {/* Verifier */}
        <div>
          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Verified By
          </Label>

          <Input
            value={verifier}
            placeholder="Search verifier..."
            onChange={(e) =>
              onVerifierChange(
                e.target.value,
              )
            }
          />
        </div>
      </div>
    </div>
  </CardContent>
  );
}