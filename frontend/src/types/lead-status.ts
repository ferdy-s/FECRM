/**
 * FECRM Lead Status
 * ==========================================================
 * Digunakan untuk seluruh module Lead
 * - Lead Detail
 * - Lead List
 * - Lead Update
 * - Convert Lead
 * ==========================================================
 */

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export interface UpdateLeadStatusRequest {
  leadId: string;
  status: LeadStatus;
}

export interface UpdateLeadStatusResponse {
  id: string;

  status: LeadStatus;

  lastActivityAt: string;

  updatedAt: string;
}