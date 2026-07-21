export const queryKeys = {
  // ==========================================================
  // Report
  // ==========================================================

  report: {
    financeKPI: [
      "reports",
      "finance-kpi",
    ] as const,

    collectionDashboard: [
      "reports",
      "collection-dashboard",
    ] as const,

    collectionReport: [
      "reports",
      "collection",
    ] as const,

    aging: [
      "reports",
      "aging",
    ] as const,

    pipeline: [
      "reports",
      "pipeline",
    ] as const,

    sales: [
      "reports",
      "sales",
    ] as const,

    sources: [
      "reports",
      "sources",
    ] as const,
  },

  // ==========================================================
  // Notification
  // ==========================================================

  notification: {
    notifications: [
      "notifications",
    ] as const,
  },

  // ==========================================================
  // Service
  // ==========================================================

  service: {
    all: [
      "services",
    ] as const,

    detail: (
      id: string
    ) => [
      "services",
      id,
    ] as const,
  },

  // ==========================================================
// User
// ==========================================================

user: {

  all: [
    "users",
  ] as const,

  list: (
    params?: {
      role?: string;
      isActive?: boolean;
      search?: string;
    },
  ) => [
    "users",
    params,
  ] as const,

  detail: (
    id: string,
  ) => [
    "users",
    id,
  ] as const,

},
};