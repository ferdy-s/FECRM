"use client";

import { useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import {
  useInvoices,
} from "@/hooks/use-invoices";

import {
  InvoiceActionMenu,
} from "./invoice-action-menu";


import {
  invoiceColumns,
} from "./invoice-columns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Checkbox,
} from "@/components/ui/checkbox";

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
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";

import {
  Skeleton,
} from "@/components/ui/skeleton";

import {
  InvoiceStatusBadge,
} from "./invoice-status-badge";

import {
  DownloadInvoiceButton,
} from "./download-invoice-button";

import { InvoiceFilterToolbar } from "./invoice-filter-toolbar";

import { InvoicePagination } from "./invoice-pagination";

import { InvoiceKindBadge } from "./invoice-kind-badge";

import { PaymentTypeBadge } from "./payment-type-badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaymentMethodBadge } from "./payment-method-badge";

export function InvoiceTable() {

  const router = useRouter();

  const {

    data: invoices = [],

    isPending,

    isError,

  } = useInvoices();


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

  return new Date(
    value,
  ).toLocaleDateString(
    "id-ID",
    {

      day: "2-digit",

      month: "short",

      year: "numeric",

    },

  );

}

function getHeaderClass(
  align?: "left" | "center" | "right",
) {
  switch (align) {
    case "right":
      return "text-right";

    case "center":
      return "text-center";

    default:
      return "text-left";
  }
}



  //////////////////////////////////////////////////////
  // SEARCH
  //////////////////////////////////////////////////////

  const [

    keyword,

    setKeyword,

  ] = useState("");

  //////////////////////////////////////////////////////
  // FILTER
  //////////////////////////////////////////////////////

  const [

    status,

    setStatus,

  ] = useState("ALL");

  const [

    paymentType,

    setPaymentType,

  ] = useState("ALL");

  const [

    paymentMethod,

    setPaymentMethod,

  ] = useState("ALL");

  const [

    invoiceKind,

    setInvoiceKind,

  ] = useState("ALL");


  //////////////////////////////////////////////////////
  // PAGINATION
  //////////////////////////////////////////////////////

  const [

    page,

    setPage,

  ] = useState(1);

  const pageSize = 10;

  //////////////////////////////////////////////////////
  // COLUMN VISIBILITY
  //////////////////////////////////////////////////////

  const [

  visibleColumns,

  setVisibleColumns,

] = useState({

  invoiceNumber: true,

  company: true,

  amount: true,

  paymentType: true,

  paymentMethod: true,

  invoiceKind: true,

  status: true,

  issuedAt: true,

  action: true,

});

  //////////////////////////////////////////////////////
  // FILTERING
  //////////////////////////////////////////////////////

 const filteredInvoices = useMemo(() => {
  const result = invoices.filter(
    (invoice) => {
      const search =
        keyword === "" ||
        invoice.invoiceNumber
          ?.toLowerCase()
          .includes(
            keyword.toLowerCase(),
          ) ||
        invoice.deal?.lead?.company
          ?.toLowerCase()
          .includes(
            keyword.toLowerCase(),
          );

      const statusMatch =
        status === "ALL" ||
        invoice.status === status;

      const paymentTypeMatch =
        paymentType === "ALL" ||
        invoice.paymentType ===
          paymentType;

      const paymentMethodMatch =
        paymentMethod === "ALL" ||
        invoice.paymentMethod ===
          paymentMethod;

      const kindMatch =
        invoiceKind === "ALL" ||
        invoice.invoiceKind ===
          invoiceKind;

      return (
        search &&
        statusMatch &&
        paymentTypeMatch &&
        paymentMethodMatch &&
        kindMatch
      );
    },
  );

  return result;
}, [
  invoices,
  keyword,
  status,
  paymentType,
  paymentMethod,
  invoiceKind,
 
]);

  //////////////////////////////////////////////////////
  // PAGINATION
  //////////////////////////////////////////////////////

  const totalPages =
    Math.max(

      1,

      Math.ceil(

        filteredInvoices.length /

          pageSize,

      ),

    );

  const paginatedInvoices =
    useMemo(() => {

      const start =

        (page - 1) *

        pageSize;

      return filteredInvoices.slice(

        start,

        start + pageSize,

      );
      

    }, [

      filteredInvoices,

      page,

    ]);

      //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  return (

    <Card
    >

     <CardHeader>

  <InvoiceFilterToolbar

    keyword={keyword}

    onKeywordChange={(value) => {

      setKeyword(value);

      setPage(1);

    }}

    status={status}

    onStatusChange={(value) => {

      setStatus(value);

      setPage(1);

    }}

    paymentType={paymentType}

    onPaymentTypeChange={(value) => {

      setPaymentType(value);

      setPage(1);

    }}

    paymentMethod={paymentMethod}

    onPaymentMethodChange={(value) => {

      setPaymentMethod(value);

      setPage(1);

    }}

    invoiceKind={invoiceKind}

    onInvoiceKindChange={(value) => {

      setInvoiceKind(value);

      setPage(1);

    }}

    visibleColumns={visibleColumns}

    setVisibleColumns={setVisibleColumns}

    onRefresh={() => {

      setKeyword("");

      setStatus("ALL");

      setPaymentType("ALL");

      setPaymentMethod("ALL");

      setInvoiceKind("ALL");

      setPage(1);

    }}

  />

