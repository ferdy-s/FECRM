import { api } from "./api";

import type {
  RequestNegotiationRequest,
} from "@/types/request-negotiation";

import type {
  Deal,
} from "@/types/deal";

import type {
  CreateDealRequest,
} from "@/features/deals/types/create-deal";

import type {
  UpdateDealStatusRequest,
} from "@/features/deals/types/update-deal-status";

import type {
  AttachProductRequest,
} from "@/features/deals/types/attach-product";

import type {
  AttachServiceRequest,
} from "@/features/deals/types/attach-service";

import type {
  DealDetail,
} from "@/types/deal-detail";

export const dealService = {

  //////////////////////////////////////////////////////
  // LIST
  //////////////////////////////////////////////////////

  async getDeals(): Promise<Deal[]> {

    const response =
      await api.get("/deals");

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // DETAIL
  //////////////////////////////////////////////////////

  async getDeal(
    id: string,
  ): Promise<Deal> {

    const response =
      await api.get(
        `/deals/${id}`,
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // CREATE
  //////////////////////////////////////////////////////

  async create(
    payload: CreateDealRequest,
  ): Promise<Deal> {

    const response =
      await api.post(
        "/deals",
        payload,
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
// CONVERT LEAD
//////////////////////////////////////////////////////

async convertLead(
  payload: CreateDealRequest,
): Promise<Deal> {

  const response =
    await api.post(
      "/deals/convert",
      payload,
    );

  return response.data.data;

},

  //////////////////////////////////////////////////////
  // STATUS
  //////////////////////////////////////////////////////

  async updateStatus(
    payload: UpdateDealStatusRequest,
  ): Promise<Deal> {

    const response =
      await api.patch(
        "/deals/status",
        payload,
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // ATTACH PRODUCT
  //////////////////////////////////////////////////////

  async attachProduct(
    payload: AttachProductRequest,
  ) {

    const response =
      await api.post(
        "/deals/attach-product",
        payload,
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // ATTACH SERVICE
  //////////////////////////////////////////////////////

  async attachService(
    payload: AttachServiceRequest,
  ) {

    const response =
      await api.post(
        "/deals/attach-service",
        payload,
      );

    return response.data.data;

  },

  async detail(
  id: string,
): Promise<DealDetail> {

  const response =
    await api.get(
      `/deals/${id}`,
    );

  return response.data.data;

},

//////////////////////////////////////////////////////
// REQUEST NEGOTIATION
//////////////////////////////////////////////////////

async requestNegotiation(
  payload: RequestNegotiationRequest,
) {

  const response =
    await api.post(
      "/price-negotiations/request",
      payload,
    );

  return response.data.data;

},

//////////////////////////////////////////////////////
// UPDATE ITEM
//////////////////////////////////////////////////////

async updateItem(
  payload: {
    transactionItemId: string;
    quantity: number;
  },
) {

  const response =
    await api.patch(
      "/deals/update-item",
      payload,
    );

  return response.data.data;

},

//////////////////////////////////////////////////////
// DELETE ITEM
//////////////////////////////////////////////////////

async deleteItem(
  transactionItemId: string,
) {

  const response =
    await api.delete(
      `/deals/delete-item/${transactionItemId}`,
    );

  return response.data.data;

},

};