import { useQuery } from "@tanstack/react-query";

import { serviceService } from "@/services/service.service";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => serviceService.list(),
  });
}