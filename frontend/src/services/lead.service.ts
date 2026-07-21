import { api } from "./api";

import type {
  Lead,
  LeadDetail,
} from "@/types/lead";

import type {
  UpdateLeadRequest,
} from "@/types/update-lead";


import type {
  UpdateLeadStatusRequest,
} from "@/types/lead-status";

import type {
  CreateLeadRequest,
} from "@/types/create-lead";

export const leadService = {

  //////////////////////////////////////////////////////
  // LIST
  //////////////////////////////////////////////////////

  async getLeads(): Promise<Lead[]> {

    const response =
      await api.get("/leads");

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // DETAIL
  //////////////////////////////////////////////////////

  async getLeadDetail(
    id: string,
  ): Promise<LeadDetail> {

    const response =
      await api.get(
        `/leads/${id}`,
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // CREATE
  //////////////////////////////////////////////////////

 async createLead(
  payload: CreateLeadRequest
) {

  const response =
    await api.post(
      "/leads",
      payload
    );

  return response.data.data;

},

  //////////////////////////////////////////////////////
  // ASSIGN
  //////////////////////////////////////////////////////

  async assignLead(
    leadId: string,
    assignedTo: string,
  ) {

    const response =
      await api.patch(
        "/leads/assign",
        {
          leadId,
          assignedTo,
        },
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // STATUS
  //////////////////////////////////////////////////////

  async updateLeadStatus(
  payload: UpdateLeadStatusRequest,
): Promise<LeadDetail> {

  const response =
    await api.patch(
      "/leads/status",
      payload,
    );

  return response.data.data;

},

//////////////////////////////////////////////////////
// UPDATE
//////////////////////////////////////////////////////

async updateLead(
  payload: UpdateLeadRequest,
): Promise<LeadDetail> {

  const response =
    await api.patch(

      `/leads/${payload.id}`,

      {

        name:
          payload.name,

        company:
          payload.company,

        email:
          payload.email,

        phone:
          payload.phone,

        address:
          payload.address,

        district:
          payload.district,

        city:
          payload.city,

        province:
          payload.province,

        postalCode:
          payload.postalCode,

        country:
          payload.country,

        sourceId:
          payload.sourceId,

        assignedTo:
          payload.assignedTo,

        status:
          payload.status,

      },

    );

  return response.data.data;

},

  //////////////////////////////////////////////////////
  // TIMELINE
  //////////////////////////////////////////////////////

  async getTimeline(
    leadId: string,
  ) {

    const response =
      await api.get(
        `/leads/timeline?leadId=${leadId}`,
      );

    return response.data.data;

  },

  //////////////////////////////////////////////////////
  // CONVERT
  //////////////////////////////////////////////////////

  async convertLead(
  leadId: string,
) {

  const response =
    await api.post(
      "/deals/convert",
      {
        leadId,
      }
    );

  return response.data.data;

},

};