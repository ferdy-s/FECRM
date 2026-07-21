export type CommunicationChannel =
  | "WA"
  | "EMAIL";

export type CommunicationDirection =
  | "OUTBOUND"
  | "INBOUND";

export type CommunicationStatus =
  | "PENDING"
  | "SENT"
  | "DELIVERED"
  | "READ"
  | "FAILED";

export interface CommunicationLog {
  id: string;

  leadId: string;

  userId: string;

  channel: CommunicationChannel;

  direction: CommunicationDirection;

  message: string;

  status: CommunicationStatus;

  externalId: string | null;

  createdAt: string;

  updatedAt: string;
}

export interface CommunicationHistoryResponse {
  success: boolean;

  data: CommunicationLog[];
}

export interface CommunicationHistoryParams {
  leadId: string;
}