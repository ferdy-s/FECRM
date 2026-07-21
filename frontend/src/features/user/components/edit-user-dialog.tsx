"use client";

import {
  useEffect,
} from "react";

import {
  z,
} from "zod";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  UserRole,
  type User,
  type UpdateUserDto,
} from "@/types/user";

import {
  useUpdateUser,
} from "@/hooks/use-update-user";

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
  Input,
} from "@/components/ui/input";

import {
  Switch,
} from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface EditUserDialogProps {

  user: User;

  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

}

const formSchema = z.object({

  name: z
    .string()
    .trim()
    .min(
      1,
      "Name is required",
    ),

  email: z
    .email(
      "Invalid email address",
    ),

  role: z.nativeEnum(
    UserRole,
  ),

  isActive: z.boolean(),

});

type FormValues =
  z.infer<
    typeof formSchema
  >;

export function EditUserDialog({

  user,

  open,

  onOpenChange,

}: EditUserDialogProps) {

  const mutation =
    useUpdateUser();

  const form =
    useForm<FormValues>({

      resolver:
        zodResolver(
          formSchema,
        ),

      defaultValues: {

        name: "",

        email: "",

        role:
          UserRole.SALES,

        isActive: true,

      },

      mode:
        "onChange",

    });

  useEffect(() => {

    if (!open) {
      return;
    }

    form.reset({

      name:
        user.name,

      email:
        user.email,

      role:
        user.role,

      isActive:
        user.isActive,

    });

  }, [
    open,
    user,
    form,
  ]);

  function onSubmit(
    values: FormValues,
  ) {

    const payload:
      Partial<UpdateUserDto> =
        {};

    if (
      values.name !==
      user.name
    ) {

      payload.name =
        values.name;

    }

    if (
      values.email !==
      user.email
    ) {

      payload.email =
        values.email;

    }

    if (
      values.role !==
      user.role
    ) {

      payload.role =
        values.role;

    }

    if (
      values.isActive !==
      user.isActive
    ) {

      payload.isActive =
        values.isActive;

    }

    if (
      Object.keys(
        payload,
      ).length === 0
    ) {

      onOpenChange(
        false,
      );

      return;

    }

    mutation.mutate(

      {

        id: user.id,

        data: payload,

      },

      {

        onSuccess: () => {

          onOpenChange(
            false,
          );

        },

      },

    );

  }

  return (

    <Dialog

      open={open}

      onOpenChange={
        onOpenChange
      }

    >

      <DialogContent className="sm:max-w-xl">

        <DialogHeader>

          <DialogTitle>

            Edit User

          </DialogTitle>

          <DialogDescription>

            Update user information,
            permissions and
            account status.

          </DialogDescription>

        </DialogHeader>

        <Form
          {...form}
        >

          <form
            onSubmit={form.handleSubmit(
              onSubmit,
            )}
            className="space-y-6"
          >

            <FormField
  control={form.control}
  name="name"
  render={({ field }) => (

    <FormItem>

      <FormLabel>

        Full Name

      </FormLabel>

      <FormControl>

        <Input

          placeholder="Enter full name"

          disabled={
            mutation.isPending
          }

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

      <FormLabel>

        Email Address

      </FormLabel>

      <FormControl>

        <Input

          type="email"

          placeholder="Enter email"

          disabled={
            mutation.isPending
          }

          {...field}

        />

      </FormControl>

      <FormMessage />

    </FormItem>

  )}
/>

<FormField
  control={form.control}
  name="role"
  render={({ field }) => (

    <FormItem>

      <FormLabel>

        Role

      </FormLabel>

      <FormControl>

        <select

          value={field.value}

          disabled={
            mutation.isPending
          }

          onChange={(e) =>
            field.onChange(
              e.target.value,
            )
          }

          className="
            flex
            h-10
            w-full
            rounded-md
            border
            border-input
            bg-background
            px-3
            py-2
            text-sm
            ring-offset-background
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-ring
          "

        >

          {Object.values(
            UserRole,
          ).map(
            (role) => (

              <option
                key={role}
                value={role}
              >

                {role}

              </option>

            ),
          )}

        </select>

      </FormControl>

      <FormMessage />

    </FormItem>

  )}
/>

<FormField
  control={form.control}
  name="isActive"
  render={({ field }) => (

    <FormItem
      className="
        flex
        flex-row
        items-center
        justify-between
        rounded-lg
        border
        p-4
      "
    >

      <div>

        <FormLabel>

          User Status

        </FormLabel>

        <p
          className="
            text-sm
            text-muted-foreground
          "
        >

          Enable or disable
          this account.

        </p>

      </div>

      <FormControl>

        <Switch

          checked={
            field.value
          }

          disabled={
            mutation.isPending
          }

          onCheckedChange={
            field.onChange
          }

        />

      </FormControl>

    </FormItem>

  )}
/>

<div
  className="
    grid
    gap-4
    rounded-lg
    border
    bg-muted/30
    p-4
    md:grid-cols-2
  "
>

  <div>

    <p
      className="
        text-xs
        uppercase
        tracking-wide
        text-muted-foreground
      "
    >

      User ID

    </p>

    <p
      className="
        mt-1
        break-all
        text-sm
        font-medium
      "
    >

      {user.id}

    </p>

  </div>

  <div>

    <p
      className="
        text-xs
        uppercase
        tracking-wide
        text-muted-foreground
      "
    >

      Created At

    </p>

    <p
      className="
        mt-1
        text-sm
        font-medium
      "
    >

      {new Date(
        user.createdAt,
      ).toLocaleString(
        "id-ID",
        {

          dateStyle:
            "medium",

          timeStyle:
            "short",

        },
      )}

    </p>

  </div>

</div>

<DialogFooter>

  <Button
    type="button"
    variant="outline"
    onClick={() => {

      form.reset();

      onOpenChange(
        false,
      );

    }}
    disabled={
      mutation.isPending
    }
  >

    Cancel

  </Button>

  <Button
    type="submit"
    disabled={
      mutation.isPending ||
      !form.formState.isDirty
    }
  >

    {mutation.isPending
      ? "Saving..."
      : "Save Changes"}

  </Button>

</DialogFooter>

          </form>

        </Form>

      </DialogContent>

    </Dialog>

  );

}