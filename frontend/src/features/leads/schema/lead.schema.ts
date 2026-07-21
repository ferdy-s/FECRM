import {
  z,
} from "zod";

export const createLeadSchema =
  z.object({

    name:
      z.string()
      .min(3),

    company:
      z.string()
      .min(3),

    email:
      z.string()
      .email(),

    phone:
      z.string()
      .min(6),

    address:
      z.string(),

    district:
      z.string(),

    city:
      z.string(),

    province:
      z.string(),

    postalCode:
      z.string(),

    country:
      z.string(),

    sourceId:
      z.string(),

    assignedTo:
      z.string(),

  });

export type CreateLeadInput =
  z.infer<
    typeof createLeadSchema
  >;