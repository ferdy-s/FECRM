import { AgingCards } from "./AgingCards";
import { FinanceKPICards } from "./FinanceKPICards";
import { CollectionDashboardCards } from "./CollectionDashboardCards";
import { PipelineCards } from "./PipelineCards";
import { SalesPerformanceSection } from "./SalesPerformanceSection";
import { SourcePerformanceTable } from "./SourcePerformanceTable";


export function DashboardSummary() {

    return (

        <div className="space-y-8">

    <FinanceKPICards />

    <CollectionDashboardCards />
    <PipelineCards />

    <AgingCards />

    <SalesPerformanceSection />

    <SourcePerformanceTable />

</div>

    );
}