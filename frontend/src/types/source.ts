export interface LeadSource {
  id: string;

  name: string;
}

export interface LeadSourceResponse {
  success: boolean;

  data: LeadSource[];
}