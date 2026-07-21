import { Lead } from "../types/lead.type";

export const leads: Lead[] = [
  {
    id: "1",
    company: "PT ABC Konstruksi",
    contactPerson: "Budi",
    email: "budi@abc.com",
    phone: "08123456789",
    source: "Website",
    status: "NEW",
    value: 50000000,
    assignedTo: "Ferdy",
    createdAt: "2025-05-10",
  },

  {
    id: "2",
    company: "PT XYZ Retail",
    contactPerson: "Siti",
    email: "siti@xyz.com",
    phone: "08111111111",
    source: "Referral",
    status: "QUALIFIED",
    value: 120000000,
    assignedTo: "Budi",
    createdAt: "2025-05-09",
  },

  {
    id: "3",
    company: "CV Sejahtera",
    contactPerson: "Andi",
    email: "andi@cvs.com",
    phone: "08222222222",
    source: "Instagram",
    status: "NEGOTIATION",
    value: 75000000,
    assignedTo: "Andi",
    createdAt: "2025-05-08",
  },
];