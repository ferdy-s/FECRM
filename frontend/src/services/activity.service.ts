import { api } from "@/services/api";

import type {
  Activity,
  ActivitiesResponse,
} from "@/types/activity";

export const activityService = {
  async getActivities(): Promise<Activity[]> {
    const { data } =
      await api.get<ActivitiesResponse>(
        "/activities"
      );

    return data.data;
  },
};