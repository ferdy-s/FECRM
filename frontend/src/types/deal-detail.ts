import type {
  DealStatus,
  CollectionStatus,
} from "./deal";

export interface DealLead {

  id: string;

  company: string;

  name: string;

  email: string | null;

  phone: string | null;

}

export interface DealInvoice {

  id: string;

  invoiceNumber: string | null;

  amount: number;

  paidAmount: number;

  remainingAmount: number;

  status: string;

  issuedAt: string;

}

export interface DealDetail {

  id: string;

  value: number;

  status: DealStatus;

  collectionStatus: CollectionStatus;

  collectedAmount: number;

  outstandingAmount: number;

  createdAt: string;

  lead: DealLead;

  invoices: DealInvoice[];

}