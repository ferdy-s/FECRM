export type ActivityType =
  | "CALL"
  | "EMAIL"
  | "WHATSAPP"
  | "MEETING";

export interface LeadActivity {
  id: string;

  type: ActivityType;

  title: string;

  description: string;

  createdBy: string;

  createdAt: string;
}