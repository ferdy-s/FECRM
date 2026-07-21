export type NegotiationScope =
  | "ITEM"
  | "TOTAL";

export interface RequestNegotiationRequest {

  dealId: string;

  scope: NegotiationScope;

  transactionItemId?: string;

  requestedAmount: number;

  reason: string;

}