</CardHeader>

      <CardContent>

       <ScrollArea className="w-full rounded-md border">

          <div
            className="
              min-w-[1200px]
            "
          >
                        <Table className="min-w-[1200px]">

         <TableHeader className="sticky top-0 z-20 bg-background">
  <TableRow className="border-b bg-muted/40 hover:bg-muted/40">
    {invoiceColumns.map((column) => {
      if (
        !visibleColumns[column.key]
      ) {
        return null;
      }

      const Icon =
        column.icon;

      return (
        <TableHead
          key={column.key}
          className={[
            "h-12 whitespace-nowrap bg-background font-semibold",
            getHeaderClass(
              column.align,
            ),
          ].join(" ")}
        >
          <div
            className={[
              "flex items-center gap-2",
              column.align ===
              "right"
                ? "justify-end"
                : "",
              column.align ===
              "center"
                ? "justify-center"
                : "",
            ].join(" ")}
          >
            {Icon && (
              <Icon className="h-4 w-4 text-muted-foreground" />
            )}

            <span>
              {column.label}
            </span>
          </div>
        </TableHead>
      );
    })}
  </TableRow>
</TableHeader>

             <TableBody>
  {paginatedInvoices.length === 0 ? (
    <TableRow>
      <TableCell
        colSpan={
          invoiceColumns.filter(
            (column) =>
              visibleColumns[column.key],
          ).length
        }
        className="h-32 text-center text-muted-foreground"
      >
        No invoices found.
      </TableCell>
    </TableRow>
  ) : (
    paginatedInvoices.map((invoice) => (
     <TableRow
  key={invoice.id}
  title="Open invoice detail"
  className="cursor-pointer transition-colors hover:bg-muted/40"
  onClick={() =>
    router.push(`/invoices/${invoice.id}`)
  }
>
        {visibleColumns.invoiceNumber && (
          <TableCell className="font-medium whitespace-nowrap">
            {invoice.invoiceNumber ?? "-"}
          </TableCell>
        )}

        {visibleColumns.company && (
          <TableCell className="min-w-[240px]">
            <div className="space-y-1">
              <p className="font-medium">
                {invoice.deal?.lead
                  ?.company ?? "-"}
              </p>

              <p className="text-xs text-muted-foreground">
                {invoice.deal?.lead
                  ?.name ?? "-"}
              </p>
            </div>
          </TableCell>
        )}

        {visibleColumns.amount && (
          <TableCell className="whitespace-nowrap text-right font-semibold">
            {formatCurrency(
              invoice.amount,
            )}
          </TableCell>
        )}

        {visibleColumns.paymentType && (
          <TableCell className="text-center">
            <PaymentTypeBadge
              type={invoice.paymentType}
            />
          </TableCell>
        )}

        {visibleColumns.paymentMethod && (
          <TableCell className="text-center">
            <PaymentMethodBadge
              method={
                invoice.paymentMethod
              }
            />
          </TableCell>
        )}

        {visibleColumns.invoiceKind && (
          <TableCell className="text-center">
            <InvoiceKindBadge
              kind={invoice.invoiceKind}
            />
          </TableCell>
        )}

        {visibleColumns.status && (
          <TableCell className="text-center">
            <InvoiceStatusBadge
              status={invoice.status}
            />
          </TableCell>
        )}

        {visibleColumns.issuedAt && (
          <TableCell>
            {formatDate(
              invoice.issuedAt,
            )}
          </TableCell>
        )}

        {visibleColumns.action && (
          <TableCell
  className="text-center"
  onClick={(e) => e.stopPropagation()}
>
            <InvoiceActionMenu
  invoice={invoice}
/>
          </TableCell>
        )}
      </TableRow>
    ))
  )}
</TableBody>

            </Table>

          </div>

          <ScrollBar orientation="horizontal" />

        </ScrollArea>

        {/* ============================================= */}
        {/* PAGINATION */}
        {/* ============================================= */}

        {!isPending  && filteredInvoices.length > 0 && (

        <InvoicePagination

  page={page}

  totalPages={totalPages}

  pageSize={pageSize}

  totalItems={
    filteredInvoices.length
  }

  onPageChange={

    setPage

  }

/>

        )}

      </CardContent>
    </Card>

  );

}