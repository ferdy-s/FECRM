//////////////////////////////////////////////////////
// ENUM
//////////////////////////////////////////////////////

export type PaymentStatus =
  | "PENDING"
  | "VERIFIED"
  | "REJECTED";

export type PaymentMethod =
  | "MANUAL_TRANSFER"
  | "QRIS_MIDTRANS";

export type InvoiceKind =
  | "MASTER"
  | "TERMIN";

export type InvoiceStatus =
  | "UNPAID"
  | "PARTIAL"
  | "PAID"
  | "OVERDUE";

export type PaymentType =
  | "FULL"
  | "TERMIN";

//////////////////////////////////////////////////////
// USER
//////////////////////////////////////////////////////

export interface PaymentUserSummary {
  id: string;

  name: string;

  email: string;

  role: string;

  isActive: boolean;

  createdAt: string;

  deletedAt: string | null;
}

//////////////////////////////////////////////////////
// DEAL
//////////////////////////////////////////////////////

export interface PaymentDealSummary {
  id: string;

  leadId: string;

  value: number;

  collectedAmount: number;

  outstandingAmount: number;

  collectionStatus: string;
}

//////////////////////////////////////////////////////
// INVOICE
//////////////////////////////////////////////////////

export interface PaymentInvoiceSummary {
  id: string;

  dealId: string;

  parentInvoiceId: string | null;

  invoiceNumber: string;

  invoiceKind: InvoiceKind;

  paymentType: PaymentType;

  paymentMethod: PaymentMethod;

  amount: number;

  paidAmount: number;

  remainingAmount: number;

  percent: number | null;

  dueDate: string | null;

  status: InvoiceStatus;

  midtransOrderId: string | null;

  qrisUrl: string | null;

  issuedAt: string;

  deletedAt: string | null;

  deal?: PaymentDealSummary;
}

//////////////////////////////////////////////////////
// MIDTRANS
//////////////////////////////////////////////////////

export interface MidtransCustomerDetails {
  full_name: string;

  email: string;

  phone: string;
}

export interface MidtransGatewayResponse {
  issuer: string;

  pop_id: string;

  acquirer: string;

  currency: string;

  order_id: string;

  expiry_time: string;

  merchant_id: string;

  status_code: string;

  fraud_status: string;

  gross_amount: string;

  payment_type: string;

  signature_key: string;

  status_message: string;

  transaction_id: string;

  settlement_time: string;

  transaction_time: string;

  transaction_type: string;

  transaction_status: string;

  customer_details: MidtransCustomerDetails;
}

//////////////////////////////////////////////////////
// MAIN
//////////////////////////////////////////////////////

export interface Payment {
  id: string;

  invoiceId: string;

  amount: number;

  paymentMethod: PaymentMethod;

  proofUrl: string | null;

  referenceNumber: string | null;

  status: PaymentStatus;

  uploadedBy: string | null;

  verifiedBy: string | null;

  verifiedAt: string | null;

  paidAt: string | null;

  midtransTransactionId: string | null;

  gatewayResponse: MidtransGatewayResponse | null;

  createdAt: string;

  invoice?: PaymentInvoiceSummary;

  uploader?: PaymentUserSummary | null;

  verifier?: PaymentUserSummary | null;
}