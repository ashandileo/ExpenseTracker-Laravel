import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const budgetOverview = [
  {
    category: "Food & Groceries",
    spent: 1800000,
    budget: 2500000,
    color: "bg-emerald-500",
  },
  {
    category: "Transportation",
    spent: 650000,
    budget: 1000000,
    color: "bg-blue-500",
  },
  {
    category: "Entertainment",
    spent: 420000,
    budget: 500000,
    color: "bg-purple-500",
  },
  {
    category: "Utilities",
    spent: 750000,
    budget: 800000,
    color: "bg-yellow-500",
  },
];

function formatRupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export function DashboardBudgetOverview() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>Monthly budget progress</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {budgetOverview.map((item) => {
          const pct = Math.round((item.spent / item.budget) * 100);
          return (
            <div key={item.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <small className="text-sm leading-none font-medium">
                  {item.category}
                </small>
                <p className="text-sm text-muted-foreground">{pct}%</p>
              </div>
              <Progress value={pct} className="h-2" />
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
