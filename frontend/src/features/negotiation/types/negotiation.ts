export type NegotiationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface Negotiation {
  id: string;

  dealName: string;

  customerName: string;

  itemName: string;

  requester: string;

  approver?: string;

  originalPrice: number;

  requestedPrice: number;

  approvedPrice?: number;

  status: NegotiationStatus;

  createdAt: string;
}