import { Deal }
from "../types/deal.type";

export const deals: Deal[] = [
  {
    id: "1",
    company: "PT ABC Konstruksi",
    value: 50000000,
    status: "NEGOTIATION",
    assignedTo: "Ferdy",
    createdAt: "2025-05-10",
  },

  {
    id: "2",
    company: "PT XYZ Retail",
    value: 120000000,
    status: "WON",
    assignedTo: "Budi",
    createdAt: "2025-05-09",
  },

  {
    id: "3",
    company: "PT Maju Bersama",
    value: 75000000,
    status: "OPEN",
    assignedTo: "Siti",
    createdAt: "2025-05-08",
  },

  {
    id: "4",
    company: "PT Nusantara Digital",
    value: 95000000,
    status: "LOST",
    assignedTo: "Andi",
    createdAt: "2025-05-07",
  },
];