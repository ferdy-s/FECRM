import { api } from "./api";

import type {
  CommunicationHistoryParams,
  CommunicationHistoryResponse,
  CommunicationLog,
} from "@/types/communication";

const BASE_URL = "/communications";

export const communicationService = {
  async getHistory(
    params: CommunicationHistoryParams
  ): Promise<CommunicationLog[]> {
    const { data } =
      await api.get<CommunicationHistoryResponse>(
        `${BASE_URL}/history`,
        {
          params,
        }
      );

    return data.data;
  },
};