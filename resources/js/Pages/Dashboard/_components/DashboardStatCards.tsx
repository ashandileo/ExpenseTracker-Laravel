import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  DollarSign,
  CalendarDays,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
} from "lucide-react";
import { DashboardStats } from "../types";
import { formatRupiah } from "../../Expenses/constants";

function calcChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

interface DashboardStatCardsProps {
  stats: DashboardStats;
}

export function DashboardStatCards({ stats }: DashboardStatCardsProps) {
  const monthChange = calcChange(stats.total_this_month, stats.total_last_month);
  const dailyChange = calcChange(stats.daily_avg_this_month, stats.daily_avg_last_month);
  const budgetPct =
    stats.total_budget > 0
      ? Math.round((stats.budget_remaining / stats.total_budget) * 100)
      : 0;
  const categoryDiff = stats.categories_this_month - stats.categories_last_month;

  const cards = [
    {
      title: "Total This Month",
      value: formatRupiah(stats.total_this_month),
      change: `${monthChange >= 0 ? "+" : ""}${monthChange.toFixed(1)}%`,
      trend: monthChange <= 0 ? ("down" as const) : ("up" as const),
      icon: DollarSign,
      description: "vs last month",
    },
    {
      title: "Daily Average",
      value: formatRupiah(stats.daily_avg_this_month),
      change: `${dailyChange >= 0 ? "+" : ""}${dailyChange.toFixed(1)}%`,
      trend: dailyChange <= 0 ? ("down" as const) : ("up" as const),
      icon: CalendarDays,
      description: "vs last month",
    },
    {
      title: "Budget Remaining",
      value: formatRupiah(stats.budget_remaining),
      change: `${budgetPct}%`,
      trend: budgetPct >= 50 ? ("up" as const) : ("down" as const),
      icon: PiggyBank,
      description: `of ${formatRupiah(stats.total_budget)}`,
    },
    {
      title: "Total Categories",
      value: String(stats.total_categories),
      change: `${categoryDiff >= 0 ? "+" : ""}${categoryDiff}`,
      trend: categoryDiff >= 0 ? ("up" as const) : ("down" as const),
      icon: ShoppingCart,
      description: "active categories",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-sm font-medium">
              {stat.title}
            </CardDescription>
            <div className="rounded-md bg-muted p-2">
              <stat.icon className="size-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">{stat.value}</div>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {stat.trend === "up" ? (
                <ArrowUpRight className="size-3 text-emerald-500" />
              ) : (
                <ArrowDownRight className="size-3 text-rose-500" />
              )}
              <span
                className={
                  stat.trend === "up" ? "text-emerald-500" : "text-rose-500"
                }
              >
                {stat.change}
              </span>
              <span className="text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
