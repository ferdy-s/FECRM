    "use client";

    import { useEffect, useMemo, useState } from "react";

    import {
    ArrowRight,
    CheckCircle2,
    CreditCard,
    Lock,
    } from "lucide-react";

    import type { Deal } from "@/types/deal";
    import type { Invoice } from "@/types/invoice";

    import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    } from "@/components/ui/dialog";

    import {
    Button,
    } from "@/components/ui/button";

    import {
    Badge,
    } from "@/components/ui/badge";

    import {
    Card,
    CardContent,
    } from "@/components/ui/card";

    import {
    Separator,
    } from "@/components/ui/separator";

    import {
    UploadPaymentDialog,
    } from "./upload-payment-dialog";

    //////////////////////////////////////////////////////
    // PROPS
    //////////////////////////////////////////////////////

    interface Props {
    deal: Deal;

    open: boolean;

    onOpenChange: (
        open: boolean,
    ) => void;
    }

    //////////////////////////////////////////////////////
    // HELPERS
    //////////////////////////////////////////////////////

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

    //////////////////////////////////////////////////////
    // COMPONENT
    //////////////////////////////////////////////////////

    export function UploadPaymentSelectorDialog({
    deal,
    open,
    onOpenChange,
    }: Props) {

    //////////////////////////////////////////////////////
    // STATE
    //////////////////////////////////////////////////////

    const [
        selectedInvoice,
        setSelectedInvoice,
    ] = useState<Invoice | null>(
        null,
    );

    const [
        openUpload,
        setOpenUpload,
    ] = useState(false);

    //////////////////////////////////////////////////////
    // DATA
    //////////////////////////////////////////////////////

    const invoices =
        deal.invoices ?? [];

    const masterInvoice =
        useMemo(
        () =>
            invoices.find(
            (invoice) =>
                invoice.invoiceKind ===
                "MASTER",
            ) ?? null,
        [invoices],
        );

    const terminInvoices =
        useMemo(
        () =>
            invoices.filter(
            (invoice) =>
                invoice.invoiceKind ===
                "TERMIN",
            ),
        [invoices],
        );

    //////////////////////////////////////////////////////
    // LOCK ENGINE
    //////////////////////////////////////////////////////

    function isLocked(
        invoice: Invoice,
        index: number,
    ) {

        if (index === 0) {
        return false;
        }

        const previous =
        terminInvoices[
            index - 1
        ];

        return (
        previous.status !==
        "PAID"
        );

    }

    //////////////////////////////////////////////////////
    // SELECT
    //////////////////////////////////////////////////////

    function handleSelect(
        invoice: Invoice,
        locked: boolean,
    ) {

        if (locked) {
        return;
        }

        setSelectedInvoice(
        invoice,
        );

        setOpenUpload(
        true,
        );

    }

        //////////////////////////////////////////////////////
    // RENDER
    //////////////////////////////////////////////////////

    if (
        masterInvoice?.paymentType ===
        "FULL"
    ) {

        return (
        <>

            {selectedInvoice && (

            <UploadPaymentDialog
                invoice={selectedInvoice}
                open={openUpload}
                onOpenChange={(state) => {

                setOpenUpload(state);

                if (!state) {
                    onOpenChange(false);
                }

                }}
            />

            )}

        </>
        );

    }

    return (

        <>

     <Dialog
  open={open}
  onOpenChange={(state) => {

    if (!state) {

      setSelectedInvoice(null);

      setOpenUpload(false);

    }

    onOpenChange(state);

  }}
>

            <DialogContent
            className="max-w-2xl"
            >

            <DialogHeader>

                <DialogTitle>

                Select Invoice

                </DialogTitle>

                <DialogDescription>

                Complete the previous termin before
                proceeding to the next payment.

                </DialogDescription>

            </DialogHeader>

            <div className="space-y-4">

                {terminInvoices.map(
                (
                    invoice,
                    index,
                ) => {

                    const locked =
                    isLocked(
                        invoice,
                        index,
                    );

                    const selected =
                    selectedInvoice?.id ===
                    invoice.id;

                    return (

                    <Card
                        key={invoice.id}
                        className={
                        selected
                            ? "border-primary"
                            : undefined
                        }
                    >

                        <CardContent className="p-5">

                        <div className="flex items-start justify-between">

                            <div className="space-y-1">

                            <div className="flex items-center gap-2">

                                <CreditCard className="h-4 w-4 text-primary" />

                                <span className="font-medium">

                                {invoice.invoiceNumber}

                                </span>

                            </div>

                            <p className="text-xs text-muted-foreground">

                                {invoice.invoiceKind}

                            </p>

                            </div>

                            {locked ? (

                            <Badge
                                variant="secondary"
                            >

                                <Lock className="mr-1 h-3 w-3" />

                                Locked

                            </Badge>

                            ) : invoice.status ===
                            "PAID" ? (

                            <Badge>

                                <CheckCircle2 className="mr-1 h-3 w-3" />

                                Paid

                            </Badge>

                            ) : (

                            <Badge
                                variant="outline"
                            >

                                {invoice.status}

                            </Badge>

                            )}

                        </div>

                        <Separator className="my-4" />

                        <div className="grid gap-3 sm:grid-cols-3 text-sm">

                            <div>

                            <p className="text-muted-foreground">

                                Amount

                            </p>

                            <p className="font-medium">

                                {currency(
                                Number(
                                    invoice.amount,
                                ),
                                )}

                            </p>

                            </div>

                            <div>

                            <p className="text-muted-foreground">

                                Paid

                            </p>

                            <p className="font-medium">

                                {currency(
                                Number(
                                    invoice.paidAmount,
                                ),
                                )}

                            </p>

                            </div>

                            <div>

                            <p className="text-muted-foreground">

                                Remaining

                            </p>

                            <p className="font-medium">

                                {currency(
                                Number(
                                    invoice.remainingAmount,
                                ),
                                )}

                            </p>

                            </div>

                        </div>

                        {locked && (

                            <p className="mt-4 text-xs text-muted-foreground">

                            Complete previous termin first.

                            </p>

                        )}

                        {!locked &&
                            invoice.status !==
                            "PAID" && (

                            <div className="mt-5 flex justify-end">

                           <Button
  onClick={() => {

    if (
      masterInvoice?.paymentType ===
      "FULL"
    ) {

      handleSelect(
        masterInvoice,
        false,
      );

      return;

    }

    handleSelect(
      invoice,
      locked,
    );

  }}
>
  Continue
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>

                            </div>

                        )}

                        </CardContent>

                    </Card>

                    );

                },
                )}

            </div>

            </DialogContent>

        </Dialog>

        {selectedInvoice && (

            <UploadPaymentDialog
            invoice={selectedInvoice}
            open={openUpload}
            onOpenChange={(state) => {

                setOpenUpload(state);

                if (!state) {

                setSelectedInvoice(
                    null,
                );

                }

            }}
            />

        )}

        </>

    );

    }

    export default UploadPaymentSelectorDialog;