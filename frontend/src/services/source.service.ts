import { api } from "./api";

import type {
  LeadSource,
} from "@/types/source";

export const sourceService = {

  //////////////////////////////////////////////////////
  // GET LEAD SOURCES
  //////////////////////////////////////////////////////

  async getLeadSources():
    Promise<LeadSource[]> {

    const response =
      await api.get(
        "/lead-sources",
      );

    return response.data.data;

  },

};