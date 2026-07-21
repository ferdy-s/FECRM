"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useInvoiceTerms,
} from "@/hooks/use-invoice-terms";

interface Props {

  invoiceId: string;

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

export function InvoiceTermsTable({
  invoiceId,
}: Props) {

  const {
    data,
  } =
    useInvoiceTerms(invoiceId);

  if (!data) {

    return null;

  }

  return (

    <Card>

      <CardHeader>

        <CardTitle>

          Termin Invoice

        </CardTitle>

      </CardHeader>

      <CardContent>

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>No</TableHead>

              <TableHead>Invoice</TableHead>

              <TableHead>Due Date</TableHead>

              <TableHead>Status</TableHead>

              <TableHead className="text-right">

                Amount

              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {data.terms.map(

              (
                item,
                index,
              ) => (

                <TableRow key={item.id}>

                  <TableCell>

                    {index + 1}

                  </TableCell>

                  <TableCell>

                    {item.invoiceNumber}

                  </TableCell>

                  <TableCell>

                    {item.dueDate ?? "-"}

                  </TableCell>

                  <TableCell>

                    {item.status}

                  </TableCell>

                  <TableCell className="text-right">

                    {currency(item.amount)}

                  </TableCell>

                </TableRow>

              ),

            )}

          </TableBody>

        </Table>

      </CardContent>

    </Card>

  );

}