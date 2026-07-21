export type NegotiationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface Negotiation {
  id: string;

  offerNumber: number;

  amount: number;

  note: string;

  status: NegotiationStatus;

  createdAt: string;
}