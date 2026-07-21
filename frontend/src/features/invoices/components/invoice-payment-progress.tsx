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

import {

Progress,

} from "@/components/ui/progress";

interface Props {

invoice: Invoice;

}

export function InvoicePaymentProgress({

invoice,

}: Props) {

const progress =

invoice.amount === 0

? 0

: (

invoice.paidAmount /

invoice.amount

) * 100;

return (

<Card>

<CardHeader>

<CardTitle>

Collection Progress

</CardTitle>

</CardHeader>

<CardContent>

<div className="space-y-4">

<Progress

value={progress}

/>

<div
className="
flex
justify-between
text-sm
text-muted-foreground
"
>

<span>

{progress.toFixed(1)}%

</span>

<span>

{invoice.status}

</span>

</div>

</div>

</CardContent>

</Card>

);

}