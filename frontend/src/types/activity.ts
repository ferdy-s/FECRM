import type { User } from "./user";

export type ActivityType =
  | "SYSTEM"
  | "NOTE"
  | "STATUS"
  | "ASSIGNMENT"
  | "COMMUNICATION"
  | "NEGOTIATION"
  | "FINANCE"
  | "CALL"
  | "MEETING"
  | "EMAIL";

export interface ActivityLead {
  id: string;
  name: string;
  company: string | null;
  status: string;
}

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  createdAt: string;

  lead: ActivityLead;
  user: Pick<User, "id" | "name" | "role">;
}

export interface ActivitiesResponse {
  success: boolean;
  data: Activity[];
}