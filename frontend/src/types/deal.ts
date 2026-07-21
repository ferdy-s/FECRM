export type DealStatus =
  | "OPEN"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export type CollectionStatus =
  | "UNPAID"
  | "PARTIAL"
  | "PAID";

export type NegotiationStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export type NegotiationScope =
  | "ITEM"
  | "TOTAL";

export interface NegotiationRequest {

  id: string;

  dealId: string;

  transactionItemId: string | null;

  scope: NegotiationScope;

  requestedBy: string;

  approvedBy: string | null;

  oldAmount: number;

  requestedAmount: number;

  approvedAmount: number | null;

  reason: string | null;

  remarks: string | null;

  status: NegotiationStatus;

  reviewedAt: string | null;

  createdAt: string;

}

export interface DealCommercialSummary {

  subtotal: number;

  discountAmount: number;

  grandTotal: number;

  collectedAmount: number;

  outstandingAmount: number;

  collectionStatus: CollectionStatus;

}

export interface CreateNegotiationRequest {

  dealId: string;

  scope:
    | "ITEM"
    | "TOTAL";

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

export interface TransactionItem {

  id: string;

  dealId: string;

  type: "PRODUCT" | "SERVICE";

  refId: string;

  itemName: string | null;

  quantity: number;

  price: number;

  unitPrice: number | null;

  totalPrice: number | null;

  createdAt: string;

  negotiations?: NegotiationRequest[];

}

export interface DealInvoice {

  id: string;

  dealId: string;

  parentInvoiceId: string | null;

  invoiceNumber: string | null;

  invoiceKind: "MASTER" | "TERMIN";

  paymentType: "FULL" | "TERMIN";

  paymentMethod:
    | "MANUAL_TRANSFER"
    | "QRIS_MIDTRANS";

  amount: number;

  paidAmount: number;

  remainingAmount: number;

  percent: number | null;

  dueDate: string | null;

  status:
    | "DRAFT"
    | "UNPAID"
    | "PARTIAL"
    | "PAID"
    | "OVERDUE"
    | "CANCELLED";

  qrisUrl: string | null;

  issuedAt: string;

}

export interface Deal {

  id: string;

  leadId: string;

  assignedTo: string;

  createdBy: string;

  subtotal: number;

  discountAmount: number;

  grandTotal: number;

  negotiatedAt?: string | null;

  value: number;

  status: DealStatus;

  collectionStatus: CollectionStatus;

  collectedAmount: number;

  outstandingAmount: number;

  createdAt: string;

  deletedAt: string | null;

   lead?: {

    id: string;

    company: string;

    name: string;

    email: string | null;

    phone: string | null;

  };

  assignee?: {

    id: string;

    name: string;

  };

  creator?: {

    id: string;

    name: string;

  };

  items?: TransactionItem[];

  invoices?: DealInvoice[];

}
export interface CreateDealRequest {

  leadId: string;

}

export interface UpdateDealStatusRequest {

  dealId: string;

  status: DealStatus;

}

export interface AttachProductRequest {

  dealId: string;

  refIds: string[];

  quantity: number;

}

export interface AttachServiceRequest {

  dealId: string;

  refIds: string[];

  quantity: number;

}