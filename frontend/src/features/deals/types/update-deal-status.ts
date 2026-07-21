import type {
  DealStatus,
} from "./deal-status";

export interface UpdateDealStatusRequest {

  dealId: string;

  status: DealStatus;

}