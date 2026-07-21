"use client";

import {
  useForm,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {

  createLeadSchema,

  type CreateLeadInput,

} from "../schema/lead.schema";

export function useCreateLeadForm() {

  return useForm<CreateLeadInput>({

    resolver:
      zodResolver(
        createLeadSchema
      ),

    defaultValues: {

      name: "",

      company: "",

      email: "",

      phone: "",

      address: "",

      district: "",

      city: "",

      province: "",

      postalCode: "",

      country: "Indonesia",

      sourceId: "",

      assignedTo: "",

    },

  });

}