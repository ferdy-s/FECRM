import {
  LeadActivity,
} from "../types/lead-activity.type";

export const leadActivitiesMock: LeadActivity[] =
  [
    {
      id: "1",

      type: "CALL",

      title:
        "Follow Up Call",

      description:
        "Diskusi kebutuhan CRM perusahaan.",

      createdBy:
        "Ferdy",

      createdAt:
        "10 Mei 2025 10:30",
    },

    {
      id: "2",

      type: "EMAIL",

      title:
        "Email Proposal",

      description:
        "Proposal ERP dikirim ke client.",

      createdBy:
        "Ferdy",

      createdAt:
        "10 Mei 2025 14:20",
    },

    {
      id: "3",

      type: "WHATSAPP",

      title:
        "WhatsApp Follow Up",

      description:
        "Menanyakan progress approval proposal.",

      createdBy:
        "Budi",

      createdAt:
        "11 Mei 2025 09:00",
    },
  ];