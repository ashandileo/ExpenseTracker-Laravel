import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pencil, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { categories, formatRupiah } from "../constants";

function getStatusBadge(pct: number) {
  if (pct >= 100) {
    return (
      <Badge variant="destructive" className="gap-1 text-xs">
        <AlertTriangle className="size-3" />
        Over Budget
      </Badge>
    );
  }
  if (pct >= 80) {
    return (
      <Badge className="gap-1 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400 text-xs">
        <AlertTriangle className="size-3" />
        Near Limit
      </Badge>
    );
  }
  return (
    <Badge variant="secondary" className="text-xs">
      On Track
    </Badge>
  );
}

export function CategoryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((category) => {
        const pct = Math.round((category.spent / category.budget) * 100);
        const remaining = category.budget - category.spent;

        return (
          <Card key={category.id} className="group relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-10 items-center justify-center rounded-lg ${category.bgColor} ${category.color}`}
                  >
                    <category.icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="scroll-m-20 text-base font-semibold tracking-tight">
                      {category.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {category.transactionCount} transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(pct)}
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Pencil className="size-3" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <small className="text-sm leading-none font-medium">
                    {formatRupiah(category.spent)}
                  </small>
                  <p className="text-sm text-muted-foreground">
                    {formatRupiah(category.budget)}
                  </p>
                </div>
                <Progress value={Math.min(pct, 100)} className="h-2" />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {remaining >= 0
                    ? `${formatRupiah(remaining)} left`
                    : `${formatRupiah(Math.abs(remaining))} over`}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  {category.trend === "up" ? (
                    <TrendingUp className="size-3 text-rose-500" />
                  ) : (
                    <TrendingDown className="size-3 text-emerald-500" />
                  )}
                  <span
                    className={
                      category.trend === "up"
                        ? "text-rose-500"
                        : "text-emerald-500"
                    }
                  >
                    {category.trendValue}
                  </span>
                  <span className="text-muted-foreground">vs last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
