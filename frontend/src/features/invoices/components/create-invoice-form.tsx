"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import { useCreateInvoice } from "@/hooks/use-create-invoice";

import { zodResolver } from "@hookform/resolvers/zod";

import { useInvoiceableDeals } from "@/hooks/use-invoiceable-deals";
import {
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";

import {
  CalendarIcon,
  Plus,
    Trash2,
} from "lucide-react";

import {
  Progress,
} from "@/components/ui/progress";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Calendar,
} from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Separator,
} from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import {
  createInvoiceSchema,
  type CreateInvoiceFormValues,
} from "../schemas/create-invoice.schema";

interface CreateInvoiceFormProps {
  onSuccess?: () => void;
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

export function CreateInvoiceForm({
  onSuccess,
}: CreateInvoiceFormProps) {
const form = useForm<CreateInvoiceFormValues>({
  resolver: zodResolver(createInvoiceSchema),
  defaultValues: {
    dealId: "",
    paymentType: "FULL",
    paymentMethod: "MANUAL_TRANSFER",
    terms: [],
  },
  mode: "onChange",
});

const {
  control,
  handleSubmit,
  formState: { isSubmitting },
} = form;

const {
  fields,
  append,
  remove,
} = useFieldArray({
  control,
  name: "terms",
});

const paymentType = useWatch({
  control,
  name: "paymentType",
});

const watchedTerms =
  useWatch({
    control,
    name: "terms",
  });

const terms = useMemo(
  () => watchedTerms ?? [],
  [watchedTerms],
);

const totalPercent = useMemo(
  () =>
    terms.reduce(
      (total, term) => total + (term.percent || 0),
      0,
    ),
  [terms],
);

const remainingPercent =
  100 - totalPercent;

const isValidTerm =
  paymentType === "FULL"
    ? true
    : totalPercent === 100 &&
      terms.length > 0;

const createInvoice = useCreateInvoice();

const {
  data: deals = [],
  isPending: loadingDeals,
} = useInvoiceableDeals();

const selectedDealId =
  useWatch({
    control,
    name: "dealId",
  });
const selectedDeal = useMemo(
  () =>
    deals.find(
      (deal) =>
        deal.id === selectedDealId,
    ),
  [
    deals,
    selectedDealId,
  ],
);

const onSubmit = async (
  values: CreateInvoiceFormValues,
) => {
  try {
    await createInvoice.mutateAsync({
      dealId: values.dealId,
      paymentType: values.paymentType,
      paymentMethod: values.paymentMethod,
      terms:
        values.paymentType === "TERMIN"
          ? values.terms
          : undefined,
    });

    toast.success("Invoice created successfully.");

    form.reset({
      dealId: "",
      paymentType: "FULL",
      paymentMethod: "MANUAL_TRANSFER",
      terms: [],
    });

    onSuccess?.();
  } catch {
    toast.error("Failed to create invoice.");
  }
};
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(
          onSubmit,
        )}
        className="space-y-6"
      >
        <Card>
  <CardHeader>
    <CardTitle>
      Deal Information
    </CardTitle>
  </CardHeader>

  <CardContent className="grid gap-6 xl:grid-cols-12">

    <FormField
      control={control}
      name="dealId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Deal
          </FormLabel>

          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Deal" />
              </SelectTrigger>
            </FormControl>

           <SelectContent>

  {loadingDeals ? (

    <SelectItem value="loading" disabled>
      Loading deals...
    </SelectItem>

  ) : deals.length === 0 ? (

    <SelectItem value="empty" disabled>
      No invoiceable deal
    </SelectItem>

  ) : (

    deals.map((deal) => (

     <SelectItem
  key={deal.id}
  value={deal.id}
>
  {deal.lead?.company ?? "Unknown Company"}
</SelectItem>

    ))

  )}

</SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />

  </CardContent>
</Card>

<Card>
  <CardHeader>
    <CardTitle>
      Payment Information
    </CardTitle>
  </CardHeader>

  <CardContent className="grid gap-6 lg:grid-cols-2">

