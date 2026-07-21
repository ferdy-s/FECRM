import { api } from "./api";

import type {
  NegotiationNote,
  CreateNegotiationNoteRequest,
} from "@/types/negotiation-note";

import type {
  Negotiation,
  ApproveNegotiationRequest,
  RejectNegotiationRequest,
  NegotiationActionResponse,
} from "@/types/negotiation";

import type {
  RequestNegotiationRequest,
} from "@/types/request-negotiation";

import type {
  NegotiationDashboard,
} from "@/types/negotiation-dashboard";

export const negotiationService = {

  //////////////////////////////////////////////////////
  // NOTES
  //////////////////////////////////////////////////////

  async getNotes(
    leadId: string,
  ): Promise<NegotiationNote[]> {

    const response =
      await api.get(
        "/negotiations/notes",
        {
          params: {
            leadId,
          },
        },
      );

    return response.data.data;

  },

  async createNote(
    payload: CreateNegotiationNoteRequest,
  ): Promise<NegotiationNote> {

    const response =
      await api.post(
        "/negotiations/note",
        payload,
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // REQUEST NEGOTIATION
  //////////////////////////////////////////////////////

  async request(
    payload: RequestNegotiationRequest,
  ): Promise<Negotiation> {

    const response =
      await api.post(
        "/price-negotiations/request",
        payload,
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // PENDING
  //////////////////////////////////////////////////////

  async pending(): Promise<Negotiation[]> {

    const response =
      await api.get(
        "/price-negotiations/pending",
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // DASHBOARD
  //////////////////////////////////////////////////////

  async dashboard(): Promise<NegotiationDashboard> {

    const response =
      await api.get(
        "/price-negotiations/dashboard",
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // HISTORY
  //////////////////////////////////////////////////////

  async history(): Promise<Negotiation[]> {

    const response =
      await api.get(
        "/price-negotiations/history",
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // APPROVE
  //////////////////////////////////////////////////////

  async approve(
    payload: ApproveNegotiationRequest,
  ): Promise<NegotiationActionResponse> {

    const response =
      await api.put(
        "/price-negotiations/approve",
        payload,
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // REJECT
  //////////////////////////////////////////////////////

  async reject(
    payload: RejectNegotiationRequest,
  ): Promise<NegotiationActionResponse> {

    const response =
      await api.post(
        "/price-negotiations/reject",
        payload,
      );

    return response.data.data;

  },

};