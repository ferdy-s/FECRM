import { api } from "./api";

import type { Payment } from "@/types/payment";

import type {
  UploadPaymentRequest,
  UploadPaymentResponse,
} from "@/types/create-payment";

import type {
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from "@/types/verify-payment";

import type {
  RejectPaymentRequest,
  RejectPaymentResponse,
} from "@/types/reject-payment";

//////////////////////////////////////////////////////
// QRIS
//////////////////////////////////////////////////////

export interface GenerateQrisResponse {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  orderId: string;
  qrisUrl: string;
  token: string;
}

//////////////////////////////////////////////////////
// SERVICE
//////////////////////////////////////////////////////

export const paymentService = {
  //////////////////////////////////////////////////////
  // GENERATE QRIS
  //////////////////////////////////////////////////////

  async generateQris(
    invoiceId: string,
  ): Promise<GenerateQrisResponse> {
    const response = await api.post(
      "/payments/qris",
      {
        invoiceId,
      },
    );

    return response.data.data;
  },

  //////////////////////////////////////////////////////
// DETAIL
//////////////////////////////////////////////////////

async getPayment(
  paymentId: string,
): Promise<Payment> {
  const response = await api.get(
    `/payments/${paymentId}`,
  );

  return response.data.data;
},

  //////////////////////////////////////////////////////
  // LIST
  //////////////////////////////////////////////////////

  async getPayments(): Promise<Payment[]> {
    const response = await api.get(
      "/payments",
    );

    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // UPLOAD
  //////////////////////////////////////////////////////

  async uploadPayment(
    payload: UploadPaymentRequest,
  ): Promise<UploadPaymentResponse> {
    const response = await api.post(
      "/payments",
      payload,
    );

    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // VERIFY
  //////////////////////////////////////////////////////

  async verifyPayment(
    payload: VerifyPaymentRequest,
  ): Promise<VerifyPaymentResponse> {
    const response = await api.patch(
      "/payments/verify",
      payload,
    );

    return response.data.data;
  },

  //////////////////////////////////////////////////////
  // REJECT
  //////////////////////////////////////////////////////

 async rejectPayment(
  payload: RejectPaymentRequest,
): Promise<RejectPaymentResponse> {
  const response = await api.put(
    `/payments/reject/${payload.paymentId}`,
    {
      reason: payload.reason,
    },
  );

  return response.data.data;
},
};