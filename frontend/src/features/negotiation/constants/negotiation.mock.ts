import { Negotiation }
from "../types/negotiation";

export const negotiations:
  Negotiation[] = [
  {
    id: "NEG-001",
    dealName:
      "CRM Enterprise Implementation",

    customerName:
      "PT Hutama Karya",

    itemName:
      "CRM Enterprise",

    requester:
      "Ferdy",

    approver:
      "Manager",

    originalPrice:
      30000000,

    requestedPrice:
      25000000,

    approvedPrice:
      26000000,

    status:
      "APPROVED",

    createdAt:
      "2026-06-15",
  },

  {
    id: "NEG-002",

    dealName:
      "ERP Construction",

    customerName:
      "PT Wijaya Karya",

    itemName:
      "ERP Module",

    requester:
      "Sales Team",

    originalPrice:
      45000000,

    requestedPrice:
      39000000,

    status:
      "PENDING",

    createdAt:
      "2026-06-16",
  },
];