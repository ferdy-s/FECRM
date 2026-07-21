"use client";

import { useEffect } from "react";

import { z } from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Loader2,
  Link2,
  ReceiptText,
} from "lucide-react";

import { toast } from "sonner";

import {
  useUploadPayment,
} from "@/hooks/use-upload-payment";

import type {
  Invoice,
} from "@/types/invoice";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

//////////////////////////////////////////////////////
// SCHEMA
//////////////////////////////////////////////////////

const schema = z.object({

  proofUrl: z
    .string()
    .url(
      "Invalid payment proof URL",
    ),

});

type FormValues =
  z.infer<
    typeof schema
  >;

//////////////////////////////////////////////////////
// PROPS
//////////////////////////////////////////////////////

interface Props {

  invoice: Invoice;

  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

}

//////////////////////////////////////////////////////
// COMPONENT
//////////////////////////////////////////////////////

export function UploadPaymentDialog({

  invoice,

  open,

  onOpenChange,

}: Props) {

  const uploadMutation =
    useUploadPayment();

  const form =
    useForm<FormValues>({

      resolver:
        zodResolver(
          schema,
        ),

      defaultValues: {

        proofUrl: "",

      },

    });

  useEffect(() => {

    if (!open) {

      form.reset();

    }

  }, [

    open,

    form,

  ]);

  async function onSubmit(
    values: FormValues,
  ) {

    try {

     await uploadMutation.mutateAsync({

  invoiceId: invoice.id,

  amount: Number(
    invoice.remainingAmount,
  ),

  proofUrl: values.proofUrl,

});

      toast.success(
        "Payment uploaded successfully.",
      );

      onOpenChange(
        false,
      );

      form.reset();

    } catch (error) {

      toast.error(

        error instanceof Error

          ? error.message

          : "Failed to upload payment.",

      );

    }

  }

  const amount =
    Number(
      invoice.remainingAmount,
    );

  const amountLabel =
    new Intl.NumberFormat(

      "id-ID",

      {

        style: "currency",

        currency: "IDR",

        maximumFractionDigits: 0,

      },

    ).format(
      amount,
    );

  return (

    <Dialog

      open={open}

      onOpenChange={
        onOpenChange
      }

    >

      <DialogContent
        className="
          max-w-2xl
        "
      >

        <DialogHeader>

          <DialogTitle>

            Upload Payment

          </DialogTitle>

          <DialogDescription>

            Upload payment proof for the selected invoice.

          </DialogDescription>

        </DialogHeader>

        <Form
          {...form}
        >

          <form
            onSubmit={form.handleSubmit(
              onSubmit,
            )}
            className="
              space-y-6
            "
          >

            <Card>

              <CardContent
                className="
                  space-y-5
                  pt-6
                "
              >
                              <div
                  className="
                    grid
                    gap-5
                    md:grid-cols-2
                  "
                >

                  <div
                    className="
                      space-y-2
                    "
                  >

                    <Label>

                      Invoice Number

                    </Label>

                 <Input

  readOnly

  disabled

  value={
    invoice.invoiceNumber ?? ""
  }

/>

                  </div>

                  <div
                    className="
                      space-y-2
                    "
                  >

                    <Label>

                      Invoice Type

                    </Label>

                    <Input

                      readOnly

                      disabled

                      value={
                        invoice.invoiceKind
                      }

                    />

                  </div>

                </div>

                <div
                  className="
                    grid
                    gap-5
                    md:grid-cols-2
                  "
                >

                  <div
                    className="
                      space-y-2
                    "
                  >

                    <Label>

                      Payment Method

                    </Label>

                    <Input

                      readOnly

                      disabled

                      value={
                        invoice.paymentMethod ===
                        "MANUAL_TRANSFER"

                          ? "Manual Transfer"

                          : "QRIS Midtrans"
                      }

                    />

                  </div>

                  <div
                    className="
                      space-y-2
                    "
                  >

                    <Label>

                      Payment Type

                    </Label>

                    <Input

                      readOnly

                      disabled

                      value={
                        invoice.paymentType
                      }

                    />

                  </div>

                </div>

                <div
                  className="
                    grid
                    gap-5
                    md:grid-cols-2
                  "
                >

                  <div
                    className="
                      space-y-2
                    "
                  >

                    <Label>

                      Payment Amount

                    </Label>

                    <Input

                      readOnly

                      disabled

                      value={
                        amountLabel
                      }

                    />

                  </div>

                  <div
                    className="
                      space-y-2
                    "
                  >

                    <Label>

                      Invoice Status

                    </Label>

                    <Input

                      readOnly

                      disabled

                      value={
                        invoice.status
                      }

                    />

                  </div>

                </div>
                                <FormField
                  control={form.control}
                  name="proofUrl"
                  render={({ field }) => (

                    <FormItem>

                      <FormLabel>

                        Payment Proof URL

                      </FormLabel>

                      <FormControl>

                        <div
                          className="
                            relative
                          "
                        >

                          <Link2
                            className="
                              absolute
                              left-3
                              top-1/2
                              h-4
                              w-4
                              -translate-y-1/2
                              text-muted-foreground
                            "
                          />

                          <Input
                            placeholder="https://..."
                            className="pl-10"
                            {...field}
                          />

                        </div>

                      </FormControl>

                      <FormMessage />

                    </FormItem>

                  )}
                />


                {form.getValues(
                  "proofUrl",
                ) && (

                  <Card
                    className="
                      border-dashed
                    "
                  >

                    <CardContent
                      className="
                        flex
                        items-center
                        gap-3
                        pt-6
                      "
                    >

                      <ReceiptText
                        className="
                          h-5
                          w-5
                          text-primary
                        "
                      />

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        <p
                          className="
                            text-sm
                            font-medium
                          "
                        >

                          Payment Proof

                        </p>

                        <a
                          href={form.getValues(
                            "proofUrl",
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            block
                            truncate
                            text-sm
                            text-primary
                            hover:underline
                          "
                        >

                          {form.getValues(
                            "proofUrl",
                          )}

                        </a>

                      </div>

                    </CardContent>

                  </Card>

                )}

              </CardContent>

            </Card>
                        <DialogFooter>

              <Button
                type="button"
                variant="outline"
                disabled={
                  uploadMutation.isPending
                }
                onClick={() =>
                  onOpenChange(
                    false,
                  )
                }
              >

                Cancel

              </Button>

              <Button
                type="submit"
                disabled={
                  uploadMutation.isPending
                }
              >

                {uploadMutation.isPending ? (

                  <>

                    <Loader2
                      className="
                        mr-2
                        h-4
                        w-4
                        animate-spin
                      "
                    />

                    Uploading...

                  </>

                ) : (

                  "Upload Payment"

                )}

              </Button>

            </DialogFooter>

          </form>

        </Form>

      </DialogContent>

    </Dialog>

  );

}

export default UploadPaymentDialog;