import { api } from "./api";

import type {
  CreateLeadSourceDto,
  LeadSource,
  LeadSourceResponse,
  LeadSourcesResponse,
  UpdateLeadSourceDto,
} from "@/types/lead-source";

const BASE_URL = "/lead-sources";

export const leadSourceService = {
  async getLeadSources(): Promise<LeadSource[]> {
    const { data } =
      await api.get<LeadSourcesResponse>(
        BASE_URL
      );

    return data.data;
  },

  async getLeadSource(
    id: string
  ): Promise<LeadSource> {
    const { data } =
      await api.get<LeadSourceResponse>(
        `${BASE_URL}/${id}`
      );

    return data.data;
  },

  async createLeadSource(
    payload: CreateLeadSourceDto
  ): Promise<LeadSource> {
    const { data } =
      await api.post<LeadSourceResponse>(
        BASE_URL,
        payload
      );

    return data.data;
  },

  async updateLeadSource(
    id: string,
    payload: UpdateLeadSourceDto
  ): Promise<LeadSource> {
    const { data } =
      await api.put<LeadSourceResponse>(
        `${BASE_URL}/${id}`,
        payload
      );

    return data.data;
  },

  async deleteLeadSource(
    id: string
  ): Promise<void> {
    await api.delete(
      `${BASE_URL}/${id}`
    );
  },
};