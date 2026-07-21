export type NegotiationScope =
  | "ITEM"
  | "TOTAL";

export type NegotiationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface NegotiationRequester {

  id: string;

  name: string;

  email: string;

}

export interface NegotiationItem {

  id: string;

  dealId: string;

  refId: string;

  type: "PRODUCT" | "SERVICE";

  itemName: string;

  quantity: number;

  price: number;

  unitPrice: number;

  totalPrice: number;

  createdAt: string;

  deal: {

    id: string;

    subtotal: number;

    discountAmount: number;

    grandTotal: number;

    value: number;

    status: string;

    lead: {

      id: string;

      company: string;

      name: string;

      email: string | null;

    };

  };

}

export interface Negotiation {

  id: string;

  dealId: string;

  transactionItemId: string | null;

  scope: NegotiationScope;

  requestedBy: string;

  approvedBy: string | null;

  status: NegotiationStatus;

  oldAmount: number;

  requestedAmount: number;

  approvedAmount: number | null;

  reason: string | null;

  remarks: string | null;

  reviewedAt: string | null;

  createdAt: string;

  requester: NegotiationRequester;

  item: NegotiationItem | null;

}

//////////////////////////////////////////////////////
// REQUESTS
//////////////////////////////////////////////////////

export interface RequestNegotiationRequest {

  dealId: string;

  scope: NegotiationScope;

  transactionItemId?: string;

  requestedAmount: number;

  reason: string;

}

export interface ApproveNegotiationRequest {

  negotiationId: string;

  approvedAmount?: number;

  remarks?: string;

}

export interface RejectNegotiationRequest {

  negotiationId: string;

  remarks?: string;

}

//////////////////////////////////////////////////////
// RESPONSES
//////////////////////////////////////////////////////

export interface NegotiationActionResponse {

  success: boolean;

  message: string;

}