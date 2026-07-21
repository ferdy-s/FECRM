export type PaymentType =
  | "FULL"
  | "TERMIN";

export type PaymentMethod =
  | "MANUAL_TRANSFER"
  | "QRIS_MIDTRANS";

export interface CreateInvoiceItem {

  itemId: string;

  itemType:
    | "PRODUCT"
    | "SERVICE";

  quantity: number;

  unitPrice: number;

}

export interface CreateInvoicePayload {

  dealId: string;

  paymentType: PaymentType;

  paymentMethod: PaymentMethod;

  dueDate: string | null;

  percent?: number;

  items: CreateInvoiceItem[];

}