"use client";

import {
  RotateCw,
  SlidersHorizontal,
  Search,
} from "lucide-react";

import {
  CreateInvoiceButton,
} from "@/features/invoices/components/create-invoice-button";

import {
  Button,
} from "@/components/ui/button";

import {
  CardContent,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  invoiceColumns,
} from "./invoice-columns";

import type {
  VisibleColumns,
} from "./invoice-column-types";

interface Props {

  keyword: string;

  onKeywordChange: (
    value: string,
  ) => void;

  status: string;

  onStatusChange: (
    value: string,
  ) => void;

  paymentType: string;

  onPaymentTypeChange: (
    value: string,
  ) => void;

  paymentMethod: string;

  onPaymentMethodChange: (
    value: string,
  ) => void;

  invoiceKind: string;

  onInvoiceKindChange: (
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

export function InvoiceFilterToolbar({

  keyword,

  onKeywordChange,

  status,

  onStatusChange,

  paymentType,

  onPaymentTypeChange,

  paymentMethod,

  onPaymentMethodChange,

  invoiceKind,

  onInvoiceKindChange,

  visibleColumns,

  setVisibleColumns,

  onRefresh,

}: Props) {

  return (

<CardContent className="space-y-6 pt-6 pb-5">
    <div
      className="
        space-y-9
      "
    >

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

        <div
          className="
            relative
            w-full
            lg:max-w-md"
        >

          <Search
            className="
              absolute
              left-3
              top-1/2 -translate-y-1/2
              h-4
              w-4
              text-muted-foreground
            "
          />

          <Input

            value={keyword}

            placeholder="Search invoice number, company or customer..."

            onChange={(e) =>

              onKeywordChange(
                e.target.value,
              )

            }

            className="pl-9"

          />

        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        >

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

              {invoiceColumns.map(

                (column) => (

                  <DropdownMenuCheckboxItem

                    key={column.key}

                    checked={
                      visibleColumns[
                        column.key as keyof VisibleColumns
                      ]
                    }

                    onCheckedChange={

                      (checked) =>

                        setVisibleColumns(

                          (prev) => ({

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

           <CreateInvoiceButton />

        </div>

      </div>

      <div
        className="
         grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
        "
      >

        <div>

          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">

            Status

          </Label>

          <Select

            value={status}

            onValueChange={
              onStatusChange
            }

          >

            <SelectTrigger className="w-full">

              <SelectValue />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="ALL">

                All Status

              </SelectItem>

              <SelectItem value="DRAFT">

                Draft

              </SelectItem>

              <SelectItem value="UNPAID">

                Unpaid

              </SelectItem>

              <SelectItem value="PARTIAL">

                Partial

              </SelectItem>

              <SelectItem value="PAID">

                Paid

              </SelectItem>

              <SelectItem value="OVERDUE">

                Overdue

              </SelectItem>

            </SelectContent>

          </Select>

        </div>

        <div>

          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">

            Payment Type

          </Label>

          <Select

            value={paymentType}

            onValueChange={
              onPaymentTypeChange
            }

          >

            <SelectTrigger className="w-full">

              <SelectValue />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="ALL">

                All

              </SelectItem>

              <SelectItem value="FULL">

                Full

              </SelectItem>

              <SelectItem value="TERMIN">

                Termin

              </SelectItem>

            </SelectContent>

          </Select>

        </div>

        <div>

          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">

            Payment Method

          </Label>

          <Select

            value={paymentMethod}

            onValueChange={
              onPaymentMethodChange
            }

          >

            <SelectTrigger className="w-full">

              <SelectValue />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="ALL">

                All

              </SelectItem>

              <SelectItem
                value="MANUAL_TRANSFER"
              >

                Manual Transfer

              </SelectItem>

              <SelectItem
                value="QRIS_MIDTRANS"
              >

                QRIS Midtrans

              </SelectItem>

            </SelectContent>

          </Select>

        </div>

        <div>

          <Label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">

            Invoice Kind

          </Label>

          <Select

            value={invoiceKind}

            onValueChange={
              onInvoiceKindChange
            }

          >

            <SelectTrigger className="w-full">

              <SelectValue />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="ALL">

                All

              </SelectItem>

              <SelectItem value="MASTER">

                Master

              </SelectItem>

              <SelectItem value="TERMIN">

                Termin

              </SelectItem>

            </SelectContent>

          </Select>

        </div>

      </div>

    </div>

</CardContent>

);

}