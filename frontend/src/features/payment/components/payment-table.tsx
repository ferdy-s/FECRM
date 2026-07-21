"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

import {
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";

import { usePayments } from "@/hooks/use-payments";

import type { Payment } from "@/types/payment";

import type {
  VisibleColumns,
} from "./payment-column-types";

import {
  paymentColumns,
} from "./payment-columns";

import {
  PaymentActions,
} from "./payment-actions";

import {
  PaymentFilterToolbar,
} from "./payment-filter-toolbar";

import {
  PaymentSummaryCards,
} from "./payment-summary-cards";

import {
  PaymentStatusBadge,
} from "./payment-status-badge";

import {
  PaymentMethodBadge,
} from "./payment-method-badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  ScrollArea,
} from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// HELPERS

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
  value?: string | null,
) {
  if (!value) return "-";

  return new Intl.DateTimeFormat(
    "id-ID",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(
    new Date(value),
  );
}

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export function PaymentTable() {
  const {
    data: payments = [],
    isLoading,
    refetch,
  } = usePayments();

  const [
    keyword,
    setKeyword,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState("ALL");

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("ALL");

  const [
    uploader,
    setUploader,
  ] = useState("");

  const [
    verifier,
    setVerifier,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const pageSize = 10;

  const [
    visibleColumns,
    setVisibleColumns,
  ] = useState<VisibleColumns>({
    invoiceNumber: true,
    amount: true,
    paymentMethod: true,
    status: true,
    uploadedBy: true,
    verifiedBy: true,
    createdAt: true,
    verifiedAt: true,
    action: true,
  });

  //////////////////////////////////////////////////////
  // FILTER
  //////////////////////////////////////////////////////

  const filteredPayments =
    useMemo(() => {
      return payments.filter(
        (payment) => {
          const invoiceNumber =
            payment.invoice
              ?.invoiceNumber ??
            "";

          const referenceNumber =
            payment.referenceNumber ??
            "";

          const uploadedBy =
            payment.uploader
              ?.name ??
            "";

        const verifiedBy =
  payment.paymentMethod ===
  "QRIS_MIDTRANS"

    ? "Payment Gateway"

    : payment.verifier
        ?.name ??
      "";
          const keywordMatch =
            !keyword ||

            invoiceNumber
              .toLowerCase()
              .includes(
                keyword.toLowerCase(),
              ) ||

            referenceNumber
              .toLowerCase()
              .includes(
                keyword.toLowerCase(),
              ) ||

            uploadedBy
              .toLowerCase()
              .includes(
                keyword.toLowerCase(),
              );

          const statusMatch =
            status === "ALL" ||
            payment.status ===
              status;

          const methodMatch =
            paymentMethod ===
              "ALL" ||
            payment.paymentMethod ===
              paymentMethod;

          const uploaderMatch =
            !uploader ||

            uploadedBy
              .toLowerCase()
              .includes(
                uploader.toLowerCase(),
              );

          const verifierMatch =
            !verifier ||

            verifiedBy
              .toLowerCase()
              .includes(
                verifier.toLowerCase(),
              );

          return (
            keywordMatch &&
            statusMatch &&
            methodMatch &&
            uploaderMatch &&
            verifierMatch
          );
        },
      );
    }, [
      payments,
      keyword,
      status,
      paymentMethod,
      uploader,
      verifier,
    ]);

      //////////////////////////////////////////////////////
  // PAGINATION
  //////////////////////////////////////////////////////

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPayments.length /
        pageSize,
    ),
  );

  const paginatedPayments =
    filteredPayments.slice(
      (currentPage - 1) *
        pageSize,
      currentPage *
        pageSize,
    );

  function previousPage() {
    setCurrentPage((page) =>
      Math.max(1, page - 1),
    );
  }

  function nextPage() {
    setCurrentPage((page) =>
      Math.min(
        totalPages,
        page + 1,
      ),
    );
  }

  //////////////////////////////////////////////////////
  // REFRESH
  //////////////////////////////////////////////////////

  async function handleRefresh() {
    await refetch();
  }

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  return (
    <div className="space-y-6">

      <PaymentSummaryCards
        payments={payments}
      />

      <Card>

        <PaymentFilterToolbar
          keyword={keyword}
          onKeywordChange={
            setKeyword
          }
          status={status}
          onStatusChange={
            setStatus
          }
          paymentMethod={
            paymentMethod
          }
          onPaymentMethodChange={
            setPaymentMethod
          }
          uploader={uploader}
          onUploaderChange={
            setUploader
          }
          verifier={verifier}
          onVerifierChange={
            setVerifier
          }
          visibleColumns={
            visibleColumns
          }
          setVisibleColumns={
            setVisibleColumns
          }
          onRefresh={
            handleRefresh
          }
        />

        <CardContent className="pt-0">

          <ScrollArea className="w-full">

            <div className="min-w-300">

              <Table>

             <TableHeader>

<TableRow>

{paymentColumns
.filter(
(column)=>

visibleColumns[
column.key
],
)

.map(
(column)=>{

const Icon=
column.icon;

return(

<TableHead
key={
column.key
}
className={cn(

column.align==="right"&&
"text-right",

column.align==="center"&&
"text-center",

)}
>

<div
className={cn(

"flex items-center gap-2",

column.align==="right"&&
"justify-end",

column.align==="center"&&
"justify-center",

)}
>

{Icon&&(

<Icon
className="h-4 w-4 text-muted-foreground"
/>

)}

{column.label}

</div>

</TableHead>

);

},
)}

</TableRow>

</TableHeader>

                <TableBody>
                  {isLoading ? (

                    <TableRow>

                      <TableCell
                        colSpan={9}
                        className="h-40 text-center text-muted-foreground"
                      >
                        Loading payments...
                      </TableCell>

                    </TableRow>

                  ) : paginatedPayments.length === 0 ? (

                    <TableRow>

                      <TableCell
                        colSpan={9}
                        className="h-40 text-center text-muted-foreground"
                      >
                        No payment found.
                      </TableCell>

                    </TableRow>

                  ) : (

                    paginatedPayments.map(
                      (
                        payment: Payment,
                      ) => (

                        <TableRow
                          key={payment.id}
                          className="hover:bg-muted/40"
                        >

                          {visibleColumns.invoiceNumber && (

                            <TableCell>

                              <div className="flex flex-col">

                                <span className="font-medium">
                                  {payment.invoice?.invoiceNumber ?? "-"}
                                </span>

                                <span className="text-xs text-muted-foreground">
                                  {payment.invoice?.invoiceKind ?? "-"}
                                </span>

                              </div>

                            </TableCell>

                          )}

                          {visibleColumns.amount && (

                            <TableCell className="text-right font-medium whitespace-nowrap">

                              {formatCurrency(
                                Number(
                                  payment.amount,
                                ),
                              )}

                            </TableCell>

                          )}

                          {visibleColumns.paymentMethod && (

                            <TableCell className="text-center">

                              <PaymentMethodBadge
                                method={payment.paymentMethod}
                              />

                            </TableCell>

                          )}

                          {visibleColumns.status && (

                            <TableCell className="text-center">

                              <PaymentStatusBadge
                                status={payment.status}
                              />

                            </TableCell>

                          )}

                          {visibleColumns.uploadedBy && (

                            <TableCell>

                              {payment.uploader?.name ?? "-"}

                            </TableCell>

                          )}

                          {visibleColumns.verifiedBy && (

                            <TableCell>

  {payment.paymentMethod ===
  "QRIS_MIDTRANS"

    ? "Payment Gateway"

    : payment.verifier
        ?.name ??
      "-"}

</TableCell>

                          )}

                          {visibleColumns.createdAt && (

                            <TableCell className="whitespace-nowrap">

                              {formatDate(
                                payment.createdAt,
                              )}

                            </TableCell>

                          )}

                          {visibleColumns.verifiedAt && (

                            <TableCell className="whitespace-nowrap">

                              {formatDate(
                                payment.verifiedAt,
                              )}

                            </TableCell>

                          )}

                          {visibleColumns.action && (

                            <TableCell className="text-right">

                              <PaymentActions
                                payment={payment}
                              />

                            </TableCell>

                          )}

                        </TableRow>

                      ),
                    )

                  )}

 </TableBody>

              </Table>

            </div>

          </ScrollArea>

          <div
            className="
              mt-6
              flex
              flex-col
              gap-4
              border-t
              pt-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div
              className="
                text-sm
                text-muted-foreground
              "
            >
              Showing{" "}
              <strong>
                {filteredPayments.length === 0
                  ? 0
                  : (currentPage - 1) *
                      pageSize +
                    1}
              </strong>{" "}
              -
              <strong>
                {" "}
                {Math.min(
                  currentPage *
                    pageSize,
                  filteredPayments.length,
                )}
              </strong>{" "}
              of{" "}
              <strong>
                {filteredPayments.length}
              </strong>{" "}
              payments
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
                onClick={
                  previousPage
                }
                disabled={
                  currentPage ===
                  1
                }
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Previous
              </Button>

              <div
                className="
                 min-w-22.5
                  text-center
                  text-sm
                  font-medium
                "
              >
                Page{" "}
                {currentPage}{" "}
                of{" "}
                {totalPages}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={
                  nextPage
                }
                disabled={
                  currentPage ===
                  totalPages
                }
              >
                Next
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={
                  handleRefresh
                }
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>

  );

}

export default PaymentTable;