    <FormField
      control={control}
      name="paymentType"
      render={({ field }) => (
        <FormItem>

          <FormLabel>
            Payment Type
          </FormLabel>

          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>

            <SelectContent>

              <SelectItem value="FULL">
                Full Payment
              </SelectItem>

              <SelectItem value="TERMIN">
                Termin Payment
              </SelectItem>

            </SelectContent>

          </Select>

          <FormMessage />

        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="paymentMethod"
      render={({ field }) => (
        <FormItem>

          <FormLabel>
            Payment Method
          </FormLabel>

          <Select
            value={field.value}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>

            <SelectContent>

              <SelectItem value="MANUAL_TRANSFER">
                Manual Transfer
              </SelectItem>

              <SelectItem value="QRIS_MIDTRANS">
                QRIS Midtrans
              </SelectItem>

            </SelectContent>

          </Select>

          <FormMessage />

        </FormItem>
      )}
    />

   {paymentType === "TERMIN" && (
  <>
    {fields.map((item, index) => (
      <Card
        key={item.id}
        className="border-dashed"
      >
        <CardContent className="grid gap-5 pt-6 md:grid-cols-2">
          <FormField
            control={control}
            name={`terms.${index}.percent`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Termin Percentage
                </FormLabel>

                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    placeholder="50"
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        Number(e.target.value),
                      )
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`terms.${index}.dueDate`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Due Date
                </FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        !field.value &&
                          "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />

                      {field.value
                        ? new Date(
                            field.value,
                          ).toLocaleDateString(
                            "id-ID",
                          )
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-auto p-0"
                  >
                  <Calendar
  mode="single"
  selected={
    field.value
      ? new Date(field.value)
      : undefined
  }
  onSelect={(date) =>
    field.onChange(
      date
        ? date
            .toISOString()
            .split("T")[0]
        : "",
    )
  }
/>
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => remove(index)}
            >
              Remove Termin
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}

    <Button
      type="button"
      variant="outline"
      onClick={() =>
        append({
          percent: 0,
          dueDate: "",
        })
      }
    >
      <Plus className="mr-2 h-4 w-4" />
      Add Payment Term
    </Button>
  </>
)}
    
   {selectedDeal && (
  <Card className="border-dashed bg-muted/30">
    <CardContent className="pt-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <p className="text-xs text-muted-foreground">
            Deal ID
          </p>
          <p className="font-semibold break-all">
            {selectedDeal.id}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Company
          </p>
          <p className="font-semibold">
            {selectedDeal.lead?.company ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Deal Value
          </p>
          <p className="font-semibold">
            {currency(selectedDeal.value)}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Collection
          </p>
          <p className="font-semibold">
            {selectedDeal.collectionStatus}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Collected
          </p>
          <p className="font-semibold">
            {currency(
              selectedDeal.collectedAmount,
            )}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Outstanding
          </p>
          <p className="font-semibold">
            {currency(
              selectedDeal.outstandingAmount,
            )}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
)}
  </CardContent>
</Card>

<Separator />
<div className="sticky bottom-0 flex items-center justify-between rounded-lg border bg-background p-4 shadow-sm">

    <Card>
  <CardHeader>
    <CardTitle>
      Payment Summary
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-4">

    <Progress
      value={Math.min(
        totalPercent,
        100,
      )}
    />

    <div className="grid grid-cols-3 gap-4 text-center">

      <div>
        <p className="text-xs text-muted-foreground">
          Terms
        </p>

        <p className="text-xl font-semibold">
          {terms.length}
        </p>
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          Allocated
        </p>

        <p className="text-xl font-semibold">
          {totalPercent}%
        </p>
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          Remaining
        </p>

        <p
          className={
            remainingPercent === 0
              ? "text-xl font-semibold text-green-600"
              : "text-xl font-semibold text-red-600"
          }
        >
          {remainingPercent}%
        </p>
      </div>

    </div>

    {paymentType === "TERMIN" &&
      !isValidTerm && (

      <Alert variant="destructive">

        <AlertDescription>

          Total payment terms must equal exactly 100%.

        </AlertDescription>

      </Alert>

    )}

    {paymentType === "TERMIN" &&
      isValidTerm && (

      <Alert>

        <AlertDescription>

          Payment terms are valid.

        </AlertDescription>

      </Alert>

    )}

  </CardContent>

</Card>

  <div className="flex items-center gap-3">

    <Button
      type="button"
      variant="outline"
      disabled={
        isSubmitting ||
        createInvoice.isPending
      }
      onClick={() => {
        form.reset();

        onSuccess?.();
      }}
    >
      Cancel
    </Button>

    <Button
  type="submit"
  disabled={
    isSubmitting ||
    createInvoice.isPending ||
    !isValidTerm
  }
>
     {isSubmitting ||
createInvoice.isPending
? "Creating Invoice..."
: "Create Invoice"}
    </Button>

  </div>

</div>

</form>

</Form>

);

}

export default CreateInvoiceForm;