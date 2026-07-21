//////////////////////////////////////////////////////
// ENUM
//////////////////////////////////////////////////////

export type InvoiceStatus =
  | "DRAFT"
  | "UNPAID"
  | "PARTIAL"
  | "PAID"
  | "OVERDUE"
  | "CANCELLED";

export type InvoiceKind =
  | "MASTER"
  | "TERMIN";

export type PaymentType =
  | "FULL"
  | "TERMIN";

export type PaymentMethod =
  | "MANUAL_TRANSFER"
  | "QRIS_MIDTRANS";

export type InvoiceItemType =
  | "PRODUCT"
  | "SERVICE";

//////////////////////////////////////////////////////
// USER
//////////////////////////////////////////////////////

export interface InvoiceUserSummary {
  id: string;
  name: string;
  email: string;
  role: string;
}

//////////////////////////////////////////////////////
// LEAD
//////////////////////////////////////////////////////

export interface InvoiceLead {
  id: string;
  company: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  status: string;
}

//////////////////////////////////////////////////////
// DEAL
//////////////////////////////////////////////////////

export interface InvoiceDeal {

  //////////////////////////////////////////////////
  // IDENTITY
  //////////////////////////////////////////////////

  id: string;

  leadId: string;

  assignedTo: string;

  createdBy: string;

  //////////////////////////////////////////////////
  // COMMERCIAL
  //////////////////////////////////////////////////

  subtotal: number;

  discountAmount: number;

  grandTotal: number;

  negotiatedAt?: string | null;

  //////////////////////////////////////////////////
  // BACKWARD COMPATIBILITY
  //////////////////////////////////////////////////

  value: number;

  //////////////////////////////////////////////////
  // STATUS
  //////////////////////////////////////////////////

  status: string;

  //////////////////////////////////////////////////
  // COLLECTION
  //////////////////////////////////////////////////

  collectionStatus:
    | "UNPAID"
    | "PARTIAL"
    | "PAID";

  collectedAmount: number;

  outstandingAmount: number;

  //////////////////////////////////////////////////
  // AUDIT
  //////////////////////////////////////////////////

  createdAt: string;

  //////////////////////////////////////////////////
  // RELATION
  //////////////////////////////////////////////////

  lead?: InvoiceLead;

  assignee?: InvoiceUserSummary;

  creator?: InvoiceUserSummary;

}

//////////////////////////////////////////////////////
// ITEM
//////////////////////////////////////////////////////

export interface InvoiceItem {
  id: string;
  invoiceId: string;

  itemType: InvoiceItemType;

  itemName: string;

  quantity: number;

  unitPrice: number;

  totalPrice: number;
}

//////////////////////////////////////////////////////
// PAYMENT
//////////////////////////////////////////////////////

export interface InvoicePayment {
  id: string;

  invoiceId: string;

  amount: number;

  paymentMethod: PaymentMethod;

  status:
    | "PENDING"
    | "VERIFIED"
    | "REJECTED";

  referenceNumber: string | null;

  paidAt: string | null;

  createdAt: string;
}

//////////////////////////////////////////////////////
// NEGOTIATION
//////////////////////////////////////////////////////

export interface InvoiceNegotiation {
  id: string;

  itemName: string;

  quantity: number;

  oldPrice: number;

  approvedPrice: number;

  createdAt: string;

  requester: {
    name: string;
  };

  approver: {
    name: string;
  };
}

//////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////

export interface Invoice {
  id: string;

  dealId: string;

  parentInvoiceId: string | null;

  invoiceNumber: string | null;

  invoiceKind: InvoiceKind;

  paymentType: PaymentType;

  paymentMethod: PaymentMethod;

  amount: number;

  paidAmount: number;

  remainingAmount: number;

  percent: number | null;

  dueDate: string | null;

  status: InvoiceStatus;

  qrisUrl: string | null;

  issuedAt: string;

  deal?: InvoiceDeal;

  items?: InvoiceItem[];

  payments?: InvoicePayment[];

  negotiations?: InvoiceNegotiation[];

  parentInvoice?: Invoice | null;

  childInvoices?: Invoice[];
}