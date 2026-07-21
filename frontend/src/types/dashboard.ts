export interface FinanceDashboard {
  receivable: number;
  collected: number;
  outstanding: number;
  overdue: number;

  collectionRate: number;

  overdueInvoices: number;
  overdueDeals: number;

  aging: {
    bucket0to30: number;
    bucket31to60: number;
    bucket61to90: number;
    bucket90plus: number;
  };

  kpi: {
    dso: number;
    collectionRate: number;
    overdueRate: number;
    collectionEfficiency: number;
    averageCollectionDays: number;
  };
}

export interface ManagerDashboard {
  pipeline: {
    totalLead: number;
    negotiation: number;
    won: number;
    lost: number;
  };

  conversion: {
    rate: number;
  };

  sales: {
    totalDeals: number;
    pipelineValue: number;
  };

  finance: {
    collected: number;
    outstanding: number;
  };

  collection: {
    overdue: number;
    collectionRate: number;
  };

  kpi: {
    dso: number;
    overdueRate: number;
  };
}

export interface AdminDashboard {
  users: {
    total: number;
    admins: number;
    sales: number;
    finance: number;
    manager: number;
  };

  lead: {
    total: number;
    new: number;
    negotiation: number;
    won: number;
    lost: number;
  };

  deal: {
    total: number;
    pipelineValue: number;
  };
}