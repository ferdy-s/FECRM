import { api } from "./api";

import type {
  Service,
} from "@/types/service";

export const serviceService = {

  async list(): Promise<Service[]> {

    const response =
      await api.get("/services");

    return response.data.data;

  },

};