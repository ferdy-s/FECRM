export interface LeadSource {
  id: string;
  name: string;
}

export interface LeadAssignee {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
  deletedAt?: string | null;
}

export interface LeadCreator {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
  deletedAt?: string | null;
}

export interface LeadActivity {
  id: string;
  leadId: string;
  userId: string;
  type: string;
  description: string;
  createdAt: string;
}

export interface LeadCommunication {
  id: string;
  leadId: string;
  channel?: string;
  subject?: string;
  message?: string;
  createdAt: string;
}

export interface LeadNegotiation {
  id: string;
  leadId: string;
  title?: string;
  amount?: number;
  status?: string;
  createdAt: string;
}

export interface LeadDeal {
  id: string;
  leadId?: string;
  value?: number;
  status?: string;
}

export interface Lead {
  id: string;

  name: string;
  company: string;

  email: string | null;
  phone: string | null;

  address?: string | null;
  district?: string | null;
  city?: string | null;
  province?: string | null;
  postalCode?: string | null;
  country?: string | null;

  sourceId?: string;
  assignedTo: string;
  createdBy?: string;

  status: string;

  lastActivityAt?: string;
  createdAt: string;
  deletedAt?: string | null;

  source?: LeadSource;
  assignee?: LeadAssignee;
}

export interface LeadDetail {
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

  source: {
    id: string;
    name: string;
  };

  assignee: {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    deletedAt: string | null;
  };

  creator: {
    id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    deletedAt: string | null;
  };

  deals: unknown[];

  activities: {
    id: string;
    leadId: string;
    userId: string;
    type: string;
    description: string;
    createdAt: string;
  }[];

  communications: unknown[];

  negotiations: unknown[];
}