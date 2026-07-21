export type EmailPriority =
  | "LOW"
  | "NORMAL"
  | "HIGH";

export type EmailTemplate =
  | "FOLLOWUP"
  | "MEETING"
  | "QUOTATION";

export interface SendEmailRequest {

  leadId: string;

  subject: string;

  message: string;

  priority: EmailPriority;

  template: EmailTemplate;

}

export interface SendEmailResponse {

  id: string;

  leadId: string;

  userId: string;

  channel: "EMAIL";

  direction: "OUTBOUND";

  message: string;

  status: string;

  externalId?: string;

  createdAt: string;

}