export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export interface Lead {
  id: string;

  company: string;

  contactPerson: string;

  email: string;

  phone: string;

  source: string;

  status: LeadStatus;

  value: number;

  assignedTo: string;

  createdAt: string;
}