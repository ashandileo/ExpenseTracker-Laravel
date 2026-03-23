import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { PageHeader } from "@/components/page-header";
import { DashboardStatCards } from "./_components/DashboardStatCards";
import { DashboardRecentExpenses } from "./_components/DashboardRecentExpenses";
import { DashboardBudgetOverview } from "./_components/DashboardBudgetOverview";
import { DashboardStats, BudgetOverviewItem, RecentExpense } from "./types";

interface DashboardProps {
  stats: DashboardStats;
  budgetOverview: BudgetOverviewItem[];
  recentExpenses: RecentExpense[];
}

export default function Dashboard({
  stats,
  budgetOverview,
  recentExpenses,
}: DashboardProps) {
  return (
    <AppLayout>
      <Head title="Dashboard" />
      <PageHeader
        title="Dashboard"
        description="Overview of your expenses this month"
      />
      <div className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
        <DashboardStatCards stats={stats} />

        <div className="grid gap-6 lg:grid-cols-5">
          <DashboardRecentExpenses expenses={recentExpenses} />
          <DashboardBudgetOverview items={budgetOverview} />
        </div>
      </div>
    </AppLayout>
  );
}
