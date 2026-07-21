"use client";

import {
  useState,
} from "react";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Button,
} from "@/components/ui/button";

import {
  Plus,
} from "lucide-react";

import {
  CreateLeadForm,
} from "./create-lead-form";

export function CreateLeadDrawer() {

  const [
    open,
    setOpen,
  ] = useState(false);

  return (

    <Drawer
      open={open}
      onOpenChange={setOpen}
    >

      <DrawerTrigger asChild>

        <Button>

          <Plus className="mr-2 h-4 w-4"/>

          Create Lead

        </Button>

      </DrawerTrigger>

      <DrawerContent>

        <div className="mx-auto w-full max-w-5xl">

          <DrawerHeader>

            <DrawerTitle>

              Create New Lead

            </DrawerTitle>

          </DrawerHeader>

          <div className="p-6">

            <CreateLeadForm
              onSuccess={() => setOpen(false)}
            />

          </div>

        </div>

      </DrawerContent>

    </Drawer>

  );

}