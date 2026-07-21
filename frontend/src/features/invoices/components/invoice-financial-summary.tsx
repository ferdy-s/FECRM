"use client";

import type {
  Invoice,
} from "@/types/invoice";

import {

Card,

CardContent,

CardHeader,

CardTitle,

} from "@/components/ui/card";

interface Props {

invoice: Invoice;

}

function money(
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

export function InvoiceFinancialSummary({

invoice,

}: Props) {

return (

<div
className="
grid
gap-4

md:grid-cols-3
"
>

<Card>

<CardHeader>

<CardTitle>

Total Invoice

</CardTitle>

</CardHeader>

<CardContent>

<p
className="
text-3xl
font-bold
"
>

{money(
invoice.amount,
)}

</p>

</CardContent>

</Card>

<Card>

<CardHeader>

<CardTitle>

Collected

</CardTitle>

</CardHeader>

<CardContent>

<p
className="
text-3xl
font-bold
text-green-600
"
>

{money(
invoice.paidAmount,
)}

</p>

</CardContent>

</Card>

<Card>

<CardHeader>

<CardTitle>

Outstanding

</CardTitle>

</CardHeader>

<CardContent>

<p
className="
text-3xl
font-bold
text-red-600
"
>

{money(
invoice.remainingAmount,
)}

</p>

</CardContent>

</Card>

</div>

);

}