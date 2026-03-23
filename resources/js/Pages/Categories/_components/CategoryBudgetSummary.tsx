import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Category, formatRupiah } from "../constants";

interface CategoryBudgetSummaryProps {
  categories: Category[];
}

export function CategoryBudgetSummary({ categories }: CategoryBudgetSummaryProps) {
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const totalBudget = categories.reduce((sum, c) => sum + c.budget, 0);
  const totalPct = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Monthly Budget
            </p>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {formatRupiah(totalBudget)}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {formatRupiah(totalSpent)}
            </h3>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <p className="text-sm text-muted-foreground">Overall Progress</p>
            <small className="text-sm leading-none font-medium">
              {totalPct}%
            </small>
          </div>
          <Progress value={totalPct} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {formatRupiah(totalBudget - totalSpent)} remaining this month
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
