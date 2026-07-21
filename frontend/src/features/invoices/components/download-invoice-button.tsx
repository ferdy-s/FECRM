"use client";

import {
  Download,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  useDownloadInvoice,
} from "@/hooks/use-download-invoice";

interface Props {

  invoiceId: string;

}

export function DownloadInvoiceButton({
  invoiceId,
}: Props) {

  const mutation =
    useDownloadInvoice();

  return (

    <Button
      size="sm"
      variant="outline"
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate(invoiceId)
      }
    >

      <Download className="mr-2 h-4 w-4" />

      PDF

    </Button>

  );

}