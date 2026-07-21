import { api } from "./api";

import type {
  SendEmailRequest,
  SendEmailResponse,
} from "@/types/send-email";

//////////////////////////////////////////////////////////////
// WHATSAPP
//////////////////////////////////////////////////////////////

export interface SendWhatsappRequest {
  leadId: string;
  message: string;
}

export interface SendWhatsappResponse {
  id: string;
  leadId: string;
  userId: string;
  channel: "WHATSAPP";
  direction: "OUTBOUND";
  message: string;
  status: string;
  externalId?: string;
  createdAt: string;
}

//////////////////////////////////////////////////////////////
// COMMUNICATION SERVICE
//////////////////////////////////////////////////////////////

export const communicationService = {

  ////////////////////////////////////////////////////////////
  // SEND WHATSAPP
  ////////////////////////////////////////////////////////////

  async sendWhatsapp(
    payload: SendWhatsappRequest,
  ): Promise<SendWhatsappResponse> {

    const response =
      await api.post(
        "/communications/wa",
        payload,
      );

    return response.data.data;

  },

  ////////////////////////////////////////////////////////////
  // SEND EMAIL
  ////////////////////////////////////////////////////////////

  async sendEmail(
    payload: SendEmailRequest,
  ): Promise<SendEmailResponse> {

    const response =
      await api.post(
        "/communications/email",
        payload,
      );

    return response.data.data;

  },

};