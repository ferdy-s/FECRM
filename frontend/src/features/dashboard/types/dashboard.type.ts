export interface DashboardKPI {
  totalLeads: number;
  activeDeals: number;
  wonDeals: number;
  conversionRate: number;
}

export interface PipelineLead {
  id: string;
  lead: string;
  company: string;
  stage: string;
  pic: string;
  value: number;
  lastActivity: string;
}

export interface SalesPerformance {
  name: string;
  leads: number;
  wonDeals: number;
  winRate: number;
}

export interface RevenueOverview {
  targetRevenue: number;
  achievedRevenue: number;
  openInvoices: number;
  paidInvoices: number;
}