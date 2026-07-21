"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  createLeadSourceSchema,
  type CreateLeadSourceSchema,
} from "@/schemas/lead-source.schema";

interface LeadSourceFormProps {
  defaultValues?: CreateLeadSourceSchema;

  onSubmit: (
    values: CreateLeadSourceSchema
  ) => Promise<void> | void;

  onCancel: () => void;

  isSubmitting?: boolean;

  submitLabel?: string;
}

export function LeadSourceForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Save",
}: LeadSourceFormProps) {
  const form =
    useForm<CreateLeadSourceSchema>({
      resolver: zodResolver(
        createLeadSourceSchema
      ),

      defaultValues:
        defaultValues ?? {
          name: "",
        },
    });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [
    defaultValues,
    form,
  ]);

  const handleSubmit =
    async (
      values: CreateLeadSourceSchema
    ) => {
      await onSubmit(values);
    };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          handleSubmit
        )}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({
            field,
          }) => (
            <FormItem>
              <FormLabel>
                Source Name
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Enter source name"
                  autoComplete="off"
                  disabled={
                    isSubmitting
                  }
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={
              isSubmitting
            }
            onClick={
              onCancel
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={
              isSubmitting
            }
          >
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}

            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}