import { api } from "./api";
import {
  AgingReport,
  ApiResponse,
  CollectionDashboard,
  CollectionReport,
  FinanceKPI,
  PipelineOverview,
  SalesPerformance,
  SourcePerformance,
} from "@/types/report";

export const reportService = {
  async getFinanceKPI() {
    const { data } =
      await api.get<ApiResponse<FinanceKPI>>(
        "/reports/finance-kpi"
      );

    return data.data;
  },

  async getCollectionDashboard() {
    const { data } =
      await api.get<ApiResponse<CollectionDashboard>>(
        "/reports/collection-dashboard"
      );

    return data.data;
  },

  async getCollectionReport() {
    const { data } =
      await api.get<ApiResponse<CollectionReport>>(
        "/reports/collection"
      );

    return data.data;
  },

  async getAging() {
    const { data } =
      await api.get<ApiResponse<AgingReport>>(
        "/reports/aging"
      );

    return data.data;
  },

  async getPipeline() {
    const { data } =
      await api.get<ApiResponse<PipelineOverview>>(
        "/reports/pipeline"
      );

    return data.data;
  },

  async getSalesPerformance() {
    const { data } =
      await api.get<ApiResponse<SalesPerformance[]>>(
        "/reports/sales"
      );

    return data.data;
  },

  async getSourcePerformance() {
    const { data } =
      await api.get<ApiResponse<SourcePerformance[]>>(
        "/reports/sources"
      );

    return data.data;
  },

  async refreshOverdue() {
    const { data } =
      await api.post<ApiResponse<{ updated: number }>>(
        "/reports/overdue-check"
      );

    return data.data;
  },


  async getExportReportData() {

      const [

          finance,

          collection,

          collectionReport,

          aging,

          pipeline,

          sales,

          sources,

      ] = await Promise.all([

          this.getFinanceKPI(),

          this.getCollectionDashboard(),

          this.getCollectionReport(),

          this.getAging(),

          this.getPipeline(),

          this.getSalesPerformance(),

          this.getSourcePerformance(),

      ]);

      return {

          finance,

          collection,

          collectionReport,

          aging,

          pipeline,

          sales,

          sources,

      };

  },
};