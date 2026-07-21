export interface CreateDealRequest {

  leadId: string;

}

export interface CreateDealResponse {

  id: string;

  leadId: string;

  assignedTo: string;

  createdBy: string;

  value: number;

}