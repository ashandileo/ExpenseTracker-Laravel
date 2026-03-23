import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Receipt } from "lucide-react";
import { RecentExpense } from "../types";
import { getCategoryStyle, formatRupiah } from "../../Expenses/constants";

interface DashboardRecentExpensesProps {
  expenses: RecentExpense[];
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function DashboardRecentExpenses({
  expenses,
}: DashboardRecentExpensesProps) {
  if (expenses.length === 0) {
    return (
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Your latest spending activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Receipt className="size-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              No expenses yet this month.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
        <CardDescription>Your latest spending activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {expenses.map((expense, i) => {
            const style = getCategoryStyle(expense.category?.icon ?? "");
            const IconComponent = style.icon;

            return (
              <div key={expense.id}>
                <div className="flex items-center gap-3 py-3">
                  <div
                    className={`flex size-9 items-center justify-center rounded-lg ${style.bgColor} ${style.color}`}
                  >
                    <IconComponent className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <small className="text-sm leading-none font-medium truncate block">
                      {expense.description}
                    </small>
                    <p className="text-sm text-muted-foreground">
                      {expense.category?.name ?? "Uncategorized"}
                    </p>
                  </div>
                  <div className="text-right">
                    <small className="text-sm leading-none font-medium">
                      -{formatRupiah(expense.amount)}
                    </small>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(expense.date)}
                    </p>
                  </div>
                </div>
                {i < expenses.length - 1 && <Separator />}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
