import { useQuery } from "@tanstack/react-query";

import { activityService } from "../services/activity.service";

export function useActivities() {
  return useQuery({
    queryKey: ["activities"],
    queryFn: activityService.getActivities,
  });
}