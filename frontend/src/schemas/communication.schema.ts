import { z } from "zod";

export const communicationHistorySchema = z.object({
  leadId: z.string().min(1, "Lead is required"),
});

export type CommunicationHistorySchema =
  z.infer<typeof communicationHistorySchema>;