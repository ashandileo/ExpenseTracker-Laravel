import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PiggyBank } from "lucide-react";
import { BudgetOverviewItem } from "../types";
import { formatRupiah } from "../../Expenses/constants";

interface DashboardBudgetOverviewProps {
  items: BudgetOverviewItem[];
}

export function DashboardBudgetOverview({
  items,
}: DashboardBudgetOverviewProps) {
  if (items.length === 0) {
    return (
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>Monthly budget progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <PiggyBank className="size-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No budgets set yet. Set a budget on your categories to track
              spending.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>Monthly budget progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {items.map((item) => {
          const pct = Math.round((item.spent / item.budget) * 100);
          return (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <small className="text-sm leading-none font-medium">
                  {item.category}
                </small>
                <p className="text-sm text-muted-foreground">{pct}%</p>
              </div>
              <Progress value={Math.min(pct, 100)} className="h-2" />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {formatRupiah(item.spent)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatRupiah(item.budget)}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
