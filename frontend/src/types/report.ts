export interface FinanceKPI {
  dso: number;
  collectionRate: number;
  overdueRate: number;
  collectionEfficiency: number;
  averageCollectionDays: number;
}

export interface CollectionDashboard {
  receivable: number;
  collected: number;
  outstanding: number;
  overdue: number;
  collectionRate: number;
  overdueInvoices: number;
  overdueDeals: number;
}

export interface CollectionReport {
  totalReceivable: number;
  totalCollected: number;
  totalOutstanding: number;
  totalOverdue: number;
  collectionRate: number;
  aging: AgingReport;
}

export interface AgingReport {
  bucket0to30: number;
  bucket31to60: number;
  bucket61to90: number;
  bucket90plus: number;
}

export interface PipelineOverview {
  totalLead: number;
  totalNegotiation: number;
  totalWon: number;
  totalLost: number;
}

export interface SalesPerformance {
  salesId: string;
  salesName: string;
  totalDeals: number;
  pipelineValue: number;
  collectedRevenue: number;
  outstandingRevenue: number;
}

export interface SourcePerformance {
  sourceId: string;
  sourceName: string;
  totalLead: number;
  totalWon: number;
  conversionRate: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}