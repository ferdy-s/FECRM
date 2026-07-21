import { api } from "@/services/api";

import type {
  Service,
  CreateServiceDto,
  UpdateServiceDto,
} from "../types/service";

export const serviceManagement = {
  async getAll() {
    const res = await api.get("/services");

    return res.data.data as Service[];
  },

  async getById(id: string) {
    const res = await api.get(
      `/services/${id}`
    );

    return res.data.data as Service;
  },

  async create(data: CreateServiceDto) {
    const res = await api.post(
      "/services",
      data
    );

    return res.data.data as Service;
  },

  async update(
    id: string,
    data: UpdateServiceDto
  ) {
    const res = await api.patch(
      `/services/${id}`,
      data
    );

    return res.data.data as Service;
  },

  async remove(id: string) {
    const res = await api.delete(
      `/services/${id}`
    );

    return res.data.data;
  },
};