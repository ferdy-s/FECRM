import type {
  PaymentStatus,
  InvoiceStatus,
} from "./payment";

//////////////////////////////////////////////////////
// REQUEST
//////////////////////////////////////////////////////

export interface VerifyPaymentRequest {
  paymentId: string;

  proofUrl: string;

  status: Extract<
    PaymentStatus,
    "VERIFIED"
  >;
}

//////////////////////////////////////////////////////
// RESPONSE
//////////////////////////////////////////////////////

export interface VerifyPaymentResponse {
  paymentStatus: PaymentStatus;

  invoiceStatus: InvoiceStatus;
}