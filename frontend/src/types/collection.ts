export type CollectionStatus =
  | "UNPAID"
  | "PARTIAL"
  | "OVERDUE";

export type CollectionPriority =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";


export interface Collection {
  invoiceId: string;
  invoiceNumber: string;

  company: string;
  customer: string;

  dueDate: string;

  status: CollectionStatus;

  amount: number;
  remainingAmount: number;

  daysOverdue: number;

  priority: CollectionPriority;

  invoiceKind:
    | "MASTER"
    | "TERMIN";

paymentType:
    | "FULL_PAYMENT"
    | "TERMIN";

paidAmount: number;
}

export interface CollectionResponse {
  success: boolean;
  data: Collection[];
}