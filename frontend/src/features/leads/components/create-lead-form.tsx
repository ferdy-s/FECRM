"use client";

import { useEffect } from "react";

import { useCreateLeadForm } from "../hooks/use-create-lead-form";

import { useCreateLead } from "@/hooks/use-create-lead";
import { useLeadSources } from "@/hooks/use-lead-sources";
import { useSalesUsers } from "@/hooks/use-sales-users";

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
  Textarea,
} from "@/components/ui/textarea";

import {
  Button,
} from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onSuccess?: () => void;
}

export function CreateLeadForm({
  onSuccess,
}: Props) {

  const form =
    useCreateLeadForm();

  const createLead =
    useCreateLead();

  const {
    data: sources = [],
  } = useLeadSources();

  const {
    data: users = [],
  } = useSalesUsers();

  const onSubmit =
    form.handleSubmit(async (values) => {

      await createLead.mutateAsync(values);

      form.reset({
        country: "Indonesia",
      });

      onSuccess?.();

    });

  useEffect(() => {

    form.setValue(
      "country",
      "Indonesia"
    );

  }, [form]);

  return (

    <Form {...form}>

      <form
        onSubmit={onSubmit}
        className="space-y-6"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  Contact Name
                </FormLabel>

                <FormControl>

                  <Input
                    placeholder="Manda Putri"
                    {...field}
                  />

                </FormControl>

                <FormMessage />

              </FormItem>

            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  Company
                </FormLabel>

                <FormControl>

                  <Input
                    placeholder="PT Hutama Karya"
                    {...field}
                  />

                </FormControl>

                <FormMessage />

              </FormItem>

            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (

              <FormItem>

                <FormLabel>Email</FormLabel>

                <FormControl>

                  <Input
                    type="email"
                    {...field}
                  />

                </FormControl>

              </FormItem>

            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  Phone
                </FormLabel>

                <FormControl>

                  <Input
                    {...field}
                  />

                </FormControl>

              </FormItem>

            )}
          />

        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (

            <FormItem>

              <FormLabel>
                Address
              </FormLabel>

              <Textarea
                rows={3}
                {...field}
              />

            </FormItem>

          )}
        />

        <div className="grid gap-5 md:grid-cols-2">

          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  District
                </FormLabel>

                <Input {...field} />

              </FormItem>

            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  City
                </FormLabel>

                <Input {...field} />

              </FormItem>

            )}
          />

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  Province
                </FormLabel>

                <Input {...field} />

              </FormItem>

            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  Postal Code
                </FormLabel>

                <Input {...field} />

              </FormItem>

            )}
          />

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <FormField
            control={form.control}
            name="sourceId"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  Lead Source
                </FormLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >

                  <SelectTrigger>

                    <SelectValue placeholder="Select source" />

                  </SelectTrigger>

                  <SelectContent>

                    {sources.map((source) => (

                      <SelectItem
                        key={source.id}
                        value={source.id}
                      >
                        {source.name}
                      </SelectItem>

                    ))}

                  </SelectContent>

                </Select>

              </FormItem>

            )}
          />

          <FormField
            control={form.control}
            name="assignedTo"
            render={({ field }) => (

              <FormItem>

                <FormLabel>
                  Assign To
                </FormLabel>

                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >

                  <SelectTrigger>

                    <SelectValue placeholder="Select sales" />

                  </SelectTrigger>

                  <SelectContent>

                    {users.map((user) => (

                      <SelectItem
                        key={user.id}
                        value={user.id}
                      >
                        {user.name}
                      </SelectItem>

                    ))}

                  </SelectContent>

                </Select>

              </FormItem>

            )}
          />

        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={createLead.isPending}
        >
          {createLead.isPending
            ? "Creating..."
            : "Create Lead"}
        </Button>

      </form>

    </Form>

  );

}