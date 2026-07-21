export interface LeadSource {
  id: string;
  name: string;
}

export interface CreateLeadSourceDto {
  name: string;
}

export interface UpdateLeadSourceDto {
  name: string;
}

export interface LeadSourceResponse {
  success: boolean;
  message: string;
  data: LeadSource;
}

export interface LeadSourcesResponse {
  success: boolean;
  message: string;
  data: LeadSource[];
}