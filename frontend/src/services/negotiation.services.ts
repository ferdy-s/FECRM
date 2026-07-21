import { api } from "./api";

import type { Invoice,InvoiceDeal,InvoiceItem,InvoicePayment,InvoiceNegotiation } from "@/types/invoice";
import type { CreateInvoiceRequest,CreateInvoiceResponse } from "@/types/create-invoice";

//////////////////////////////////////////////////////
// TYPES
//////////////////////////////////////////////////////

export interface InvoiceProgress{
  invoiceId:string;
  invoiceNumber:string|null;
  amount:number;
  paidAmount:number;
  remainingAmount:number;
  progressPercent:number;
  status:string;
}

export interface InvoiceTermsResponse{
  masterInvoice:Invoice;
  terms:Invoice[];
}

export interface InvoiceBreakdown extends Invoice{
  deal:InvoiceDeal;
  items:InvoiceItem[];
  payments:InvoicePayment[];
  negotiations:InvoiceNegotiation[];
}

//////////////////////////////////////////////////////
// SERVICE
//////////////////////////////////////////////////////

export const invoiceService={

//////////////////////////////////////////////////////
// LIST
//////////////////////////////////////////////////////

async getInvoices():Promise<Invoice[]>{
  const response=await api.get("/invoices");
  return response.data.data;
},

//////////////////////////////////////////////////////
// DETAIL
//////////////////////////////////////////////////////

async getInvoice(id:string):Promise<InvoiceBreakdown>{
  const response=await api.get(`/invoices/${id}`);
  return response.data.data;
},

//////////////////////////////////////////////////////
// CREATE
//////////////////////////////////////////////////////

async createInvoice(payload:CreateInvoiceRequest):Promise<CreateInvoiceResponse>{
  const response=await api.post("/invoices",payload);
  return response.data.data;
},

//////////////////////////////////////////////////////
// TERMS
//////////////////////////////////////////////////////

async getTerms(invoiceId:string):Promise<InvoiceTermsResponse>{
  const response=await api.get(`/invoices/${invoiceId}/terms`);
  return response.data.data;
},

//////////////////////////////////////////////////////
// PROGRESS
//////////////////////////////////////////////////////

async getProgress(invoiceId:string):Promise<InvoiceProgress>{
  const response=await api.get(`/invoices/${invoiceId}/progress`);
  return response.data.data;
},

//////////////////////////////////////////////////////
// BREAKDOWN
//////////////////////////////////////////////////////

async getBreakdown(invoiceId:string):Promise<InvoiceBreakdown>{
  const response=await api.get(`/invoices/${invoiceId}/breakdown`);
  return response.data.data;
},

//////////////////////////////////////////////////////
// DOWNLOAD PDF
//////////////////////////////////////////////////////

async downloadPdf(invoiceId:string):Promise<Blob>{
  const response=await api.get(
    `/invoices/${invoiceId}/pdf`,
    {
      responseType:"blob",
    },
  );
  return response.data;
},

//////////////////////////////////////////////////////
// OVERDUE
//////////////////////////////////////////////////////

async getOverdueInvoices():Promise<Invoice[]>{
  const response=await api.get("/invoices/overdue");
  return response.data.data;
},

//////////////////////////////////////////////////////
// DELETE
//////////////////////////////////////////////////////

async deleteInvoice(invoiceId:string):Promise<void>{
  await api.delete(`/invoices/${invoiceId}`);
},

//////////////////////////////////////////////////////
// CANCEL
//////////////////////////////////////////////////////

async cancelInvoice(invoiceId:string):Promise<Invoice>{
  const response=await api.patch(
    `/invoices/${invoiceId}/cancel`,
  );
  return response.data.data;
},

//////////////////////////////////////////////////////
// RESEND
//////////////////////////////////////////////////////

async resendInvoice(invoiceId:string):Promise<Invoice>{
  const response=await api.post(
    `/invoices/${invoiceId}/resend`,
  );
  return response.data.data;
},

//////////////////////////////////////////////////////
// MARK AS PAID
//////////////////////////////////////////////////////

async markAsPaid(invoiceId:string):Promise<Invoice>{
  const response=await api.patch(
    `/invoices/${invoiceId}/paid`,
  );
  return response.data.data;
},

}