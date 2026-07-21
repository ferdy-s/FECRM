export type DealStatus =
  | "OPEN"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export interface Deal {
  id: string;

  company: string;

  value: number;

  status: DealStatus;

  assignedTo: string;

  createdAt: string;
}