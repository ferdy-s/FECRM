export interface CreateLeadRequest {

  name: string;

  company: string;

  email: string;

  phone: string;

  address: string;

  district: string;

  city: string;

  province: string;

  postalCode: string;

  country: string;

  sourceId: string;

  assignedTo: string;

}

export interface CreateLeadResponse {
  success: boolean;

  data: {
    id: string;

    name: string;

    company: string;

    email: string | null;

    phone: string | null;

    address: string | null;

    district: string | null;

    city: string | null;

    province: string | null;

    postalCode: string | null;

    country: string | null;

    sourceId: string;

    assignedTo: string;

    createdBy: string;

    status: string;

    lastActivityAt: string;

    createdAt: string;

    deletedAt: string | null;
  };
}