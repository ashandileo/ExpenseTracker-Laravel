import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    ShoppingCart,
    Coffee,
    Car,
    Zap,
    UtensilsCrossed,
    Gamepad2,
} from "lucide-react";

const recentExpenses = [
    {
        id: 1,
        description: "Grocery Shopping",
        category: "Food & Groceries",
        amount: "Rp 350.000",
        date: "Today",
        icon: ShoppingCart,
        color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
        id: 2,
        description: "Morning Coffee",
        category: "Coffee & Drinks",
        amount: "Rp 45.000",
        date: "Today",
        icon: Coffee,
        color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
        id: 3,
        description: "Grab to Office",
        category: "Transportation",
        amount: "Rp 65.000",
        date: "Yesterday",
        icon: Car,
        color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
        id: 4,
        description: "Electricity Bill",
        category: "Utilities",
        amount: "Rp 450.000",
        date: "Yesterday",
        icon: Zap,
        color: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    },
    {
        id: 5,
        description: "Dinner with Friends",
        category: "Food & Groceries",
        amount: "Rp 280.000",
        date: "Mar 21",
        icon: UtensilsCrossed,
        color: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    },
    {
        id: 6,
        description: "Netflix Subscription",
        category: "Entertainment",
        amount: "Rp 186.000",
        date: "Mar 20",
        icon: Gamepad2,
        color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
    },
];

export function DashboardRecentExpenses() {
    return (
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>
                    Your latest spending activity
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    {recentExpenses.map((expense, i) => (
                        <div key={expense.id}>
                            <div className="flex items-center gap-3 py-3">
                                <div
                                    className={`flex size-9 items-center justify-center rounded-lg ${expense.color}`}
                                >
                                    <expense.icon className="size-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <small className="text-sm leading-none font-medium truncate block">
                                        {expense.description}
                                    </small>
                                    <p className="text-sm text-muted-foreground">
                                        {expense.category}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <small className="text-sm leading-none font-medium">
                                        -{expense.amount}
                                    </small>
                                    <p className="text-sm text-muted-foreground">
                                        {expense.date}
                                    </p>
                                </div>
                            </div>
                            {i < recentExpenses.length - 1 && (
                                <Separator />
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
