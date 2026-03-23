export interface DashboardStats {
  total_this_month: number;
  total_last_month: number;
  daily_avg_this_month: number;
  daily_avg_last_month: number;
  total_budget: number;
  budget_remaining: number;
  total_categories: number;
  categories_this_month: number;
  categories_last_month: number;
}

export interface BudgetOverviewItem {
  category: string;
  icon: string;
  color: string;
  spent: number;
  budget: number;
}

export interface RecentExpense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: {
    id: number;
    name: string;
    icon: string;
    color: string;
  };
}
