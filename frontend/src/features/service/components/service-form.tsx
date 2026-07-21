"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
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
  useCreateService,
  useUpdateService,
} from "@/hooks/use-service-management";
import {
  createServiceSchema,
  type CreateServiceFormValues,
} from "@/schemas/service.schema";

import type { Service } from "@/types/service";

interface ServiceFormProps {
  service?: Service;
  onSuccess?: () => void;
}

export function ServiceForm({
  service,
  onSuccess,
}: ServiceFormProps) {
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();

  const isEditing = Boolean(service);

const form = useForm<CreateServiceFormValues>({
  resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (service) {
      form.reset({
        name: service.name,
        price: Number(service.price),
      });
    }
  }, [service, form]);

  async function onSubmit(
  values: CreateServiceFormValues
) {
    if (isEditing && service) {
      await updateMutation.mutateAsync({
        id: service.id,
        data: values,
      });
    } else {
      await createMutation.mutateAsync(values);
    }

    form.reset();

    onSuccess?.();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Service Name
              </FormLabel>

              <FormControl>
                <Input
                  placeholder="Website Development"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Price
              </FormLabel>

              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="500000"
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(
                      Number(e.target.value)
                    )
                  }
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={
              createMutation.isPending ||
              updateMutation.isPending
            }
          >
            {isEditing
              ? "Update Service"
              : "Create Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
}