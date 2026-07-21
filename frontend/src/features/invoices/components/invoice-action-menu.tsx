"use client";

import { useRouter } from "next/navigation";

import {
  Copy,
  Download,
  Eye,
  ExternalLink,
  MoreHorizontal,
} from "lucide-react";

import {
  useGenerateQris,
} from "@/hooks/use-generate-qris";

import type { Invoice } from "@/types/invoice";

import { invoiceService } from "@/services/invoice.service";

import {
  Button,
} from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  invoice: Invoice;
}

export function InvoiceActionMenu({
  invoice,
}: Props) {
  const router = useRouter();

  const generateQris =
  useGenerateQris();

  const canOpenQris =
  invoice.paymentMethod ===
    "QRIS_MIDTRANS" &&
  (
    invoice.status === "UNPAID" ||
    invoice.status === "PARTIAL"
  ) &&
  (
    invoice.invoiceKind === "TERMIN" ||
    (
      invoice.invoiceKind === "MASTER" &&
      invoice.paymentType === "FULL"
    )
  ) &&
  !!invoice.qrisUrl;

  async function handleDownload() {
  try {
    const blob =
      await invoiceService.downloadPdf(
        invoice.id,
      );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${invoice.invoiceNumber ?? "invoice"}.pdf`;

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error(
      "Failed to download invoice.",
      error,
    );
  }
}

  async function handleCopyInvoiceNumber() {
    if (!invoice.invoiceNumber) return;

    await navigator.clipboard.writeText(
      invoice.invoiceNumber,
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();

            router.push(
              `/invoices/${invoice.id}`,
            );
          }}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Detail
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleCopyInvoiceNumber();
          }}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Invoice Number
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {invoice.paymentMethod ===
    "QRIS_MIDTRANS" &&
 !invoice.qrisUrl &&
 invoice.status !== "PAID" &&
 invoice.status !== "CANCELLED" &&
 !(
   invoice.invoiceKind === "MASTER" &&
   invoice.paymentType === "TERMIN"
 ) && (

  <DropdownMenuItem

    onClick={async (e) => {

      e.stopPropagation();

      await generateQris.mutateAsync(
        invoice.id,
      );

    }}

  >

    Generate QRIS

  </DropdownMenuItem>

)}

        {canOpenQris && (
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();

              window.open(
                invoice.qrisUrl!,
                "_blank",
              );
            }}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open QRIS
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default InvoiceActionMenu;